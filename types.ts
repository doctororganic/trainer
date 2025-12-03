export type Language = 'en' | 'ar';

export type GoalType = 'weight_loss' | 'muscle_gain' | 'endurance' | 'cutting' | 'bulking' | 'calisthenics' | 'powerlifting' | 'flexibility' | 'queen_shape';

export type InjuryType = 'none' | 'shoulder' | 'knee' | 'back' | 'wrist' | 'elbow';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  name: string;
  weight: number;
  height: number;
  age: number;
  goal: GoalType;
  injury: InjuryType;
  experience: ExperienceLevel;
  isSubscribed: boolean;
}

export interface Exercise {
  id: string;
  name: { en: string; ar: string };
  muscleGroup: string;
  sets: number | string;
  reps: string;
  rest: string; // in seconds
  instructions: { en: string; ar: string };
  commonMistakes: { en: string; ar: string };
  alternatives?: string[]; // IDs of alternative exercises
  avoidIfInjury?: InjuryType[];
  type?: 'compound' | 'isolation' | 'plyometric' | 'stretch';
  equipment?: string[];
  isCompleted?: boolean; // For checklist functionality
}

export interface Recipe {
  id: string;
  name: { en: string; ar: string };
  ingredients: { en: string[]; ar: string[] };
  macros: { calories: number; protein: string; carbs: string; fat: string };
  prepTime: number;
  instructions: { en: string[]; ar: string[] };
  type?: 'cutting' | 'bulking' | 'general' | 'vegan';
}

export interface DayPlan {
  dayName: { en: string; ar: string };
  focus: { en: string; ar: string };
  exercises: Exercise[];
  tips: { en: string; ar: string }[];
  recipes?: Recipe[];
}

export interface Supplement {
  id: string;
  name: { en: string; ar: string };
  image: string;
  description: { en: string; ar: string };
  dosage: { en: string; ar: string };
  requiresSubscription: boolean;
}