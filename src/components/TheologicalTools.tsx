import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Search, Languages, FileText, Sparkles, ChevronRight, Loader2, MessageSquare } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { GoogleGenAI } from "@google/genai";

export default function TheologicalTools() {
  const { t, language } = useTranslation();
  const [activeTool, setActiveTool] = useState<'study' | 'transcription' | 'assistant'>('study');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const tools = [
    { id: 'study', name: 'Bible Word Study', icon: Search },
    { id: 'transcription', name: 'Sermon Transcription', icon: FileText },
    { id: 'assistant', name: 'Theological Assistant', icon: Sparkles },
  ];

  const handleAction = async () => {
    if (!query) return;
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      let prompt = '';
      
      if (activeTool === 'study') {
        prompt = `Perform a deep biblical word study on "${query}" in ${language}. Include Greek/Hebrew origins, key cross-references, and theological significance. Format with clear headings.`;
      } else if (activeTool === 'transcription') {
        prompt = `Simulate a detailed sermon transcription for a message titled "${query}" in ${language}. Include main points, scripture references, and a summary.`;
      } else {
        prompt = `Answer this theological question in ${language}: "${query}". Provide a balanced perspective based on Foursquare Gospel Church doctrine (Savior, Baptizer, Healer, Coming King).`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      setResult(response.text);
    } catch (error) {
      console.error('Tool error:', error);
      setResult('An error occurred while processing your request.');
    }
    setIsLoading(false);
  };

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.2),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} />
              Advanced WordLight Features
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              Deepen Your <span className="text-purple-500 italic">Understanding</span>
            </h2>
            
            <div className="space-y-4">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    setActiveTool(tool.id as any);
                    setResult(null);
                    setQuery('');
                  }}
                  className={`w-full flex items-center gap-4 p-6 rounded-3xl transition-all border ${
                    activeTool === tool.id 
                      ? 'bg-purple-600 border-purple-500 shadow-xl shadow-purple-600/20' 
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    activeTool === tool.id ? 'bg-white text-purple-600' : 'bg-slate-700 text-slate-400'
                  }`}>
                    <tool.icon size={24} />
                  </div>
                  <span className="font-bold text-lg">{tool.name}</span>
                  {activeTool === tool.id && <ChevronRight size={20} className="ml-auto" />}
                </button>
              ))}
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-[3rem] p-8 md:p-12 min-h-[500px] flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">
                  {activeTool === 'study' && 'Word Study Explorer'}
                  {activeTool === 'transcription' && 'Sermon Archive Search'}
                  {activeTool === 'assistant' && 'Theological Inquiry'}
                </h3>
                <p className="text-slate-400">
                  {activeTool === 'study' && 'Enter a biblical word or concept to explore its original meaning and context.'}
                  {activeTool === 'transcription' && 'Search for past sermons by title or topic to view AI-generated transcriptions.'}
                  {activeTool === 'assistant' && 'Ask complex theological questions and receive doctrinally sound insights.'}
                </p>
              </div>

              <div className="relative mb-8">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    activeTool === 'study' ? 'e.g., Grace, Shalom, Agape...' :
                    activeTool === 'transcription' ? 'e.g., The Sermon on the Mount...' :
                    'e.g., What is the significance of the Foursquare emblem?'
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-6 px-8 text-lg focus:outline-none focus:border-purple-500 transition-colors pr-20"
                  onKeyPress={(e) => e.key === 'Enter' && handleAction()}
                />
                <button
                  onClick={handleAction}
                  disabled={isLoading || !query}
                  className="absolute right-4 top-4 bottom-4 px-6 bg-purple-600 rounded-xl hover:bg-purple-500 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Search size={24} />}
                </button>
              </div>

              <div className="flex-grow overflow-y-auto max-h-[400px] custom-scrollbar pr-4">
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="prose prose-invert max-w-none"
                    >
                      <div className="whitespace-pre-wrap text-slate-300 leading-relaxed font-serif text-lg">
                        {result}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center py-12">
                      <MessageSquare size={64} className="mb-4 opacity-20" />
                      <p className="text-xl italic">Results will appear here after your search.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
