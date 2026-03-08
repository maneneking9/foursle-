import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WelcomeMessage from './components/WelcomeMessage';
import Services from './components/Services';
import LiveStream from './components/LiveStream';
import DailyDevotional from './components/DailyDevotional';
import BibleStudy from './components/BibleStudy';
import Gallery from './components/Gallery';
import SermonsAndResources from './components/SermonsAndResources';
import Branches from './components/Branches';
import History from './components/History';
import Values from './components/Values';
import Ministries from './components/Ministries';
import About from './components/About';
import Chatbot from './components/Chatbot';
import TheologicalTools from './components/TheologicalTools';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import { useSite } from './context/SiteContext';
import { cn } from './lib/utils';

export default function App() {
  const { isWordLight } = useSite();

  return (
    <div 
      className={cn(
        "min-h-screen font-sans transition-all duration-700 bg-gray-100",
        isWordLight 
          ? "selection:bg-purple-100 selection:text-purple-900 site-wordlight" 
          : "selection:bg-emerald-100 selection:text-emerald-900 site-citylight"
      )}
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-4 px-4">
        <h1 className="text-2xl font-bold">Grace Community Church</h1>
        <p className="text-sm">Welcome to our website!</p>
      </div>
      <Navbar />
      <main>
        <Hero />
        <WelcomeMessage />
        <LiveStream />
        <Services />
        <SermonsAndResources />
        <DailyDevotional />
        <History />
        <Values />
        <Ministries />
        <BibleStudy />
        {isWordLight && <TheologicalTools />}
        <Gallery />
        <Branches />
        <About />
      </main>
      <Chatbot />
      <MobileBottomNav />
      <Footer />
    </div>
  );
}
