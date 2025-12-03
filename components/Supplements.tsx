import React from 'react';
import { SUPPLEMENTS, TEXTS } from '../constants';
import { Language } from '../types';
import { Lock } from 'lucide-react';

interface Props {
  lang: Language;
  isSubscribed: boolean;
}

const Supplements: React.FC<Props> = ({ lang, isSubscribed }) => {
  const t = TEXTS[lang];

  return (
    <div className="bg-white dark:bg-darkCard rounded-xl shadow-lg p-6 my-8 transition-colors">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <span className="text-green-500">💊</span> {t.supplements}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUPPLEMENTS.map((supp) => {
          const isLocked = supp.requiresSubscription && !isSubscribed;

          return (
            <div key={supp.id} className="relative group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 flex flex-col">
              
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{supp.name[lang]}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 min-h-[40px]">
                  {supp.description[lang]}
                </p>
                
                <div className={`p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-800 dark:text-blue-200 text-sm ${isLocked ? 'opacity-30' : ''}`}>
                  <strong>FDA Guide:</strong> {supp.dosage[lang]}
                </div>
              </div>

              {isLocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur-sm z-10">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg mb-2">
                    <Lock className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </div>
                  <span className="font-semibold text-sm text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 px-3 py-1 rounded-full">{t.locked}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Supplements;