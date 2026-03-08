import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Share2, Printer, X, Book, Heart, Shield, Sun, Moon, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from '../context/LanguageContext';

export default function ScriptureLibrary() {
  const { t } = useTranslation();
  const [selectedVerse, setSelectedVerse] = useState<{ text: string; ref: string } | null>(null);
  const flyerRef = useRef<HTMLDivElement>(null);

  const scriptureCategories = [
    {
      id: 'peace',
      label: t('peaceComfort'),
      icon: Moon,
      color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      verses: [
        { text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.", ref: "John 14:27" },
        { text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", ref: "Psalm 34:18" },
        { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7" }
      ]
    },
    {
      id: 'strength',
      label: t('strengthCourage'),
      icon: Shield,
      color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
      verses: [
        { text: "I can do all this through him who gives me strength.", ref: "Philippians 4:13" },
        { text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", ref: "Joshua 1:9" },
        { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", ref: "Isaiah 40:31" }
      ]
    },
    {
      id: 'hope',
      label: t('hopeFuture'),
      icon: Sun,
      color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
      verses: [
        { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", ref: "Jeremiah 29:11" },
        { text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.", ref: "Romans 15:13" },
        { text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", ref: "Romans 8:28" }
      ]
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="scripture-library" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('scriptureLibraryTitle')}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('scriptureLibrarySubText')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {scriptureCategories.map((cat) => (
            <div key={cat.id} className="space-y-6">
              <div className="flex items-center gap-3 px-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors", cat.color)}>
                  <cat.icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{cat.label}</h3>
              </div>
              
              <div className="space-y-4">
                {cat.verses.map((v, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-white dark:hover:bg-slate-700 hover:shadow-lg transition-all group"
                    onClick={() => setSelectedVerse(v)}
                  >
                    <p className="text-slate-700 dark:text-slate-300 italic mb-4 line-clamp-3">"{v.text}"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{v.ref}</span>
                      <Download size={16} className="text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Flyer Modal */}
        <AnimatePresence>
          {selectedVerse && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={() => setSelectedVerse(null)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl max-w-lg w-full border border-slate-100 dark:border-slate-800"
              >
                <button 
                  onClick={() => setSelectedVerse(null)}
                  className="absolute top-6 right-6 z-20 w-10 h-10 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full flex items-center justify-center text-slate-900 dark:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Flyer Content (Printable) */}
                <div id="printable-flyer" ref={flyerRef} className="relative aspect-[4/5] bg-emerald-900 text-white p-12 flex flex-col justify-center text-center overflow-hidden">
                  {/* Decorative Background */}
                  <div className="absolute inset-0 opacity-20">
                    <img 
                      src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop" 
                      alt="Background" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/80 via-emerald-900/90 to-emerald-900" />
                  
                  <div className="relative z-10 space-y-8">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto border border-white/20">
                      <Book size={32} className="text-emerald-300" />
                    </div>
                    
                    <div className="space-y-6">
                      <p className="text-2xl md:text-3xl font-serif italic leading-relaxed">
                        "{selectedVerse.text}"
                      </p>
                      <div className="h-px w-24 bg-emerald-400/50 mx-auto" />
                      <p className="text-emerald-300 font-bold tracking-widest uppercase text-sm">
                        {selectedVerse.ref}
                      </p>
                    </div>

                    <div className="pt-8">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                        Grace Community Church • Faith City
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-8 bg-slate-50 dark:bg-slate-800 flex gap-4 transition-colors">
                  <button 
                    onClick={handlePrint}
                    className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20"
                  >
                    <Printer size={20} />
                    {t('printFlyer')}
                  </button>
                  <button className="w-14 h-14 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all">
                    <Share2 size={20} />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-flyer, #printable-flyer * {
            visibility: visible;
          }
          #printable-flyer {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            padding: 2in;
          }
        }
      `}</style>
    </section>
  );
}
