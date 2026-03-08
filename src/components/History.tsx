import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { cn } from '../lib/utils';
import { History as HistoryIcon, Target, Users, Landmark } from 'lucide-react';

export default function History() {
  const { isWordLight } = useSite();

  const timeline = [
    {
      year: "2005",
      title: "Establishment",
      description: "Established when the ICFG sent Missionary Rev. Roger Brubeck to plant a church in Kigali. The first service was launched on 1st October 2005 in Kimironko Sector.",
      icon: HistoryIcon
    },
    {
      year: "2006",
      title: "Transitional Board",
      description: "First transitional Board was appointed by the Foursquare Mission International Regional Missionary.",
      icon: Users
    },
    {
      year: "2009",
      title: "First Elected Board",
      description: "The first elected Board was put in place in September 2009.",
      icon: Target
    },
    {
      year: "2013",
      title: "Legal Status",
      description: "FGR was officially registered and issued a legal status on 28th November 2013.",
      icon: Landmark
    }
  ];

  return (
    <section id="history" className={cn("py-24 transition-all duration-700", isWordLight ? "bg-slate-50 dark:bg-slate-950" : "bg-white dark:bg-slate-900")}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Our Brief History
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
          >
            The CityLight Church of Rwanda, a branch of the International Church of the Foursquare Gospel (ICFG), 
            has a rich legacy of faith and growth since its inception in 2005.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            <p>
              The CityLight Church of Rwanda, a branch of the International Church of the Foursquare Gospel (ICFG), 
              was established in 2005 when the ICFG sent a Missionary, Rev. Roger Brubeck to plant a church in Rwanda-Kigali. 
              Upon his arrival, Rev. Roger Brubeck connected with key people who worked hard to get the first foursquare church 
              established in Kimironko Sector, Gasabo District. The first Church Sunday Service was launched on 1st October 2005.
            </p>
            <p>
              Since its inception, the CityLight Church based in Kimironko Sector has grown. Many other branches have been planted countrywide. 
              Some of these branches have permanent church buildings. In addition, the church has bought prime pieces of land to further its church planting effort.
            </p>
            <p>
              The National Board of the church has drafted and approved Foursquare Gospel Church Constitution in accordance with Law nº06/2012 of 17/02/2012, 
              determining organization and functioning of religious-based organizations. As a result, FGR was officially registered, and been issued a legal status on 28th November 2013.
            </p>
            <p>
              The National Board has organized continuous leadership and ministry training to build the capacity of the local church leadership. 
              FGR is now engaging in social and development activities such as running nursery and primary schools in four different areas within Rwanda, 
              contributing towards medical insurance for the poor in its and surrounding community working with local leaders.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop" 
              alt="Church History" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className={cn("absolute inset-0 opacity-20", isWordLight ? "bg-purple-600" : "bg-emerald-600")} />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "p-8 rounded-3xl border transition-all group",
                isWordLight 
                  ? "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-purple-500" 
                  : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-emerald-500"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                isWordLight ? "bg-purple-100 text-purple-600" : "bg-emerald-100 text-emerald-600"
              )}>
                <item.icon size={24} />
              </div>
              <span className={cn("text-xs font-bold uppercase tracking-widest mb-2 block", isWordLight ? "text-purple-600" : "text-emerald-600")}>
                {item.year}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
