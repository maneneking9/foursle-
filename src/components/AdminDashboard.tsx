import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Calendar, Video, MessageSquare, Users, Bell, Image,
  MapPin, BookOpen, Settings, LogOut, Plus, Edit2, Trash2, X,
  Upload, Eye, Check, ChevronRight, Home, UserPlus, Church, Search,
  BarChart3, Mail, Phone, Clock, Save, RefreshCw, User, UserCheck, HeartHandshake
} from 'lucide-react';
import { api } from '../lib/api';
import { motion, AnimatePresence } from 'motion/react';
import NewChristiansManager from './admin/NewChristiansManager';
import FinanceManager from './admin/FinanceManager';
import VideosManager from './admin/VideosManager';
import MembersManager from './admin/MembersManager';
import ImageUpload from './admin/ImageUpload';

// Types
interface Branch {
  id: number;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  pastor: string;
  description: string;
  mission: string;
  history: string;
  image_url: string;
  services: string[];
  ministries: string[];
  worshippers: string;
  is_active: number;
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  order_index: number;
  active: number;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url: string;
  attendees: number;
}

interface Sermon {
  id: number;
  title: string;
  description: string;
  video_url: string;
  speaker: string;
  date: string;
  scripture: string;
  views: number;
  likes: number;
}

interface Testimony {
  id: number;
  title: string;
  content: string;
  user_id: number;
  approved: number;
  created_at: string;
}

interface Group {
  id: number;
  name: string;
  description: string;
  meeting_time: string;
  location: string;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface GalleryImage {
  id: number;
  title: string;
  image_url: string;
  category: string;
  created_at: string;
}

interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  last_login: string;
}

interface Stats {
  totalMembers: number;
  totalEvents: number;
  totalSermons: number;
  totalPrayers: number;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Data states
  const [stats, setStats] = useState<Stats>({ totalMembers: 0, totalEvents: 0, totalSermons: 0, totalPrayers: 0 });
  const [branches, setBranches] = useState<Branch[]>([]);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [membershipRequests, setMembershipRequests] = useState<any[]>([]);
  const [volunteerRequests, setVolunteerRequests] = useState<any[]>([]);

