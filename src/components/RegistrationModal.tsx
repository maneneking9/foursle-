import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Users, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from '../context/LanguageContext';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (userData: { 
    name: string; 
    isFamily: boolean; 
    members?: string[];
    hasVisited: boolean;
    wantToBeChristian: boolean;
    previousChurch: string;
  }) => void;
}

export default function RegistrationModal({ isOpen, onClose, onRegister }: RegistrationModalProps) {
  const { t } = useTranslation();
  
  const savedUser = JSON.parse(localStorage.getItem('church_user_data') || 'null');

  const [isFamily, setIsFamily] = useState(savedUser?.isFamily || false);
  const [name, setName] = useState(savedUser?.name || '');
  const [hasVisited, setHasVisited] = useState<boolean | null>(savedUser?.hasVisited ?? null);
  const [wantToBeChristian, setWantToBeChristian] = useState<boolean | null>(savedUser?.wantToBeChristian ?? null);
  const [previousChurch, setPreviousChurch] = useState(savedUser?.previousChurch || '');
  const [familyMembers, setFamilyMembers] = useState<string[]>(savedUser?.members || ['']);

  const addMember = () => setFamilyMembers([...familyMembers, '']);
  const removeMember = (index: number) => {
    const newMembers = familyMembers.filter((_, i) => i !== index);
    setFamilyMembers(newMembers.length ? newMembers : ['']);
  };
  const updateMember = (index: number, value: string) => {
    const newMembers = [...familyMembers];
    newMembers[index] = value;
    setFamilyMembers(newMembers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || hasVisited === null || wantToBeChristian === null) return;
    
    onRegister({
      name,
      isFamily,
      members: isFamily ? familyMembers.filter(m => m.trim() !== '') : undefined,
      hasVisited,
      wantToBeChristian,
      previousChurch
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 dark:border-slate-800 transition-colors"
          >
            <div className="p-8 md:p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('registrationTitle')}</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{t('registrationSub')}</p>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Registration Type */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setIsFamily(false)}
                    className={cn(
                      "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                      !isFamily 
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700" 
                        : "border-slate-100 text-slate-500 hover:border-emerald-200"
                    )}
                  >
                    <User size={24} />
                    <span className="font-bold text-sm">{t('individual')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFamily(true)}
                    className={cn(
                      "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                      isFamily 
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700" 
                        : "border-slate-100 text-slate-500 hover:border-emerald-200"
                    )}
                  >
                    <Users size={24} />
                    <span className="font-bold text-sm">{t('family')}</span>
                  </button>
                </div>

                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    {isFamily ? t('familyName') : t('fullName')}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isFamily ? "e.g. The Smith Family" : "e.g. John Doe"}
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>

                {/* Family Members */}
                {isFamily && (
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 ml-1 flex justify-between items-center">
                      {t('familyMembers')}
                      <button 
                        type="button" 
                        onClick={addMember}
                        className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 text-xs"
                      >
                        <Plus size={14} /> {t('addMember')}
                      </button>
                    </label>
                    <div className="max-h-40 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                      {familyMembers.map((member, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={member}
                            onChange={(e) => updateMember(index, e.target.value)}
                            placeholder={`Member ${index + 1}`}
                            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:border-emerald-500"
                          />
                          {familyMembers.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => removeMember(index)}
                              className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Visited Before */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    {t('visitedBefore')}
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setHasVisited(true)}
                      className={cn(
                        "flex-1 py-2 rounded-xl border transition-all text-sm font-medium",
                        hasVisited === true 
                          ? "bg-emerald-600 text-white border-emerald-600" 
                          : "bg-white text-slate-600 border-slate-200 hover:border-emerald-200"
                      )}
                    >
                      {t('yesVisited')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasVisited(false)}
                      className={cn(
                        "flex-1 py-2 rounded-xl border transition-all text-sm font-medium",
                        hasVisited === false 
                          ? "bg-emerald-600 text-white border-emerald-600" 
                          : "bg-white text-slate-600 border-slate-200 hover:border-emerald-200"
                      )}
                    >
                      {t('noVisited')}
                    </button>
                  </div>
                </div>

                {/* Want to be Christian */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    {t('wantToBeChristian')}
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setWantToBeChristian(true)}
                      className={cn(
                        "flex-1 py-2 rounded-xl border transition-all text-sm font-medium",
                        wantToBeChristian === true 
                          ? "bg-emerald-600 text-white border-emerald-600" 
                          : "bg-white text-slate-600 border-slate-200 hover:border-emerald-200"
                      )}
                    >
                      {t('yesMember')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setWantToBeChristian(false)}
                      className={cn(
                        "flex-1 py-2 rounded-xl border transition-all text-sm font-medium",
                        wantToBeChristian === false 
                          ? "bg-emerald-600 text-white border-emerald-600" 
                          : "bg-white text-slate-600 border-slate-200 hover:border-emerald-200"
                      )}
                    >
                      {t('noMember')}
                    </button>
                  </div>
                </div>

                {/* Previous Church */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    {t('previousChurch')}
                  </label>
                  <input
                    type="text"
                    value={previousChurch}
                    onChange={(e) => setPreviousChurch(e.target.value)}
                    placeholder="e.g. Angelus Temple"
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 mt-4"
                >
                  <CheckCircle2 size={20} />
                  {t('completeRegistration')}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
