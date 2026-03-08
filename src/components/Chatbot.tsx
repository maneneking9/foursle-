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
  'hello': 'Hello! Welcome to CityLight Church. How can I help you today?',
  'hi': 'Hi there! How can I assist you?',
  'service': 'Our services are: Sunday 8:00 AM, 10:00 AM, 5:00 PM | Wednesday 7:00 PM | Friday 6:30 PM',
  'location': 'We are located in Kigali, Rwanda. Visit our Branches section for more details.',
  'contact': 'You can reach us at +250 788 123 456 or email citylight@foursquare.rw',
  'prayer': 'We would be honored to pray with you. Please share your prayer request with our prayer team.',
  'events': 'Check our Events section for upcoming church activities and programs.',
  'default': 'Thank you for your message. For specific inquiries, please contact us at +250 788 123 456 or visit our church office.'
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
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (input.includes(key)) {
        return response;
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