  // Form state
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    loadData();
  }, [activeSection]);

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeSection) {
        case 'dashboard':
          const [membersData, eventsData, sermonsData, prayersData] = await Promise.all([
            api.getMembers(),
            api.getEvents(),
            api.getSermons(),
            api.getPrayers()
          ]);
          setStats({
            totalMembers: membersData.length,
            totalEvents: eventsData.length,
            totalSermons: sermonsData.length,
            totalPrayers: prayersData.length
          });
          break;
        case 'branches':
          setBranches(await api.getBranches());
          break;
        case 'slides':
          setSlides(await api.getHeroSlides());
          break;
        case 'events':
          setEvents(await api.getEvents());
          break;
        case 'sermons':
          setSermons(await api.getSermons());
          break;
        case 'testimonies':
          const testimoniesData = await api.getAdminTestimonies();
          setTestimonies(testimoniesData);
          break;
        case 'groups':
          setGroups(await api.getGroups());
          break;
        case 'announcements':
          setAnnouncements(await api.getAnnouncements());
          break;
        case 'gallery':
          setGallery(await api.getGallery());
          break;
        case 'members':
          setMembers(await api.getMembers());
          break;
        case 'membership-requests':
          const membershipData = await api.getMembershipRequests();
          setMembershipRequests(membershipData);
          break;
        case 'volunteer-requests':
          const volunteerData = await api.getVolunteerRequests();
          setVolunteerRequests(volunteerData);
          break;
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_user');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      switch (activeSection) {
        case 'branches':
          if (editingItem?.id) {
            await api.updateBranch(editingItem.id, formData);
          } else {
            await api.createBranch(formData);
          }
          break;
        case 'slides':
          if (editingItem?.id) {
            await api.updateHeroSlide(editingItem.id, formData);
          } else {
            await api.createHeroSlide(formData);
          }
          break;
        case 'events':
          if (editingItem?.id) {
            await api.updateEvent(editingItem.id, formData);
          } else {
            await api.createEvent(formData);
          }
          break;
        case 'sermons':
          await api.createSermon(formData);
          break;
        case 'groups':
          await api.createGroup(formData);
          break;
        case 'announcements':
          await api.createAnnouncement(formData);
          break;
        case 'gallery':
          if (editingItem?.id) {
            await api.updateGalleryImage(editingItem.id, formData);
          } else {
            await api.createGalleryImage(formData);
          }
          break;
        case 'testimonies':
          if (editingItem?.id) {
            await api.approveTestimony(editingItem.id);
          }
          break;
      }
      setShowModal(false);
      setEditingItem(null);
      setFormData({});
      loadData();
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save. Please try again.');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number, type: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    setLoading(true);
    try {
      switch (type) {
        case 'branch':
          await api.deleteBranch(id);
          break;
        case 'slide':
          await api.deleteHeroSlide(id);
          break;
        case 'event':
          await api.deleteEvent(id);
          break;
        case 'sermon':
          await api.deleteSermon(id);
          break;
        case 'testimony':
          await api.deleteTestimony(id);
          break;
        case 'group':
          await api.deleteGroup(id);
          break;
        case 'announcement':
          await api.deleteAnnouncement(id);
          break;
        case 'gallery':
          await api.deleteGalleryImage(id);
          break;
      }
      loadData();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
    setLoading(false);
  };

  const openModal = (item?: any, type?: string) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({});
    }
    setShowModal(true);
  };

  // Navigation items
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'branches', name: 'Church Branches', icon: Church },
    { id: 'newchristians', name: 'New Christians', icon: UserPlus },
    { id: 'finance', name: 'Finance', icon: BarChart3 },
    { id: 'videos', name: 'Videos', icon: Video },
    { id: 'slides', name: 'Hero Slides', icon: Image },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'sermons', name: 'Sermons', icon: Video },
    { id: 'testimonies', name: 'Testimonies', icon: MessageSquare },
    { id: 'groups', name: 'Groups', icon: Users },
    { id: 'announcements', name: 'Announcements', icon: Bell },
    { id: 'gallery', name: 'Gallery', icon: Image },
    { id: 'members', name: 'Members', icon: UserPlus },
    { id: 'membership-requests', name: 'Membership Requests', icon: UserCheck },
    { id: 'volunteer-requests', name: 'Volunteer Requests', icon: HeartHandshake },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col"
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-blue-700">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Church size={24} />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Foursquare</h1>
                  <p className="text-xs text-blue-200">Admin Panel</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded">
            <ChevronRight size={20} className={`transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors ${activeSection === item.id ? 'bg-white/20 border-r-4 border-white' : ''
                }`}
            >
              <item.icon size={22} />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-blue-700">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="font-medium truncate">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-blue-200 truncate">{user?.email || 'admin@foursquare.rw'}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={handleLogout}
            className={`mt-3 w-full flex items-center gap-3 px-4 py-2 hover:bg-red-500/20 text-red-200 hover:text-red-100 rounded transition-colors ${!sidebarOpen && 'justify-center'
              }`}
          >
            <LogOut size={20} />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Logout</motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 capitalize">{navItems.find(n => n.id === activeSection)?.name}</h2>
            <p className="text-gray-500 text-sm">Manage your church {activeSection}</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={loadData} className="p-2 hover:bg-gray-100 rounded-lg">
              <RefreshCw size={20} className={`text-gray-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>Add New</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Dashboard */}
              {activeSection === 'dashboard' && (
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Members" value={stats.totalMembers} icon={Users} color="blue" />
                    <StatCard title="Total Events" value={stats.totalEvents} icon={Calendar} color="green" />
                    <StatCard title="Total Sermons" value={stats.totalSermons} icon={Video} color="purple" />
                    <StatCard title="Prayer Requests" value={stats.totalPrayers} icon={MessageSquare} color="orange" />
                  </div>

                  {/* Recent Activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="text-lg font-bold mb-4">Recent Events</h3>
                      <div className="space-y-3">
                        {events.slice(0, 5).map((event) => (
                          <div key={event.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Calendar size={20} className="text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{event.title}</p>
                              <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="text-lg font-bold mb-4">Recent Sermons</h3>
                      <div className="space-y-3">
                        {sermons.slice(0, 5).map((sermon) => (
                          <div key={sermon.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Video size={20} className="text-purple-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{sermon.title}</p>
                              <p className="text-sm text-gray-500">{sermon.speaker}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Branches */}
              {activeSection === 'branches' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {branches.map((branch) => (
                    <div key={branch.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                        <img
                          src={branch.image_url || '/images/branch/Screenshot 2026-03-07 154024.png'}
                          alt={branch.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${branch.is_active ? 'bg-green-500' : 'bg-gray-500'
                            } text-white`}>
                            {branch.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-2">{branch.name}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p className="flex items-center gap-2"><MapPin size={14} /> {branch.address}</p>
                          <p className="flex items-center gap-2"><Phone size={14} /> {branch.phone}</p>
                          <p className="flex items-center gap-2"><User size={14} /> {branch.pastor}</p>
                          <p className="flex items-center gap-2"><Users size={14} /> {branch.worshippers} worshippers</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => openModal(branch)}
                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                          >
                            <Edit2 size={16} /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(branch.id, 'branch')}
                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Slides */}
              {activeSection === 'slides' && (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-4 font-semibold">Order</th>
                        <th className="text-left px-6 py-4 font-semibold">Title</th>
                        <th className="text-left px-6 py-4 font-semibold">Image</th>
                        <th className="text-left px-6 py-4 font-semibold">Status</th>
                        <th className="text-left px-6 py-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {slides.map((slide) => (
                        <tr key={slide.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">{slide.order_index}</td>
                          <td className="px-6 py-4 font-medium">{slide.title}</td>
                          <td className="px-6 py-4">
                            <img src={slide.image_url} alt={slide.title} className="w-20 h-12 object-cover rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${slide.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                              }`}>
                              {slide.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button onClick={() => openModal(slide)} className="p-2 hover:bg-gray-100 rounded">
                                <Edit2 size={16} className="text-blue-600" />
                              </button>
                              <button onClick={() => handleDelete(slide.id, 'slide')} className="p-2 hover:bg-gray-100 rounded">
                                <Trash2 size={16} className="text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Events */}
              {activeSection === 'events' && (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-4 font-semibold">Event</th>
                        <th className="text-left px-6 py-4 font-semibold">Date</th>
                        <th className="text-left px-6 py-4 font-semibold">Location</th>
                        <th className="text-left px-6 py-4 font-semibold">Attendees</th>
                        <th className="text-left px-6 py-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {events.map((event) => (
                        <tr key={event.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{event.title}</td>
                          <td className="px-6 py-4">{new Date(event.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4">{event.location}</td>
                          <td className="px-6 py-4">{event.attendees}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button onClick={() => openModal(event)} className="p-2 hover:bg-gray-100 rounded">
                                <Edit2 size={16} className="text-blue-600" />
                              </button>
                              <button onClick={() => handleDelete(event.id, 'event')} className="p-2 hover:bg-gray-100 rounded">
                                <Trash2 size={16} className="text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Sermons */}
              {activeSection === 'sermons' && (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-4 font-semibold">Title</th>
                        <th className="text-left px-6 py-4 font-semibold">Speaker</th>
                        <th className="text-left px-6 py-4 font-semibold">Scripture</th>
                        <th className="text-left px-6 py-4 font-semibold">Views</th>
                        <th className="text-left px-6 py-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {sermons.map((sermon) => (
                        <tr key={sermon.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{sermon.title}</td>
                          <td className="px-6 py-4">{sermon.speaker}</td>
                          <td className="px-6 py-4">{sermon.scripture}</td>
                          <td className="px-6 py-4">{sermon.views}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button onClick={() => openModal(sermon)} className="p-2 hover:bg-gray-100 rounded">
                                <Edit2 size={16} className="text-blue-600" />
                              </button>
                              <button onClick={() => handleDelete(sermon.id, 'sermon')} className="p-2 hover:bg-gray-100 rounded">
                                <Trash2 size={16} className="text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Testimonies */}
              {activeSection === 'testimonies' && (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-4 font-semibold">Title</th>
                        <th className="text-left px-6 py-4 font-semibold">Content</th>
                        <th className="text-left px-6 py-4 font-semibold">Status</th>
                        <th className="text-left px-6 py-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {testimonies.map((testimony) => (
                        <tr key={testimony.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{testimony.title}</td>
                          <td className="px-6 py-4 max-w-xs truncate">{testimony.content}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${testimony.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                              {testimony.approved ? 'Approved' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              {!testimony.approved && (
                                <button onClick={() => openModal(testimony, 'approve')} className="p-2 hover:bg-green-50 rounded">
                                  <Check size={16} className="text-green-600" />
                                </button>
                              )}
                              <button onClick={() => handleDelete(testimony.id, 'testimony')} className="p-2 hover:bg-gray-100 rounded">
                                <Trash2 size={16} className="text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Groups */}
              {activeSection === 'groups' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groups.map((group) => (
                    <div key={group.id} className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="font-bold text-lg mb-2">{group.name}</h3>
                      <p className="text-gray-600 mb-4">{group.description}</p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <p className="flex items-center gap-2"><Clock size={14} /> {group.meeting_time}</p>
                        <p className="flex items-center gap-2"><MapPin size={14} /> {group.location}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => openModal(group)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-lg">
                          <Edit2 size={16} /> Edit
                        </button>
                        <button onClick={() => handleDelete(group.id, 'group')} className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg">
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Announcements */}
              {activeSection === 'announcements' && (
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="bg-white rounded-2xl p-6 shadow-sm flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-2">{announcement.title}</h3>
                        <p className="text-gray-600">{announcement.content}</p>
                        <p className="text-sm text-gray-400 mt-2">{new Date(announcement.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openModal(announcement)} className="p-2 hover:bg-gray-100 rounded">
                          <Edit2 size={16} className="text-blue-600" />
                        </button>
                        <button onClick={() => handleDelete(announcement.id, 'announcement')} className="p-2 hover:bg-gray-100 rounded">
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Gallery */}
              {activeSection === 'gallery' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.map((image) => (
                    <div key={image.id} className="bg-white rounded-xl overflow-hidden shadow-sm group relative">
                      <img src={image.image_url} alt={image.title} className="w-full h-48 object-cover" />
                      <div className="p-3">
                        <p className="font-medium truncate">{image.title}</p>
                        <p className="text-sm text-gray-500">{image.category}</p>
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button onClick={() => openModal(image)} className="p-2 bg-white rounded-full">
                          <Edit2 size={16} className="text-blue-600" />
                        </button>
                        <button onClick={() => handleDelete(image.id, 'gallery')} className="p-2 bg-white rounded-full">
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Members */}
              {activeSection === 'members' && <MembersManager />}

              {/* Membership Requests */}
              {activeSection === 'membership-requests' && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Membership Requests</h3>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {membershipRequests.length} requests
                    </span>
                  </div>

                  {membershipRequests.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No membership requests yet</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Ministry</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {membershipRequests.map((request: any) => (
                            <tr key={request.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">{request.full_name}</td>
                              <td className="px-4 py-3">{request.email}</td>
                              <td className="px-4 py-3">{request.phone_number}</td>
                              <td className="px-4 py-3">{request.ministry || 'N/A'}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                    request.status === 'approved' ? 'bg-green-100 text-green-700' :
                                      'bg-red-100 text-red-700'
                                  }`}>
                                  {request.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {new Date(request.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3">
                                <button
                                  onClick={() => alert(`Full Details:\n${JSON.stringify(request, null, 2)}`)}
                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Volunteer Requests */}
              {activeSection === 'volunteer-requests' && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Volunteer Requests</h3>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {volunteerRequests.length} requests
                    </span>
                  </div>

                  {volunteerRequests.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No volunteer requests yet</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Ministry</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Availability</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {volunteerRequests.map((request: any) => (
                            <tr key={request.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">{request.full_name}</td>
                              <td className="px-4 py-3">{request.email}</td>
                              <td className="px-4 py-3">{request.phone || 'N/A'}</td>
                              <td className="px-4 py-3">{request.ministry}</td>
                              <td className="px-4 py-3">{request.availability || 'N/A'}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                    request.status === 'approved' ? 'bg-green-100 text-green-700' :
                                      'bg-red-100 text-red-700'
                                  }`}>
                                  {request.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {new Date(request.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => alert(`Full Details:\n${JSON.stringify(request, null, 2)}`)}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                  >
                                    View
                                  </button>
                                  {request.status === 'pending' && (
                                    <>
                                      <button
                                        onClick={async () => {
                                          await api.updateVolunteerRequest(request.id, 'approved');
                                          setVolunteerRequests(volunteerRequests.map((r: any) =>
                                            r.id === request.id ? { ...r, status: 'approved' } : r
                                          ));
                                        }}
                                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        onClick={async () => {
                                          await api.updateVolunteerRequest(request.id, 'rejected');
                                          setVolunteerRequests(volunteerRequests.map((r: any) =>
                                            r.id === request.id ? { ...r, status: 'rejected' } : r
                                          ));
                                        }}
                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                      >
                                        Reject
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* New Christians */}
              {activeSection === 'newchristians' && <NewChristiansManager />}

              {/* Finance */}
              {activeSection === 'finance' && <FinanceManager />}

              {/* Videos */}
              {activeSection === 'videos' && <VideosManager />}

              {/* Settings */}
              {activeSection === 'settings' && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="text-xl font-bold mb-6">Church Settings</h3>
                  <div className="space-y-6 max-w-2xl">
                    <div>
                      <label className="block text-sm font-medium mb-2">Church Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Foursquare Church"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tagline</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="CityLight Church"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="info@foursquare.rw"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Phone</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+250 788 123 456"
                      />
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Save Settings
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
                <h3 className="text-xl font-bold">
                  {editingItem ? 'Edit' : 'Add'} {navItems.find(n => n.id === activeSection)?.name.slice(0, -1) || 'Item'}
                </h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {/* Branch Form */}
                {activeSection === 'branches' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Branch Name</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Foursquare City Light"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Slug</label>
                      <input
                        type="text"
                        value={formData.slug || ''}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., citylight"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <input
                        type="text"
                        value={formData.address || ''}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Kigali, Kimironko, Rwanda"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone || ''}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="+250 788 123 456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="citylight@foursquare.rw"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Pastor</label>
                      <input
                        type="text"
                        value={formData.pastor || ''}
                        onChange={(e) => setFormData({ ...formData, pastor: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Rev. Roger Brubeck"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Describe this branch..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Mission</label>
                      <textarea
                        value={formData.mission || ''}
                        onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        placeholder="Mission statement..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">History</label>
                      <textarea
                        value={formData.history || ''}
                        onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        placeholder="Brief history..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Image URL</label>
                      <input
                        type="text"
                        value={formData.image_url || ''}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Worshippers</label>
                      <input
                        type="text"
                        value={formData.worshippers || ''}
                        onChange={(e) => setFormData({ ...formData, worshippers: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 2,500+"
                      />
                    </div>
                  </>
                )}

                {/* Slide Form */}
                {activeSection === 'slides' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Subtitle</label>
                      <input
                        type="text"
                        value={formData.subtitle || ''}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Upload Image</label>
                      <ImageUpload
                        value={formData.image || formData.image_url || ''}
                        onChange={(url) => setFormData({ ...formData, image: url, image_url: url })}
                        label=""
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Order</label>
                      <input
                        type="number"
                        value={formData.order_index || formData.order || 0}
                        onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </>
                )}

                {/* Event Form */}
                {activeSection === 'events' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Date</label>
                        <input
                          type="date"
                          value={formData.date ? formData.date.split('T')[0] : ''}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <input
                          type="text"
                          value={formData.location || ''}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Upload Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({ ...formData, image: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      {formData.image && <p className="text-xs text-green-600 mt-1">✓ Image uploaded</p>}
                    </div>
                  </>
                )}

                {/* Sermon Form */}
                {activeSection === 'sermons' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Speaker</label>
                        <input
                          type="text"
                          value={formData.speaker || ''}
                          onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Date</label>
                        <input
                          type="date"
                          value={formData.date ? formData.date.split('T')[0] : ''}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Scripture</label>
                      <input
                        type="text"
                        value={formData.scripture || ''}
                        onChange={(e) => setFormData({ ...formData, scripture: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="e.g., John 3:16"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Video URL</label>
                      <input
                        type="text"
                        value={formData.video_url || ''}
                        onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </>
                )}

                {/* Group Form */}
                {activeSection === 'groups' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Group Name</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Meeting Time</label>
                        <input
                          type="text"
                          value={formData.meeting_time || ''}
                          onChange={(e) => setFormData({ ...formData, meeting_time: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                          placeholder="Sunday 10:00 AM"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <input
                          type="text"
                          value={formData.location || ''}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Announcement Form */}
                {activeSection === 'announcements' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Content</label>
                      <textarea
                        value={formData.content || ''}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        rows={5}
                      />
                    </div>
                  </>
                )}

                {/* Gallery Form */}
                {activeSection === 'gallery' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Upload Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({ ...formData, image: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      {formData.image && <p className="text-xs text-green-600 mt-1">✓ Image uploaded</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <input
                        type="text"
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="e.g., Sunday Service, Youth, Events"
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="p-6 border-t flex justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon: Icon, color }: { title: string; value: number; icon: any; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className={`w-14 h-14 rounded-2xl ${colors[color]} flex items-center justify-center`}>
          <Icon size={28} className="text-white" />
        </div>
      </div>
    </div>
  );
}