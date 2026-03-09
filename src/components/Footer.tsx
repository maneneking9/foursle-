import { Church, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 pt-20 pb-10 transition-colors border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20 text-white">
                <Church size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">Grace Community</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {t('footerDesc')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#home" className="hover:text-emerald-500 transition-colors">{t('home')}</a></li>
              <li><a href="#live" className="hover:text-emerald-500 transition-colors">{t('live')}</a></li>
              <li><a href="#services" className="hover:text-emerald-500 transition-colors">{t('services')}</a></li>
              <li><a href="#bible-study" className="hover:text-emerald-500 transition-colors">{t('bibleStudy')}</a></li>
              <li><a href="#gallery" className="hover:text-emerald-500 transition-colors">{t('gallery')}</a></li>
              <li><a href="#branches" className="hover:text-emerald-500 transition-colors">{t('branches')}</a></li>
              <li><a href="#about" className="hover:text-emerald-500 transition-colors">{t('aboutUs')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">{t('contactInfo')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-emerald-500 shrink-0" />
                <div>
                  <p className="font-semibold">City Light: Kigali, Kimironko</p>
                  <p className="font-semibold">Word Light: Kigali, Kabuga</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span>+250 788 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <span>info@foursquare.rw</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">{t('newsletter')}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t('newsletterSub')}</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder={t('emailPlaceholder')} 
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
              />
              <button className="w-full bg-emerald-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-md">
                {t('subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2024 Grace Community Church. {t('allRightsReserved')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">{t('privacyPolicy')}</a>
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">{t('termsOfService')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
