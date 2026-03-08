import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { cn } from '../lib/utils';
import { Heart, Shield, Users, Star, Flame, Anchor } from 'lucide-react';

export default function Values() {
  const { isWordLight } = useSite();

  const values = [
    {
      title: "Biblical Foundation",
      description: "We believe the Bible is the inspired Word of God and the final authority for faith and life.",
      icon: Flame,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20"
    },
    {
      title: "Community & Love",
      description: "We are committed to building a loving community where everyone is welcomed and valued.",
      icon: Heart,
      color: "text-rose-500 bg-rose-50 dark:bg-rose-900/20"
    },
    {
      title: "Integrity & Truth",
      description: "We strive to live lives of integrity, reflecting the character of Christ in all we do.",
      icon: Shield,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Service & Outreach",
      description: "We are called to serve our community and share the Gospel through practical acts of kindness.",
      icon: Users,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      title: "Excellence",
      description: "We aim for excellence in our ministry, honoring God with our best efforts.",
      icon: Star,
      color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20"
    },
    {
      title: "Hope",
      description: "We anchor our lives in the hope of Christ, sharing that hope with a world in need.",
      icon: Anchor,
      color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
    }
  ];

  return (
    <section id="values" className={cn("py-24 transition-all duration-700", isWordLight ? "bg-white dark:bg-slate-950" : "bg-slate-50 dark:bg-slate-800")}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Our Core Values
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            These values guide our mission and define our identity as a church family.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "p-10 rounded-[2.5rem] border transition-all group",
                isWordLight 
                  ? "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-purple-500" 
                  : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-700 hover:border-emerald-500"
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                value.color
              )}>
                <value.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{value.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
