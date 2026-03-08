import { motion } from 'motion/react';
import { Baby, Users, Megaphone, GraduationCap, HeartHandshake, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { useTranslation } from '../context/LanguageContext';
import { cn } from '../lib/utils';

export default function Ministries() {
  const { isWordLight } = useSite();
  const { t } = useTranslation();

  const ministries = [
    {
      id: 'children',
      title: t('childrensMinistry'),
      description: "We have various programs for children (nursery, Sunday school, VBS, etc.) aimed at nurturing young hearts in the way of the Lord.",
      icon: Baby,
      image: "/images/Ijuru rirakinguka iyo duhimbaje Imana dufite umutima uciye bugufi.Zaburi 100-2 Mukorere Uwiteka(4).webp",
      color: "bg-blue-500"
    },
    {
      id: 'youth',
      title: t('youthMinistry'),
      description: "Rooted in faith and centered on Christ, the ministry provides a safe and nurturing space where youth can connect with one another and explore their relationship with God.",
      icon: Users,
      image: "/images/Ijuru rirakinguka iyo duhimbaje Imana dufite umutima uciye bugufi.Zaburi 100-2 Mukorere Uwiteka(7).webp",
      color: "bg-purple-500"
    },
    {
      id: 'evangelism',
      title: t('evangelismMinistry'),
      description: "Committed to spreading the Gospel message and sharing God’s love with the community through outreach, missions, and discipleship programs.",
      icon: Megaphone,
      image: "/images/Ijuru rirakinguka iyo duhimbaje Imana dufite umutima uciye bugufi.Zaburi 100-2 Mukorere Uwiteka.webp",
      color: "bg-emerald-500"
    },
    {
      id: 'education',
      title: t('eduLeadershipMinistry'),
      description: "Aimed at fostering spiritual growth, providing biblical teaching, discipleship, and leadership training to equip members with divine knowledge.",
      icon: GraduationCap,
      image: "/images/Ijuru rirakinguka iyo duhimbaje Imana dufite umutima uciye bugufi.Zaburi 100-2 Mukorere Uwiteka(5).webp",
      color: "bg-amber-500"
    },
    {
      id: 'mercy',
      title: t('mercyMinistry'),
      description: "Reflecting God’s love and compassion, serving the physical, emotional, and financial needs of the less fortunate within the church and community.",
      icon: HeartHandshake,
      image: "/images/Ijuru rirakinguka iyo duhimbaje Imana dufite umutima uciye bugufi.Zaburi 100-2 Mukorere Uwiteka(1).webp",
      color: "bg-rose-500"
    },
    {
      id: 'counseling',
      title: t('counselingMinistry'),
      description: "Offers compassionate, Christ-centered guidance and support to individuals, couples, and families facing personal, relational, or spiritual challenges.",
      icon: MessageSquare,
      image: "/images/Ijuru rirakinguka iyo duhimbaje Imana dufite umutima uciye bugufi.Zaburi 100-2 Mukorere Uwiteka(3).webp",
      color: "bg-indigo-500"
    }
  ];

  return (
    <section id="ministries" className={cn("py-24 transition-all duration-700", isWordLight ? "bg-slate-50 dark:bg-slate-950" : "bg-white dark:bg-slate-900")}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles size={14} />
            {t('ourMinistries')}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
          >
            Serving Together in Faith
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg"
          >
            {t('ministriesSub')}
          </motion.p>
        </div>

        {/* Advanced "Table" Layout (Bento Grid Style) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry, i) => (
            <motion.div
              key={ministry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all h-full flex flex-col"
            >
              {/* Image Header */}
              <div className="h-56 overflow-hidden relative bg-slate-100">
                <img 
                  src={ministry.image} 
                  alt={ministry.title} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className={cn(
                  "absolute top-6 left-6 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg",
                  ministry.color
                )}>
                  <ministry.icon size={24} />
                </div>
              </div>

              {/* Content "Table Cell" */}
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-emerald-600 transition-colors">
                  {ministry.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-1">
                  {ministry.description}
                </p>
                
                <div className="pt-6 border-t border-slate-50 dark:border-slate-700 mt-auto">
                  <button className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:gap-4 transition-all group/btn">
                    {t('learnMoreJoin')}
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Advanced Decorative Element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Advanced Feature: Quick Stats Table */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 overflow-hidden rounded-[3rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl"
        >
          <div className="p-8 md:p-12 bg-emerald-600 text-white">
            <h3 className="text-2xl font-bold mb-2">{t('ministryImpact')}</h3>
            <p className="text-emerald-100 opacity-80">Our collective efforts in numbers</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400">{t('ministryName')}</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400">{t('focusArea')}</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400">{t('meetingFreq')}</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400">{t('status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {ministries.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white", m.color)}>
                          <m.icon size={16} />
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{m.title}</span>
                      </div>
                    </td>
                    <td className="p-6 text-sm text-slate-600 dark:text-slate-400">Community & Growth</td>
                    <td className="p-6 text-sm text-slate-600 dark:text-slate-400">Weekly</td>
                    <td className="p-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        {t('active')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
