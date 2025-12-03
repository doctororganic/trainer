import { Exercise, Recipe } from './types';

// --- MASSIVE EXERCISE DATABASE ---
export const EXERCISE_LIBRARY: Exercise[] = [
  // --- CHEST ---
  {
    id: 'bench_press',
    name: { en: 'Barbell Bench Press', ar: 'ضغط الصدر بالبار' },
    muscleGroup: 'Chest',
    type: 'compound',
    sets: 4, reps: '8-10', rest: '90',
    instructions: { en: 'Lie on bench, eyes under bar. Grip slightly wider than shoulders. Lower to mid-chest, press up explosively.', ar: 'استلقِ على المقعد، العينين تحت البار. امسك البار أوسع قليلاً من الكتفين. اخفض لمنتصف الصدر، اضغط لأعلى بقوة.' },
    commonMistakes: { en: 'Bouncing bar off chest, flaring elbows too wide.', ar: 'ارتداد البار عن الصدر، فتح الكوعين للخارج كثيراً.' },
    avoidIfInjury: ['shoulder', 'wrist']
  },
  {
    id: 'incline_dumbbell_press',
    name: { en: 'Incline Dumbbell Press', ar: 'ضغط الدمبل المائل' },
    muscleGroup: 'Chest',
    type: 'compound',
    sets: 3, reps: '10-12', rest: '60',
    instructions: { en: 'Set bench to 30-45°. Press dumbbells up until arms extended. Keep wrists straight.', ar: 'اضبط المقعد بزاوية 30-45 درجة. اضغط الدمبل لأعلى حتى تستقيم الذراعين. حافظ على استقامة المعصم.' },
    commonMistakes: { en: 'Arching back excessively, dropping elbows too low.', ar: 'تقوس الظهر بشكل مفرط، نزول الكوعين لمستوى منخفض جداً.' },
    avoidIfInjury: ['shoulder']
  },
  {
    id: 'dumbbell_fly',
    name: { en: 'Dumbbell Flys', ar: 'تمرين تفتيح الصدر' },
    muscleGroup: 'Chest',
    type: 'isolation',
    sets: 3, reps: '12-15', rest: '60',
    instructions: { en: 'Lie flat, slight bend in elbows, lower arms to sides in a wide arc.', ar: 'استلقِ، انحناء بسيط في الكوع، انزل الذراعين للجانب في قوس واسع.' },
    commonMistakes: { en: 'Going too deep putting stress on shoulders.', ar: 'النزول لعمق كبير جداً مما يضغط على الأكتاف.' },
    avoidIfInjury: ['shoulder']
  },
  {
    id: 'pushup',
    name: { en: 'Push-ups', ar: 'تمرين الضغط' },
    muscleGroup: 'Chest',
    type: 'compound',
    sets: 3, reps: 'Failure', rest: '60',
    instructions: { en: 'Hands shoulder width, body straight from head to heels. Lower chest to floor.', ar: 'اليدين بعرض الكتف، الجسم مستقيم من الرأس للكعب. اخفض الصدر للأرض.' },
    commonMistakes: { en: 'Sagging hips, incomplete range of motion.', ar: 'تدلي الورك، مدى حركي غير كامل.' },
    avoidIfInjury: ['wrist', 'shoulder']
  },
  {
    id: 'modified_pushup',
    name: { en: 'Modified Push-ups (Knees)', ar: 'تمرين الضغط المعدل (على الركبة)' },
    muscleGroup: 'Chest',
    type: 'compound',
    sets: 3, reps: '12', rest: '60',
    instructions: { en: 'Perform push-up with knees on floor. Keep back straight.', ar: 'قم بتمرين الضغط مع وضع الركبتين على الأرض. حافظ على استقامة الظهر.' },
    commonMistakes: { en: 'Hips sagging.', ar: 'تدلي الحوض.' },
    avoidIfInjury: ['wrist', 'shoulder']
  },
  {
    id: 'floor_press',
    name: { en: 'Floor Press', ar: 'ضغط الصدر الأرضي' },
    muscleGroup: 'Chest',
    type: 'compound',
    sets: 4, reps: '6-8', rest: '120',
    instructions: { en: 'Lie on floor with dumbbells or bar. Lower until triceps touch floor, then press.', ar: 'استلقِ على الأرض. انزل بالوزن حتى تلامس التراي الأرض، ثم اضغط.' },
    commonMistakes: { en: 'Bouncing elbows off floor.', ar: 'ارتطام الكوع بالأرض بقوة.' },
    avoidIfInjury: ['shoulder']
  },

  // --- BACK ---
  {
    id: 'deadlift',
    name: { en: 'Conventional Deadlift', ar: 'الرفعة الميتة التقليدية' },
    muscleGroup: 'Back',
    type: 'compound',
    sets: 3, reps: '5', rest: '180',
    instructions: { en: 'Feet hip-width. Hinge hips, grip bar. Drive through heels, keeping back flat.', ar: 'القدمين بعرض الحوض. انحني، امسك البار. ادفع بالكعب مع الحفاظ على ظهر مستقيم.' },
    commonMistakes: { en: 'Rounding the lower back (cat back).', ar: 'تحدب أسفل الظهر.' },
    avoidIfInjury: ['back']
  },
  {
    id: 'deficit_deadlift',
    name: { en: 'Deficit Deadlift', ar: 'رفعة ميتة (بعجز)' },
    muscleGroup: 'Back',
    type: 'compound',
    sets: 3, reps: '5', rest: '180',
    instructions: { en: 'Stand on a plate (1-2 inches). Perform deadlift with increased range of motion.', ar: 'قف على قرص وزن (1-2 بوصة). قم بالرفعة الميتة بمدى حركي أكبر.' },
    commonMistakes: { en: 'Rounding back due to increased depth.', ar: 'تحدب الظهر بسبب العمق الزائد.' },
    avoidIfInjury: ['back']
  },
  {
    id: 'pullup',
    name: { en: 'Pull-ups', ar: 'تمرين العقلة' },
    muscleGroup: 'Back',
    type: 'compound',
    sets: 3, reps: 'Max', rest: '90',
    instructions: { en: 'Hang from bar, palms away. Pull chest to bar squeezing lats.', ar: 'تعلق بالبار، اليدين للأمام. اسحب الصدر للبار مع عصر عضلات الظهر.' },
    commonMistakes: { en: 'Using momentum (kipping).', ar: 'استخدام الزخم (الأرجحة).' },
    avoidIfInjury: ['shoulder']
  },
  {
    id: 'dumbbell_row',
    name: { en: 'Dumbbell Row', ar: 'تجديف بالدمبل' },
    muscleGroup: 'Back',
    type: 'compound',
    sets: 3, reps: '12', rest: '60',
    instructions: { en: 'Knee on bench. Pull dumbbell to hip.', ar: 'ركبة على البنش. اسحب الدمبل للورك.' },
    commonMistakes: { en: 'Rounding back, rotating torso.', ar: 'تحدب الظهر، دوران الجذع.' },
    avoidIfInjury: ['back']
  },
  {
    id: 't_bar_row',
    name: { en: 'T-Bar Row', ar: 'تجديف T-Bar' },
    muscleGroup: 'Back',
    type: 'compound',
    sets: 4, reps: '8-12', rest: '90',
    instructions: { en: 'Straddle bar, hinge forward 45°. Pull handle to chest.', ar: 'قف فوق البار، انحني 45 درجة. اسحب المقبض للصدر.' },
    commonMistakes: { en: 'Standing up too straight.', ar: 'الوقوف باستقامة شديدة (يقلل الحمل على الظهر).' },
    avoidIfInjury: ['back']
  },
  {
    id: 'lat_pulldown',
    name: { en: 'Lat Pulldown', ar: 'سحب ظهر عالي' },
    muscleGroup: 'Back',
    type: 'isolation',
    sets: 3, reps: '12', rest: '60',
    instructions: { en: 'Sit secure. Pull bar down to upper chest while leaning back slightly.', ar: 'اجلس بثبات. اسحب البار لأعلى الصدر مع ميل خفيف للخلف.' },
    commonMistakes: { en: 'Pulling behind the neck.', ar: 'السحب خلف الرقبة.' },
    avoidIfInjury: ['shoulder']
  },

  // --- LEGS ---
  {
    id: 'squat',
    name: { en: 'Barbell Back Squat', ar: 'سكوات خلفي بالبار' },
    muscleGroup: 'Legs',
    type: 'compound',
    sets: 4, reps: '6-8', rest: '120',
    instructions: { en: 'Bar on traps. Break at hips and knees. Go to parallel or lower.', ar: 'البار على الترابيس. اثنِ الركبة والحوض. انزل للتوازي أو أقل.' },
    commonMistakes: { en: 'Knees caving inward, lifting heels.', ar: 'انحناء الركب للداخل، رفع الكعبين.' },
    avoidIfInjury: ['knee', 'back']
  },
  {
    id: 'dumbbell_squat',
    name: { en: 'Dumbbell Squats', ar: 'قرفصاء بالدمبل' },
    muscleGroup: 'Legs',
    type: 'compound',
    sets: 3, reps: '12-15', rest: '60',
    instructions: { en: 'Hold dumbbells at sides. Squat down.', ar: 'امسك الدمبل جانبياً. انزل قرفصاء.' },
    commonMistakes: { en: 'Bending forward too much.', ar: 'الانحناء للأمام كثيراً.' },
    avoidIfInjury: ['back']
  },
  {
    id: 'goblet_squat',
    name: { en: 'Goblet Squat', ar: 'قرفصاء الكأس' },
    muscleGroup: 'Legs',
    type: 'compound',
    sets: 3, reps: '12-15', rest: '60',
    instructions: { en: 'Hold dumbbell at chest. Squat down keeping chest up and elbows inside knees.', ar: 'امسك الدمبل عند الصدر. انزل مع رفع الصدر وجعل الكوع داخل الركبة.' },
    commonMistakes: { en: 'Rounding upper back.', ar: 'تحدب الظهر العلوي.' },
    avoidIfInjury: ['back']
  },
  {
    id: 'hip_thrust',
    name: { en: 'Barbell Hip Thrust', ar: 'دفع الحوض بالبار' },
    muscleGroup: 'Legs',
    type: 'compound',
    sets: 4, reps: '10-12', rest: '90',
    instructions: { en: 'Back on bench, bar on hips. Drive hips up squeezing glutes.', ar: 'الظهر على البنش، البار على الحوض. ادفع الحوض لأعلى واعصر المؤخرة.' },
    commonMistakes: { en: 'Hyperextending lower back.', ar: 'تقوس أسفل الظهر بشكل مفرط.' },
    avoidIfInjury: ['back']
  },
  {
    id: 'glute_bridge',
    name: { en: 'Glute Bridges', ar: 'جسر المؤخرة' },
    muscleGroup: 'Legs',
    type: 'isolation',
    sets: 3, reps: '15', rest: '45',
    instructions: { en: 'Lie on back, knees bent. Lift hips.', ar: 'استلقِ على الظهر، الركب مثنية. ارفع الحوض.' },
    commonMistakes: { en: 'Using hamstrings instead of glutes.', ar: 'استخدام الخلفيات بدلاً من المؤخرة.' },
    avoidIfInjury: []
  },
  {
    id: 'bulgarian_split_squat',
    name: { en: 'Bulgarian Split Squat', ar: 'سكوات بلغاري' },
    muscleGroup: 'Legs',
    type: 'compound',
    sets: 3, reps: '10/leg', rest: '90',
    instructions: { en: 'Rear foot on bench. Lower hips until front thigh is parallel.', ar: 'القدم الخلفية على البنش. اخفض الحوض حتى يوازي الفخذ الأمامي الأرض.' },
    commonMistakes: { en: 'Front knee passing toes excessively.', ar: 'تجاوز الركبة الأمامية للأصابع بشكل مفرط.' },
    avoidIfInjury: ['knee']
  },
  {
    id: 'lunges',
    name: { en: 'Forward Lunges', ar: 'اندفاعات أمامية' },
    muscleGroup: 'Legs',
    type: 'compound',
    sets: 3, reps: '12', rest: '60',
    instructions: { en: 'Step forward, lower hips.', ar: 'خطوة للأمام، اخفض الحوض.' },
    commonMistakes: { en: 'Knee touching floor hard.', ar: 'اصطدام الركبة بالأرض بقوة.' },
    avoidIfInjury: ['knee']
  },
  {
    id: 'side_lunges',
    name: { en: 'Side Lunges', ar: 'اندفاعات جانبية' },
    muscleGroup: 'Legs',
    type: 'compound',
    sets: 3, reps: '10', rest: '60',
    instructions: { en: 'Step wide to side, squat on one leg.', ar: 'خطوة واسعة للجانب، انزل على رجل واحدة.' },
    commonMistakes: { en: 'Bending the straight leg.', ar: 'ثني الرجل المستقيمة.' },
    avoidIfInjury: ['knee']
  },
  {
    id: 'donkey_kicks',
    name: { en: 'Donkey Kicks', ar: 'تمرين ركل الحمار' },
    muscleGroup: 'Legs',
    type: 'isolation',
    sets: 3, reps: '15', rest: '45',
    instructions: { en: 'On all fours, kick leg back and up.', ar: 'على الأربع، اركل الرجل للخلف ولأعلى.' },
    commonMistakes: { en: 'Arching back.', ar: 'تقوس الظهر.' },
    avoidIfInjury: []
  },
  {
    id: 'abductor_machine',
    name: { en: 'Abductor Machine', ar: 'جهاز تباعد الفخذين' },
    muscleGroup: 'Legs',
    type: 'isolation',
    sets: 3, reps: '15', rest: '60',
    instructions: { en: 'Push legs outward against resistance.', ar: 'ادفع الأرجل للخارج ضد المقاومة.' },
    commonMistakes: { en: 'Using momentum.', ar: 'استخدام الزخم.' },
    avoidIfInjury: []
  },
  {
    id: 'romanian_deadlift',
    name: { en: 'Romanian Deadlift', ar: 'الرفعة الميتة الرومانية' },
    muscleGroup: 'Legs',
    type: 'compound',
    sets: 3, reps: '10-12', rest: '90',
    instructions: { en: 'Slight knee bend. Hinge at hips pushing butt back. Lower bar to shins.', ar: 'انحناء بسيط للركبة. انحني من الحوض وادفع المؤخرة للخلف. انزل البار للساق.' },
    commonMistakes: { en: 'Rounding back, bending knees too much.', ar: 'تحدب الظهر، ثني الركبة كثيراً.' },
    avoidIfInjury: ['back']
  },

  // --- SHOULDERS ---
  {
    id: 'overhead_press',
    name: { en: 'Military Press', ar: 'ضغط عسكري واقف' },
    muscleGroup: 'Shoulders',
    type: 'compound',
    sets: 4, reps: '8', rest: '90',
    instructions: { en: 'Stand tall. Press bar from collarbone to overhead. Keep core tight.', ar: 'قف باستقامة. ادفع البار من الترقوة لفوق الرأس. شد البطن.' },
    commonMistakes: { en: 'Leaning back to cheat.', ar: 'الميل للخلف للغش.' },
    avoidIfInjury: ['shoulder', 'back']
  },
  {
    id: 'lateral_raise',
    name: { en: 'Dumbbell Lateral Raise', ar: 'رفرفة جانبي' },
    muscleGroup: 'Shoulders',
    type: 'isolation',
    sets: 3, reps: '15', rest: '45',
    instructions: { en: 'Lift dumbbells to sides until shoulder height. Lead with elbows.', ar: 'ارفع الدمبل للجانب حتى مستوى الكتف. قد الحركة بالكوع.' },
    commonMistakes: { en: 'Using momentum/swinging.', ar: 'استخدام الزخم/الأرجحة.' },
    avoidIfInjury: ['shoulder']
  },
  {
    id: 'face_pull',
    name: { en: 'Face Pulls', ar: 'سحب للوجه' },
    muscleGroup: 'Shoulders',
    type: 'isolation',
    sets: 3, reps: '15-20', rest: '60',
    instructions: { en: 'Pull rope to forehead, keeping elbows high and rotating externally.', ar: 'اسحب الحبل للجبهة، مع رفع الكوع وتدوير الكتف للخارج.' },
    commonMistakes: { en: 'Pulling to chest instead of face.', ar: 'السحب للصدر بدلاً من الوجه.' },
    avoidIfInjury: []
  },

  // --- ARMS ---
  {
    id: 'hammer_curl',
    name: { en: 'Hammer Curls', ar: 'باي المطرقة' },
    muscleGroup: 'Arms',
    type: 'isolation',
    sets: 3, reps: '12', rest: '60',
    instructions: { en: 'Hold dumbbells with neutral grip (palms facing). Curl up.', ar: 'امسك الدمبل بقبضة محايدة (باطن اليد للداخل). ارفع لأعلى.' },
    commonMistakes: { en: 'Swinging the weight.', ar: 'أرجحة الوزن.' },
    avoidIfInjury: []
  },
  {
    id: 'tricep_dips_bench',
    name: { en: 'Bench Dips', ar: 'متوازي بنش' },
    muscleGroup: 'Arms',
    type: 'isolation',
    sets: 3, reps: '12', rest: '60',
    instructions: { en: 'Hands on bench behind you. Lower hips.', ar: 'اليدين على بنش خلفك. اخفض الحوض.' },
    commonMistakes: { en: 'Shoulders shrugging.', ar: 'رفع الأكتاف.' },
    avoidIfInjury: ['shoulder']
  },
  {
    id: 'skull_crusher',
    name: { en: 'Skull Crushers', ar: 'كسارة الجمجمة (تراي)' },
    muscleGroup: 'Arms',
    type: 'isolation',
    sets: 3, reps: '10-12', rest: '60',
    instructions: { en: 'Lie on bench. Lower EZ bar to forehead bending only at elbows.', ar: 'استلقِ. انزل بار EZ للجبهة بثني الكوع فقط.' },
    commonMistakes: { en: 'Flaring elbows out.', ar: 'فتح الكوعين للخارج.' },
    avoidIfInjury: ['elbow']
  },
  {
    id: 'dips',
    name: { en: 'Tricep Dips', ar: 'متوازي (تراي)' },
    muscleGroup: 'Arms',
    type: 'compound',
    sets: 3, reps: '10-15', rest: '90',
    instructions: { en: 'Keep body upright. Lower until elbows at 90 degrees.', ar: 'حافظ على استقامة الجسم. انزل حتى زاوية 90 للكوع.' },
    commonMistakes: { en: 'Shoulders rolling forward.', ar: 'دوران الكتف للأمام.' },
    avoidIfInjury: ['shoulder']
  },

  // --- CORE & CARDIO ---
  {
    id: 'plank',
    name: { en: 'Plank', ar: 'البلانك' },
    muscleGroup: 'Core',
    type: 'isolation',
    sets: 3, reps: '60s', rest: '60',
    instructions: { en: 'Hold straight body position on forearms.', ar: 'ثبت الجسم مستقيماً على الساعدين.' },
    commonMistakes: { en: 'Hips too high or sagging.', ar: 'الحوض عالي جداً أو متدلي.' },
    avoidIfInjury: ['back']
  },
  {
    id: 'butterfly_kicks',
    name: { en: 'Butterfly Kicks', ar: 'تمرين الفراشة' },
    muscleGroup: 'Core',
    type: 'isolation',
    sets: 3, reps: '20', rest: '30',
    instructions: { en: 'Lie on back, flutter legs.', ar: 'استلقِ على الظهر، حرك الأرجل بسرعة.' },
    commonMistakes: { en: 'Arching back.', ar: 'تقوس الظهر.' },
    avoidIfInjury: ['back']
  },
  {
    id: 'bicycle_crunches',
    name: { en: 'Bicycle Crunches', ar: 'تمرين الدراجة الهوائية' },
    muscleGroup: 'Core',
    type: 'isolation',
    sets: 3, reps: '20', rest: '30',
    instructions: { en: 'Elbow to opposite knee.', ar: 'الكوع للركبة المعاكسة.' },
    commonMistakes: { en: 'Pulling neck.', ar: 'سحب الرقبة.' },
    avoidIfInjury: ['back']
  },
  {
    id: 'boat_pose',
    name: { en: 'Boat Pose', ar: 'تمرين القارب' },
    muscleGroup: 'Core',
    type: 'isolation',
    sets: 3, reps: '30s', rest: '45',
    instructions: { en: 'Balance on sit bones, legs and torso up.', ar: 'توازن على المقعدة، ارفع الجذع والأرجل.' },
    commonMistakes: { en: 'Rounding back.', ar: 'تحدب الظهر.' },
    avoidIfInjury: ['back']
  },
  {
    id: 'russian_twist',
    name: { en: 'Russian Twist', ar: 'تويست روسي' },
    muscleGroup: 'Core',
    type: 'isolation',
    sets: 3, reps: '20', rest: '45',
    instructions: { en: 'Twist torso side to side.', ar: 'لف الجذع من جانب لآخر.' },
    commonMistakes: { en: 'Rounding back.', ar: 'تحدب الظهر.' },
    avoidIfInjury: ['back']
  },
  {
    id: 'jumping_jacks',
    name: { en: 'Jumping Jacks', ar: 'قفز جاك' },
    muscleGroup: 'Cardio',
    type: 'plyometric',
    sets: 3, reps: '30', rest: '30',
    instructions: { en: 'Jump feet apart, hands overhead.', ar: 'اقفز مع فتح القدمين ورفع اليدين.' },
    commonMistakes: { en: 'Landing heavy.', ar: 'الهبوط بقوة.' },
    avoidIfInjury: ['knee']
  },
  {
    id: 'jump_rope',
    name: { en: 'Jump Rope', ar: 'نط الحبل' },
    muscleGroup: 'Cardio',
    type: 'plyometric',
    sets: 3, reps: '60s', rest: '30',
    instructions: { en: 'Jump over rope.', ar: 'اقفز فوق الحبل.' },
    commonMistakes: { en: 'Jumping too high.', ar: 'القفز عالياً جداً.' },
    avoidIfInjury: ['knee']
  },
  {
    id: 'hanging_leg_raise',
    name: { en: 'Hanging Leg Raises', ar: 'رفع الأرجل معلقاً' },
    muscleGroup: 'Core',
    type: 'isolation',
    sets: 3, reps: '10-15', rest: '60',
    instructions: { en: 'Hang from bar. Lift legs to 90 degrees without swinging.', ar: 'تعلق بالبار. ارفع الرجل لزاوية 90 بدون أرجحة.' },
    commonMistakes: { en: 'Using momentum.', ar: 'استخدام قوة الدفع.' },
    avoidIfInjury: ['shoulder']
  },
  {
    id: 'burpees',
    name: { en: 'Burpees', ar: 'تمرين بيربي' },
    muscleGroup: 'Full Body',
    type: 'plyometric',
    sets: 3, reps: '15', rest: '60',
    instructions: { en: 'Squat, plank, pushup, jump.', ar: 'سكوات، بلانك، ضغط، قفز.' },
    commonMistakes: { en: 'Poor form due to fatigue.', ar: 'شكل خاطئ بسبب التعب.' },
    avoidIfInjury: ['wrist', 'back', 'knee']
  },

  // --- CALISTHENICS & SPECIAL ---
  {
    id: 'muscle_up',
    name: { en: 'Muscle Up', ar: 'ماسل أب' },
    muscleGroup: 'Full Body',
    type: 'compound',
    sets: 3, reps: 'Failure', rest: '120',
    instructions: { en: 'Explosive pullup transitioning into a dip.', ar: 'سحب انفجاري يتحول لمتوازي.' },
    commonMistakes: { en: 'Chicken winging (one arm first).', ar: 'دخول ذراع قبل الآخر.' },
    avoidIfInjury: ['shoulder', 'wrist', 'elbow']
  },
  {
    id: 'pistol_squat',
    name: { en: 'Pistol Squat', ar: 'سكوات رجل واحدة' },
    muscleGroup: 'Legs',
    type: 'compound',
    sets: 3, reps: '5/leg', rest: '90',
    instructions: { en: 'Squat on one leg, other leg extended forward.', ar: 'انزل على رجل واحدة، والأخرى مفرودة للأمام.' },
    commonMistakes: { en: 'Heel lifting off floor.', ar: 'رفع الكعب عن الأرض.' },
    avoidIfInjury: ['knee']
  },
  {
    id: 'nordic_curl',
    name: { en: 'Nordic Hamstring Curl', ar: 'نورديك كيرل' },
    muscleGroup: 'Legs',
    type: 'isolation',
    sets: 3, reps: '5-8', rest: '120',
    instructions: { en: 'Kneel, anchor feet. Lower torso slowly controlling with hamstrings.', ar: 'اجثو، ثبت القدمين. انزل بالجذع ببطء مع التحكم بالخلفيات.' },
    commonMistakes: { en: 'Bending at hips.', ar: 'الانحناء من الحوض.' },
    avoidIfInjury: ['knee']
  }
];

