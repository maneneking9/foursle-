import { useState } from 'react';
import { motion } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Book, RefreshCw } from 'lucide-react';
import Markdown from 'react-markdown';
import { useTranslation } from '../context/LanguageContext';

export default function DailyDevotional() {
  const { t, language } = useTranslation();
  const [devotional, setDevotional] = useState<{
    verse: string;
    reference: string;
    reflection: string;
    prayer: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const generateDevotional = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const langName = {
        'EN': 'English',
        'KIN': 'Kinyarwanda',
        'FR': 'French',
        'KIS': 'Swahili'
      }[language];

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a daily Christian devotional in ${langName} language. Include a Bible verse, its reference, a short reflection (2-3 paragraphs), and a short prayer. Format as JSON with keys: verse, reference, reflection, prayer.`,
        config: {
          responseMimeType: "application/json"
        }
      });

      const data = JSON.parse(response.text || '{}');
      setDevotional(data);
    } catch (error) {
      console.error("Error generating devotional:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-emerald-900 dark:bg-emerald-950 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl transition-colors">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 dark:bg-emerald-900 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-emerald-700 dark:bg-emerald-800 rounded-xl flex items-center justify-center">
                <Sparkles size={20} className="text-emerald-300" />
              </div>
              <h2 className="text-2xl font-bold">{t('dailyDevotional')}</h2>
            </div>

            {!devotional && !loading ? (
              <div className="text-center py-12">
                <Book size={64} className="mx-auto mb-6 text-emerald-700 dark:text-emerald-800 opacity-50" />
                <h3 className="text-3xl font-bold mb-4">{t('startDayGrace')}</h3>
                <p className="text-emerald-100/70 mb-8 max-w-md mx-auto">
                  {t('devotionalSub')}
                </p>
                <button
                  onClick={generateDevotional}
                  className="bg-white text-emerald-900 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all flex items-center gap-2 mx-auto"
                >
                  {t('generateDevotional')}
                </button>
              </div>
            ) : loading ? (
              <div className="text-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-4"
                >
                  <RefreshCw size={48} className="text-emerald-300" />
                </motion.div>
                <p className="text-emerald-200 font-medium">{t('preparingInspiration')}</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="border-l-4 border-emerald-400 pl-6 italic">
                  <p className="text-2xl md:text-3xl font-serif mb-2">"{devotional?.verse}"</p>
                  <p className="text-emerald-300 font-bold">— {devotional?.reference}</p>
                </div>

                <div className="prose prose-invert max-w-none">
                  <h4 className="text-xl font-bold text-emerald-300 mb-4">{t('reflection')}</h4>
                  <div className="text-emerald-50 leading-relaxed space-y-4">
                    <Markdown>{devotional?.reflection}</Markdown>
                  </div>
                </div>

                <div className="bg-emerald-800/50 dark:bg-emerald-900/30 p-8 rounded-3xl border border-emerald-700 dark:border-emerald-800">
                  <h4 className="text-lg font-bold text-emerald-300 mb-3">{t('prayer')}</h4>
                  <p className="text-emerald-100 italic leading-relaxed">
                    {devotional?.prayer}
                  </p>
                </div>

                <button
                  onClick={generateDevotional}
                  className="text-emerald-300 text-sm font-bold hover:text-white transition-colors flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  {t('generateAnother')}
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
