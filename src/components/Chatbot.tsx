import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { cn } from '../lib/utils';
import { useSite } from '../context/SiteContext';

interface Message {
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  // Bible-based responses
  'bible': 'The Bible is God\'s Word to us. "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness" (2 Timothy 3:16).',
  'jesus': 'Jesus Christ is the Son of God. "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life" (John 3:16).',
  'god': 'God is our Creator and Father. "For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand" (Ephesians 2:10).',
  'love': 'God is love. "Love is patient, love is kind. It does not envy, it does not boast, it is not proud" (1 Corinthians 13:4).',
  'faith': 'Faith is believing in what we cannot see. "Now faith is the substance of things hoped for, the evidence of things not seen" (Hebrews 11:1).',
  'pray': 'Prayer is talking to God. "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God" (Philippians 4:6).',
  'salvation': 'Salvation comes through Jesus Christ. "That if you confess with your mouth the Lord Jesus and believe in your heart that God has raised Him from the dead, you will be saved" (Romans 10:9).',
  'church': 'The church is the body of Christ. "Now you are the body of Christ, and individually members of it" (1 Corinthians 12:27).',
  'hope': 'God gives us hope. "Hope deferred makes the heart sick, but a longing fulfilled is a tree of life" (Proverbs 13:12).',
  'peace': 'God offers peace. "Peace I leave with you, my peace I give to you" (John 14:27).',
  'grace': 'God\'s grace is unmerited favor. "For by grace you have been saved through faith, and that not of yourselves; it is the gift of God" (Ephesians 2:8).',
  'forgiveness': 'God forgives our sins. "If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness" (1 John 1:9).',
  
  // Church website questions
  'hello': 'Hello! Welcome to CityLight Church. How can I help you today?',
  'hi': 'Hi there! How can I assist you?',
  'service': 'Our services are: Sunday 8:00 AM, 10:00 AM, 5:00 PM | Wednesday 7:00 PM | Friday 6:30 PM',
  'location': 'We are located in Kigali, Rwanda. Visit our Branches section for more details.',
  'contact': 'You can reach us at +250 788 123 456 or email citylight@foursquare.rw',
  'prayer request': 'We would be honored to pray with you. Please share your prayer request with our prayer team.',
  'events': 'Check our Events section for upcoming church activities and programs.',
  'branch': 'We have branches in Kigali - CityLight Church (Kimironko) and Word Light (Kabuga). Visit our Branches page for details.',
  'membership': 'To become a member, click on "Join Church" or visit our Membership Request page in the About section.',
  'volunteer': 'You can serve God through our various ministries. Visit the Volunteer page in the About section to sign up!',
  'youth': 'Our Youth Ministry reaches teenagers and young adults. Check our Ministries section for details.',
  'children': 'Our Children\'s Ministry nurtures the next generation. Visit our Ministries page for more information.',
  'sermon': 'You can find our sermons and video resources in the Sermons & Resources section.',
  'bible study': 'We offer Bible study groups. Visit our Bible Study page for more information.',
  'ministry': 'We have various ministries including: Worship, Children, Youth, Media, Hospitality, Community Outreach, Prayer, and Facilities.',
  'give': 'You can support the church through tithes and offerings. Contact our finance team for more information.',
  'tithe': 'Tithes and offerings are a way to support God\'s work. "Bring the whole tithe into the storehouse" (Malachi 3:10).',
  'baptism': 'Water baptism is an important step of faith. Contact our church office to learn more about baptismal classes.',
  'worship': 'We worship God through music, prayer, and preaching. Join us for our Sunday services!',
  'default': 'Thank you for your message. For specific inquiries, please contact us at +250 788 123 456 or visit our church office. You can also ask me about Bible topics or church activities!'
};

export default function Chatbot() {
  const { isWordLight } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      text: "Hello! I'm your CityLight Church assistant. How can I help you today?", 
      timestamp: new Date() 
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const getResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check for Bible topics first
    const bibleTopics = ['bible', 'jesus', 'god', 'love', 'faith', 'prayer', 'salvation', 'church', 'hope', 'peace', 'grace', 'forgiveness', 'worship', 'baptism', 'tithe'];
    for (const topic of bibleTopics) {
      if (input.includes(topic)) {
        return predefinedResponses[topic];
      }
    }
    
    // Check for website topics
    const websiteTopics = ['service', 'location', 'contact', 'prayer', 'events', 'branch', 'membership', 'volunteer', 'youth', 'children', 'sermon', 'bible study', 'ministry', 'give'];
    for (const topic of websiteTopics) {
      if (input.includes(topic)) {
        return predefinedResponses[topic];
      }
    }
    
    return predefinedResponses.default;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    
    const response = getResponse(input);
    setInput('');

    setTimeout(() => {
      const botMessage: Message = { 
        role: 'bot', 
        text: response, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-[2.5rem] shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-[#1877f2] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Church Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex items-start gap-3",
                    msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    msg.role === 'user' 
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-200 text-gray-600"
                  )}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user'
                      ? "bg-[#1877f2] text-white"
                      : "bg-white text-gray-700 shadow-sm border border-gray-200"
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={scrollRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-12 h-12 rounded-xl bg-[#1877f2] hover:bg-blue-600 flex items-center justify-center text-white transition-all disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-2xl bg-[#1877f2] hover:bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-600/30 transition-all"
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
        )}
      </motion.button>
    </div>
  );
}
