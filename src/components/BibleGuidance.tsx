import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Book, Heart, Shield, Loader2, Quote, Download, Image as ImageIcon, Share2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';
import { useSite } from '../context/SiteContext';

let ai: GoogleGenAI | null = null;
if (import.meta.env.VITE_GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
}

export default function BibleGuidance() {
  const { isWordLight } = useSite();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [feedback, setFeedback] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showFlyerPreview, setShowFlyerPreview] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Debounced suggestions as user types
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 3 && !loading && ai) {
        try {
          const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `User is typing: "${query}". Provide 3 short alternative phrases or synonyms (2-4 words each) that represent what the user might be looking for in the Bible. Return only a comma-separated list.`,
          });
          const list = response.text?.split(',').map(s => s.trim()) || [];
          setSuggestions(list.slice(0, 3));
        } catch (e) {
          console.error("Suggestions error", e);
        }
      } else {
        setSuggestions([]);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (loading && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [streamingText, loading]);

  const handleSearch = async (e: React.FormEvent | string) => {
    if (typeof e !== 'string') e.preventDefault();
    const searchQuery = typeof e === 'string' ? e : query;
    if (!searchQuery.trim() || loading || !ai) return;

    if (typeof e === 'string') setQuery(e);

    setLoading(true);
    setStreamingText('');
    setFeedback('');
    setShowFlyerPreview(false);
    setSuggestions([]);
    
    try {
      // Step 1: Guidance & Verse (30 words)
      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: `User situation: "${searchQuery}". 
        1. Analyze the situation deeply.
        2. Provide a 30-word response starting with a relevant Bible verse.
        3. Use simple words.
        Format: [VERSE] - [ANALYSIS & GUIDANCE]`,
      });

      let fullText = '';
      for await (const chunk of responseStream) {
        const text = chunk.text;
        fullText += text;
        setStreamingText(fullText);
      }

      // Step 2: Automatic Feedback/Reflection
      const feedbackResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Based on this guidance: "${fullText}", provide a short 1-sentence "Spiritual Feedback" or reflection for the user to think about.`,
      });
      setFeedback(feedbackResponse.text || '');

    } catch (error) {
      console.error("Bible Guidance Error:", error);
      setStreamingText("I'm sorry, I encountered an error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadFlyer = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for high quality
    canvas.width = 1080;
    canvas.height = 1080;

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
    if (isWordLight) {
      gradient.addColorStop(0, '#9333ea');
      gradient.addColorStop(1, '#6b21a8');
    } else {
      gradient.addColorStop(0, '#059669');
      gradient.addColorStop(1, '#047857');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // Decorative elements
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(1080, 0, 600, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Text styling
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Title
    ctx.font = 'bold 40px sans-serif';
    ctx.fillText(isWordLight ? 'WORD LIGHT ARCHIVE' : 'CITYLIGHT CHURCH', 540, 100);

    // Verse/Word
    ctx.font = 'italic 50px serif';
    const words = streamingText.split(' ');
    let line = '';
    let y = 400;
    const maxWidth = 800;
    const lineHeight = 70;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, 540, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 540, y);

    // Footer
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('Your daily light for every situation.', 540, 980);

    // Download
    const link = document.createElement('a');
    link.download = `bible-flyer-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className={cn(
      "rounded-[3rem] p-8 md:p-12 border transition-all relative overflow-hidden",
      isWordLight 
        ? "bg-purple-50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-800/50" 
        : "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/50"
    )}>
      {isWordLight && (
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] -z-10" 
             style={{ backgroundImage: 'radial-gradient(#9333ea 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />
      )}
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4",
            isWordLight ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-700"
          )}>
            <Sparkles size={14} />
            Instant Bible Guidance
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-4">How can the Word help you?</h3>
          <p className="text-slate-600">
            Type your situation below. Get direct biblical answers in seconds.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., I am feeling lonely... or I need strength for work"
            className={cn(
              "w-full bg-white border-2 rounded-2xl py-4 pl-6 pr-16 text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all shadow-sm",
              isWordLight ? "border-purple-100 focus:border-purple-500" : "border-emerald-100 focus:border-emerald-500"
            )}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className={cn(
              "absolute right-2 top-2 bottom-2 px-4 text-white rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed",
              isWordLight ? "bg-purple-600 hover:bg-purple-700" : "bg-emerald-600 hover:bg-emerald-700"
            )}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </form>

        {/* Search Suggestions */}
        <AnimatePresence>
          {suggestions.length > 0 && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest self-center mr-2">Suggestions:</span>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSearch(s)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all",
                    isWordLight 
                      ? "bg-purple-50 border-purple-100 text-purple-600 hover:bg-purple-100" 
                      : "bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100"
                  )}
                >
                  {s}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {streamingText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden"
            >
              <div className={cn("absolute top-0 left-0 w-1 h-full", isWordLight ? "bg-purple-600" : "bg-emerald-600")} />
              
              <div className="prose prose-slate max-w-none">
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                      isWordLight ? "bg-purple-100 text-purple-600" : "bg-emerald-100 text-emerald-600"
                    )}>
                      <Quote size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-medium text-lg mb-6">
                        {streamingText}
                      </div>

                      {feedback && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={cn(
                            "p-4 rounded-2xl border-l-4 mb-6",
                            isWordLight 
                              ? "bg-purple-50/50 border-purple-500 text-purple-900" 
                              : "bg-emerald-50/50 border-emerald-500 text-emerald-900"
                          )}
                        >
                          <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">Spiritual Feedback</p>
                          <p className="text-sm italic">{feedback}</p>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {!loading && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-wrap gap-3 pt-6 border-t border-slate-100"
                    >
                      <button 
                        onClick={downloadFlyer}
                        className={cn(
                          "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white transition-all shadow-lg",
                          isWordLight ? "bg-purple-600 hover:bg-purple-700 shadow-purple-600/20" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                        )}
                      >
                        <Download size={16} />
                        Download Flyer
                      </button>
                      <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">
                        <Share2 size={16} />
                        Share Word
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {loading && (
                <div className={cn("flex items-center gap-2 text-xs font-bold mt-4 animate-pulse", isWordLight ? "text-purple-600" : "text-emerald-600")}>
                  <span className={cn("w-1.5 h-1.5 rounded-full animate-bounce", isWordLight ? "bg-purple-600" : "bg-emerald-600")} />
                  <span className={cn("w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.2s]", isWordLight ? "bg-purple-600" : "bg-emerald-600")} />
                  <span className={cn("w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.4s]", isWordLight ? "bg-purple-600" : "bg-emerald-600")} />
                  Finding the right Word...
                </div>
              )}
              <div ref={scrollRef} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden Canvas for Flyer Generation */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
