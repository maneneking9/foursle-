import { motion } from 'motion/react';
import { Sun, Moon, Users, Heart, BookOpen, GraduationCap, Search, Sparkles, ChevronRight } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useSite } from '../context/SiteContext';
import { cn } from '../lib/utils';
import BibleGuidance from './BibleGuidance';

export default function Services() {
  const { t } = useTranslation();
  const { isWordLight } = useSite();

  const cityLightServices = [
    {
      title: t('sundayWorship'),
      time: "10:00 AM",
      description: "A vibrant blend of contemporary and traditional worship with a relevant message for your life.",
      icon: Sun,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: t('midWeekPrayer'),
      time: "Wednesdays, 7:00 PM",
      description: "A quiet time of reflection, prayer, and intimate worship in our chapel.",
      icon: Moon,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: t('youthGathering'),
      time: "Fridays, 6:30 PM",
      description: "Dynamic worship and small groups for middle and high school students.",
      icon: Users,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: t('communityOutreach'),
      time: "Saturdays, 9:00 AM",
      description: "Serving our neighbors through local food drives and community projects.",
      icon: Heart,
      color: "bg-rose-50 text-rose-600",
    }
  ];

  const wordLightServices = [
    {
      title: t('deepExegesis'),
      time: "Sundays, 9:30 AM",
      description: t('deepExegesisSub'),
      icon: BookOpen,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: t('theologicalSeminar'),
      time: "Tuesdays, 6:00 PM",
      description: t('theologicalSeminarSub'),
      icon: GraduationCap,
      color: "bg-slate-50 text-slate-600",
    },
    {
      title: t('hermeneuticsWorkshop'),
      time: "Thursdays, 7:00 PM",
      description: t('hermeneuticsWorkshopSub'),
      icon: Search,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: t('propheticInsight'),
      time: "Saturdays, 8:00 AM",
      description: t('propheticInsightSub'),
      icon: Sparkles,
      color: "bg-amber-50 text-amber-600",
    }
  ];

  const services = isWordLight ? [...wordLightServices, ...cityLightServices] : cityLightServices;

  return (
    <section id="services" className="py-24 transition-all duration-700 relative overflow-hidden bg-white">
      {isWordLight && (
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10" 
             style={{ backgroundImage: 'radial-gradient(#9333ea 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
      )}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {isWordLight ? t('studySessions') : t('ourServices')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            {isWordLight ? t('studySessionsSub') : t('servicesSub')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border group cursor-pointer relative overflow-hidden bg-white border-gray-100 hover:border-blue-400"
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform",
                service.color
              )}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="font-semibold text-sm mb-4 text-[#1877f2]">{service.time}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 group-hover:text-blue-600 transition-colors">
                {t('learnMore')} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
              
              {/* Decorative background element */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity bg-[#1877f2]" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <BibleGuidance />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[3rem] p-10 md:p-16 text-white text-center relative overflow-hidden mb-20 bg-[#1877f2]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 italic font-serif">
              {isWordLight ? t('studyQuote') : t('worshipQuote')}
            </h3>
            <p className="text-white/90 font-medium mb-10 text-lg opacity-90">
              {isWordLight 
                ? t('studySessionsDesc')
                : t('worshipSessionsDesc')
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 rounded-2xl font-bold transition-all shadow-lg bg-white text-[#1877f2] hover:bg-blue-50">
                {isWordLight ? t('enrollInSession') : t('planYourVisit')}
              </button>
              <button className="backdrop-blur-sm border px-8 py-4 rounded-2xl font-bold transition-all bg-blue-700/50 border-blue-400/30 text-white hover:bg-blue-700">
                {isWordLight ? t('viewCurriculum') : t('watchPastServices')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* School Section */}
        <div id="school" className="mb-24 scroll-mt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{t('ourSchools')}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('ourSchoolsSub')}
              </p>
              <ul className="space-y-4">
                {["Quality Education", "Christian Values", "Community Focus", "Holistic Development"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] overflow-hidden shadow-xl bg-white"
            >
              <img 
                src="/images/Ijuru rirakinguka iyo duhimbaje Imana dufite umutima uciye bugufi.Zaburi 100-2 Mukorere Uwiteka(5).webp" 
                alt="Our School" 
                className="w-full h-auto block"
              />
            </motion.div>
          </div>
        </div>

        {/* Ministry Section */}
        <div id="ministry" className="scroll-mt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center flex-row-reverse">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:order-2"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{t('ourMinistry')}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('ourMinistrySub')}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <h4 className="font-bold mb-1 text-[#1877f2]">{t('leadership')}</h4>
                  <p className="text-xs text-gray-500">{t('leadershipSub')}</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <h4 className="font-bold mb-1 text-[#1877f2]">{t('development')}</h4>
                  <p className="text-xs text-gray-500">{t('developmentSub')}</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] overflow-hidden shadow-xl bg-white lg:order-1"
            >
              <img 
                src="/images/Ijuru rirakinguka iyo duhimbaje Imana dufite umutima uciye bugufi.Zaburi 100-2 Mukorere Uwiteka(7).webp" 
                alt="Our Ministry" 
                className="w-full h-auto block"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