// --- ARABIAN RECIPE DATABASE ---
export const RECIPES: Recipe[] = [
  {
    id: 'kofta',
    name: { en: 'Grilled Chicken Kofta (Cutting)', ar: 'كفتة الدجاج المشوية (تنشيف)' },
    type: 'cutting',
    ingredients: {
      en: ['150g Lean Chicken Breast', '1 Onion', 'Fresh Parsley', '7-Spice Blend', '1 Egg White'],
      ar: ['150 جم صدر دجاج مفروم', 'بصلة مبشورة', 'بقدونس طازج', 'بهارات سبعة', 'بياض بيضة']
    },
    macros: { calories: 240, protein: '40g', carbs: '5g', fat: '6g' },
    prepTime: 25,
    instructions: {
      en: ['Mix minced chicken, onion, garlic, and spices.', 'Bind with egg white.', 'Form into oval shapes.', 'Grill for 15 mins.', 'Serve with lemon.'],
      ar: ['اخلط الدجاج المفروم والبصل والثوم والبهارات.', 'اضف بياض البيض للتماسك.', 'شكلها كأصابع.', 'اشوي لمدة 15 دقيقة.', 'قدم مع الليمون.']
    }
  },
  {
    id: 'arabian_fish',
    name: { en: 'Arabian Spiced Fish', ar: 'سمك بالبهارات العربية' },
    type: 'cutting',
    ingredients: {
      en: ['200g White Fish (Hamour)', 'Zucchini', 'Bell Peppers', 'Turmeric', 'Cardamom', 'Lemon Juice'],
      ar: ['200 جم سمك هامور فيليه', 'كوسا', 'فلفل ألوان', 'كركم', 'هيل', 'عصير ليمون']
    },
    macros: { calories: 260, protein: '36g', carbs: '12g', fat: '7g' },
    prepTime: 30,
    instructions: {
      en: ['Marinate fish with turmeric, cardamom, lemon.', 'Sauté veggies in non-stick pan.', 'Pan sear fish 5 mins each side.', 'Combine and serve.'],
      ar: ['تبل السمك بالكركم والهيل والليمون.', 'شوح الخضار في مقلاة غير لاصقة.', 'اقلي السمك 5 دقائق لكل جهة.', 'اخلط وقدم.']
    }
  },
  {
    id: 'cauliflower_rice',
    name: { en: 'Spiced Cauliflower Rice', ar: 'أرز القرنبيط المبهر' },
    type: 'cutting',
    ingredients: {
      en: ['Cauliflower Head', 'Cinnamon Stick', 'Turmeric Powder', 'Olive Oil Spray'],
      ar: ['رأس قرنبيط', 'عود قرفة', 'كركم بودرة', 'بخاخ زيت زيتون']
    },
    macros: { calories: 80, protein: '4g', carbs: '10g', fat: '2g' },
    prepTime: 15,
    instructions: {
      en: ['Pulse cauliflower in processor.', 'Heat pan with spray.', 'Sauté with spices for 5-7 mins until tender.', 'Season with salt.'],
      ar: ['افرم القرنبيط في الخلاط.', 'سخن المقلاة.', 'قلب مع البهارات 5-7 دقائق حتى يطرى.', 'تبل بالملح.']
    }
  },
  {
    id: 'lamb_stew',
    name: { en: 'Lean Lamb Okra Stew (Bamya)', ar: 'بامية باللحم الضأن قليل الدسم' },
    type: 'bulking',
    ingredients: {
      en: ['200g Lean Lamb Leg', 'Okra (Bamya)', 'Tomato Paste', 'Garlic', 'Basmati Rice'],
      ar: ['200 جم فخذ ضأن قليل الدسم', 'بامية', 'معجون طماطم', 'ثوم', 'أرز بسمتي']
    },
    macros: { calories: 550, protein: '45g', carbs: '50g', fat: '18g' },
    prepTime: 45,
    instructions: {
      en: ['Boil lamb until tender.', 'Sauté garlic and tomato paste.', 'Add okra and lamb stock.', 'Simmer 20 mins.', 'Serve with rice.'],
      ar: ['اسلق اللحم حتى ينضج.', 'شوح الثوم والصلصة.', 'أضف البامية ومرقة اللحم.', 'اتركها تتسبك 20 دقيقة.', 'قدم مع الأرز.']
    }
  },
  {
    id: 'beef_kabsa',
    name: { en: 'Healthy Beef Kabsa', ar: 'كبسة لحم صحية' },
    type: 'bulking',
    ingredients: {
      en: ['200g Lean Beef Cubes', 'Basmati Rice', 'Kabsa Spice Mix', 'Carrots', 'Raisins (Optional)'],
      ar: ['200 جم مكعبات لحم بقري', 'أرز بسمتي', 'بهارات كبسة', 'جزر', 'زبيب (اختياري)']
    },
    macros: { calories: 700, protein: '45g', carbs: '80g', fat: '20g' },
    prepTime: 60,
    instructions: {
      en: ['Brown beef cubes.', 'Add water and Kabsa spices.', 'Simmer 45 mins.', 'Add rice and carrots.', 'Cook until rice is fluffy.'],
      ar: ['حمر اللحم.', 'أضف الماء وبهارات الكبسة.', 'اطبخ 45 دقيقة.', 'أضف الأرز والجزر.', 'اطبخ حتى ينضج الأرز.']
    }
  },
  {
    id: 'cucumber_yogurt',
    name: { en: 'Cucumber Yogurt Salad', ar: 'سلطة الزبادي بالخيار' },
    type: 'general',
    ingredients: {
      en: ['Low-fat Greek Yogurt', 'Cucumber', 'Dried Mint', 'Garlic Clove'],
      ar: ['زبادي يوناني قليل الدسم', 'خيار', 'نعناع مجفف', 'فص ثوم']
    },
    macros: { calories: 120, protein: '15g', carbs: '8g', fat: '2g' },
    prepTime: 5,
    instructions: {
      en: ['Dice cucumber.', 'Crush garlic.', 'Mix everything with yogurt.', 'Chill before serving.'],
      ar: ['قطع الخيار.', 'افرم الثوم.', 'اخلط الكل مع الزبادي.', 'بردها قبل التقديم.']
    }
  },
  {
    id: 'shish_tawook',
    name: { en: 'Shish Tawook', ar: 'شيش طاووق' },
    type: 'general',
    ingredients: {
      en: ['Chicken Breast Cubes', 'Yogurt', 'Garlic', 'Lemon Juice', 'Paprika', 'Oregano'],
      ar: ['مكعبات صدور دجاج', 'زبادي', 'ثوم', 'عصير ليمون', 'بابريكا', 'زعتر']
    },
    macros: { calories: 320, protein: '55g', carbs: '5g', fat: '8g' },
    prepTime: 30,
    instructions: {
      en: ['Marinate chicken in yogurt/spice mix for 2 hours.', 'Skewer.', 'Grill until charred and cooked through.'],
      ar: ['نقع الدجاج في التتبيلة ساعتين.', 'ضعه في الأسياخ.', 'اشوي حتى النضج.']
    }
  },
  {
    id: 'lentil_soup',
    name: { en: 'Arabian Lentil Soup', ar: 'شوربة عدس عربية' },
    type: 'vegan',
    ingredients: {
      en: ['Red Lentils', 'Onion', 'Carrot', 'Cumin', 'Lemon Wedge'],
      ar: ['عدس أحمر', 'بصل', 'جزر', 'كمون', 'شريحة ليمون']
    },
    macros: { calories: 250, protein: '18g', carbs: '40g', fat: '3g' },
    prepTime: 25,
    instructions: {
      en: ['Boil lentils and veggies in water.', 'Blend until smooth.', 'Season with cumin and salt.', 'Serve with lemon.'],
      ar: ['اسلق العدس والخضار.', 'اخلط في الخلاط.', 'تبل بالكمون والملح.', 'قدم مع الليمون.']
    }
  },
  {
    id: 'date_oat_smoothie',
    name: { en: 'Date & Oat Power Smoothie', ar: 'سموذي التمر والشوفان' },
    type: 'bulking',
    ingredients: {
      en: ['3 Dates', '50g Oats', '1 Scoop Protein', 'Milk', 'Peanut Butter'],
      ar: ['3 تمرات', '50 جم شوفان', 'مكيال بروتين', 'حليب', 'زبدة فول سوداني']
    },
    macros: { calories: 650, protein: '40g', carbs: '80g', fat: '18g' },
    prepTime: 5,
    instructions: {
      en: ['Remove date pits.', 'Blend all ingredients with ice.', 'Enjoy pre or post workout.'],
      ar: ['ازل النواة.', 'اخلط الكل مع الثلج.', 'تناوله قبل أو بعد التمرين.']
    }
  }
];