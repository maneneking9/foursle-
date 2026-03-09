import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Navigation, X, Clock, User, Users, Globe, Facebook, Instagram, Sparkles, ChevronRight, Calendar } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useSite } from '../context/SiteContext';
import { api } from '../lib/api';

export default function Branches() {
  const { t } = useTranslation();
  const { setSite } = useSite();
  const [selectedBranch, setSelectedBranch] = useState<any | null>(null);
  const [branchImages, setBranchImages] = useState<any[]>([]);

  useEffect(() => {
    loadBranchImages();
  }, []);

  const loadBranchImages = async () => {
    try {
      const images = await api.getBranchImages();
      setBranchImages(images);
    } catch (error) {
      console.log('Using static images');
    }
  };

  const branches = [
    {
      id: 'main',
      name: "Foursquare City Light",
      address: "Kigali, Kimironko, Rwanda",
      phone: "+250 788 123 456",
      email: "citylight@foursquare.rw",
      image: branchImages.find(img => img.branch_name === 'Foursquare City Light')?.image_url || "/images/branch/Screenshot 2026-03-07 154024.png",
      pastor: "Rev. Roger Brubeck",
      services: ["Sunday: 8:00 AM, 10:00 AM, 5:00 PM", "Wednesday: 7:00 PM", "Friday: 6:30 PM"],
      description: "Our main campus in Kimironko, Kigali, serving as a beacon of hope and faith for the community.",
      mission: "To illuminate every corner of our city with the love and truth of Jesus Christ through active service and passionate worship.",
      history: "Founded in 2005, City Light began as a small prayer group in Kimironko and has grown into a thriving community of believers.",
      worshippers: "2,500+",
      ministries: ["Children Ministry", "Youth Ministry", "Women Fellowship", "Men's Group"],
      socials: { facebook: "#", instagram: "#", web: "#" }
    },
    {
      id: 'north',
      name: "Word Light Branch",
      address: "Kigali, Kabuga, Rwanda",
      phone: "+250 788 987 654",
      email: "wordlight@foursquare.rw",
      image: branchImages.find(img => img.branch_name === 'Word Light Branch')?.image_url || "/images/branch/Screenshot 2026-03-07 153508.png",
      pastor: "Pastor Sarah Uwase",
      services: ["Sunday: 9:30 AM", "Thursday: 6:30 PM"],
      description: "A center for biblical excellence and spiritual growth in Kabuga, focusing on the transformative power of God's Word.",
      mission: "To build a foundation of faith through deep study of God's Word and empower believers to live out their calling.",
      history: "Established in 2010 in Kabuga, Word Light was born from a vision to create a center for theological education and spiritual formation.",
      worshippers: "1,200+",
      ministries: ["Bible Study Groups", "Theological Training", "Prayer Ministry", "Evangelism Team"],
      socials: { facebook: "#", instagram: "#", web: "#" }
    }
  ];

  const handleEnterBranch = (branchId: string) => {
    if (branchId === 'north') {
      setSite('WordLight');
    } else if (branchId === 'main') {
      setSite('CityLight');
    }
    setSelectedBranch(null);
  };

  return (
    <section id="branches" className="py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {t('ourBranches')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            {t('findBranch')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {branches.map((branch, i) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-gray-100 hover:border-blue-400 transition-all group cursor-pointer"
              onClick={() => setSelectedBranch(branch)}
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={branch.image} 
                  alt={branch.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{branch.name}</h3>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <MapPin size={16} />
                    <span>{branch.address}</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-600 shadow-lg hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Navigation size={20} />
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User size={18} className="text-blue-600" />
                    <span className="text-sm font-medium">{branch.pastor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={18} className="text-green-600" />
                    <span className="text-sm font-bold">{branch.worshippers}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {branch.description}
                </p>
                <button className="w-full py-4 bg-gradient-to-r from-[#1877f2] to-blue-600 text-white rounded-2xl font-bold group-hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  {t('branchDetails')}
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Screen Branch Details Modal */}
        <AnimatePresence>
          {selectedBranch && (
            <div className="fixed inset-0 z-[100] overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedBranch(null)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative min-h-screen flex items-center justify-center p-4 md:p-8"
              >
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-6xl w-full">
                  <button 
                    onClick={() => setSelectedBranch(null)}
                    className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-red-500 rounded-full flex items-center justify-center text-gray-900 hover:text-white transition-all shadow-lg"
                  >
                    <X size={24} />
                  </button>

                  {/* Hero Image */}
                  <div className="h-80 md:h-96 overflow-hidden relative">
                    <img 
                      src={selectedBranch.image} 
                      alt={selectedBranch.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{selectedBranch.name}</h2>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-white/90">
                          <MapPin size={20} />
                          <span className="font-medium">{selectedBranch.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                          <Phone size={20} />
                          <span className="font-medium">{selectedBranch.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-3 flex items-center gap-2">
                            <User size={16} />
                            {t('pastor')}
                          </h3>
                          <p className="text-xl font-bold text-gray-900">{selectedBranch.pastor}</p>
                        </div>
                        <div>
                          <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-3 flex items-center gap-2">
                            <Users size={16} />
                            {t('worshippers')}
                          </h3>
                          <p className="text-xl font-bold text-blue-600">{selectedBranch.worshippers}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-3 flex items-center gap-2">
                          <Clock size={16} />
                          {t('serviceTimes')}
                        </h3>
                        <ul className="space-y-2">
                          {selectedBranch.services.map((s, i) => (
                            <li key={i} className="flex items-center gap-2 text-gray-700 font-medium">
                              <Calendar size={16} className="text-blue-600" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="bg-blue-50 p-6 rounded-2xl">
                        <h3 className="text-sm uppercase tracking-widest text-blue-600 font-bold mb-3">{t('mission')}</h3>
                        <p className="text-gray-700 leading-relaxed italic">
                          "{selectedBranch.mission}"
                        </p>
                      </div>
                      <div className="bg-green-50 p-6 rounded-2xl">
                        <h3 className="text-sm uppercase tracking-widest text-green-600 font-bold mb-3">{t('history')}</h3>
                        <p className="text-gray-700 leading-relaxed">
                          {selectedBranch.history}
                        </p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-4">{t('ourMinistries')}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {selectedBranch.ministries.map((ministry, i) => (
                          <div key={i} className="bg-gray-100 px-4 py-3 rounded-xl text-center text-sm font-bold text-gray-700">
                            {ministry}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-8 border-t border-gray-200">
                      <div className="flex gap-3">
                        <a href={selectedBranch.socials.facebook} className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                          <Facebook size={20} />
                        </a>
                        <a href={selectedBranch.socials.instagram} className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-all">
                          <Instagram size={20} />
                        </a>
                        <a href={selectedBranch.socials.web} className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-600 hover:text-white transition-all">
                          <Globe size={20} />
                        </a>
                      </div>
                      <div className="flex gap-3">
                        <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all">
                          {t('contactUs')}
                        </button>
                        <button 
                          onClick={() => handleEnterBranch(selectedBranch.id)}
                          className="bg-gradient-to-r from-[#1877f2] to-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:shadow-xl transition-all"
                        >
                          <Sparkles size={20} />
                          {t('enterExperience')}
                        </button>
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
