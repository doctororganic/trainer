import React, { useState, useEffect } from 'react';
import { Language, UserProfile, DayPlan } from './types';
import { TEXTS } from './constants';
import WorkoutGenerator from './components/WorkoutGenerator';
import WeeklyPlan from './components/WeeklyPlan';
import Supplements from './components/Supplements';
import { generateWorkoutPlan } from './services/workoutService';
import { Dumbbell, Globe, Smartphone, Crown, Moon, Sun, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    weight: 70,
    height: 175,
    age: 25,
    goal: 'muscle_gain',
    injury: 'none',
    experience: 'beginner',
    isSubscribed: false
  });
  
  const [generatedPlan, setGeneratedPlan] = useState<DayPlan[] | null>(null);

  // Initialize theme
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Apply theme class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleGenerate = () => {
    const plan = generateWorkoutPlan(profile);
    setGeneratedPlan(plan);
    
    // Smooth scroll to plan
    setTimeout(() => {
      document.getElementById('plan-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const t = TEXTS[lang];
  const isRTL = lang === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-darkBg pb-20 font-sans transition-colors duration-300 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <header className="bg-white dark:bg-darkCard text-gray-800 dark:text-white p-4 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 backdrop-blur-md bg-white/90 dark:bg-darkCard/90">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-gradient-to-br from-primary to-accent p-2.5 rounded-xl shadow-lg shadow-primary/20 transform group-hover:scale-110 transition-transform">
              <Activity className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Doctor Healthy
              </h1>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">SMART FITNESS</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors text-primary dark:text-blue-400"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2.5 rounded-xl transition-colors text-sm font-bold text-gray-700 dark:text-gray-200"
            >
              <Globe className="w-4 h-4 text-accent" />
              {t.translate}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-darkBg text-white py-20 px-4 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-darkBg to-purple-900 opacity-80"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        
        {/* Abstract Shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-blue-200 text-sm font-bold tracking-wider mb-6">
            AI-POWERED COACHING V2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            {lang === 'en' ? 'Train Smarter,' : 'تدرب بذكاء،'}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {lang === 'en' ? 'Not Harder.' : 'وليس بجهد أكبر.'}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        
        <WorkoutGenerator 
          profile={profile} 
          setProfile={setProfile} 
          onGenerate={handleGenerate}
          lang={lang}
        />

        {generatedPlan && (
          <div id="plan-section" className="animate-fade-in-up space-y-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-1 flex-grow bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <span className="bg-accent text-white p-2 rounded-lg shadow-lg shadow-accent/30">📅</span>
                {t.weekPlan}
              </h2>
              <div className="h-1 flex-grow bg-gray-200 dark:bg-gray-800 rounded-full"></div>
            </div>
            
            <WeeklyPlan plan={generatedPlan} lang={lang} profile={profile} />

            <Supplements lang={lang} isSubscribed={profile.isSubscribed} />

            {!profile.isSubscribed && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden border border-slate-700">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                  <Crown className="w-64 h-64" />
                </div>
                
                <h3 className="text-3xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-500">
                  {t.subscribe}
                </h3>
                <p className="text-gray-300 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                  {lang === 'en' 
                    ? "Get a complete 4-week meal plan, detailed hydration guide, and unlock all advanced supplement recommendations." 
                    : "احصل على خطة وجبات كاملة لمدة 4 أسابيع، ودليل شرب الماء، وافتح جميع توصيات المكملات المتقدمة."}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    className="bg-gradient-to-r from-accent to-purple-600 hover:from-accentDark hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-purple-900/50 transition-all transform hover:scale-105 active:scale-95"
                    onClick={() => setProfile({...profile, isSubscribed: true})}
                  >
                    {t.subscribeBtn}
                  </button>
                  
                  <div className="flex items-center gap-3 text-emerald-400 font-bold bg-white/5 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <Smartphone className="w-5 h-5" />
                    <span>{t.contact}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-24 py-12 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-darkCard">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
          <Dumbbell className="w-5 h-5" />
          <span className="font-bold text-lg">Doctor Healthy</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Doctor Healthy. Designed for Excellence.</p>
      </footer>
    </div>
  );
};

export default App;