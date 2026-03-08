import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, HelpCircle, Trophy, ArrowRight, RefreshCw } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { cn } from '../lib/utils';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface ChurchQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
}

export default function ChurchQuiz({ isOpen, onClose, onComplete }: ChurchQuizProps) {
  const { t } = useTranslation();

  const questions: Question[] = [
    {
      id: 1,
      text: t('quizQ1'),
      options: [t('quizQ1O1'), t('quizQ1O2'), t('quizQ1O3'), t('quizQ1O4')],
      correctAnswer: 1
    },
    {
      id: 2,
      text: t('quizQ2'),
      options: [t('quizQ2O1'), t('quizQ2O2'), t('quizQ2O3'), t('quizQ2O4')],
      correctAnswer: 2
    },
    {
      id: 3,
      text: t('quizQ3'),
      options: [t('quizQ3O1'), t('quizQ3O2'), t('quizQ3O3'), t('quizQ3O4')],
      correctAnswer: 3
    },
    {
      id: 4,
      text: t('quizQ4'),
      options: [t('quizQ4O1'), t('quizQ4O2'), t('quizQ4O3'), t('quizQ4O4')],
      correctAnswer: 1
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const handleFinish = () => {
    onComplete(calculateScore());
    onClose();
  };

  const score = calculateScore();
  const isPassed = score >= 3;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100 dark:border-slate-800"
          >
            <div className="p-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <HelpCircle size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t('quizTitle')}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t('quizSub')}</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {!showResult ? (
                <div className="space-y-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{t('quizQuestion')} {currentStep + 1} {t('quizOf')} {questions.length}</span>
                    <div className="flex gap-1">
                      {questions.map((_, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "h-1.5 w-8 rounded-full transition-all",
                            i <= currentStep ? "bg-emerald-600" : "bg-slate-100"
                          )} 
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                    {questions[currentStep].text}
                  </h3>

                  <div className="grid gap-4">
                    {questions[currentStep].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="w-full p-5 text-left rounded-2xl border-2 border-slate-100 hover:border-emerald-600 hover:bg-emerald-50 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700 group-hover:text-emerald-700">{option}</span>
                          <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-emerald-600 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-8"
                >
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6">
                    <Trophy size={48} />
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 mb-2">
                      {isPassed ? t('quizExcellent') : t('quizKeepLearning')}
                    </h3>
                    <p className="text-slate-500 font-medium">
                      {t('quizScored')} <span className="text-emerald-600 font-bold">{score}</span> {t('quizOutOf')} {questions.length}
                    </p>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {isPassed 
                        ? t('quizPassedDesc') 
                        : t('quizFailedDesc')}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={resetQuiz}
                      className="flex-1 py-4 bg-slate-100 text-slate-900 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw size={20} />
                      {t('tryAgain')}
                    </button>
                    <button 
                      onClick={handleFinish}
                      className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/20"
                    >
                      <CheckCircle2 size={20} />
                      {t('finish')}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
