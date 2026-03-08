import { useState, useEffect } from 'react';
import { Calendar, Users, BookOpen, Bell, LogOut, Home } from 'lucide-react';
import { api } from '../lib/api';
import { motion } from 'motion/react';

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [sermons, setSermons] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setEvents(await api.getEvents());
      setAnnouncements(await api.getAnnouncements());
      setSermons(await api.getSermons());
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_user');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
              <p className="text-xs md:text-sm text-gray-600 mt-1">Your Church Dashboard</p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <a href="/" className="px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1 md:gap-2">
                <Home size={14} className="md:w-4 md:h-4" />
                <span className="hidden sm:inline">Home</span>
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs md:text-sm font-semibold"
              >
                <LogOut size={14} className="md:w-4 md:h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Announcements */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Bell size={24} className="text-blue-600" />
                Latest Announcements
              </h2>
              <div className="space-y-4">
                {announcements.slice(0, 5).map((announcement: any) => (
                  <motion.div
                    key={announcement.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{announcement.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                        <span className="text-xs text-gray-400 mt-2 block">
                          {new Date(announcement.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${
                        announcement.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {announcement.priority}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Sermons */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen size={24} className="text-purple-600" />
                Recent Sermons
              </h2>
              <div className="space-y-4">
                {sermons.slice(0, 3).map((sermon: any) => (
                  <motion.div
                    key={sermon.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 transition-all"
                  >
                    <h3 className="font-bold text-gray-900">{sermon.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{sermon.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span>Speaker: {sermon.speaker}</span>
                      <span>•</span>
                      <span>{sermon.scripture}</span>
                    </div>
                    {sermon.video_url && (
                      <a
                        href={sermon.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
                      >
                        Watch Sermon
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar size={24} className="text-green-600" />
                Upcoming Events
              </h2>
              <div className="space-y-3">
                {events.slice(0, 5).map((event: any) => (
                  <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-sm text-gray-900">{event.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{event.location}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Calendar size={12} />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <Users size={12} />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <a href="/#live" className="block w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors">
                  Watch Live Stream
                </a>
                <a href="/#sermons" className="block w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold text-center hover:bg-purple-700 transition-colors">
                  Browse Sermons
                </a>
                <a href="/#bible-study" className="block w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold text-center hover:bg-green-700 transition-colors">
                  Join Bible Study
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
