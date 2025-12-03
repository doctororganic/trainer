import { UserProfile, DayPlan, Exercise, GoalType, InjuryType, Recipe } from '../types';
import { EXERCISE_LIBRARY, RECIPES } from '../data';
import { GOAL_SETTINGS } from '../constants';

// --- HELPER FUNCTIONS ---

const shuffle = <T,>(array: T[]): T[] => { 
  return [...array].sort(() => Math.random() - 0.5);
};

// Filter based on user's injury
const filterSafeExercises = (exercises: Exercise[], injury: InjuryType): Exercise[] => {
  if (injury === 'none') return exercises;
  return exercises.filter(ex => !ex.avoidIfInjury?.includes(injury));
};

// Filter based on goal specifically (e.g., calisthenics only allows bodyweight/plyo)
const filterExercisesByGoal = (exercises: Exercise[], goal: GoalType): Exercise[] => {
  if (goal === 'calisthenics') {
    return exercises.filter(ex => 
      ['bodyweight', 'plyometric'].includes(ex.type || '') || 
      ['pullup', 'pushup', 'dip', 'muscle_up', 'handstand', 'squat', 'lunge', 'plank', 'leg_raise'].some(id => ex.id.includes(id))
    );
  }
  if (goal === 'powerlifting') {
    return exercises.filter(ex => ex.type === 'compound');
  }
  if (goal === 'flexibility') {
    return exercises.filter(ex => ex.type === 'stretch');
  }
  return exercises;
};

// Select random exercises for a muscle group
const getExercisesByMuscle = (muscle: string, allExercises: Exercise[], limit: number): Exercise[] => {
  const matches = allExercises.filter(ex => ex.muscleGroup === muscle);
  return shuffle(matches).slice(0, limit);
};

// Find specific exercises by ID or fallback to muscle group
const getSpecificExercises = (ids: string[], allExercises: Exercise[]): Exercise[] => {
  return allExercises.filter(ex => ids.includes(ex.id));
};

// --- CORE GENERATION LOGIC ---

const generateWorkoutDay = (
  dayNameEn: string, 
  dayNameAr: string, 
  focusEn: string, 
  focusAr: string, 
  muscles: string[], 
  injury: InjuryType,
  goal: GoalType,
  specificExerciseIds: string[] = [] // Optional: Force specific exercises
): DayPlan => {
  
  let dayExercises: Exercise[] = [];
  const settings = GOAL_SETTINGS[goal] || GOAL_SETTINGS['muscle_gain'];

  // 1. Filter safe exercises
  let safePool = filterSafeExercises(EXERCISE_LIBRARY, injury);
  
  // 2. Filter by goal specific requirements
  safePool = filterExercisesByGoal(safePool, goal);

  // 3. Add specific exercises if requested (and safe)
  if (specificExerciseIds.length > 0) {
    const specifics = getSpecificExercises(specificExerciseIds, safePool);
    dayExercises = [...dayExercises, ...specifics];
  }

  // 4. Fill remaining with random muscle group exercises
  if (dayExercises.length < 4) { // Target ~4-5 exercises per day
    muscles.forEach(muscle => {
      // Determine count: More volume for larger muscle groups
      let count = 2; 
      if (['Legs', 'Back', 'Chest'].includes(muscle)) count = (goal === 'muscle_gain' || goal === 'bulking') ? 3 : 2;
      if (['Core', 'Arms', 'Cardio'].includes(muscle)) count = 2;
      
      // For specialized goals like flexibility, just pick stretches
      if (goal === 'flexibility') count = 4;

      // Fetch unique exercises not already added
      const muscleExercises = getExercisesByMuscle(muscle, safePool, count);
      const uniqueNew = muscleExercises.filter(newEx => !dayExercises.find(existing => existing.id === newEx.id));
      
      dayExercises = [...dayExercises, ...uniqueNew];
    });
  }
  
  // Apply Goal Settings to these exercises
  const customizedExercises = dayExercises.map(ex => ({
    ...ex,
    sets: ex.type === 'compound' ? settings.sets : settings.sets - 1,
    reps: settings.repRange,
    rest: ex.type === 'compound' ? String(Number(settings.rest) + 30) : settings.rest,
    isCompleted: false // Init checklist state
  }));

  // Select suitable recipe based on goal
  let targetRecipeType = 'general';
  if (goal === 'cutting' || goal === 'weight_loss' || goal === 'queen_shape') targetRecipeType = 'cutting';
  if (goal === 'bulking' || goal === 'muscle_gain' || goal === 'powerlifting') targetRecipeType = 'bulking';
  if (goal === 'endurance' || goal === 'calisthenics') targetRecipeType = 'general';

  const compatibleRecipes = RECIPES.filter(r => r.type === targetRecipeType || r.type === 'general');
  const selectedRecipe = compatibleRecipes.length > 0 
    ? [shuffle(compatibleRecipes)[0]] 
    : [RECIPES[0]];

  return {
    dayName: { en: dayNameEn, ar: dayNameAr },
    focus: { en: focusEn, ar: focusAr },
    exercises: customizedExercises,
    tips: [], // Will be populated in main function
    recipes: selectedRecipe
  };
};

