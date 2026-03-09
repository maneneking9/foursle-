import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Users, Star, Clock, MapPin, Mail, Phone, User, CheckCircle, Send } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useSite } from '../context/SiteContext';
import { cn } from '../lib/utils';

const ministries = [
  { id: 'worship', name: 'Worship Team', description: 'Use your musical gifts to lead the congregation in praise' },
  { id: 'children', name: 'Children\'s Ministry', description: 'Teach and nurture the next generation' },
  { id: 'youth', name: 'Youth Ministry', description: 'Disciple and mentor teenagers' },
  { id: 'media', name: 'Media & Tech', description: 'Help with sound, video, and livestream' },
  { id: 'hospitality', name: 'Hospitality', description: 'Welcome visitors and serve refreshments' },
  { id: 'outreach', name: 'Community Outreach', description: 'Serve the local community' },
  { id: 'prayer', name: 'Prayer Team', description: 'Pray for the church and community' },
  { id: 'maintenance', name: 'Facilities', description: 'Help maintain the church building' },
];

const availability = [
  { id: 'weekly', name: 'Weekly' },
  { id: 'biweekly', name: 'Bi-weekly' },
  { id: 'monthly', name: 'Monthly' },
  { id: 'occasional', name: 'Occasional' },
];

export default function Volunteer() {
  const { t } = useTranslation();
  const { isWordLight } = useSite();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    ministry: '',
    availability: '',
    why: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store in localStorage for demo
    const submissions = JSON.parse(localStorage.getItem('volunteer_submissions') || '[]');
    submissions.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('volunteer_submissions', JSON.stringify(submissions));
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="volunteer" className="py-24 bg-slate-50 dark:bg-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6",
            isWordLight ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-700"
          )}>
            <Heart size={14} />
            {t('serve')}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            {t('volunteerTitle')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('volunteerSubtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className={cn(
              "rounded-[3rem] p-8",
              isWordLight ? "bg-purple-600" : "bg-emerald-600"
            )}>
              <h3 className="text-2xl font-bold text-white mb-6">{t('whyVolunteer')}</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Star size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{t('makeDifference')}</h4>
                    <p className="text-white/80 text-sm">{t('makeDifferenceDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Users size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{t('growSkills')}</h4>
                    <p className="text-white/80 text-sm">{t('growSkillsDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Heart size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{t('serveGod')}</h4>
                    <p className="text-white/80 text-sm">{t('serveGodDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t('whoCanVolunteer')}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">{t('anyoneCanVolunteer')}</p>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
                <CheckCircle size={16} className={isWordLight ? "text-purple-500" : "text-emerald-500"} />
                {t('allAgesWelcome')}
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-[3rem] p-8 border border-amber-100 dark:border-amber-800">
              <p className="text-amber-800 dark:text-amber-200 font-medium text-center">
                <span className="font-black text-2xl">"</span>
                {t('volunteerVerse')}
                <span className="font-black text-2xl">"</span>
              </p>
              <p className="text-center text-amber-700 dark:text-amber-300 text-sm font-bold mt-2">- 1 Peter 4:10</p>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-100 dark:border-slate-700 text-center">
                <div className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6",
                  isWordLight ? "bg-purple-100" : "bg-emerald-100"
                )}>
                  <CheckCircle size={40} className={isWordLight ? "text-purple-600" : "text-emerald-600"} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('thankYou')}</h3>
                <p className="text-slate-600 dark:text-slate-400">{t('volResponse')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">{t('volunteerForm')}</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <User size={14} className="inline mr-2" />
                      {t('volFullName')}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      placeholder={t('volFullNamePlaceholder')}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <Mail size={14} className="inline mr-2" />
                        {t('volEmail')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                        placeholder={t('volEmailPlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <Phone size={14} className="inline mr-2" />
                        {t('volPhone')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                        placeholder={t('volPhonePlaceholder')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <MapPin size={14} className="inline mr-2" />
                      {t('volAddress')}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      placeholder={t('volAddressPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Users size={14} className="inline mr-2" />
                      {t('volMinistry')}
                    </label>
                    <select
                      name="ministry"
                      value={formData.ministry}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="">{t('volSelectMinistry')}</option>
                      {ministries.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Clock size={14} className="inline mr-2" />
                      {t('volAvailability')}
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="">{t('volSelectAvailability')}</option>
                      {availability.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      {t('volWhyQuestion')}
                    </label>
                    <textarea
                      name="why"
                      value={formData.why}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      placeholder={t('volWhyPlaceholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    className={cn(
                      "w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2",
                      isWordLight 
                        ? "bg-purple-600 hover:bg-purple-700" 
                        : "bg-emerald-600 hover:bg-emerald-700"
                    )}
                  >
                    {t('submit')} <Send size={18} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
