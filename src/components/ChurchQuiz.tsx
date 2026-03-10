import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, HelpCircle, Trophy, ArrowRight, RefreshCw, Book } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { cn } from '../lib/utils';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  bibleVerse: string;
  feedback: string;
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
      text: "Who was the first man created by God?",
      options: ["Moses", "Adam", "Noah", "Abraham"],
      correctAnswer: 1,
      bibleVerse: "Genesis 2:7 - The LORD God formed man from the dust of the ground",
      feedback: "Adam was the first human created by God in the Garden of Eden."
    },
    {
      id: 2,
      text: "How many days did God take to create the world?",
      options: ["5 days", "6 days", "7 days", "8 days"],
      correctAnswer: 1,
      bibleVerse: "Genesis 1:31 - God saw all that he had made, and it was very good. And there was evening, and there was morning—the sixth day.",
      feedback: "God created the world in 6 days and rested on the 7th day."
    },
    {
      id: 3,
      text: "Who built the ark to survive the great flood?",
      options: ["Moses", "Abraham", "Noah", "David"],
      correctAnswer: 2,
      bibleVerse: "Genesis 6:14 - Make yourself an ark of gopher wood",
      feedback: "Noah built the ark as God commanded to save his family and the animals."
    },
    {
      id: 4,
      text: "What is the first book of the Bible?",
      options: ["Exodus", "Genesis", "Leviticus", "Matthew"],
      correctAnswer: 1,
      bibleVerse: "Genesis 1:1 - In the beginning God created the heavens and the earth",
      feedback: "Genesis is the first book, meaning 'beginning' or 'origin'."
    },
    {
      id: 5,
      text: "Who led the Israelites out of Egypt?",
      options: ["Joshua", "Moses", "Aaron", "Caleb"],
      correctAnswer: 1,
      bibleVerse: "Exodus 3:10 - So now, go. I am sending you to Pharaoh to bring my people the Israelites out of Egypt",
      feedback: "Moses was chosen by God to lead the Israelites to freedom."
    },
    {
      id: 6,
      text: "How many commandments did God give Moses?",
      options: ["5", "8", "10", "12"],
      correctAnswer: 2,
      bibleVerse: "Exodus 20:1-17 - And God spoke all these words",
      feedback: "The Ten Commandments are the foundation of God's law."
    },
    {
      id: 7,
      text: "Who was swallowed by a great fish?",
      options: ["Jonah", "Peter", "Paul", "John"],
      correctAnswer: 0,
      bibleVerse: "Jonah 1:17 - The LORD provided a huge fish to swallow Jonah",
      feedback: "Jonah was swallowed by a fish for three days and nights."
    },
    {
      id: 8,
      text: "Who defeated Goliath with a sling and stone?",
      options: ["Saul", "Jonathan", "David", "Samuel"],
      correctAnswer: 2,
      bibleVerse: "1 Samuel 17:50 - So David triumphed over the Philistine with a sling and a stone",
      feedback: "Young David defeated the giant Goliath with faith in God."
    },
    {
      id: 9,
      text: "In which city was Jesus born?",
      options: ["Jerusalem", "Nazareth", "Bethlehem", "Capernaum"],
      correctAnswer: 2,
      bibleVerse: "Luke 2:4-7 - So Joseph also went up from the town of Nazareth in Galilee to Judea, to Bethlehem",
      feedback: "Jesus was born in Bethlehem, fulfilling Old Testament prophecy."
    },
    {
      id: 10,
      text: "How many disciples did Jesus have?",
      options: ["10", "12", "14", "7"],
      correctAnswer: 1,
      bibleVerse: "Matthew 10:1-4 - Jesus called his twelve disciples to him",
      feedback: "Jesus chose 12 disciples to be his closest followers."
    },
    {
      id: 11,
      text: "Who betrayed Jesus for 30 pieces of silver?",
      options: ["Peter", "Judas", "Thomas", "John"],
      correctAnswer: 1,
      bibleVerse: "Matthew 26:14-15 - Then one of the Twelve—the one called Judas Iscariot—went to the chief priests",
      feedback: "Judas Iscariot betrayed Jesus, leading to His crucifixion."
    },
    {
      id: 12,
      text: "On which day did Jesus rise from the dead?",
      options: ["Friday", "Saturday", "Sunday", "Monday"],
      correctAnswer: 2,
      bibleVerse: "Mark 16:9 - When Jesus rose early on the first day of the week",
      feedback: "Jesus rose on Sunday, which Christians celebrate as Easter."
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      setSelectedAnswer(null);
      setShowFeedback(false);

      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowResult(true);
      }
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
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowResult(false);
    setShowAllQuestions(false);
  };

  const handleFinish = () => {
    onComplete(calculateScore());
    onClose();
  };

  const score = calculateScore();
  const isPassed = score >= 8;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/90 to-slate-900"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden border-4 border-blue-500"
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm">
                    <Book size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">Bible Knowledge Quiz</h2>
                    <p className="text-blue-100 font-semibold">Test your biblical knowledge</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">

              {!showResult && !showAllQuestions && (
                <div className="mb-6">
                  <button
                    onClick={() => setShowAllQuestions(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    View All Questions ({questions.length})
                  </button>
                </div>
              )}

              {showAllQuestions && !showResult ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setShowAllQuestions(false)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold mb-4"
                  >
                    ← Back to Quiz
                  </button>
                  {questions.map((q, idx) => (
                    <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="font-bold text-slate-900 mb-2">{idx + 1}. {q.text}</p>
                      <ul className="space-y-1 text-sm text-slate-600 ml-4">
                        {q.options.map((opt, i) => (
                          <li key={i} className={i === q.correctAnswer ? "text-green-600 font-semibold" : ""}>
                            {String.fromCharCode(65 + i)}. {opt}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-blue-600 mt-2 italic">{q.bibleVerse}</p>
                    </div>
                  ))}
                </div>
              ) : !showResult ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-600 uppercase">Question {currentStep + 1} of {questions.length}</span>
                    <div className="flex gap-1">
                      {questions.map((_, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "h-1.5 w-6 rounded-full transition-all",
                            i <= currentStep ? "bg-blue-600" : "bg-slate-200"
                          )} 
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    {questions[currentStep].text}
                  </h3>

                  <div className="grid gap-3">
                    {questions[currentStep].options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = index === questions[currentStep].correctAnswer;
                      const showCorrect = showFeedback && isCorrect;
                      const showWrong = showFeedback && isSelected && !isCorrect;

                      return (
                        <button
                          key={index}
                          onClick={() => !showFeedback && handleAnswer(index)}
                          disabled={showFeedback}
                          className={cn(
                            "w-full p-4 text-left rounded-xl border-2 transition-all",
                            showCorrect && "border-green-500 bg-green-50",
                            showWrong && "border-red-500 bg-red-50",
                            !showFeedback && "border-slate-200 hover:border-blue-600 hover:bg-blue-50",
                            showFeedback && !showCorrect && !showWrong && "border-slate-200 opacity-50"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className={cn(
                              "font-semibold",
                              showCorrect && "text-green-700",
                              showWrong && "text-red-700",
                              !showFeedback && "text-slate-700"
                            )}>{option}</span>
                            {showCorrect && <CheckCircle2 size={20} className="text-green-600" />}
                            {showWrong && <X size={20} className="text-red-600" />}
                          </div>
                        </button>
                      );
                    })}</div>

                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "p-4 rounded-xl border-2",
                        selectedAnswer === questions[currentStep].correctAnswer
                          ? "bg-green-50 border-green-500"
                          : "bg-red-50 border-red-500"
                      )}
                    >
                      <p className={cn(
                        "font-bold mb-2",
                        selectedAnswer === questions[currentStep].correctAnswer ? "text-green-700" : "text-red-700"
                      )}>
                        {selectedAnswer === questions[currentStep].correctAnswer ? "✓ Correct!" : "✗ Incorrect"}
                      </p>
                      <p className="text-sm text-slate-700 mb-2">{questions[currentStep].feedback}</p>
                      <p className="text-xs text-blue-600 italic">{questions[currentStep].bibleVerse}</p>
                      <button
                        onClick={handleNext}
                        className="mt-4 w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                      >
                        {currentStep < questions.length - 1 ? "Next Question" : "See Results"}
                        <ArrowRight size={20} />
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto">
                    <Trophy size={40} />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {isPassed ? "Excellent Work!" : "Keep Learning!"}
                    </h3>
                    <p className="text-slate-600">
                      You scored <span className="text-blue-600 font-bold">{score}</span> out of {questions.length}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-600">
                      {isPassed 
                        ? "Great job! You have excellent biblical knowledge." 
                        : "Keep studying the Word of God to grow in knowledge."}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={resetQuiz}
                      className="flex-1 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw size={18} />
                      Try Again
                    </button>
                    <button 
                      onClick={handleFinish}
                      className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={18} />
                      Finish
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
