import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Church, Home, Calendar, BookOpen, Info, Radio, Map, Image as ImageIcon, Languages, ChevronDown, Heart, Book, Sun, Moon, User, Users, Sparkles, HelpCircle, CheckCircle2, Volume2, VolumeX, History as HistoryIcon, Star, Search, Bell } from 'lucide-react';
import { cn } from '../lib/utils';
import RegistrationModal from './RegistrationModal';
import ChurchQuiz from './ChurchQuiz';
import WordDashboard from './WordDashboard';
import { useTranslation } from '../context/LanguageContext';

import { useSite } from '../context/SiteContext';

export default function Navbar() {
  const { language, setLanguage, t } = useTranslation();
  const { currentSite, setSite, isWordLight, isDark, setIsDark } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isWordDashboardOpen, setIsWordDashboardOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('church_voice_muted');
    return saved === 'true';
  });
  const [quizScore, setQuizScore] = useState<number | null>(() => {
    const saved = localStorage.getItem('church_quiz_score');
    return saved ? parseInt(saved) : null;
  });

  const [user, setUser] = useState<{ 
    name: string; 
    isFamily: boolean; 
    members?: string[];
    hasVisited: boolean;
    wantToBeChristian: boolean;
    previousChurch: string;
  } | null>(() => {
    const saved = localStorage.getItem('church_user_data');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem('church_user_data');
      const savedScore = localStorage.getItem('church_quiz_score');
      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedScore) setQuizScore(parseInt(savedScore));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('user_data_updated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('user_data_updated', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('church_user_data', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (quizScore !== null) {
      localStorage.setItem('church_quiz_score', quizScore.toString());
    }
  }, [quizScore]);

  useEffect(() => {
    localStorage.setItem('church_voice_muted', isMuted.toString());
  }, [isMuted]);

  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = isWordLight ? [
    { name: t('home'), id: 'home', href: '#home', icon: Home },
    { 
      name: t('media'), 
      id: 'media', 
      href: '#live', 
      icon: Radio,
      dropdown: [
        { name: t('live'), href: '#live' },
        { name: t('videoSermons'), href: '#live' },
        { name: t('photoGallery'), href: '#gallery' },
      ]
    },
    { 
      name: t('philosophy'), 
      id: 'aboutUs', 
      href: '#about', 
      icon: Info,
      dropdown: [
        { name: t('ourHistory'), href: '#history' },
        { name: t('ourValues'), href: '#values' },
        { name: t('generalInfo'), href: '#about' },
      ]
    },
    { 
      name: t('services'), 
      id: 'services', 
      href: '#services', 
      icon: Calendar,
      dropdown: [
        { name: t('mainServices'), href: '#services' },
        { name: t('sermons'), href: '#sermons' },
        { name: t('resources'), href: '#resources' },
        { name: t('ourSchool'), href: '#school' },
        { name: t('ourMinistry'), href: '#ministry' },
      ]
    },
    { name: t('bibleStudy'), id: 'bibleStudy', href: '#bible-study', icon: BookOpen },
    { name: t('ourMinistries'), id: 'ministries', href: '#ministries', icon: Users },
    { name: t('branches'), id: 'branches', href: '#branches', icon: Map },
  ] : [
    { name: t('home'), id: 'home', href: '#home', icon: Home },
    { 
      name: t('media'), 
      id: 'media', 
      href: '#live', 
      icon: Radio,
      dropdown: [
        { name: t('live'), href: '#live' },
        { name: t('videoSermons'), href: '#live' },
        { name: t('photoGallery'), href: '#gallery' },
      ]
    },
    { 
      name: t('services'), 
      id: 'services', 
      href: '#services', 
      icon: Calendar,
      dropdown: [
        { name: t('mainServices'), href: '#services' },
        { name: t('sermons'), href: '#sermons' },
        { name: t('resources'), href: '#resources' },
        { name: t('ourSchool'), href: '#school' },
        { name: t('ourMinistry'), href: '#ministry' },
      ]
    },
    { name: t('bibleStudy'), id: 'bibleStudy', href: '#bible-study', icon: BookOpen },
    { name: t('branches'), id: 'branches', href: '#branches', icon: Map },
    { 
      name: t('aboutUs'), 
      id: 'aboutUs', 
      href: '#about', 
      icon: Info,
      dropdown: [
        { name: t('ourHistory'), href: '#history' },
        { name: t('ourValues'), href: '#values' },
        { name: t('ourMinistries'), href: '#ministries' },
        { name: t('generalInfo'), href: '#about' },
      ]
    },
  ];

  const languages = [
    { name: 'English', code: 'EN' as const },
    { name: 'Kinyarwanda', code: 'KIN' as const },
    { name: 'French', code: 'FR' as const },
    { name: 'Kiswahili', code: 'KIS' as const },
    { name: 'Español', code: 'ES' as const },
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];
  const [langOpen, setLangOpen] = useState(false);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3 border-b border-blue-100' 
          : 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 shrink-0 cursor-pointer group"
          onClick={() => setSite(isWordLight ? 'CityLight' : 'WordLight')}
          title={isWordLight ? "Switch to CityLight" : "Switch to Word Light"}
        >
          <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center bg-transparent transition-transform group-hover:scale-110">
            <img 
              src="/app logo/download (10).jpg" 
              alt="Church Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm lg:text-base font-bold tracking-tight whitespace-nowrap uppercase transition-colors text-[#1877f2]">
              {isWordLight ? "Word Light" : "Foursquare"}
            </span>
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">
              {isWordLight ? "Biblical Excellence" : "CityLight Church"}
            </span>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 lg:gap-3 flex-1 justify-center px-4">
          <div className="flex items-center">
            {navItems.map((item, i) => (
              <div key={`${currentSite}-${item.id}`} className="relative group/nav">
                <motion.a
                  href={item.href}
                  onClick={() => setActiveItem(item.id)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 300 }}
                  className={cn(
                    "text-[11px] lg:text-sm font-medium transition-all relative group px-1.5 lg:px-3 py-2 whitespace-nowrap text-center flex items-center gap-1",
                    activeItem === item.id 
                      ? "text-[#1877f2]" 
                      : "text-gray-700 hover:text-[#1877f2]"
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                  {'dropdown' in item && <ChevronDown size={12} className="group-hover/nav:rotate-180 transition-transform" />}
                  <span className={cn(
                    "absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 transition-all bg-[#1877f2]",
                    activeItem === item.id ? "w-1/2" : "w-0 group-hover:w-1/2"
                  )} />
                </motion.a>

                {'dropdown' in item && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 px-2 opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all z-50">
                    {item.dropdown?.map((sub, idx) => (
                      <a
                        key={idx}
                        href={sub.href}
                        className="block w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-gray-700 hover:bg-blue-50 hover:text-[#1877f2]"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
          <div className="h-6 w-px bg-gray-200 mx-1" />

          {/* Live Indicator */}
          <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-xl">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Live</span>
          </div>

          {/* Search Button */}
          <button className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg transition-all shrink-0 shadow-sm bg-gray-100 text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-[#1877f2] hover:border-blue-200">
            <Search size={16} />
          </button>

          {/* Notifications */}
          <button className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg transition-all shrink-0 shadow-sm bg-gray-100 text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-[#1877f2] hover:border-blue-200 relative">
            <Bell size={16} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-white text-[8px] font-bold flex items-center justify-center">3</div>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className={cn(
                "flex items-center justify-center gap-2 text-xs lg:text-sm font-bold transition-all px-3 py-2 rounded-xl shadow-sm ring-1",
                langOpen 
                  ? "bg-[#1877f2] text-white ring-blue-500" 
                  : "bg-white text-gray-700 ring-gray-200 hover:ring-blue-500"
              )}
            >
              <Languages size={16} className={cn("shrink-0", langOpen ? "animate-pulse" : "")} />
              <span className="uppercase tracking-wider">{currentLang.code}</span>
              <ChevronDown size={14} className={cn("transition-transform duration-300", langOpen ? "rotate-180" : "")} />
            </button>
            
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl py-3 z-50 overflow-hidden"
                >
                  <div className="px-4 py-2 mb-2 border-b border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('selectLanguage')}</span>
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangOpen(false);
                        if (!isMuted) {
                          const utterance = new SpeechSynthesisUtterance(lang.name);
                          utterance.lang = lang.code === 'KIN' ? 'rw-RW' : lang.code === 'FR' ? 'fr-FR' : lang.code === 'KIS' ? 'sw-KE' : 'en-US';
                          window.speechSynthesis.speak(utterance);
                        }
                      }}
                      className={cn(
                        "w-full text-left px-4 py-3 text-sm transition-all flex items-center justify-between group",
                        language === lang.code 
                          ? "bg-blue-50 text-[#1877f2] font-bold" 
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#1877f2]"
                      )}
                    >
                      <span>{lang.name}</span>
                      {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(24,119,242,0.6)]" />}
                    </button>
                  ))}
                  <div className="mt-2 px-4 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-[10px] font-medium text-[#1877f2]">
                      <Sparkles size={10} />
                      <span>{t('aiPoweredTranslation')}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={cn(
              "w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg transition-all shrink-0 shadow-sm",
              isMuted 
                ? "bg-gray-100 text-gray-400" 
                : "bg-blue-50 text-[#1877f2]"
            )}
            title={isMuted ? t('unmuteVoice') : t('muteVoice')}
          >
            {isMuted ? <VolumeX size={16} className="lg:size-[18px]" /> : <Volume2 size={16} className="lg:size-[18px]" />}
          </button>

          {/* Church Quiz Button */}
          <button
            onClick={() => setIsQuizOpen(true)}
            className={cn(
              "w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg transition-all shrink-0 shadow-sm relative",
              quizScore !== null && quizScore >= 3
                ? "bg-blue-50 text-[#1877f2] ring-1 ring-blue-500/30"
                : "bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-blue-500"
            )}
            title={t('churchKnowledgeQuiz')}
          >
            <HelpCircle size={16} className="lg:size-[18px]" />
            {quizScore !== null && (
              <div className="absolute -top-1 -right-1 w-4 h-4 text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white bg-[#1877f2]">
                {quizScore}
              </div>
            )}
          </button>

          {/* User Registration/Profile */}
          <div className="flex items-center gap-2 lg:gap-3">
            {user ? (
              <div 
                onClick={() => setIsWordDashboardOpen(true)}
                className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1.5 rounded-lg border group relative cursor-pointer min-w-[100px] lg:min-w-[120px] justify-center hover:shadow-lg transition-all bg-blue-50 border-blue-200 hover:border-blue-400"
              >
                <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-[9px] lg:text-[10px] text-white font-bold shrink-0 relative bg-[#1877f2]">
                  {user.isFamily ? <Users size={10} className="lg:size-[12px]" /> : user.name.charAt(0)}
                  {quizScore !== null && quizScore >= 3 && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white flex items-center justify-center">
                      <CheckCircle2 size={8} className="text-white" />
                    </div>
                  )}
                </div>
                <span className="text-xs lg:text-sm font-bold truncate max-w-[60px] lg:max-w-[80px] text-[#1877f2]">{user.name}</span>
              </div>
            ) : (
              <button 
                onClick={() => setIsRegModalOpen(true)}
                className="flex items-center justify-center gap-1.5 lg:gap-2 text-xs lg:text-sm font-medium transition-colors bg-gray-100 px-2 lg:px-3 py-1.5 rounded-lg min-w-[100px] lg:min-w-[120px] text-gray-700 hover:text-[#1877f2] hover:bg-blue-50"
              >
                <User size={14} className="shrink-0 lg:size-[16px]" />
                <span className="truncate">{t('register')}</span>
              </button>
            )}
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgb(24 119 242 / 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="text-white px-3 lg:px-5 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-semibold transition-all shadow-md min-w-[60px] lg:min-w-[80px] text-center bg-[#1877f2] hover:bg-blue-600"
          >
            {t('give')}
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <div key={`${currentSite}-${item.id}`} className="flex flex-col gap-2">
                  <a
                    href={item.href}
                    onClick={() => {
                      if (!('dropdown' in item)) {
                        setIsOpen(false);
                        setActiveItem(item.id);
                      }
                    }}
                    className={cn(
                      "flex items-center justify-between font-medium transition-colors py-2",
                      activeItem === item.id 
                        ? "text-[#1877f2]" 
                        : "text-gray-700 hover:text-[#1877f2]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      {item.name}
                    </div>
                    {'dropdown' in item && <ChevronDown size={14} />}
                  </a>
                  
                  {'dropdown' in item && (
                    <div className="pl-8 flex flex-col gap-2 border-l border-gray-100 ml-2">
                      {item.dropdown?.map((sub, idx) => (
                        <a
                          key={idx}
                          href={sub.href}
                          onClick={() => {
                            setIsOpen(false);
                            setActiveItem(item.id);
                          }}
                          className="text-xs font-bold text-gray-500 py-1 hover:text-[#1877f2] transition-colors"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsQuizOpen(true);
                }}
                className="w-full bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <HelpCircle size={18} />
                {t('churchKnowledgeQuiz')}
              </button>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsRegModalOpen(true);
                }}
                className="w-full text-white py-3 rounded-xl font-semibold mt-2 bg-[#1877f2]"
              >
                {user ? user.name : t('register')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isWordDashboardOpen && <WordDashboard onClose={() => setIsWordDashboardOpen(false)} />}
      </AnimatePresence>

      <RegistrationModal 
        isOpen={isRegModalOpen} 
        onClose={() => setIsRegModalOpen(false)} 
        onRegister={(data) => setUser(data)}
      />

      <ChurchQuiz 
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onComplete={(score) => setQuizScore(score)}
      />
    </nav>
  );
}