export const generateWorkoutPlan = (profile: UserProfile): DayPlan[] => {
  const { goal, injury, experience } = profile;
  const days: DayPlan[] = [];

  // 1. DETERMINE SPLIT BASED ON EXPERIENCE & GOAL
  let splitType = 'full_body';
  
  if (goal === 'calisthenics') {
    splitType = 'upper_lower'; // Common for calisthenics
  } else if (goal === 'flexibility') {
    splitType = 'flexibility';
  } else if (goal === 'queen_shape') {
    splitType = 'queen_split';
  } else {
    if (experience === 'intermediate') splitType = 'upper_lower';
    if (experience === 'advanced') splitType = 'ppl'; // Push Pull Legs
  }

  // 2. GENERATE DAYS
  if (splitType === 'queen_split') {
    // 4 Days: Lower, Upper, Rest, Lower+Glutes, Cardio+Abs, Rest, Rest
    
    // Day 1: Lower Body
    days.push(generateWorkoutDay('Day 1', 'الاثنين', 'Lower Body Foundation', 'أساس الجزء السفلي', ['Legs'], injury, goal, 
      ['dumbbell_squat', 'glute_bridge', 'lunges', 'donkey_kicks']));
    
    // Day 2: Upper Body
    days.push(generateWorkoutDay('Day 2', 'الثلاثاء', 'Upper Body Toning', 'شد الجزء العلوي', ['Chest', 'Back', 'Shoulders'], injury, goal, 
      ['modified_pushup', 'dumbbell_row', 'lateral_raise', 'plank']));
    
    // Day 3: Rest
    days.push({ dayName: { en: 'Day 3', ar: 'الأربعاء' }, focus: { en: 'Rest', ar: 'راحة' }, exercises: [], tips: [], recipes: [] });

    // Day 4: Lower Body + Glutes
    days.push(generateWorkoutDay('Day 4', 'الخميس', 'Glutes & Legs Focus', 'تركيز أرداف وساقين', ['Legs'], injury, goal, 
      ['bulgarian_split_squat', 'side_lunges', 'butterfly_kicks', 'abductor_machine']));

    // Day 5: Cardio + Abs
    days.push(generateWorkoutDay('Day 5', 'الجمعة', 'Cardio & Core', 'كارديو وبطن', ['Cardio', 'Core'], injury, goal, 
      ['jumping_jacks', 'bicycle_crunches', 'boat_pose'])); // + Brisk Walk (added as tip)

    // Day 6: Rest
    days.push({ dayName: { en: 'Day 6', ar: 'السبت' }, focus: { en: 'Active Recovery', ar: 'تعافي نشط' }, exercises: [], tips: [], recipes: [] });
    
    // Day 7: Rest
    days.push({ dayName: { en: 'Day 7', ar: 'الأحد' }, focus: { en: 'Rest', ar: 'راحة' }, exercises: [], tips: [], recipes: [] });
  }
  else if (splitType === 'flexibility') {
    // 3 Days Stretching
    const muscleGroups = ['Legs', 'Back', 'Shoulders'];
    days.push(generateWorkoutDay('Day 1', 'اليوم 1', 'Full Body Mobility', 'مرونة كامل الجسم', muscleGroups, injury, goal));
    days.push({ dayName: { en: 'Day 2', ar: 'اليوم 2' }, focus: { en: 'Rest', ar: 'راحة' }, exercises: [], tips: [], recipes: [] });
    days.push(generateWorkoutDay('Day 3', 'اليوم 3', 'Dynamic Stretching', 'إطالات ديناميكية', muscleGroups, injury, goal));
    days.push({ dayName: { en: 'Day 4', ar: 'اليوم 4' }, focus: { en: 'Rest', ar: 'راحة' }, exercises: [], tips: [], recipes: [] });
    days.push(generateWorkoutDay('Day 5', 'اليوم 5', 'Deep Static Stretching', 'إطالات ثبات عميقة', muscleGroups, injury, goal));
    days.push({ dayName: { en: 'Day 6', ar: 'اليوم 6' }, focus: { en: 'Light Activity', ar: 'نشاط خفيف' }, exercises: [], tips: [], recipes: [] });
    days.push({ dayName: { en: 'Day 7', ar: 'اليوم 7' }, focus: { en: 'Rest', ar: 'راحة' }, exercises: [], tips: [], recipes: [] });
  }
  else if (splitType === 'full_body') {
    // 3 Days Full Body (Mon/Wed/Fri style)
    const muscleGroups = ['Legs', 'Chest', 'Back', 'Shoulders', 'Core'];
    days.push(generateWorkoutDay('Day 1', 'اليوم 1', 'Full Body A', 'جسم كامل أ', muscleGroups, injury, goal));
    days.push({ dayName: { en: 'Day 2', ar: 'اليوم 2' }, focus: { en: 'Rest & Recovery', ar: 'راحة واستشفاء' }, exercises: [], tips: [], recipes: [] });
    days.push(generateWorkoutDay('Day 3', 'اليوم 3', 'Full Body B', 'جسم كامل ب', muscleGroups, injury, goal));
    days.push({ dayName: { en: 'Day 4', ar: 'اليوم 4' }, focus: { en: 'Rest & Recovery', ar: 'راحة واستشفاء' }, exercises: [], tips: [], recipes: [] });
    days.push(generateWorkoutDay('Day 5', 'اليوم 5', 'Full Body C', 'جسم كامل ج', muscleGroups, injury, goal));
    days.push({ dayName: { en: 'Day 6', ar: 'اليوم 6' }, focus: { en: 'Active Recovery', ar: 'تعافي نشط' }, exercises: [], tips: [], recipes: [] });
    days.push({ dayName: { en: 'Day 7', ar: 'اليوم 7' }, focus: { en: 'Rest', ar: 'راحة' }, exercises: [], tips: [], recipes: [] });
  } 
  else if (splitType === 'upper_lower') {
    // 4 Days Upper/Lower
    days.push(generateWorkoutDay('Day 1', 'اليوم 1', 'Upper Body Power', 'جسم علوي قوة', ['Chest', 'Back', 'Shoulders', 'Arms'], injury, goal));
    days.push(generateWorkoutDay('Day 2', 'اليوم 2', 'Lower Body Power', 'جسم سفلي قوة', ['Legs', 'Core'], injury, goal));
    days.push({ dayName: { en: 'Day 3', ar: 'اليوم 3' }, focus: { en: 'Rest', ar: 'راحة' }, exercises: [], tips: [], recipes: [] });
    days.push(generateWorkoutDay('Day 4', 'اليوم 4', 'Upper Body Hypertrophy', 'جسم علوي ضخامة', ['Chest', 'Back', 'Shoulders', 'Arms'], injury, goal));
    days.push(generateWorkoutDay('Day 5', 'اليوم 5', 'Lower Body Hypertrophy', 'جسم سفلي ضخامة', ['Legs', 'Core'], injury, goal));
    days.push({ dayName: { en: 'Day 6', ar: 'اليوم 6' }, focus: { en: 'Active Recovery', ar: 'تعافي نشط' }, exercises: [], tips: [], recipes: [] });
    days.push({ dayName: { en: 'Day 7', ar: 'اليوم 7' }, focus: { en: 'Rest', ar: 'راحة' }, exercises: [], tips: [], recipes: [] });
  }
  else {
    // PPL (Push Pull Legs) - 6 Days
    days.push(generateWorkoutDay('Day 1', 'اليوم 1', 'Push (Chest/Shoulders/Triceps)', 'دفع (صدر/أكتاف/تراي)', ['Chest', 'Shoulders', 'Arms'], injury, goal));
    days.push(generateWorkoutDay('Day 2', 'اليوم 2', 'Pull (Back/Biceps)', 'سحب (ظهر/باي)', ['Back', 'Arms'], injury, goal));
    days.push(generateWorkoutDay('Day 3', 'اليوم 3', 'Legs', 'أرجل', ['Legs', 'Core'], injury, goal));
    days.push(generateWorkoutDay('Day 4', 'اليوم 4', 'Push Hypertrophy', 'دفع ضخامة', ['Chest', 'Shoulders', 'Arms'], injury, goal));
    days.push(generateWorkoutDay('Day 5', 'اليوم 5', 'Pull Hypertrophy', 'سحب ضخامة', ['Back', 'Arms'], injury, goal));
    days.push(generateWorkoutDay('Day 6', 'اليوم 6', 'Legs Hypertrophy', 'أرجل ضخامة', ['Legs', 'Core'], injury, goal));
    days.push({ dayName: { en: 'Day 7', ar: 'اليوم 7' }, focus: { en: 'Rest', ar: 'راحة' }, exercises: [], tips: [], recipes: [] });
  }

  // 3. POST-PROCESSING: ADD TIPS
  days.forEach((day, index) => {
    if (day.exercises.length > 0) {
      // Injury Tip
      if (injury !== 'none') {
        day.tips.push({
          en: `⚠️ Note: Routine adjusted for ${injury} injury. Used safe alternatives.`,
          ar: `⚠️ ملاحظة: تم تعديل الروتين لإصابة ${injury === 'back' ? 'الظهر' : injury === 'knee' ? 'الركبة' : injury === 'shoulder' ? 'الكتف' : injury === 'elbow' ? 'الكوع' : 'المعصم'}. تم استخدام بدائل آمنة.`
        });
      }
      
      // Goal Tip
      if (goal === 'queen_shape') {
        day.tips.push({ en: 'Focus on form and glute activation.', ar: 'ركزي على الأداء الصحيح وتفعيل عضلات الأرداف.' });
        if (index === 4) { // Cardio Day
           day.tips.push({ en: 'Finish with 30 mins brisk walking.', ar: 'انهي التمرين بـ 30 دقيقة مشي سريع.' });
        }
      } else if (goal === 'calisthenics') {
        day.tips.push({ en: 'Focus on perfect form and control.', ar: 'ركز على الشكل المثالي والتحكم في الحركة.' });
      } else if (goal === 'powerlifting') {
        day.tips.push({ en: 'Long rests (3-5 mins) are key for max strength.', ar: 'الراحة الطويلة (3-5 دقائق) ضرورية للقوة القصوى.' });
      } else if (goal === 'weight_loss' || goal === 'cutting') {
        day.tips.push({ en: 'Keep rest periods short to maximize calorie burn.', ar: 'حافظ على فترات راحة قصيرة لزيادة حرق السعرات.' });
      } else if (goal === 'muscle_gain' || goal === 'bulking') {
        day.tips.push({ en: 'Focus on time under tension and progressive overload.', ar: 'ركز على الوقت تحت الضغط والزيادة التدريجية في الأوزان.' });
      } else {
        day.tips.push({ en: 'Maintain consistent pace and focus on breathing.', ar: 'حافظ على وتيرة ثابتة وركز على التنفس.' });
      }
    } else {
      // Rest Day Tips
      day.tips.push({ en: 'Drink plenty of water and prioritize sleep.', ar: 'اشرب الكثير من الماء واجعل النوم أولوية.' });
      if (goal === 'bulking') {
        day.tips.push({ en: 'Eat ample protein even on rest days.', ar: 'تناول كمية كافية من البروتين حتى في أيام الراحة.' });
      }
    }
  });

  return days;
};