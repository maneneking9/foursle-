import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Target, Users2, Sparkles, Languages, Loader2 } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { GoogleGenAI } from "@google/genai";

import { useSite } from '../context/SiteContext';
import { Book, PenTool, Search } from 'lucide-react';

export default function About() {
  const { t, language } = useTranslation();
  const { isWordLight } = useSite();
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState('');

  const generateAISummary = async () => {
    setIsSummarizing(true);
    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        setSummary('API key not configured.');
        return;
      }
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide a very short (2 sentences) summary of the Foursquare Gospel Church's mission and history in ${language}. 
        Focus on the Savior, Baptizer, Healer, and Coming King aspects.`,
      });
      setSummary(response.text || '');
    } catch (error) {
      console.error('Summary error:', error);
      setSummary('Could not generate summary at this time.');
    }
    setIsSummarizing(false);
  };

  if (isWordLight) {
    return (
      <section id="about" className="py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square bg-slate-100 dark:bg-slate-800 rounded-[4rem] overflow-hidden p-12 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.1),transparent_50%)]" />
              <div className="relative z-10 text-center">
                <Book size={160} className="text-purple-600/20 mb-8 mx-auto" />
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{t('theLivingWord')}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs mx-auto italic">{t('livingWordSub')}</p>
              </div>
              
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-purple-600/10 rounded-full m-8"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 text-purple-600 font-bold text-sm uppercase tracking-widest mb-4">
                <PenTool size={16} />
                <span>{t('ourPhilosophy')}</span>
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-8 leading-tight">{t('illuminatingTruth')}</h2>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-purple-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-purple-600/20 shrink-0">
                    <Search size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{t('biblicalExcellence')}</h4>
                    <p className="text-slate-600 leading-relaxed">{t('biblicalExcellenceSub')}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl shrink-0">
                    <Users2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{t('communityScholars')}</h4>
                    <p className="text-slate-600 leading-relaxed">{t('communityScholarsSub')}</p>
                  </div>
                </div>

                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-purple-600">
                      <Sparkles size={18} />
                      <span className="font-bold text-xs uppercase tracking-widest">{t('aiScriptureInsight')}</span>
                    </div>
                    <button 
                      onClick={generateAISummary}
                      disabled={isSummarizing}
                      className="p-2 bg-white text-purple-600 rounded-xl hover:shadow-md transition-all disabled:opacity-50"
                    >
                      {isSummarizing ? <Loader2 size={16} className="animate-spin" /> : <Languages size={16} />}
                    </button>
                  </div>
                  <AnimatePresence mode="wait">
                    {summary ? (
                      <motion.p 
                        key="summary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-slate-600 italic leading-relaxed"
                      >
                        "{summary}"
                      </motion.p>
                    ) : (
                      <p key="placeholder" className="text-sm text-slate-400 italic">{t('aiScriptureInsightSub')}</p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-24 bg-emerald-50/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl w-full overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-lg">
                <img 
                  src="/images/Ijuru rirakinguka iyo duhimbaje Imana dufite umutima uciye bugufi.Zaburi 100-2 Mukorere Uwiteka(1).webp" 
                  alt="Church Event" 
                  className="w-full h-auto block"
                />
              </div>
              <div className="rounded-3xl w-full overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-lg mt-8">
                <img 
                  src="/images/Ijuru rirakinguka iyo duhimbaje Imana dufite umutima uciye bugufi.Zaburi 100-2 Mukorere Uwiteka(3).webp" 
                  alt="Worship" 
                  className="w-full h-auto block"
                />
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-600 rounded-full -z-10 blur-3xl opacity-20" />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-white rounded-[2rem] shadow-xl border border-slate-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Sparkles size={18} />
                  <span className="font-bold text-sm uppercase tracking-widest">AI Quick Summary</span>
                </div>
                <button 
                  onClick={generateAISummary}
                  disabled={isSummarizing}
                  className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all disabled:opacity-50"
                >
                  {isSummarizing ? <Loader2 size={16} className="animate-spin" /> : <Languages size={16} />}
                </button>
              </div>
              <AnimatePresence mode="wait">
                {summary ? (
                  <motion.p 
                    key="summary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-slate-600 italic leading-relaxed"
                  >
                    "{summary}"
                  </motion.p>
                ) : (
                  <p key="placeholder" className="text-sm text-slate-400 italic">
                    Click the icon to generate an AI summary in {language}...
                  </p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-2 block">{t('heritage')}</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">{t('foursquareTitle')}</h2>
            
            <div className="space-y-6 mb-10">
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('foursquareDesc')}
              </p>
              
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-3">{t('foundationHistory')}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {t('foundationHistorySub')}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 uppercase mb-1">{t('founder')}</h5>
                    <p className="text-xs text-slate-500">Aimee Semple McPherson</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 uppercase mb-1">{t('established')}</h5>
                    <p className="text-xs text-slate-500">January 1, 1923</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: t('savior'), desc: t('saviorDesc') },
                  { title: t('baptizer'), desc: t('baptizerDesc') },
                  { title: t('healer'), desc: t('healerDesc') },
                  { title: t('comingKing'), desc: t('comingKingDesc') }
                ].map((value, i) => (
                  <div key={i} className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <h5 className="text-sm font-bold text-emerald-700 mb-1">{value.title}</h5>
                    <p className="text-[10px] text-slate-500">{value.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                {t('globalFamily')}
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-emerald-600 shrink-0">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{t('ourMission')}</h4>
                  <p className="text-slate-600">{t('ourMissionSub')}</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-emerald-600 shrink-0">
                  <Users2 size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{t('getInvolved')}</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["Small Groups", "Youth Ministry", "Worship Team", "Community Service", "Missions", "Prayer Chain"].map(way => (
                      <div key={way} className="flex items-center gap-2 text-sm text-slate-500">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        {way}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
