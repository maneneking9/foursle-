import { motion } from 'motion/react';
import { Camera, ExternalLink, Library, FileText, Book, Globe, Play, Languages, Sparkles, Clock } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const images = [
  {
    url: "https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_0.png",
    title: "Sunday Celebration",
    category: "Worship"
  },
  {
    url: "https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_1.png",
    title: "Community Fellowship",
    category: "Community"
  },
  {
    url: "https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_3.png",
    title: "Prayer & Worship",
    category: "Spiritual"
  },
  {
    url: "https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_4.png",
    title: "Deep Intercession",
    category: "Prayer"
  },
  {
    url: "https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_5.png",
    title: "Men's Ministry",
    category: "Community"
  },
  {
    url: "https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_8.png",
    title: "Worship Team",
    category: "Music"
  }
];

import { useSite } from '../context/SiteContext';

export default function Gallery() {
  const { t } = useTranslation();
  const { isWordLight } = useSite();

  if (isWordLight) {
    return (
      <section id="gallery" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600/10 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-3xl mb-6 rotate-6">
              <Library size={40} />
            </div>
            <h2 className="text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">The Word <span className="text-purple-600 dark:text-purple-400">Archive</span></h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium text-lg">A curated repository of biblical wisdom, study guides, and theological resources.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { title: "Genesis Deep Dive", type: "Study Guide", date: "Mar 2026", icon: Book },
              { title: "The Parables", type: "Sermon Notes", date: "Feb 2026", icon: FileText },
              { title: "Grace vs Law", type: "Theology Paper", date: "Jan 2026", icon: Library },
              { title: "Acts of Apostles", type: "Interactive Map", date: "Dec 2025", icon: Globe },
              { title: "Prophetic Books", type: "Video Series", date: "Nov 2025", icon: Play },
              { title: "Biblical Hebrew", type: "Language Basics", date: "Oct 2025", icon: Languages },
              { title: "The Tabernacle", type: "3D Model", date: "Sep 2025", icon: Sparkles },
              { title: "Church History", type: "Timeline", date: "Aug 2025", icon: Clock },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-purple-500 transition-all group cursor-pointer shadow-sm hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition-all mb-8 relative z-10">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{item.title}</h3>
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">{item.type}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_5.png",
              "https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_7.png",
              "https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_8.png",
              "https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_0.png"
            ].map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-slate-100 dark:bg-slate-800"
              >
                <img 
                  src={url} 
                  alt="Study Session" 
                  className="w-full h-auto block" 
                  referrerPolicy="no-referrer" 
                  style={{ imageRendering: 'auto' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('churchGallery')}</h2>
            <p className="text-slate-600 dark:text-slate-400">{t('capturingMoments')}</p>
          </div>
          <div className="hidden md:flex gap-2">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600">
              <Camera size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group rounded-[2rem] overflow-hidden shadow-lg cursor-pointer bg-slate-100 dark:bg-slate-800"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-auto block"
                referrerPolicy="no-referrer"
                style={{ imageRendering: 'auto' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">{img.category}</span>
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-xl font-bold">{img.title}</h3>
                  <ExternalLink size={20} className="text-white/70" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm">
            View More Photos
          </button>
        </div>
      </div>
    </section>
  );
}
