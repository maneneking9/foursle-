import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, Users, MessageCircle, Share2, Facebook, Youtube, Instagram, Twitter, Languages, Volume2, Sparkles } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { GoogleGenAI } from "@google/genai";

import { useSite } from '../context/SiteContext';
import { BookOpen, GraduationCap } from 'lucide-react';

export default function LiveStream() {
  const { t, language } = useTranslation();
  const { isWordLight } = useSite();
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationText, setTranslationText] = useState('');
  const [activeTab, setActiveTab] = useState<'live' | 'videos' | 'images'>('live');

  const recentVideos = [
    { id: '1', title: 'The Power of Prayer', date: 'Mar 1, 2026', thumbnail: 'https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_3.png' },
    { id: '2', title: 'Walking in Grace', date: 'Feb 22, 2026', thumbnail: 'https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_7.png' },
    { id: '3', title: 'Community & Faith', date: 'Feb 15, 2026', thumbnail: 'https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_0.png' },
  ];

  const photoHighlights = [
    'https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_0.png',
    'https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_1.png',
    'https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_3.png',
    'https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_4.png'
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook Live', color: 'bg-[#1877F2]', href: '#' },
    { icon: Youtube, label: 'YouTube Live', color: 'bg-[#FF0000]', href: 'https://www.youtube.com/@FoursquareCityLight' },
    { icon: Instagram, label: 'Instagram', color: 'bg-[#E4405F]', href: '#' },
    { icon: Twitter, label: 'Twitter', color: 'bg-[#1DA1F2]', href: '#' }
  ];

  const handleVoiceTranslation = async () => {
    if (isTranslating) {
      setIsTranslating(false);
      setTranslationText('');
      return;
    }

    setIsTranslating(true);
    await performTranslation();
  };

  const performTranslation = async () => {
    setTranslationText(t('translating'));

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Simulate a real-time translation of a church sermon for a user who speaks ${language}. 
        Provide a short, powerful 2-sentence summary of a typical Foursquare sermon about faith, community, and the love of Jesus in ${language}. 
        Make it feel like a live transcript from a service at CityLight Church.`,
      });
      
      setTranslationText(response.text || '');
    } catch (error) {
      console.error('Translation error:', error);
      setTranslationText('Error starting translation. Please try again.');
    }
  };

  useEffect(() => {
    if (isTranslating) {
      performTranslation();
    }
  }, [language]);

  if (isWordLight) {
    return (
      <section id="live" className="py-24 bg-white text-slate-900 overflow-hidden transition-colors border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-2/3 w-full">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-600/20">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black tracking-tight">Word Study <span className="text-purple-600">Live</span></h2>
                    <p className="text-slate-500 font-medium">Deep Dive into the Scriptures</p>
                  </div>
                </div>

                <div className="flex items-center bg-slate-100 p-1 rounded-2xl">
                  <button 
                    onClick={() => setActiveTab('live')}
                    className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'live' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Live
                  </button>
                  <button 
                    onClick={() => setActiveTab('videos')}
                    className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'videos' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Archive
                  </button>
                  <button 
                    onClick={() => setActiveTab('images')}
                    className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'images' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Photos
                  </button>
                </div>
              </div>

              <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-100 bg-black mb-10 group">
                <AnimatePresence mode="wait">
                  {activeTab === 'live' && (
                    <motion.div
                      key="live-word"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full"
                    >
                      <iframe 
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/live_stream?channel=UCv_S27K_K_K_K_K_K_K_K_K&autoplay=1&mute=1" 
                        title="Word Light Study Session"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                      <div className="absolute top-6 right-6 px-4 py-2 bg-purple-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">
                        Live Study
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'videos' && (
                    <motion.div
                      key="videos-word"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full bg-slate-900 p-8 overflow-y-auto"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recentVideos.map((video) => (
                          <div key={video.id} className="group cursor-pointer">
                            <div className="relative rounded-2xl overflow-hidden mb-3 bg-slate-800 shadow-lg">
                              <img 
                                src={video.thumbnail} 
                                alt={video.title} 
                                className="w-full h-auto block" 
                                referrerPolicy="no-referrer" 
                                style={{ imageRendering: 'auto' }}
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Youtube size={40} className="text-white" />
                              </div>
                            </div>
                            <h4 className="text-white font-bold text-sm mb-1">{video.title}</h4>
                            <p className="text-slate-400 text-[10px] uppercase tracking-widest">{video.date}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'images' && (
                    <motion.div
                      key="images-word"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full bg-slate-900 p-8 overflow-y-auto"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {photoHighlights.map((url, i) => (
                          <div key={i} className="rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-800 shadow-lg">
                            <img 
                              src={url} 
                              alt="Highlight" 
                              className="w-full h-auto block" 
                              referrerPolicy="no-referrer" 
                              style={{ imageRendering: 'auto' }}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition-all flex items-center gap-2 shadow-xl shadow-purple-600/20">
                  <GraduationCap size={20} />
                  Download Study Guide
                </button>
                <button className="px-8 py-4 bg-slate-100 text-slate-900 rounded-2xl font-bold hover:bg-slate-200 transition-all border border-slate-200">
                  View Reference Verses
                </button>
              </div>
            </div>

            <div className="lg:w-1/3 w-full space-y-10">
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles size={18} className="text-purple-600" />
                  Study Notes
                </h3>
                <div className="space-y-6">
                  <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-purple-600 uppercase mb-2 tracking-widest">Key Verse</p>
                    <p className="text-sm italic font-serif leading-relaxed text-slate-700">"For the word of God is alive and active. Sharper than any double-edged sword..."</p>
                    <p className="text-[10px] text-slate-400 mt-3 font-bold">— Hebrews 4:12</p>
                  </div>
                  <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-purple-600 uppercase mb-2 tracking-widest">Discussion Points</p>
                    <ul className="text-sm space-y-3 text-slate-600">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 shrink-0" />
                        Historical Context of the Passage
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 shrink-0" />
                        Practical Application in Daily Life
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 shrink-0" />
                        Cross-references in the Gospels
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Join the Conversation</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, i) => (
                    <a key={i} href={social.href} className={`w-12 h-12 ${social.color} rounded-2xl flex items-center justify-center text-white shadow-lg hover:scale-110 hover:-rotate-6 transition-all`}>
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="live" className="py-24 bg-white dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden transition-colors border-y border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-rose-600 rounded-full text-[10px] font-bold uppercase tracking-wider animate-pulse text-white">
                  <Radio size={12} />
                  {t('liveNow')}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{t('mediaExplorer')}</h2>
              </div>
              
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                <button 
                  onClick={() => setActiveTab('live')}
                  className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'live' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {t('live')}
                </button>
                <button 
                  onClick={() => setActiveTab('videos')}
                  className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'videos' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {t('recentSermons')}
                </button>
                <button 
                  onClick={() => setActiveTab('images')}
                  className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'images' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {t('photoHighlights')}
                </button>
              </div>
            </div>
            
            <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-black group mb-8">
              <AnimatePresence mode="wait">
                {activeTab === 'live' && (
                  <motion.div
                    key="live"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <iframe 
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/live_stream?channel=UCv_S27K_K_K_K_K_K_K_K_K&autoplay=1&mute=1" 
                      title="Foursquare City Light Live Stream"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </motion.div>
                )}

                {activeTab === 'videos' && (
                  <motion.div
                    key="videos"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full bg-slate-900 p-8 overflow-y-auto"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {recentVideos.map((video) => (
                        <div key={video.id} className="group cursor-pointer">
                          <div className="relative rounded-2xl overflow-hidden mb-3 bg-slate-800 shadow-lg">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title} 
                              className="w-full h-auto block" 
                              referrerPolicy="no-referrer" 
                              style={{ imageRendering: 'auto' }}
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Youtube size={40} className="text-white" />
                            </div>
                          </div>
                          <h4 className="text-white font-bold text-sm mb-1">{video.title}</h4>
                          <p className="text-slate-400 text-[10px] uppercase tracking-widest">{video.date}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'images' && (
                  <motion.div
                    key="images"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full bg-slate-900 p-8 overflow-y-auto"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {photoHighlights.map((url, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-800 shadow-lg">
                          <img 
                            src={url} 
                            alt="Highlight" 
                            className="w-full h-auto block" 
                            referrerPolicy="no-referrer" 
                            style={{ imageRendering: 'auto' }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 text-center">
                      <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/10">
                        {t('viewGallery')}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {activeTab === 'live' && (
                <div className="absolute top-6 right-6 z-30">
                  <button 
                    onClick={handleVoiceTranslation}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      isTranslating 
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                        : 'bg-white/90 backdrop-blur-md text-slate-600 hover:bg-white'
                    }`}
                  >
                    <Languages size={16} />
                    {isTranslating ? t('voiceTranslation') : t('enableTranslation')}
                  </button>
                </div>
              )}

              <AnimatePresence>
                {isTranslating && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-20 left-6 right-6 p-6 bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-2xl z-20"
                  >
                    <div className="flex items-center gap-2 mb-3 text-emerald-600">
                      <Sparkles size={16} className="animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{t('voiceTranslation')}</span>
                      <div className="flex gap-1 ml-auto">
                        <button 
                          onClick={() => {
                            const utterance = new SpeechSynthesisUtterance(translationText);
                            utterance.lang = language === 'KIN' ? 'rw-RW' : language === 'FR' ? 'fr-FR' : language === 'KIS' ? 'sw-KE' : language === 'ES' ? 'es-ES' : 'en-US';
                            window.speechSynthesis.speak(utterance);
                          }}
                          className="p-1 hover:bg-slate-100 rounded transition-colors mr-2"
                          title="Speak Translation"
                        >
                          <Volume2 size={14} />
                        </button>
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-1 h-3 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm md:text-base font-medium leading-relaxed text-slate-800">
                      {translationText}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500">
                      <Volume2 size={12} />
                      {t('translationNotice')}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-10">
                <div className="flex items-center gap-2 text-sm font-medium bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 text-slate-900">
                  <Users size={16} className="text-emerald-600" />
                  <span>1.2k {t('watching')}</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/60 backdrop-blur-md rounded-lg hover:bg-white/80 transition-colors border border-white/30 text-slate-900 shadow-sm">
                    <MessageCircle size={18} />
                  </button>
                  <button className="p-2 bg-white/60 backdrop-blur-md rounded-lg hover:bg-white/80 transition-colors border border-white/30 text-slate-900 shadow-sm">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-all group"
                >
                  <div className={`w-8 h-8 ${social.color} rounded-lg flex items-center justify-center text-white shadow-lg`}>
                    <social.icon size={16} />
                  </div>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold mb-4 text-emerald-600">Current Series</h3>
              <h4 className="text-2xl font-bold mb-2 text-slate-900">Walking in Faith</h4>
              <p className="text-slate-600 leading-relaxed">
                Join Pastor David as we explore what it means to live a life of radical faith in a modern world.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Live Interaction</h3>
              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Live Prayer Request</p>
                    <p className="text-[10px] text-slate-500">Our intercessors are standing by</p>
                  </div>
                </div>
                <button className="w-full py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                  Submit Request
                </button>
              </div>

              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Virtual Lobby</p>
                    <p className="text-[10px] text-slate-500">Connect with other viewers</p>
                  </div>
                </div>
                <button className="w-full py-3 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-300 transition-all border border-slate-300">
                  Join Lobby
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
