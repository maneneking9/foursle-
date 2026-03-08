import { useState } from 'react';
import { motion } from 'motion/react';
import { Quote, Heart, Sparkles } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function WelcomeMessage() {
  const { t } = useTranslation();
  const [user, setUser] = useState<{ name: string } | null>(() => {
    const saved = localStorage.getItem('church_user_data');
    return saved ? JSON.parse(saved) : null;
  });
  const [score, setScore] = useState<number | null>(() => {
    const saved = localStorage.getItem('church_quiz_score');
    return saved ? parseInt(saved) : null;
  });

  return (
    <section className="py-24 bg-white transition-colors overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {user && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-12 p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-emerald-600/20">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Welcome Back, {user.name}!</h3>
                <p className="text-sm text-slate-500 font-medium">
                  {score !== null && score >= 3 
                    ? "You are recognized as a Verified Heritage Scholar. Thank you for your commitment!" 
                    : "We're glad to see you again. Feel free to explore our latest study materials."}
                </p>
              </div>
            </motion.div>
          )}
          <div className="absolute -top-12 -left-12 text-emerald-100 -z-10">
            <Quote size={120} fill="currentColor" />
          </div>

          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Heart size={14} className="animate-pulse" />
              {t('welcome')}
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Welcome to the CityLight Church!
            </h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto rounded-full" />
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-slate-600 leading-relaxed text-lg">
              <p className="font-medium text-slate-900 text-xl italic border-l-4 border-emerald-500 pl-6 py-2">
                "It is with profound joy and gratitude that we welcome you to the official website of CityLight Church! Whether you are visiting us online for the first time or you are already a part of our cherished family, know that you are deeply loved, valued, and embraced here."
              </p>
              
              <p>
                This space has been created to be a source of inspiration, guidance, and community, allowing us to remain connected and grounded in faith even as we reach out to the broader world.
              </p>

              <p>
                As Bishop and Pastor of CityLight, We are humbled and honored to shepherd a congregation so full of love, compassion, and a genuine desire to live out the teachings of Jesus Christ. We are a church committed to following His example, walking with those who are searching for hope, healing, and purpose, and nurturing a spirit of unity that transcends all boundaries. Our ministry is dedicated to being a beacon of light in these times, standing as a place of refuge, wisdom, and empowerment.
              </p>

              <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100 my-12">
                <div className="flex items-center gap-3 mb-4 text-emerald-600">
                  <Sparkles size={24} />
                  <h3 className="text-xl font-bold m-0">Our Belief</h3>
                </div>
                <p className="m-0 italic">
                  "At CityLight, we believe in a God who is not only present but actively involved in each of our lives. Here, you will find opportunities to grow spiritually, be empowered through the Word, and engage in fellowship with others who share a passion for serving both God and humanity."
                </p>
              </div>

              <p>
                This church is a community where we strive to support one another and uplift the gifts and talents within each individual. Together, we are a family—a community of believers dedicated to transforming lives and making a lasting impact.
              </p>

              <p>
                On our website, you’ll find information about our worship services, outreach programs, events, and resources to help you grow in faith. We encourage you to explore and take advantage of all that we offer. May this digital home be a source of encouragement for you, and may it deepen your connection to God’s love and guidance.
              </p>

              <p>
                As we walk together on this journey of faith, We invite you to open your heart, lean into God’s grace, and allow Him to work wonders in your life. We are here to walk alongside you, pray with you, and celebrate every victory as you draw closer to His purpose for you.
              </p>

              <p className="font-bold text-slate-900">
                Thank you for visiting CityLight Church online. May you be blessed, encouraged, and transformed as you engage with our community, both here and beyond.
              </p>
            </div>

            <div className="mt-16 pt-12 border-t border-slate-100 flex flex-col items-center text-center">
              <div className="flex -space-x-4 mb-6">
                <img 
                  src="https://picsum.photos/seed/pastor1/200/200" 
                  alt="Pst. Solange" 
                  className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-xl"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://picsum.photos/seed/pastor2/200/200" 
                  alt="Prof. Fidèle Masengo" 
                  className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-slate-500 text-sm uppercase tracking-widest mb-2 font-bold">Blessings and Peace,</p>
              <h4 className="text-2xl font-bold text-slate-900 mb-1">Pst. Solange & Prof. Fidèle Masengo, PhD</h4>
              <p className="text-emerald-600 font-bold">Bishop & Senior Pastor</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
