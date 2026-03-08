import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Bookmark, CheckCircle2, Clock, Star, TrendingUp, User, Settings, LogOut, ChevronRight, Sparkles, BookOpen, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';
import { useSite } from '../context/SiteContext';

import { useTranslation } from '../context/LanguageContext';

interface StudyProgress {
  id: string;
  title: string;
  progress: number;
  lastAccessed: string;
  status: 'In Progress' | 'Completed';
}

export default function WordDashboard({ onClose }: { onClose: () => void }) {
  const { isWordLight } = useSite();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'studies' | 'notes'>('overview');
  
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('church_user_data');
    return saved ? JSON.parse(saved) : { name: t('visitor'), isFamily: false };
  });

  const [progress, setProgress] = useState<StudyProgress[]>(() => {
    const saved = localStorage.getItem('bible_study_progress');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: t('studyGenesis'), progress: 65, lastAccessed: `2 ${t('hours')} ${t('ago')}`, status: 'In Progress' },
      { id: '2', title: t('studyRomans'), progress: 100, lastAccessed: `1 ${t('day')} ${t('ago')}`, status: 'Completed' },
      { id: '3', title: t('studyParables'), progress: 20, lastAccessed: `3 ${t('days')} ${t('ago')}`, status: 'In Progress' },
    ];
  });

  const stats = [
    { label: t('chaptersRead'), value: '142', icon: Book, color: 'text-blue-500' },
    { label: t('studiesCompleted'), value: '12', icon: CheckCircle2, color: 'text-emerald-500' },
    { label: t('prayerStreak'), value: `8 ${t('days')}`, icon: TrendingUp, color: 'text-amber-500' },
    { label: t('savedVerses'), value: '45', icon: Star, color: 'text-purple-500' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl max-w-5xl w-full h-[85vh] flex flex-col border border-slate-100 dark:border-slate-800"
      >
        {/* Sidebar */}
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-64 bg-slate-50 dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800 p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-10">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg",
                isWordLight ? "bg-purple-600" : "bg-emerald-600"
              )}>
                <User size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white leading-none mb-1">{userData.name}</h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">{t('wordAccount')}</p>
              </div>
            </div>

            <nav className="space-y-2 flex-1">
              {[
                { id: 'overview', label: t('overview'), icon: TrendingUp },
                { id: 'studies', label: t('myStudies'), icon: BookOpen },
                { id: 'notes', label: t('studyNotes'), icon: Bookmark },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                    activeTab === item.id 
                      ? (isWordLight ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20" : "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20")
                      : "text-slate-500 hover:bg-slate-100"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="pt-6 border-t border-slate-200 space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all">
                <Settings size={18} />
                {t('settings')}
              </button>
              <button onClick={onClose} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all">
                <LogOut size={18} />
                {t('close')}
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  {activeTab === 'overview' && t('spiritualGrowth')}
                  {activeTab === 'studies' && t('myBibleStudies')}
                  {activeTab === 'notes' && t('personalNotes')}
                </h2>
                <p className="text-slate-500 font-medium">{t('trackingJourney')}</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-xs font-bold border border-amber-100">
                <Sparkles size={14} />
                {t('levelDisciple')}
              </div>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-white shadow-sm", stat.color)}>
                        <stat.icon size={20} />
                      </div>
                      <p className="text-2xl font-black text-slate-900 mb-1">{stat.value}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 flex items-center justify-between">
                      {t('recentProgress')}
                      <button className="text-xs text-purple-600 font-bold hover:underline">{t('viewAll')}</button>
                    </h3>
                    <div className="space-y-6">
                      {progress.slice(0, 3).map((item) => (
                        <div key={item.id} className="group cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-slate-700 group-hover:text-purple-600 transition-colors">{item.title}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.progress}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              className={cn("h-full rounded-full", isWordLight ? "bg-purple-600" : "bg-emerald-600")}
                            />
                          </div>
                          <p className="text-[10px] text-slate-400 mt-2">{t('lastAccessed')} {item.lastAccessed}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-purple-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                        <GraduationCap size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{t('continueJourney')}</h3>
                      <p className="text-purple-100 text-sm mb-6 leading-relaxed">{t('continueJourneySub')}</p>
                      <button className="w-full py-4 bg-white text-purple-600 rounded-2xl font-bold text-sm hover:bg-purple-50 transition-all shadow-xl">
                        {t('resumeStudy')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'studies' && (
              <div className="grid sm:grid-cols-2 gap-6">
                {progress.map((item) => (
                  <div key={item.id} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 group hover:border-purple-500 transition-all">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-600 shadow-sm">
                        <Book size={24} />
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                        item.status === 'Completed' ? "bg-emerald-100 text-emerald-700" : "bg-purple-100 text-purple-700"
                      )}>
                        {item.status === 'Completed' ? t('completed') : t('inProgress')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-500 mb-6">{t('studySubText')}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-600 rounded-full" style={{ width: `${item.progress}%` }} />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-400">{item.progress}%</span>
                    </div>
                  </div>
                ))}
                <button className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-purple-600 hover:border-purple-600 transition-all">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center">
                    <Star size={24} />
                  </div>
                  <span className="font-bold text-sm">{t('enrollNewStudy')}</span>
                </button>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-6">
                {[
                  { title: t('note1Title'), date: t('today'), preview: t('note1Preview') },
                  { title: t('note2Title'), date: t('yesterday'), preview: t('note2Preview') },
                  { title: t('note3Title'), date: `2 ${t('days')} ${t('ago')}`, preview: t('note3Preview') },
                ].map((note, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{note.title}</h3>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{note.date}</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{note.preview}</p>
                    <div className="mt-6 flex items-center gap-2 text-xs font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition-all">
                      {t('readFullNote')} <ChevronRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
