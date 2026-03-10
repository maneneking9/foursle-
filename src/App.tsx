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
import Volunteer from './components/Volunteer';
import UserFeedback from './components/UserFeedback';
import MembershipRequest from './components/MembershipRequest';
import PrayerRequest from './components/PrayerRequest';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MemberRegistrationPage from './components/MemberRegistrationPage';
import { useSite } from './context/SiteContext';
import { cn } from './lib/utils';
import { useState, useEffect } from 'react';

export default function App() {
  const { isWordLight } = useSite();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('admin_user');
    
    if (currentPath === '/admin') {
      if (!user) {
        window.location.href = '/login';
        return;
      }
      const userData = JSON.parse(user);
      if (userData.role !== 'admin') {
        alert('Access denied. Admin only.');
        window.location.href = '/';
        return;
      }
    }

    if (currentPath === '/dashboard') {
      if (!user) {
        window.location.href = '/login';
        return;
      }
    }
  }, [currentPath]);

  if (currentPath === '/login') return <LoginPage />;
  if (currentPath === '/register') return <RegisterPage />;
  if (currentPath === '/join') return <MemberRegistrationPage />;
  if (currentPath === '/membership') return <MembershipRequest />;
  if (currentPath === '/prayer') return <PrayerRequest />;
  if (currentPath === '/volunteer') return <Volunteer />;
  if (currentPath === '/bible-study') return <><Navbar /><BibleStudy /><Footer /></>;
  if (currentPath === '/dashboard') return <UserDashboard />;
  if (currentPath === '/admin') return <AdminDashboard />;

  return (
    <div 
      className={cn(
        "min-h-screen font-sans transition-all duration-700 bg-gray-100",
        isWordLight 
          ? "selection:bg-purple-100 selection:text-purple-900 site-wordlight" 
          : "selection:bg-emerald-100 selection:text-emerald-900 site-citylight"
      )}
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 md:py-4 px-4">
        <h1 className="text-xl md:text-2xl font-bold">Grace Community Church</h1>
        <p className="text-xs md:text-sm mt-1">Welcome to our website!</p>
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
        <Volunteer />
        <About />
        <UserFeedback />
      </main>
      <Chatbot />
      <MobileBottomNav />
      <Footer />
    </div>
  );
}
