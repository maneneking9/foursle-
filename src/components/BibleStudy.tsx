import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, MapPin, Clock, ChevronRight, Sparkles, Users, Heart } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { cn } from '../lib/utils';
import BibleGuidance from './BibleGuidance';

const studyTypes = [
  {
    name: "Inductive Study",
    description: "Observation, interpretation, and application. Learning to see what the text says for yourself.",
    icon: BookOpen,
    color: "bg-blue-500"
  },
  {
    name: "Topical Study",
    description: "Exploring what the entire Bible says about a specific subject like Grace, Faith, or Love.",
    icon: Sparkles,
    color: "bg-purple-500"
  },
  {
    name: "Character Study",
    description: "Examining the lives of biblical figures to learn from their successes and failures.",
    icon: Users,
    color: "bg-emerald-500"
  },
  {
    name: "Devotional Study",
    description: "Focusing on personal spiritual growth and hearing God's voice through the Word.",
    icon: Heart,
    color: "bg-rose-500"
  }
];

const studies = [
  {
    title: "The Book of Romans",
    type: "Inductive",
    day: "Tuesdays",
    time: "7:00 PM",
    location: "Room 204 & Zoom",
    description: "An in-depth study of Paul's letter to the Romans, exploring the foundations of our faith and the doctrine of justification by faith.",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop",
    details: "This group meets weekly to dissect the theological riches of Romans. We use a verse-by-verse approach to ensure we capture the full context of Paul's message."
  },
  {
    title: "Women's Bible Study",
    type: "Topical",
    day: "Thursdays",
    time: "10:00 AM",
    location: "Church Lounge",
    description: "A community of women growing together through topical studies, prayer, and mutual encouragement.",
    image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=2071&auto=format&fit=crop",
    details: "Current Topic: 'Fruit of the Spirit'. We explore how to cultivate love, joy, and peace in our daily lives as modern women of faith."
  },
  {
    title: "Men's Breakfast & Word",
    type: "Character",
    day: "Saturdays",
    time: "8:00 AM",
    location: "Fellowship Hall",
    description: "Food, fellowship, and a focused look at living out Christian principles in modern life through biblical examples.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
    details: "We are currently studying the 'Life of David'. Join us as we learn about leadership, repentance, and being a man after God's own heart."
  }
];

export default function BibleStudy() {
  const { t } = useTranslation();
  const [selectedStudy, setSelectedStudy] = useState<typeof studies[0] | null>(null);

  const studyTypes = [
    {
      name: t('inductiveStudy'),
      description: "Observation, interpretation, and application. Learning to see what the text says for yourself.",
      icon: BookOpen,
      color: "bg-blue-500"
    },
    {
      name: t('topicalStudy'),
      description: "Exploring what the entire Bible says about a specific subject like Grace, Faith, or Love.",
      icon: Sparkles,
      color: "bg-purple-500"
    },
    {
      name: t('characterStudy'),
      description: "Examining the lives of biblical figures to learn from their successes and failures.",
      icon: Users,
      color: "bg-emerald-500"
    },
    {
      name: t('devotionalStudy'),
      description: "Focusing on personal spiritual growth and hearing God's voice through the Word.",
      icon: Heart,
      color: "bg-rose-500"
    }
  ];

  return (
    <section id="bible-study" className="py-24 bg-white dark:bg-slate-900 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6"
            >
              <BookOpen size={14} />
              {t('deeperWord')}
            </motion.div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('bibleStudyGroups')}</h2>
            <p className="text-slate-600 dark:text-slate-400">
              {t('bibleStudySub')}
            </p>
          </div>
        </div>

        {/* Study Types Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {studyTypes.map((type, i) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all group"
            >
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg", type.color)}>
                <type.icon size={20} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">{type.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{type.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Current Studies */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {studies.map((study, i) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedStudy(study)}
              className="group cursor-pointer bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {study.type}
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-white/90 text-[10px] font-bold uppercase tracking-widest mb-1">
                    <Clock size={12} />
                    {study.day} • {study.time}
                  </div>
                  <h3 className="text-xl font-bold text-white">{study.title}</h3>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-4">
                  <MapPin size={14} />
                  {study.location}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  {study.description}
                </p>
                <button className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2 group-hover:gap-3 transition-all">
                  {t('viewStudyDetails')} <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Study Detail Modal (Simplified as an overlay for this demo) */}
        <AnimatePresence>
          {selectedStudy && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-sm"
              onClick={() => setSelectedStudy(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="relative h-64">
                  <img src={selectedStudy.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <button 
                    onClick={() => setSelectedStudy(null)}
                    className="absolute top-6 right-6 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronRight className="rotate-180" size={20} />
                  </button>
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-widest">
                      {selectedStudy.type} Study
                    </span>
                    <span className="text-slate-400 text-xs font-medium">{selectedStudy.day} at {selectedStudy.time}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{selectedStudy.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    {selectedStudy.details}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-600/20">
                      {t('joinThisGroup')}
                    </button>
                    <button className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                      {t('downloadStudyGuide')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <BibleGuidance />
        </motion.div>
      </div>
    </section>
  );
}
