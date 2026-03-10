import { motion } from 'motion/react';
import { Play, Download, FileText, Video, Headphones, Calendar, Book, Youtube, FileStack, Eye } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { useTranslation } from '../context/LanguageContext';
import { cn } from '../lib/utils';

export default function SermonsAndResources() {
  const { isWordLight } = useSite();
  const { t } = useTranslation();

  const sermons = [
    {
      title: "The Power of Faith",
      speaker: "Prof. Fidèle Masengo",
      date: "March 1, 2026",
      duration: "45:20",
      image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=400&auto=format&fit=crop",
      category: "Faith"
    },
    {
      title: "Walking in Light",
      speaker: "Pst. Solange Masengo",
      date: "February 22, 2026",
      duration: "38:15",
      image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=400&auto=format&fit=crop",
      category: "Spiritual Growth"
    },
    {
      title: "Community & Unity",
      speaker: "Rev. Roger Brubeck",
      date: "February 15, 2026",
      duration: "52:10",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop",
      category: "Community"
    }
  ];

  const books = [
    {
      title: "THE CALL TO LEADERSHIP: Raising Spiritual Leaders for Today's Christian Ministry",
      author: "Prof. Bishop Fidèle MASENGO",
      views: 342,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "MINDSHIFT: Divine Power for Radical Transformation",
      author: "Prof. Bishop Fidèle MASENGO",
      views: 567,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "BEYOND BOUNDARIES: Activating the impossible through faith",
      author: "Prof. Bishop Fidèle MASENGO",
      views: 2234,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "THE MARRIAGE OF YOUR DREAMS: Secrets to a successful marriage",
      author: "Prof. Bishop Fidèle MASENGO",
      views: 189,
      image: "https://images.unsplash.com/photo-1515165592879-075fe207c77f?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "INTIMACY WITH GOD: Stepping stones for awakening and empowering healthy spiritual leaders",
      author: "Prof. Bishop Fidèle MASENGO",
      views: 423,
      image: "https://images.unsplash.com/photo-1509266272358-7701da638078?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "Au-delà des limites: Activer l'impossible à travers la foi",
      author: "Prof. Bishop Fidèle MASENGO",
      views: 298,
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=400&auto=format&fit=crop"
    }
  ];

  const youtubeVideos = [
    {
      title: "Sunday Service - March 2026",
      views: "1.2K",
      duration: "1:30:00",
      image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "Bible Study Session",
      views: "856",
      duration: "45:00",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "Youth Conference 2026",
      views: "2.1K",
      duration: "2:15:00",
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=400&auto=format&fit=crop"
    }
  ];

  const magazines = [
    {
      title: "Church Monthly Report - March 2026",
      type: "PDF",
      size: "2.4 MB"
    },
    {
      title: "Youth Ministry Newsletter",
      type: "PDF",
      size: "1.1 MB"
    },
    {
      title: "Annual Report 2025",
      type: "PDF",
      size: "5.6 MB"
    },
    {
      title: "Kids Church Materials",
      type: "PDF",
      size: "3.2 MB"
    }
  ];

  const resources = [
    {
      title: "Bible Study Guide: Genesis",
      type: "PDF",
      size: "2.4 MB",
      icon: FileText
    },
    {
      title: "Prayer Journal Template",
      type: "DOCX",
      size: "1.1 MB",
      icon: FileText
    },
    {
      title: "Worship Playlist 2026",
      type: "Audio",
      size: "128 MB",
      icon: Headphones
    }
  ];

  return (
    <div className="space-y-24">
      {/* Sermons Section */}
      <section id="sermons" className={cn("py-24 transition-all duration-700", isWordLight ? "bg-white dark:bg-slate-900" : "bg-slate-50 dark:bg-slate-950")}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('latestSermons')}</h2>
              <p className="text-slate-600 dark:text-slate-400">{t('sermonsSub')}</p>
            </div>
            <button className={cn(
              "px-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg",
              isWordLight ? "bg-purple-600 hover:bg-purple-700 shadow-purple-600/20" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
            )}>
              {t('viewAllSermons')}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sermons.map((sermon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-700 group hover:shadow-2xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={sermon.image} alt={sermon.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900">
                      <Play size={20} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                    {sermon.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                    <Calendar size={12} />
                    {sermon.date}
                    <span className="mx-1">•</span>
                    {sermon.duration}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">{sermon.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{sermon.speaker}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 bg-slate-50 dark:bg-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-600 transition-all flex items-center justify-center gap-2">
                      <Video size={14} /> {t('watch')}
                    </button>
                    <button className="flex-1 py-2.5 bg-slate-50 dark:bg-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-600 transition-all flex items-center justify-center gap-2">
                      <Headphones size={14} /> {t('listen')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className={cn("py-24 transition-all duration-700", isWordLight ? "bg-slate-50 dark:bg-slate-950" : "bg-white dark:bg-slate-900")}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('studyResources')}</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t('sermonsSub')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 hover:shadow-xl transition-all group"
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
                  isWordLight ? "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                )}>
                  <resource.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{resource.title}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{resource.type} • {resource.size}</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all">
                  <Download size={18} />
                </button>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className={cn(
              "px-8 py-4 rounded-2xl font-bold text-white transition-all shadow-lg",
              isWordLight ? "bg-purple-600 hover:bg-purple-700 shadow-purple-600/20" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
            )}>
              {t('viewAllResources')}
            </button>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className={cn("py-24 transition-all duration-700", isWordLight ? "bg-white dark:bg-slate-900" : "bg-slate-50 dark:bg-slate-950")}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4",
                isWordLight ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-700"
              )}>
                <Book size={14} />
                Books
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Spiritual Books</h2>
              <p className="text-slate-600 dark:text-slate-400">Explore our collection of spiritual resources to support your faith journey and spiritual growth.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-700 group hover:shadow-2xl transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white/80 text-xs font-bold mb-1">
                      <Eye size={12} />
                      {book.views} views
                    </div>
                    <h3 className="text-lg font-bold text-white line-clamp-2">{book.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">by {book.author}</p>
                  <button className={cn(
                    "w-full py-3 rounded-xl font-bold text-white transition-all",
                    isWordLight ? "bg-purple-600 hover:bg-purple-700" : "bg-emerald-600 hover:bg-emerald-700"
                  )}>
                    Read Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section id="youtube" className={cn("py-24 transition-all duration-700", isWordLight ? "bg-slate-50 dark:bg-slate-950" : "bg-white dark:bg-slate-900")}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4",
                isWordLight ? "bg-red-100 text-red-700" : "bg-red-100 text-red-700"
              )}>
                <Youtube size={14} />
                YouTube
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Video Resources</h2>
              <p className="text-slate-600 dark:text-slate-400">Watch our latest sermons, Bible studies, and church events on YouTube.</p>
            </div>
            <button className="px-6 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
              Visit YouTube Channel
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {youtubeVideos.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-700 group hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={video.image} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-red-600 transition-colors">{video.title}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
                    <Eye size={14} />
                    {video.views} views
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Magazines & Reports Section */}
      <section id="magazines" className={cn("py-24 transition-all duration-700", isWordLight ? "bg-white dark:bg-slate-900" : "bg-slate-50 dark:bg-slate-950")}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4",
              isWordLight ? "bg-blue-100 text-blue-700" : "bg-blue-100 text-blue-700"
            )}>
              <FileStack size={14} />
              Magazines & Reports
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Church Publications</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Download our church magazines, monthly reports, and ministry materials.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {magazines.map((magazine, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 hover:shadow-xl transition-all group"
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
                  isWordLight ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white" : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                )}>
                  <FileStack size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">{magazine.title}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{magazine.type} • {magazine.size}</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Download size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
