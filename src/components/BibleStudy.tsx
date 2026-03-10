import { useState } from 'react';
import { Book, Search, BookOpen, Award, Play, CheckCircle, XCircle } from 'lucide-react';

const BIBLE_VERSES = {
  love: [
    { verse: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
    { verse: "1 Corinthians 13:4-7", text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs." },
    { verse: "1 John 4:8", text: "Whoever does not love does not know God, because God is love." }
  ],
  faith: [
    { verse: "Hebrews 11:1", text: "Now faith is confidence in what we hope for and assurance about what we do not see." },
    { verse: "Matthew 17:20", text: "Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move. Nothing will be impossible for you." },
    { verse: "Romans 10:17", text: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ." }
  ],
  hope: [
    { verse: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future." },
    { verse: "Romans 15:13", text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit." },
    { verse: "Psalm 42:11", text: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God." }
  ],
  peace: [
    { verse: "John 14:27", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid." },
    { verse: "Philippians 4:7", text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." },
    { verse: "Isaiah 26:3", text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you." }
  ],
  strength: [
    { verse: "Philippians 4:13", text: "I can do all this through him who gives me strength." },
    { verse: "Isaiah 40:31", text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." },
    { verse: "Psalm 46:1", text: "God is our refuge and strength, an ever-present help in trouble." }
  ],
  wisdom: [
    { verse: "James 1:5", text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you." },
    { verse: "Proverbs 3:5-6", text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
    { verse: "Proverbs 9:10", text: "The fear of the LORD is the beginning of wisdom, and knowledge of the Holy One is understanding." }
  ]
};

const QUIZ_QUESTIONS = [
  { question: "Who built the ark?", options: ["Moses", "Noah", "Abraham", "David"], correct: 1 },
  { question: "How many days did God take to create the world?", options: ["5", "6", "7", "8"], correct: 1 },
  { question: "Who was swallowed by a great fish?", options: ["Jonah", "Peter", "Paul", "John"], correct: 0 },
  { question: "What is the first book of the Bible?", options: ["Exodus", "Leviticus", "Genesis", "Numbers"], correct: 2 },
  { question: "Who was the first king of Israel?", options: ["David", "Solomon", "Saul", "Samuel"], correct: 2 },
  { question: "How many disciples did Jesus have?", options: ["10", "11", "12", "13"], correct: 2 },
  { question: "Who betrayed Jesus?", options: ["Peter", "Judas", "Thomas", "John"], correct: 1 },
  { question: "What is the last book of the Bible?", options: ["Jude", "Revelation", "3 John", "Acts"], correct: 1 },
  { question: "Who led the Israelites out of Egypt?", options: ["Joshua", "Moses", "Aaron", "Caleb"], correct: 1 },
  { question: "How many commandments did God give Moses?", options: ["5", "8", "10", "12"], correct: 2 }
];

export default function BibleStudy() {
  const [activeTab, setActiveTab] = useState<'study' | 'quiz'>('study');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // Quiz states
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    const term = searchTerm.toLowerCase();
    const results: any[] = [];
    
    Object.entries(BIBLE_VERSES).forEach(([topic, verses]) => {
      if (topic.includes(term)) {
        results.push(...verses.map(v => ({ ...v, topic })));
      } else {
        verses.forEach(v => {
          if (v.text.toLowerCase().includes(term) || v.verse.toLowerCase().includes(term)) {
            results.push({ ...v, topic });
          }
        });
      }
    });
    
    setSearchResults(results);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      QUIZ_QUESTIONS.forEach((q, i) => {
        if (newAnswers[i] === q.correct) correctCount++;
      });
      setScore(correctCount);
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
            <Book size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Bible Study & Quiz</h1>
          <p className="text-gray-600 text-lg">Search Bible verses and test your knowledge</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('study')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'study' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BookOpen size={20} />
            Bible Study
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'quiz' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Award size={20} />
            Bible Quiz
          </button>
        </div>

        {/* Bible Study Tab */}
        {activeTab === 'study' && (
          <div className="space-y-8">
            {/* Search */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Search Bible Verses</h2>
              <p className="text-gray-600 mb-6">Enter a topic or keyword (e.g., love, faith, hope, peace, strength, wisdom)</p>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Enter topic or keyword..."
                  className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                />
                <button
                  onClick={handleSearch}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold"
                >
                  <Search size={20} />
                  Search
                </button>
              </div>
            </div>

            {/* Results */}
            {searchResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Search Results ({searchResults.length})</h3>
                {searchResults.map((result, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Book size={24} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-lg text-blue-600">{result.verse}</h4>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium capitalize">
                            {result.topic}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{result.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Popular Topics */}
            {searchResults.length === 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Popular Topics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.keys(BIBLE_VERSES).map((topic) => (
                    <button
                      key={topic}
                      onClick={() => {
                        setSearchTerm(topic);
                        const results = BIBLE_VERSES[topic as keyof typeof BIBLE_VERSES].map(v => ({ ...v, topic }));
                        setSearchResults(results);
                      }}
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 text-center"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <BookOpen size={24} className="text-white" />
                      </div>
                      <h4 className="font-bold capitalize text-lg">{topic}</h4>
                      <p className="text-sm text-gray-500 mt-1">{BIBLE_VERSES[topic as keyof typeof BIBLE_VERSES].length} verses</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bible Quiz Tab */}
        {activeTab === 'quiz' && (
          <div>
            {!quizStarted ? (
              <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award size={48} className="text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Bible Knowledge Quiz</h2>
                <p className="text-gray-600 text-lg mb-8">Test your knowledge with 10 questions about the Bible</p>
                <button
                  onClick={startQuiz}
                  className="px-12 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors text-lg font-semibold flex items-center gap-3 mx-auto"
                >
                  <Play size={24} />
                  Start Quiz
                </button>
              </div>
            ) : !showResults ? (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}</span>
                    <span className="text-sm font-medium text-purple-600">{Math.round(((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6">{QUIZ_QUESTIONS[currentQuestion].question}</h3>
                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all font-medium"
                      >
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-3 font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 shadow-lg">
                <div className="text-center mb-8">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    score >= 7 ? 'bg-green-100' : score >= 5 ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <Award size={48} className={score >= 7 ? 'text-green-600' : score >= 5 ? 'text-yellow-600' : 'text-red-600'} />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
                  <p className="text-6xl font-bold text-purple-600 mb-2">{score}/10</p>
                  <p className="text-xl text-gray-600">
                    {score >= 9 ? 'Excellent! You know your Bible well!' :
                     score >= 7 ? 'Great job! Keep studying!' :
                     score >= 5 ? 'Good effort! Keep learning!' :
                     'Keep studying the Word!'}
                  </p>
                </div>

                {/* Answers Review */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-bold">Review Your Answers</h3>
                  {QUIZ_QUESTIONS.map((q, i) => (
                    <div key={i} className={`p-4 rounded-xl border-2 ${
                      answers[i] === q.correct ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                    }`}>
                      <div className="flex items-start gap-3">
                        {answers[i] === q.correct ? (
                          <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle size={24} className="text-red-600 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold mb-2">{q.question}</p>
                          <p className="text-sm">
                            <span className="font-medium">Your answer:</span> {q.options[answers[i]]}
                            {answers[i] !== q.correct && (
                              <span className="block mt-1 text-green-700">
                                <span className="font-medium">Correct answer:</span> {q.options[q.correct]}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={startQuiz}
                  className="w-full py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors text-lg font-semibold"
                >
                  Take Quiz Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
