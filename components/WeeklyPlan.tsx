
import React, { useState, useEffect } from 'react';
import { DayPlan, Language, UserProfile } from '../types';
import { TEXTS } from '../constants';
import { ChevronDown, ChevronUp, AlertTriangle, Info, Utensils, Flame, CheckCircle, Circle, Timer, Dumbbell, ChefHat } from 'lucide-react';

interface Props {
  plan: DayPlan[];
  lang: Language;
  profile: UserProfile;
}

const WeeklyPlan: React.FC<Props> = ({ plan, lang, profile }) => {
  const t = TEXTS[lang];
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [timerActive, setTimerActive] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const toggleDay = (index: number) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  const toggleComplete = (dayIdx: number, exIdx: number) => {
    const key = `${dayIdx}-${exIdx}`;
    setCompletedExercises(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const startTimer = (key: string, duration: string) => {
    const seconds = parseInt(duration) || 60;
    setTimeLeft(seconds);
    setTimerActive(key);
  };

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) {
      if (timeLeft === 0 && timerActive) {
        setTimerActive(null);
      }
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  return (
    <div className="space-y-6">
      
      {/* Injury Alert */}
      {profile.injury !== 'none' && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-5 rounded-r-xl shadow-sm animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="bg-red-100 dark:bg-red-800 p-2 rounded-full">
              <AlertTriangle className="text-red-600 dark:text-red-200 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-red-800 dark:text-red-300 text-lg mb-1">{t.consultation}</h3>
              <p className="text-sm text-red-700 dark:text-red-200 leading-relaxed">
                {lang === 'en' 
                  ? `Optimized for ${profile.injury} injury. High-risk exercises replaced with safe alternatives. Consult a doctor before starting.`
                  : `تم تحسين الخطة لإصابة ${t.options[profile.injury]}. تم استبدال التمارين الخطرة ببدائل آمنة. استشر طبيباً.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Days List */}
      <div className="space-y-4">
        {plan.map((day, index) => (
          <div key={index} className="bg-white dark:bg-darkCard rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
            
            {/* Header */}
            <button
              onClick={() => toggleDay(index)}
              className={`w-full p-5 flex items-center justify-between transition-all ${
                expandedDay === index 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-darkCard hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-800 dark:text-gray-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ${
                  expandedDay === index ? 'bg-white/20 text-white backdrop-blur-sm' : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                }`}>
                  {index + 1}
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-xl tracking-tight">{day.dayName[lang]}</h3>
                  <p className={`text-sm font-medium ${expandedDay === index ? 'text-blue-100' : 'text-blue-600 dark:text-blue-400'}`}>
                    {day.focus[lang]}
                  </p>
                </div>
              </div>
              {expandedDay === index ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
            </button>

            {/* Content */}
            {expandedDay === index && (
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50">
                
                {/* Empty State */}
                {day.exercises.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-12 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                    <p className="font-medium text-lg">{lang === 'en' ? 'Rest & Recovery Day' : 'يوم راحة واستشفاء'}</p>
                    <p className="text-sm mt-2">{lang === 'en' ? 'Focus on hydration and stretching' : 'ركز على شرب الماء والإطالة'}</p>
                  </div>
                ) : (
                  <div className="grid gap-5">
                    {/* Exercise Cards */}
                    {day.exercises.map((ex, i) => {
                      const key = `${index}-${i}`;
                      const isCompleted = completedExercises[key];
                      const isTimerRunning = timerActive === key;

                      return (
                        <div key={i} className={`relative bg-white dark:bg-gray-800 p-5 rounded-xl border-l-4 shadow-sm transition-all duration-300 ${
                          isCompleted 
                            ? 'border-purple-500 opacity-80' 
                            : 'border-blue-500 hover:shadow-md'
                        }`}>
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-start gap-3">
                              <button onClick={() => toggleComplete(index, i)} className="mt-1 text-gray-300 hover:text-purple-500 transition-colors">
                                {isCompleted ? <CheckCircle className="w-7 h-7 text-purple-500" /> : <Circle className="w-7 h-7" />}
                              </button>
                              <div>
                                <h4 className={`font-bold text-lg md:text-xl leading-tight mb-1 ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-800 dark:text-white'}`}>
                                  {ex.name[lang]}
                                </h4>
                                <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-2 py-1 rounded-md font-medium">
                                  <Dumbbell className="w-3 h-3" /> {ex.muscleGroup}
                                </span>
                              </div>
                            </div>
                            
                            <button 
                              onClick={() => startTimer(key, ex.rest)}
                              disabled={isTimerRunning}
                              className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg border transition-all ${
                                isTimerRunning 
                                  ? 'bg-purple-600 text-white border-purple-600 animate-pulse' 
                                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-purple-400 hover:text-purple-500'
                              }`}
                            >
                              <Timer className="w-4 h-4" />
                              {isTimerRunning ? `${timeLeft}s` : t.startTimer}
                            </button>
                          </div>
                          
                          {/* Stats Grid */}
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-center border border-blue-100 dark:border-blue-800/50">
                              <span className="block text-xs uppercase tracking-wider text-blue-500 font-semibold mb-1">{t.sets}</span>
                              <span className="font-bold text-gray-800 dark:text-blue-100 text-lg">{ex.sets}</span>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg text-center border border-purple-100 dark:border-purple-800/50">
                              <span className="block text-xs uppercase tracking-wider text-purple-500 font-semibold mb-1">{t.reps}</span>
                              <span className="font-bold text-gray-800 dark:text-purple-100 text-lg">{ex.reps}</span>
                            </div>
                            <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg text-center border border-orange-100 dark:border-orange-800/50">
                              <span className="block text-xs uppercase tracking-wider text-orange-500 font-semibold mb-1">{t.rest}</span>
                              <span className="font-bold text-gray-800 dark:text-orange-100 text-lg">{ex.rest}s</span>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="space-y-3 text-sm bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                            <div className="flex gap-2">
                              <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
                              <p className="text-gray-700 dark:text-gray-300 leading-snug">{ex.instructions[lang]}</p>
                            </div>
                            <div className="flex gap-2">
                              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                              <p className="text-gray-600 dark:text-gray-400 italic leading-snug"><span className="font-semibold text-red-500">{t.mistakes}:</span> {ex.commonMistakes[lang]}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Pro Tips */}
                {day.tips.length > 0 && (
                  <div className="mt-8 mb-6">
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5">
                      <h4 className="font-bold text-green-800 dark:text-green-300 flex items-center gap-2 mb-3">
                        <span className="text-xl">💡</span> {t.tips}
                      </h4>
                      <ul className="space-y-2">
                        {day.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-green-800 dark:text-green-200">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                            {tip[lang]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Chef/Recipe Section */}
                {day.recipes && day.recipes.length > 0 && (
                  <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-xl text-gray-800 dark:text-white flex items-center gap-2 mb-6">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <ChefHat className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                      </div>
                      {t.nutrition}
                    </h4>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      {day.recipes.map((recipe, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-purple-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                          {/* Recipe Header */}
                          <div className="bg-purple-50 dark:bg-purple-900/30 p-4 border-b border-purple-100 dark:border-purple-800/50">
                            <div className="flex justify-between items-start">
                              <h5 className="font-bold text-purple-900 dark:text-purple-200 text-lg leading-tight">{recipe.name[lang]}</h5>
                              <span className="flex items-center gap-1 text-xs font-bold bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                                <Flame className="w-3 h-3" /> {recipe.macros.calories}
                              </span>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <span className="text-[10px] uppercase font-bold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">Pro: {recipe.macros.protein}</span>
                              <span className="text-[10px] uppercase font-bold bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-2 py-1 rounded">Carb: {recipe.macros.carbs}</span>
                              <span className="text-[10px] uppercase font-bold bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 px-2 py-1 rounded">Fat: {recipe.macros.fat}</span>
                            </div>
                          </div>
                          
                          {/* Recipe Body */}
                          <div className="p-4 space-y-4">
                            <div>
                              <strong className="text-xs uppercase text-gray-400 dark:text-gray-500 tracking-wider mb-2 block">{t.ingredients}</strong>
                              <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                                {recipe.ingredients[lang].map((ing, i) => (
                                  <li key={i} className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1">
                                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                                    {ing}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <strong className="text-xs uppercase text-gray-400 dark:text-gray-500 tracking-wider mb-2 block">{t.preparation}</strong>
                              <ol className="space-y-1.5">
                                {recipe.instructions[lang].map((inst, i) => (
                                  <li key={i} className="text-xs text-gray-600 dark:text-gray-300 flex gap-2">
                                    <span className="font-bold text-purple-400">{i + 1}.</span>
                                    {inst}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyPlan;
