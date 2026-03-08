import { motion } from 'motion/react';
import { ArrowRight, Play, Volume2 } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

import { useSite } from '../context/SiteContext';
import { Book, Sparkles } from 'lucide-react';

export default function Hero() {
  const { t, language } = useTranslation();
  const { isWordLight } = useSite();

  const speakWelcome = () => {
    const utterance = new SpeechSynthesisUtterance(`${t('welcome')}. ${t('heroTitle')}. ${t('heroSub')}`);
    utterance.lang = language === 'KIN' ? 'rw-RW' : language === 'FR' ? 'fr-FR' : language === 'KIS' ? 'sw-KE' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  if (isWordLight) {
    return (
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50 transition-all duration-700">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.08),transparent_70%)]" />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* High Visibility Grid */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(#9333ea 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start text-left max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: -50, rotate: -10 }}
                animate={{ opacity: 1, y: 0, rotate: 3 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="w-20 h-20 bg-purple-600 rounded-3xl flex items-center justify-center text-white shadow-[0_20px_50px_rgba(147,51,234,0.3)] mb-10"
              >
                <Book size={40} />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-8xl font-black text-slate-900 leading-tight mb-8 tracking-tighter"
              >
                {t('theLivingWord')}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative mb-12"
              >
                <p className="text-xl md:text-2xl text-slate-600 max-w-lg leading-relaxed font-serif italic">
                  {t('livingWordSub')}
                </p>
                <div className="mt-4 flex items-center gap-2 text-purple-600 font-bold uppercase tracking-widest text-xs">
                  <div className="h-px w-8 bg-purple-600/30" />
                  Psalm 119:105
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-6"
              >
                <button className="px-10 py-5 bg-purple-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-purple-600/30 flex items-center gap-3 group">
                  <Sparkles size={24} className="text-purple-200" />
                  {t('deepStudy')}
                </button>
                <button 
                  onClick={speakWelcome}
                  className="px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-3"
                >
                  <Volume2 size={24} className="text-purple-600" />
                  {t('listen')}
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100 border-8 border-white">
                <img 
                  src="https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_5.png" 
                  alt="Theological Study" 
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                  style={{ imageRendering: 'auto' }}
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 flex flex-col items-center"
          >
            <div className="animate-bounce w-6 h-10 border-2 border-slate-300 rounded-full flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-purple-600 rounded-full" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{t('scrollToExplore')}</span>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white dark:bg-slate-900 transition-all duration-700">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50 dark:bg-emerald-900/10 rounded-full blur-[120px] opacity-80 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-50 dark:bg-amber-900/10 rounded-full blur-[120px] opacity-80 translate-y-1/4 -translate-x-1/4" />
        
        {/* Light Airy Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'linear-gradient(#10b981 0.5px, transparent 0.5px), linear-gradient(90deg, #10b981 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
            {t('welcome')}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
            {t('heroTitle')}
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            {t('heroSub')}
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center gap-2 group">
              {t('joinLive')}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <Play size={16} fill="currentColor" />
              </div>
              {t('viewServices')}
            </button>
            <button 
              onClick={speakWelcome}
              className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-all border border-emerald-100 flex items-center justify-center"
              title="Listen to Welcome"
            >
              <Volume2 size={24} />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl bg-slate-50 dark:bg-slate-800">
            <img 
              src="https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_0.png" 
              alt="Church Community" 
              className="w-full h-auto block"
              referrerPolicy="no-referrer"
              style={{ imageRendering: 'auto' }}
            />
          </div>
          {/* Decorative floating card */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-[200px]"
          >
            <p className="text-xs font-bold text-emerald-600 uppercase mb-2">{t('nextService')}</p>
            <p className="text-sm font-bold text-slate-900 mb-1">{t('sundayMorning')}</p>
            <p className="text-xs text-slate-500">10:00 AM • {t('mainSanctuary')}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
