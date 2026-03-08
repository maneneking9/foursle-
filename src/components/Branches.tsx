import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Navigation, X, Clock, User, Users, Globe, Facebook, Instagram, Sparkles } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const branches = [
  {
    id: 'main',
    name: "Foursquare City Light",
    address: "123 Grace Way, Faith City, ST 12345",
    phone: "(555) 123-4567",
    email: "main@gracecommunity.org",
    image: "https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_0.png",
    pastor: "Rev. John Doe",
    services: ["Sunday: 8:00 AM, 10:00 AM", "Wednesday: 7:00 PM"],
    description: "Foursquare City Light is our vibrant urban campus, dedicated to bringing the light of the Gospel to the heart of the city.",
    mission: "To illuminate every corner of our city with the love and truth of Jesus Christ through active service and passionate worship.",
    history: "Founded in 1992, City Light began as a small prayer group in a downtown storefront and has grown into a beacon of hope for thousands.",
    worshippers: "2,500+",
    socials: { facebook: "#", instagram: "#", web: "#" }
  },
  {
    id: 'north',
    name: "Word Light",
    address: "456 Hope Blvd, Hope Valley, ST 12346",
    phone: "(555) 987-6543",
    email: "north@gracecommunity.org",
    image: "https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_1.png",
    pastor: "Pastor Sarah Smith",
    services: ["Sunday: 9:30 AM", "Thursday: 6:30 PM"],
    description: "Word Light focuses on the transformative power of the Word of God, illuminating lives through deep study and fellowship.",
    mission: "To build a foundation of faith through the deep study of God's Word and to empower believers to live out their calling.",
    history: "Established in 2005, Word Light was born from a vision to create a center for biblical excellence and spiritual growth in Hope Valley.",
    worshippers: "1,200+",
    socials: { facebook: "#", instagram: "#", web: "#" }
  },
  {
    id: 'west',
    name: "Westside Community Center",
    address: "789 Unity Ave, Westside, ST 12347",
    phone: "(555) 456-7890",
    email: "westside@gracecommunity.org",
    image: "https://storage.googleapis.com/file-extract.appspot.com/ais-dev-x3lbrezhaqdwtwathdjn4e-493378201539.europe-west2.run.app/1741356505706_3.png",
    pastor: "Evangelist Mark Wilson",
    services: ["Sunday: 11:00 AM", "Friday: 7:00 PM"],
    description: "Westside is our newest branch, dedicated to urban mission and providing a safe space for the local community.",
    mission: "To serve the marginalized and provide a sanctuary of peace and unity for the diverse community of Westside.",
    history: "Opened in 2018, Westside was converted from an old warehouse into a thriving community center and house of worship.",
    worshippers: "800+",
    socials: { facebook: "#", instagram: "#", web: "#" }
  }
];

import { useSite } from '../context/SiteContext';

export default function Branches() {
  const { t } = useTranslation();
  const { setSite } = useSite();
  const [selectedBranch, setSelectedBranch] = useState<typeof branches[0] | null>(null);

  const handleEnterBranch = (branchId: string) => {
    if (branchId === 'north') {
      setSite('WordLight');
    } else if (branchId === 'main') {
      setSite('CityLight');
    }
    setSelectedBranch(null);
  };

  return (
    <section id="branches" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 dark:text-white mb-4"
          >
            {t('ourBranches')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            {t('findBranch')}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {branches.map((branch, i) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-xl transition-all group cursor-pointer"
              onClick={() => setSelectedBranch(branch)}
            >
                <div className="h-48 overflow-hidden relative bg-slate-200">
                  <img 
                    src={branch.image} 
                    alt={branch.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    style={{ imageRendering: 'auto' }}
                  />
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Map link logic could go here
                    }}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-emerald-600 shadow-lg hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    <Navigation size={18} />
                  </button>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">{branch.name}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <MapPin size={18} className="text-emerald-600 shrink-0" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone size={18} className="text-emerald-600 shrink-0" />
                    <span>{branch.phone}</span>
                  </div>
                </div>
                <button className="w-full mt-8 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all">
                  {t('branchDetails')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Branch Details Modal */}
        <AnimatePresence>
          {selectedBranch && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={() => setSelectedBranch(null)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white rounded-[3rem] overflow-hidden shadow-2xl max-w-2xl w-full border border-slate-100"
              >
                <button 
                  onClick={() => setSelectedBranch(null)}
                  className="absolute top-6 right-6 z-20 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center text-slate-900 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 h-64 md:h-auto overflow-hidden bg-slate-200">
                    <img 
                      src={selectedBranch.image} 
                      alt={selectedBranch.name} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                      style={{ imageRendering: 'auto' }}
                    />
                  </div>
                  <div className="md:w-1/2 p-8 md:p-10 max-h-[80vh] overflow-y-auto">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedBranch.name}</h3>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 text-emerald-600 font-medium">
                        <User size={16} />
                        <span className="text-sm">{t('pastor')}: {selectedBranch.pastor}</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600 font-medium">
                        <Users size={16} />
                        <span className="text-sm">{t('worshippers')}: {selectedBranch.worshippers}</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 flex items-center gap-2">
                          <Clock size={14} />
                          {t('serviceTimes')}
                        </h4>
                        <ul className="space-y-1">
                          {selectedBranch.services.map((s, i) => (
                            <li key={i} className="text-sm text-slate-600 font-medium">{s}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid gap-6">
                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">{t('mission')}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed italic">
                            "{selectedBranch.mission}"
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">{t('history')}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {selectedBranch.history}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">{t('aboutBranch')}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {selectedBranch.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-3">
                            <a href={selectedBranch.socials.facebook} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white transition-all">
                              <Facebook size={16} />
                            </a>
                            <a href={selectedBranch.socials.instagram} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white transition-all">
                              <Instagram size={16} />
                            </a>
                            <a href={selectedBranch.socials.web} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white transition-all">
                              <Globe size={16} />
                            </a>
                          </div>
                          <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all">
                            {t('contactUs')}
                          </button>
                        </div>
                        
                        {(selectedBranch.id === 'north' || selectedBranch.id === 'main') && (
                          <button 
                            onClick={() => handleEnterBranch(selectedBranch.id)}
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl"
                          >
                            <Sparkles size={18} className="text-emerald-400" />
                            Enter {selectedBranch.name} Experience
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
