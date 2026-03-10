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

// Sample Bible verses and guidance for offline fallback
const sampleGuidance: Record<string, { verse: string; guidance: string; feedback: string }> = {
  "lonely": {
    verse: "Deuteronomy 31:6",
    guidance: "Be strong and courageous. Do not be afraid or terrified... for the LORD your God goes with you; he will never leave you nor forsake you.",
    feedback: "Remember: God's presence is always with you, even when you feel alone."
  },
  "fear": {
    verse: "Isaiah 41:10",
    guidance: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
    feedback: "God's strength is made perfect in our weakness. Trust in Him."
  },
  "stress": {
    verse: "Philippians 4:6-7",
    guidance: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    feedback: "Cast all your cares on Him because He cares for you."
  },
  "default": {
    verse: "Joshua 1:9",
    guidance: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
    feedback: "Trust in the Lord's presence and guidance in all circumstances."
  }
};

// Extended Bible verses for different topics (more than 10 related verses)
const extendedVerses: Record<string, string[]> = {
  lonely: [
    "Deuteronomy 31:6 - Be strong and courageous...",
    "Psalm 34:18 - The LORD is near to the brokenhearted...",
    "Isaiah 41:10 - Do not fear, for I am with you...",
    "Matthew 28:20 - And surely I am with you always...",
    "Psalm 23:4 - Though I walk through the valley...",
    "Romans 8:39 - Nothing can separate us from God's love...",
    "2 Corinthians 4:17 - Our light affliction...",
    "Psalm 147:3 - He heals the brokenhearted...",
    "John 14:18 - I will not leave you as orphans...",
    "1 Peter 5:7 - Cast all your anxiety on Him...",
    "Psalm 121:1-2 - I lift up my eyes to the mountains...",
    "Jeremiah 29:11 - Plans to prosper you..."
  ],
  fear: [
    "Isaiah 41:10 - Do not fear, for I am with you...",
    "2 Timothy 1:7 - God gave us a spirit of power, love and self-discipline...",
    "Romans 8:15 - You received the Spirit of adoption...",
    "1 John 4:18 - There is no fear in love...",
    "Psalm 27:1 - The LORD is my light and my salvation...",
    "Deuteronomy 31:6 - Be strong and courageous...",
    "Joshua 1:9 - Be strong and courageous...",
    "Proverbs 3:5-6 - Trust in the LORD with all your heart...",
    "Matthew 6:34 - Do not worry about tomorrow...",
    "Psalm 56:3-4 - When I am afraid, I will trust in You...",
    "Isaiah 43:1 - Do not fear, for I have redeemed you...",
    "Hebrews 13:6 - The Lord is my helper..."
  ],
  stress: [
    "Philippians 4:6-7 - Do not be anxious about anything...",
    "Matthew 11:28-30 - Come to Me, all who are weary...",
    "1 Peter 5:7 - Cast all your anxiety on Him...",
    "Psalm 55:22 - Cast your burdens on the LORD...",
    "Isaiah 26:3 - You will keep in perfect peace...",
    "Psalm 34:4 - I sought the LORD, and He answered me...",
    "Romans 8:28 - All things work together for good...",
    "2 Corinthians 12:9 - My power is made perfect in weakness...",
    "Psalm 46:1 - God is our refuge and strength...",
    "Proverbs 3:5-6 - Trust in the LORD with all your heart...",
    "Philippians 4:13 - I can do all things through Christ...",
    "John 16:33 - In this world you will have trouble..."
  ],
  hope: [
    "Romans 15:13 - May the God of hope fill you with all joy...",
    " Jeremiah 29:11 - Plans to prosper you and not to harm you...",
    "Psalm 42:5 - Why are you downcast, O my soul? Put your hope in God...",
    "Romans 8:24-25 - Hope that is seen is not hope...",
    "1 Peter 1:3 - Born again to a living hope...",
    "Psalm 71:5 - You are my hope, O Lord...",
    "Isaiah 40:31 - They who wait for the LORD shall renew their strength...",
    "Titus 2:13 - Looking for the blessed hope...",
    "Psalm 130:5 - I wait for the Lord, my soul waits...",
    "Romans 12:12 - Be patient in affliction, be constant in prayer...",
    "Lamentations 3:24 - The LORD is my portion, says my soul...",
    "Psalm 33:18-22 - The eyes of the LORD are on those who fear Him..."
  ],
  love: [
    "John 3:16 - For God so loved the world...",
    "1 John 4:8 - God is love...",
    "1 Corinthians 13:4-7 - Love is patient, love is kind...",
    "Romans 8:38-39 - Nothing can separate us from God's love...",
    "Song of Solomon 8:6 - Set me as a seal upon your heart...",
    "Ephesians 3:17-19 - Christ may dwell in your hearts through faith...",
    "Colossians 3:14 - Above all, put on love...",
    "1 John 4:16 - God is love, and whoever lives in love lives in God...",
    "Galatians 5:22-23 - The fruit of the Spirit is love...",
    "Proverbs 10:12 - Hatred stirs up strife, but love covers all sins...",
    "Ecclesiastes 3:8 - A time to love...",
    "Song of Solomon 2:4 - He brought me to the banqueting house..."
  ],
  faith: [
    "Hebrews 11:1 - Faith is the substance of things hoped for...",
    "Romans 10:17 - Faith comes from hearing...",
    "James 2:17 - Faith without works is dead...",
    "Mark 11:22 - Have faith in God...",
    "2 Corinthians 5:7 - We walk by faith, not by sight...",
    "Ephesians 2:8-9 - Saved by grace through faith...",
    "1 Peter 1:8-9 - Though you have not seen Him, you love Him...",
    "Matthew 17:20 - If you have faith as a mustard seed...",
    "Luke 17:5 - Increase our faith...",
    "Romans 1:17 - The righteous shall live by faith...",
    "Galatians 2:20 - I have been crucified with Christ...",
    "Philippians 1:6 - He who began a good work in you will carry it on..."
  ],
  peace: [
    "John 14:27 - Peace I leave with you, My peace I give to you...",
    "Philippians 4:7 - The peace of God, which transcends all understanding...",
    "Isaiah 26:3 - You will keep in perfect peace...",
    "Psalm 4:8 - In peace I will lie down and sleep...",
    "Colossians 3:15 - Let the peace of Christ rule in your hearts...",
    "Romans 8:6 - The mind governed by the Spirit is life and peace...",
    "Matthew 10:13 - If the home is deserving, let your peace rest on it...",
    "2 Thessalonians 3:16 - May the Lord of peace Himself give you peace...",
    "Psalm 29:11 - The LORD gives strength to His people...",
    "Isaiah 9:6 - The Prince of Peace...",
    "John 16:33 - In this world you will have trouble. But take heart! I have overcome the world.",
    "Psalm 119:165 - Great peace have those who love Your law..."
  ],
  joy: [
    "Nehemiah 8:10 - The joy of the LORD is your strength...",
    "Psalm 16:11 - In Your presence is fullness of joy...",
    "Galatians 5:22 - The fruit of the Spirit is love, joy, peace...",
    "Romans 15:13 - May the God of hope fill you with all joy...",
    "1 Peter 1:8-9 - Though you have not seen Him, you love Him...",
    "Psalm 126:5-6 - Those who sow in tears shall reap with joyful shouting...",
    "Isaiah 12:3 - With joy you will draw water from the wells of salvation...",
    "Philippians 4:4 - Rejoice in the Lord always...",
    "Psalm 5:11 - Let all who take refuge in You rejoice...",
    "Luke 2:10 - I bring you good news of great joy...",
    "Psalm 30:11-12 - You turned my mourning into dancing...",
    "Zephaniah 3:17 - He will rejoice over you with singing..."
  ],
  strength: [
    "Isaiah 40:31 - They who wait for the LORD shall renew their strength...",
    "Philippians 4:13 - I can do all things through Christ...",
    "Psalm 18:32-39 - The LORD is my rock, my fortress, and my deliverer...",
    "2 Samuel 22:40 - You have armed me with strength for the battle...",
    "Deuteronomy 31:6 - Be strong and courageous...",
    "Joshua 1:9 - Be strong and courageous...",
    "Psalm 46:1 - God is our refuge and strength...",
    "Ephesians 6:10 - Be strong in the Lord and in His mighty power...",
    "Psalm 28:7-8 - The LORD is my strength and my shield...",
    "Isaiah 12:2 - The LORD God is my strength...",
    "Habakkuk 3:19 - The Sovereign LORD is my strength...",
    "Exodus 15:2 - The LORD is my strength and my song..."
  ],
  guidance: [
    "Psalm 32:8 - I will instruct you and teach you in the way you should go...",
    "Proverbs 3:5-6 - Trust in the LORD with all your heart...",
    "Psalm 119:105 - Your word is a lamp to my feet...",
    "James 1:5 - If any of you lacks wisdom, ask God...",
    "Psalm 37:23-24 - The LORD makes firm the steps of the one who delights in Him...",
    "Proverbs 16:9 - In their hearts humans plan their course, but the LORD establishes their steps...",
    "Isaiah 58:11 - The LORD will guide you always...",
    "Psalm 25:9 - He teaches the humble His way...",
    "John 16:13 - When the Spirit of truth comes, He will guide you into all truth...",
    "Psalm 73:24 - You guide me with Your counsel...",
    "Proverbs 4:11-13 - I teach you the way you should go...",
    "Psalm 143:8-10 - Show me the way I should go..."
  ],
  healing: [
    "Exodus 15:26 - I am the LORD who heals you...",
    "Psalm 103:2-3 - Praise the LORD, my soul, and forget not all His benefits...",
    "James 5:14-15 - Is anyone among you sick? Let them call the elders...",
    "1 Peter 2:24 - By His wounds we are healed...",
    "Psalm 41:3 - The LORD will sustain them on their sickbed...",
    "Isaiah 53:5 - By His wounds we are healed...",
    "Jeremiah 30:17 - I will restore you to health and heal your wounds...",
    "Matthew 9:35 - Jesus went through all the towns and villages...",
    "Mark 5:34 - Daughter, your faith has healed you...",
    "Luke 4:18-19 - He has sent me to proclaim freedom for the prisoners...",
    "Psalm 147:3 - He heals the brokenhearted and binds up their wounds...",
    "Revelation 21:4 - He will wipe every tear from their eyes..."
  ],
  default: [
    "Joshua 1:9 - Be strong and courageous...",
    "Philippians 4:6-7 - Do not be anxious about anything...",
    "Romans 8:28 - All things work together for good...",
    "Isaiah 40:31 - They who wait for the LORD shall renew their strength...",
    "Psalm 23:1-4 - The LORD is my shepherd...",
    "John 3:16 - For God so loved the world...",
    "1 Peter 5:7 - Cast all your anxiety on Him...",
    "Proverbs 3:5-6 - Trust in the LORD with all your heart...",
    "Matthew 11:28-30 - Come to Me, all who are weary...",
    "2 Corinthians 4:17 - Our light affliction is producing...",
    "Psalm 119:105 - Your word is a lamp to my feet...",
    "Romans 15:13 - May the God of hope fill you with all joy..."
  ]
};

