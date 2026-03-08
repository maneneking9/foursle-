import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Calendar, BookOpen, Users, Menu, X, Radio, Map, Heart, Gift } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function MobileBottomNav() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('home');
  const [showMore, setShowMore] = useState(false);

  const mainNavItems = [
    { id: 'home', name: t('home'), icon: Home, href: '#home', color: 'text-blue-600' },
    { id: 'services', name: t('services'), icon: Calendar, href: '#services', color: 'text-green-600' },
    { id: 'live', name: t('live'), icon: Radio, href: '#live', color: 'text-red-600' },
    { id: 'bible', name: t('bibleStudy'), icon: BookOpen, href: '#bible-study', color: 'text-purple-600' },
    { id: 'more', name: t('more'), icon: Menu, href: '#', color: 'text-gray-600' }
  ];

  const moreItems = [
    { name: t('branches'), icon: Map, href: '#branches' },
    { name: t('aboutUs'), icon: Users, href: '#about' },
    { name: t('ourMinistries'), icon: Heart, href: '#ministries' },
    { name: t('give'), icon: Gift, href: '#give' }
  ];

  const handleNavClick = (id: string, href: string) => {
    if (id === 'more') {
      setShowMore(!showMore);
    } else {
      setActiveTab(id);
      setShowMore(false);
      window.location.hash = href;
    }
  };

  return (
    <>
      {/* More Menu Overlay */}
      <AnimatePresence>
        {showMore && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMore(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="md:hidden fixed bottom-20 left-4 right-4 z-50 bg-white rounded-3xl shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">More Options</h3>
                <button onClick={() => setShowMore(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <X size={18} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {moreItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setShowMore(false)}
                    className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <item.icon size={24} className="text-[#1877f2]" />
                    </div>
                    <span className="text-xs font-bold text-gray-700 text-center">{item.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl pb-safe">
        <div className="relative">
          {/* Active Indicator */}
          <motion.div
            layoutId="activeTab"
            className="absolute top-0 left-0 h-1 bg-[#1877f2] rounded-full"
            style={{
              width: '20%',
              left: `${mainNavItems.findIndex(item => item.id === activeTab) * 20}%`
            }}
          />
          
          <div className="grid grid-cols-5 h-16">
            {mainNavItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.href)}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center justify-center gap-1 relative"
              >
                <motion.div
                  animate={{
                    scale: activeTab === item.id ? 1.2 : 1,
                    y: activeTab === item.id ? -2 : 0
                  }}
                  className={`${activeTab === item.id ? item.color : 'text-gray-400'} transition-colors`}
                >
                  <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                </motion.div>
                <motion.span
                  animate={{
                    scale: activeTab === item.id ? 1 : 0.9,
                    fontWeight: activeTab === item.id ? 700 : 500
                  }}
                  className={`text-[10px] ${activeTab === item.id ? item.color : 'text-gray-500'}`}
                >
                  {item.name}
                </motion.span>
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -bottom-1 w-1 h-1 bg-[#1877f2] rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
