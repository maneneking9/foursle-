import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Church, Home, Calendar, BookOpen, Info, Radio, Map, Image as ImageIcon, Languages, ChevronDown, Heart, Book, Sun, Moon, User, Users, Sparkles, HelpCircle, CheckCircle2, Volume2, VolumeX, History as HistoryIcon, Star, Search, Bell, Lock, Upload } from 'lucide-react';
import { cn } from '../lib/utils';
import ChurchQuiz from './ChurchQuiz';
import WordDashboard from './WordDashboard';
import SearchModal from './SearchModal';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
        { name: 'Membership Request', href: '/membership' },
        { name: 'Prayer Request', href: '/prayer' },
        { name: 'Volunteer', href: '/volunteer' },
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
    { name: t('volunteer'), id: 'volunteer', href: '#volunteer', icon: Users },
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
    { name: t('volunteer'), id: 'volunteer', href: '#volunteer', icon: Heart },
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
        { name: 'Membership Request', href: '/membership' },
        { name: 'Prayer Request', href: '/prayer' },
        { name: 'Volunteer', href: '/volunteer' },
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
  const [churchProfile, setChurchProfile] = useState({ 
    logo: '/logo.jpg', 
    name: 'Foursquare Church', 
    tagline: 'CityLight Church',
    wordlightLogo: '/logo.jpg',
    citylightLogo: '/logo.jpg'
  });
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { api } = await import('../lib/api');
        const profile = await api.getChurchProfile();
        setChurchProfile(profile);
      } catch (err) {
        console.error('Failed to load church profile:', err);
      }
    };
    loadProfile();
  }, []);

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
          onClick={() => user?.role === 'admin' && setShowProfileModal(true)}
        >
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-md relative group-hover:ring-2 group-hover:ring-blue-400 transition-all">
            <img 
              src={isWordLight ? (churchProfile.wordlightLogo || churchProfile.logo) : (churchProfile.citylightLogo || churchProfile.logo)} 
              alt="Church Logo" 
              className="w-full h-full object-cover"
            />
            {user?.role === 'admin' && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Upload size={20} className="text-white" />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm lg:text-base font-bold tracking-tight whitespace-nowrap uppercase transition-colors text-[#1877f2]">
              {isWordLight ? "Word Light" : churchProfile.name}
            </span>
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">
              {isWordLight ? "Biblical Excellence" : churchProfile.tagline}
            </span>
          </div>
        </motion.div>

        <div className="md:hidden flex items-center gap-2">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 shadow-sm"
          >
            <Search size={20} />
          </motion.button>

          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setLangOpen(!langOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 text-xs font-bold shadow-sm"
          >
            {currentLang.code}
          </motion.button>
        </div>

        <div className="hidden md:flex items-center gap-1 flex-1 justify-center px-2">
          <div className="flex items-center gap-1">
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
                    "text-[10px] lg:text-xs xl:text-sm font-medium transition-all relative group px-2 lg:px-2.5 xl:px-3 py-2 whitespace-nowrap text-center flex items-center gap-1",
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
                  <div className="absolute top-full left-0 mt-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 px-2 opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all z-50">
                    {item.dropdown?.map((sub, idx) => (
                      <a
                        key={idx}
                        href={sub.href}
                        className="block w-full px-3 py-2 rounded-xl text-xs font-bold transition-all text-gray-700 hover:bg-blue-50 hover:text-[#1877f2]"
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

        <div className="hidden md:flex items-center gap-1 lg:gap-2 shrink-0">
          <div className="h-6 w-px bg-gray-200 mx-1" />

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-50 border border-red-200 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Live</span>
          </div>

          <button onClick={() => setIsSearchOpen(true)} className="w-9 h-9 flex items-center justify-center rounded-lg transition-all shrink-0 shadow-sm bg-gray-100 text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-[#1877f2] hover:border-blue-200">
            <Search size={16} />
          </button>



          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className={cn(
                "flex items-center justify-center gap-1.5 text-xs font-bold transition-all px-3 py-2 rounded-lg shadow-sm ring-1",
                langOpen 
                  ? "bg-[#1877f2] text-white ring-blue-500" 
                  : "bg-white text-gray-700 ring-gray-200 hover:ring-blue-500"
              )}
            >
              <Languages size={14} className={cn("shrink-0", langOpen ? "animate-pulse" : "")} />
              <span className="uppercase tracking-wider">{currentLang.code}</span>
              <ChevronDown size={12} className={cn("transition-transform duration-300", langOpen ? "rotate-180" : "")} />
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



          <button
            onClick={() => setIsQuizOpen(true)}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-lg transition-all shrink-0 shadow-sm relative",
              quizScore !== null && quizScore >= 3
                ? "bg-blue-50 text-[#1877f2] ring-1 ring-blue-500/30"
                : "bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-blue-500"
            )}
            title={t('churchKnowledgeQuiz')}
          >
            <HelpCircle size={16} />
            {quizScore !== null && (
              <div className="absolute -top-1 -right-1 w-4 h-4 text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white bg-[#1877f2]">
                {quizScore}
              </div>
            )}
          </button>

          <div className="flex items-center gap-2">
            <a
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-bold hover:shadow-lg transition-all"
            >
              <Lock size={14} />
              <span>Admin</span>
            </a>
            <a
              href="/join"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white text-xs font-bold hover:shadow-lg transition-all"
            >
              <Users size={14} />
              <span>Join Church</span>
            </a>
            <a
              href="/login"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold hover:shadow-lg transition-all"
            >
              <User size={14} />
              <span>Login</span>
            </a>
          </div>
        </div>
      </div>

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isWordDashboardOpen && <WordDashboard onClose={() => setIsWordDashboardOpen(false)} />}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <ChurchQuiz 
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onComplete={(score) => setQuizScore(score)}
      />

      {showProfileModal && (
        <ProfileImageModal 
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          currentProfile={churchProfile}
          onUpdate={(profile) => {
            setChurchProfile(profile);
            setShowProfileModal(false);
          }}
        />
      )}
    </nav>
  );
}

function ProfileImageModal({ isOpen, onClose, currentProfile, onUpdate }: any) {
  const [citylightLogo, setCitylightLogo] = useState('');
  const [wordlightLogo, setWordlightLogo] = useState('');
  const [name, setName] = useState(currentProfile.name);
  const [tagline, setTagline] = useState(currentProfile.tagline);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'citylight' | 'wordlight') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'citylight') setCitylightLogo(reader.result as string);
        else setWordlightLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { api } = await import('../lib/api');
      const result = await api.updateChurchProfile({ 
        citylightLogo: citylightLogo || currentProfile.citylightLogo,
        wordlightLogo: wordlightLogo || currentProfile.wordlightLogo,
        name, 
        tagline 
      });
      if (result.success) {
        onUpdate({ 
          citylightLogo: result.citylightLogo || citylightLogo,
          wordlightLogo: result.wordlightLogo || wordlightLogo,
          name, 
          tagline 
        });
      }
    } catch (err) {
      alert('Failed to update profile');
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold mb-6">Update Church Profile</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">CityLight Logo</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'citylight')} className="w-full text-sm" />
                {(citylightLogo || currentProfile.citylightLogo) && (
                  <img src={citylightLogo || currentProfile.citylightLogo} alt="CityLight" className="mt-2 w-24 h-24 object-cover rounded-xl" />
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">WordLight Logo</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'wordlight')} className="w-full text-sm" />
                {(wordlightLogo || currentProfile.wordlightLogo) && (
                  <img src={wordlightLogo || currentProfile.wordlightLogo} alt="WordLight" className="mt-2 w-24 h-24 object-cover rounded-xl" />
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Church Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border-2 rounded-xl focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-4 py-2 border-2 rounded-xl focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-200 rounded-xl font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