export default function BibleGuidance() {
  const { isWordLight } = useSite();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [feedback, setFeedback] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [relatedVerses, setRelatedVerses] = useState<string[]>([]);
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
    if (!searchQuery.trim() || loading) return;

    if (typeof e === 'string') setQuery(e);

    setLoading(true);
    setStreamingText('');
    setFeedback('');
    setRelatedVerses([]);
    setShowFlyerPreview(false);
    setSuggestions([]);
    
    // Use sample guidance if AI is not available
    if (!ai) {
      // Find matching guidance based on keywords
      const lowercaseQuery = searchQuery.toLowerCase();
      
      // Extended keyword mapping for all topics
      const topicKeywords: Record<string, string[]> = {
        lonely: ['lonely', 'alone', 'isolation', 'abandoned', 'rejected', 'isolated', 'friendless', 'deserted'],
        fear: ['fear', 'afraid', 'terrified', 'scared', 'frightened', 'anxious', 'worried', 'panic', 'dread'],
        stress: ['stress', 'stressed', 'overwhelmed', 'burden', 'pressure', 'exhausted', 'tired', 'burnout'],
        hope: ['hope', 'hopeless', 'despair', 'lost', 'future', 'uncertainty', 'discouraged'],
        love: ['love', 'unloved', 'heartbreak', 'relationship', 'marriage', 'dating', 'crush', 'affection'],
        faith: ['faith', 'doubt', 'belief', 'unbelief', 'questioning', 'struggle', 'trust'],
        peace: ['peace', 'conflict', 'war', 'argument', 'dispute', 'restless', 'turbulent'],
        joy: ['joy', 'sad', 'depressed', 'unhappy', 'sorrow', 'grief', 'mourning', 'cry', 'tears'],
        strength: ['weak', 'weakness', 'powerless', 'helpless', 'vulnerable', 'struggling', 'unable'],
        guidance: ['guidance', 'direction', 'confused', 'lost', 'decision', 'choice', 'path', 'purpose'],
        healing: ['sick', 'illness', 'disease', 'pain', 'hurt', 'injury', 'wound', 'recovery', 'hurt']
      };
      
      let matchedGuidance = sampleGuidance.default;
      let related = [] as string[];
      
      // Check all topic keywords
      for (const [topic, keywords] of Object.entries(topicKeywords)) {
        for (const keyword of keywords) {
          if (lowercaseQuery.includes(keyword)) {
            matchedGuidance = sampleGuidance[topic as keyof typeof sampleGuidance] || sampleGuidance.default;
            related = extendedVerses[topic] || extendedVerses.default || [];
            break;
          }
        }
        if (related.length > 0) break;
      }
      
      // If no match found, use default
      if (related.length === 0) {
        related = extendedVerses.default || [];
      }
      
      setRelatedVerses(related);
      
      // Simulate typing effect
      const fullText = `${matchedGuidance.verse} - ${matchedGuidance.guidance}`;
      let displayText = '';
      for (let i = 0; i < fullText.length; i++) {
        displayText += fullText[i];
        setStreamingText(displayText);
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      setFeedback(matchedGuidance.feedback);
      setLoading(false);
      return;
    }
    
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

      // Step 2: Get related verses
      const versesResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide 12 Bible verses related to "${searchQuery}". List them as: Book Chapter:Verse - Short summary. Keep each to 50 characters max.`,
      });
      
      const versesText = versesResponse.text || '';
      const verses = versesText.split('\n').filter(v => v.trim()).slice(0, 12);
      setRelatedVerses(verses.length > 0 ? verses : extendedVerses.default || []);

      // Step 3: Automatic Feedback/Reflection
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

                      {/* Related Bible Verses */}
                      {relatedVerses.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-widest mb-3 opacity-70 text-blue-800">12 Related Bible Verses</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {relatedVerses.slice(0, 12).map((verse, index) => (
                              <div 
                                key={index}
                                className="text-xs p-2 rounded-lg bg-white/70 text-slate-700 hover:bg-white transition-colors cursor-pointer border border-blue-100"
                                title="Click to search this verse"
                              >
                                {verse}
                              </div>
                            ))}
                          </div>
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
