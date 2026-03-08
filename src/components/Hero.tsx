import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, Volume2, Calendar, MapPin, Users, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useSite } from '../context/SiteContext';
import { Book, Sparkles } from 'lucide-react';

export default function Hero() {
  const { t, language } = useTranslation();
  const { isWordLight } = useSite();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/Ijuru rirakinguka iyo duhimbaje Imana dufite umutima uciye bugufi.Zaburi 100-2 Mukorere Uwiteka.webp',
      title: t('heroTitle'),
      subtitle: t('heroSub')
    },
    {
      image: '/images/Ijuru rirakinguka iyo duhimbaje Imana dufite umutima uciye bugufi.Zaburi 100-2 Mukorere Uwiteka(1).webp',
      title: 'Worship Together',
      subtitle: 'Experience God\'s presence'
    },
    {
      image: '/images/Ijuru rirakinguka iyo duhimbaje Imana dufite umutima uciye bugufi.Zaburi 100-2 Mukorere Uwiteka(2).webp',
      title: 'Community & Fellowship',
      subtitle: 'Connect with believers'
    },
    {
      image: '/images/Ijuru rirakinguka iyo duhimbaje Imana dufite umutima uciye bugufi.Zaburi 100-2 Mukorere Uwiteka(3).webp',
      title: 'Youth Ministry',
      subtitle: 'Building the next generation'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const speakWelcome = () => {
    const utterance = new SpeechSynthesisUtterance(`${t('welcome')}. ${t('heroTitle')}. ${t('heroSub')}`);
    utterance.lang = language === 'KIN' ? 'rw-RW' : language === 'FR' ? 'fr-FR' : language === 'KIS' ? 'sw-KE' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[120px] opacity-80 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[120px] opacity-80 translate-y-1/4 -translate-x-1/4" />
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'linear-gradient(#1877f2 0.5px, transparent 0.5px), linear-gradient(90deg, #1877f2 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-0 md:px-6 grid lg:grid-cols-2 gap-0 md:gap-16 items-center pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1 text-center lg:text-left px-6 md:px-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-6 mx-auto lg:mx-0"
          >
            <Heart size={16} className="text-red-500" />
            {t('welcome')}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-6 mx-auto lg:mx-0 max-w-lg lg:max-w-none"
          >
            {t('heroTitle')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-lg leading-relaxed mx-auto lg:mx-0"
          >
            {t('heroSub')}
          </motion.p>

          {/* Interactive Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 max-w-md mx-auto lg:mx-0"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-3 md:p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm border border-blue-200"
            >
              <Users size={20} className="text-blue-600 mx-auto mb-1 md:mb-2" />
              <div className="text-xl md:text-2xl font-bold text-gray-900">2.5K+</div>
              <div className="text-[10px] md:text-xs text-gray-500">Members</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-3 md:p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm border border-green-200"
            >
              <Calendar size={20} className="text-green-600 mx-auto mb-1 md:mb-2" />
              <div className="text-xl md:text-2xl font-bold text-gray-900">18</div>
              <div className="text-[10px] md:text-xs text-gray-500">Years</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-3 md:p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm border border-purple-200"
            >
              <MapPin size={20} className="text-purple-600 mx-auto mb-1 md:mb-2" />
              <div className="text-xl md:text-2xl font-bold text-gray-900">5</div>
              <div className="text-[10px] md:text-xs text-gray-500">Locations</div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#1877f2] to-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold hover:shadow-xl transition-all shadow-lg shadow-blue-200 flex items-center gap-2 group"
            >
              {t('joinLive')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 border-2 border-gray-200 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2 shadow-md"
            >
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-600">
                <Play size={14} fill="currentColor" />
              </div>
              <span className="hidden md:inline">{t('viewServices')}</span>
              <span className="md:hidden text-sm">Watch</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative order-1 lg:order-2 w-full"
        >
          {/* Image Slider */}
          <div className="relative z-10 rounded-none md:rounded-[2rem] overflow-hidden shadow-none md:shadow-2xl bg-white border-0 md:border-4 md:border-white">
            <div className="relative h-[400px] md:h-[550px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>
              
              {/* Slide Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 z-10">
                <motion.h3
                  key={`title-${currentSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-2xl font-bold mb-2"
                >
                  {slides[currentSlide].title}
                </motion.h3>
                <motion.p
                  key={`subtitle-${currentSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-white/90 text-sm"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              >
                <ChevronLeft size={24} className="text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              >
                <ChevronRight size={24} className="text-gray-800" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-white w-8'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Floating Service Card */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-[220px]"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <p className="text-xs font-bold text-green-600 uppercase">{t('nextService')}</p>
            </div>
            <p className="text-sm font-bold text-gray-900 mb-1">{t('sundayMorning')}</p>
            <p className="text-xs text-gray-500 mb-2">10:00 AM • {t('mainSanctuary')}</p>
            <div className="flex items-center gap-1">
              <Users size={12} className="text-gray-400" />
              <span className="text-xs text-gray-400">250+ attending</span>
            </div>
          </motion.div>

          {/* Floating Prayer Card */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="hidden md:block absolute -top-6 -right-6 z-20 bg-white p-4 rounded-xl shadow-lg border border-gray-100 max-w-[180px]"
          >
            <div className="flex items-center gap-2 mb-2">
              <Heart size={16} className="text-red-500" />
              <p className="text-xs font-bold text-gray-700">Prayer Request</p>
            </div>
            <p className="text-xs text-gray-500">Submit your prayer needs</p>
            <button className="mt-2 text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium hover:bg-blue-100 transition-colors">
              Send Prayer
            </button>
          </motion.div>

          {/* Background decorative elements */}
          <div className="hidden md:block absolute -top-8 -right-8 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl" />
          <div className="hidden md:block absolute -bottom-8 -left-8 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl" />
        </motion.div>
      </div>

      {/* Interactive Image Gallery - Hidden on Mobile */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-2xl overflow-hidden shadow-xl border-4 cursor-pointer transition-all ${
                index === currentSlide ? 'border-blue-500 ring-4 ring-blue-200' : 'border-white'
              }`}
            >
              <div className="relative group">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm font-bold">{slide.title}</p>
                </div>
                {index === currentSlide && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator - Hidden on Mobile */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center"
        >
          <div className="animate-bounce w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-blue-600 rounded-full" />
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">{t('scrollToExplore')}</span>
        </motion.div>
      </div>
    </section>
  );
}
