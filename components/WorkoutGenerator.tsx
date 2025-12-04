
import React from 'react';
import { UserProfile, Language, GoalType, InjuryType } from '../types';
import { TEXTS } from '../constants';

interface Props {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  onGenerate: () => void;
  lang: Language;
}

const WorkoutGenerator: React.FC<Props> = ({ profile, setProfile, onGenerate, lang }) => {
  const t = TEXTS[lang];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const inputClass = "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-shadow";
  const labelClass = "block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 ml-1";

  return (
    <div className="bg-white dark:bg-darkCard p-8 rounded-2xl shadow-xl mb-8 border-t-4 border-primary transition-colors relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>
      
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3 relative z-10">
        {t.profile}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 relative z-10">
        
        {/* Name */}
        <div>
          <label className={labelClass}>{t.name}</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder={lang === 'en' ? "e.g. John Doe" : "مثال: أحمد محمد"}
            className={inputClass}
          />
        </div>

        {/* Weight */}
        <div>
          <label className={labelClass}>{t.weight}</label>
          <input
            type="number"
            name="weight"
            value={profile.weight}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Height */}
        <div>
          <label className={labelClass}>{t.height}</label>
          <input
            type="number"
            name="height"
            value={profile.height}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Goal */}
        <div>
          <label className={labelClass}>{t.goal}</label>
          <div className="relative">
            <select
              name="goal"
              value={profile.goal}
              onChange={handleChange}
              className={`${inputClass} appearance-none`}
            >
              <option value="weight_loss">{t.options.weight_loss}</option>
              <option value="muscle_gain">{t.options.muscle_gain}</option>
              <option value="endurance">{t.options.endurance}</option>
              <option value="cutting">{t.options.cutting}</option>
              <option value="bulking">{t.options.bulking}</option>
              <option value="calisthenics">{t.options.calisthenics}</option>
              <option value="powerlifting">{t.options.powerlifting}</option>
              <option value="flexibility">{t.options.flexibility}</option>
              <option value="queen_shape">👑 {t.options.queen_shape}</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>
        </div>

        {/* Injury */}
        <div>
          <label className={labelClass}>{t.injury}</label>
          <div className="relative">
            <select
              name="injury"
              value={profile.injury}
              onChange={handleChange}
              className={`${inputClass} border-purple-500 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100 focus:ring-accent`}
            >
              <option value="none">{t.options.none}</option>
              <option value="shoulder">{t.options.shoulder}</option>
              <option value="knee">{t.options.knee}</option>
              <option value="back">{t.options.back}</option>
              <option value="wrist">{t.options.wrist}</option>
              <option value="elbow">{t.options.elbow}</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-accent">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className={labelClass}>{t.experience}</label>
          <div className="relative">
            <select
              name="experience"
              value={profile.experience}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="beginner">{t.options.beginner}</option>
              <option value="intermediate">{t.options.intermediate}</option>
              <option value="advanced">{t.options.advanced}</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>
        </div>

      </div>

      <button
        onClick={onGenerate}
        className="w-full mt-10 bg-gradient-to-r from-primary to-accent hover:from-primaryDark hover:to-accentDark text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/20 transform transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 text-lg"
      >
        <span>{t.generateBtn}</span>
        <span className="text-xl">✨</span>
      </button>
    </div>
  );
};

export default WorkoutGenerator;
