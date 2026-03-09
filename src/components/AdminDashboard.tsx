import { useState, useEffect } from 'react';
import { Upload, Trash2, Edit2, Check, X, Plus, Eye, ThumbsUp, Users as UsersIcon, Calendar, Video, Image as ImageIcon, MessageSquare, Bell, BookOpen, LogOut, Map } from 'lucide-react';
import { api } from '../lib/api';
import { motion } from 'motion/react';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('slides');
  const [uploading, setUploading] = useState(false);
  const [slides, setSlides] = useState([]);
  const [events, setEvents] = useState([]);
  const [sermons, setSermons] = useState([]);
  const [testimonies, setTestimonies] = useState([]);
  const [groups, setGroups] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [branches, setBranches] = useState([]);
  const [dynamicImages, setDynamicImages] = useState([]);
  const [churchPlans, setChurchPlans] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      if (activeTab === 'slides') setSlides(await api.getHeroSlides());
      if (activeTab === 'events') setEvents(await api.getEvents());
      if (activeTab === 'sermons') setSermons(await api.getSermons());
      if (activeTab === 'testimonies') setTestimonies(await api.getAdminTestimonies());
      if (activeTab === 'groups') setGroups(await api.getGroups());
      if (activeTab === 'announcements') setAnnouncements(await api.getAnnouncements());
      if (activeTab === 'gallery') setGallery(await api.getGallery());
      if (activeTab === 'branches') setBranches(await api.getBranchImages());
      if (activeTab === 'dynamic') setDynamicImages(await api.getDynamicImages());
      if (activeTab === 'plans') {
        const plans = localStorage.getItem('church_plans');
        setChurchPlans(plans ? JSON.parse(plans) : []);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const tabs = [
    { id: 'slides', name: 'Hero Slides', icon: ImageIcon },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'sermons', name: 'Sermons', icon: Video },
    { id: 'testimonies', name: 'Testimonies', icon: MessageSquare },
    { id: 'groups', name: 'Groups', icon: UsersIcon },
    { id: 'announcements', name: 'Announcements', icon: Bell },
    { id: 'gallery', name: 'Gallery', icon: ImageIcon },
    { id: 'branches', name: 'Branch Images', icon: Map },
    { id: 'dynamic', name: 'Dynamic Images', icon: ImageIcon },
    { id: 'plans', name: 'Church Plans', icon: BookOpen },
  ];

  const handleSlideSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = formData.get('image') as File;
    
    setUploading(true);
    try {
      const imageUrl = await api.uploadFile(file, 'hero');
      await api.createHeroSlide({
        title: formData.get('title'),
        subtitle: formData.get('subtitle'),
        image: imageUrl,
        order_index: parseInt(formData.get('order') as string)
      });
      form.reset();
      loadData();
    } catch (error) {
      alert('Failed to create slide');
    }
    setUploading(false);
  };

  const handleEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = formData.get('image') as File;
    
    setUploading(true);
    try {
      let imageUrl = null;
      if (file.size > 0) {
        imageUrl = await api.uploadFile(file, 'events');
      }
      await api.createEvent({
        title: formData.get('title'),
        description: formData.get('description'),
        date: formData.get('date'),
        location: formData.get('location'),
        image: imageUrl
      });
      form.reset();
      loadData();
    } catch (error) {
      alert('Failed to create event');
    }
    setUploading(false);
  };

  const handleSermonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const videoFile = formData.get('video') as File;
    
    setUploading(true);
    try {
      let videoUrl = null;
      if (videoFile.size > 0) {
        videoUrl = await api.uploadFile(videoFile, 'sermons');
      }
      await api.createSermon({
        title: formData.get('title'),
        description: formData.get('description'),
        speaker: formData.get('speaker'),
        date: formData.get('date'),
        scripture: formData.get('scripture'),
        video: videoUrl
      });
      form.reset();
      loadData();
    } catch (error) {
      alert('Failed to upload sermon');
    }
    setUploading(false);
  };

  const handleGroupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = formData.get('image') as File;
    
    setUploading(true);
    try {
      let imageUrl = null;
      if (file.size > 0) {
        imageUrl = await api.uploadFile(file, 'groups');
      }
      await api.createGroup({
        name: formData.get('name'),
        description: formData.get('description'),
        leader: formData.get('leader'),
        schedule: formData.get('schedule'),
        image: imageUrl
      });
      form.reset();
      loadData();
    } catch (error) {
      alert('Failed to create group');
    }
    setUploading(false);
  };

  const handleAnnouncementSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    setUploading(true);
    try {
      await api.createAnnouncement({
        title: formData.get('title'),
        content: formData.get('content'),
        priority: formData.get('priority')
      });
      form.reset();
      loadData();
    } catch (error) {
      alert('Failed to create announcement');
    }
    setUploading(false);
  };

  const handleGallerySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = formData.get('image') as File;
    
    setUploading(true);
    try {
      const imageUrl = await api.uploadFile(file, 'gallery');
      await api.createGalleryImage({
        title: formData.get('title'),
        image: imageUrl,
        category: formData.get('category')
      });
      form.reset();
      loadData();
    } catch (error) {
      alert('Failed to add image');
    }
    setUploading(false);
  };

  const handleBranchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = formData.get('image') as File;
    
    setUploading(true);
    try {
      const imageUrl = await api.uploadFile(file, 'branches');
      await api.createBranchImage({
        branch_name: formData.get('branch_name'),
        image: imageUrl,
        description: formData.get('description')
      });
      form.reset();
      loadData();
    } catch (error) {
      alert('Failed to add branch image');
    }
    setUploading(false);
  };

  const handleDynamicSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = formData.get('image') as File;
    
    setUploading(true);
    try {
      const imageUrl = await api.uploadFile(file, formData.get('section') as string);
      await api.createDynamicImage({
        section: formData.get('section'),
        image: imageUrl,
        title: formData.get('title'),
        description: formData.get('description'),
        order_index: parseInt(formData.get('order') as string)
      });
      form.reset();
      loadData();
    } catch (error) {
      alert('Failed to add dynamic image');
    }
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-xs md:text-sm text-gray-600 mt-1">Welcome back, {user?.name || 'Admin'}</p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <a href="/" className="px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors hidden sm:block">
                View Site
              </a>
              <button
                onClick={() => {
                  localStorage.removeItem('admin_user');
                  window.location.href = '/';
                }}
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
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Hero Slides */}
        {activeTab === 'slides' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ImageIcon size={24} className="text-blue-600" />
                Current Slides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {slides.map((slide: any) => (
                  <motion.div key={slide.id} whileHover={{ scale: 1.02 }} className="border rounded-xl overflow-hidden shadow-sm">
                    <img src={slide.image_url} alt={slide.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900">{slide.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{slide.subtitle}</p>
                      <button
                        onClick={async () => {
                          if (confirm('Delete this slide?')) {
                            await api.deleteHeroSlide(slide.id);
                            loadData();
                          }
                        }}
                        className="mt-3 text-red-600 hover:text-red-700 flex items-center gap-1 text-sm font-semibold"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Plus size={24} className="text-green-600" />
                Add New Slide
              </h2>
              <form onSubmit={handleSlideSubmit} className="space-y-4">
                <input name="title" required placeholder="Title" className="w-full px-4 py-3 border rounded-lg" />
                <input name="subtitle" required placeholder="Subtitle" className="w-full px-4 py-3 border rounded-lg" />
                <input name="order" type="number" defaultValue={0} placeholder="Order" className="w-full px-4 py-3 border rounded-lg" />
                <input name="image" type="file" accept="image/*" required className="w-full px-4 py-3 border rounded-lg" />
                <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50">
                  {uploading ? 'Uploading...' : 'Create Slide'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Events */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Current Events</h2>
              <div className="space-y-3">
                {events.map((event: any) => (
                  <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                    {event.image_url && <img src={event.image_url} alt={event.title} className="w-20 h-20 object-cover rounded-lg" />}
                    <div className="flex-1">
                      <h4 className="font-bold">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.location} • {new Date(event.date).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500 mt-1">{event.attendees} attendees</p>
                    </div>
                    <button onClick={async () => { if (confirm('Delete?')) { await api.deleteEvent(event.id); loadData(); }}} className="text-red-600 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Create Event</h2>
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <input name="title" required placeholder="Event Title" className="w-full px-4 py-3 border rounded-lg" />
                <textarea name="description" placeholder="Description" className="w-full px-4 py-3 border rounded-lg" rows={3} />
                <input name="date" type="datetime-local" required className="w-full px-4 py-3 border rounded-lg" />
                <input name="location" placeholder="Location" className="w-full px-4 py-3 border rounded-lg" />
                <input name="image" type="file" accept="image/*" className="w-full px-4 py-3 border rounded-lg" />
                <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">
                  {uploading ? 'Creating...' : 'Create Event'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Sermons */}
        {activeTab === 'sermons' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Sermon Library</h2>
              <div className="space-y-3">
                {sermons.map((sermon: any) => (
                  <div key={sermon.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Video size={40} className="text-blue-600" />
                    <div className="flex-1">
                      <h4 className="font-bold">{sermon.title}</h4>
                      <p className="text-sm text-gray-600">{sermon.speaker} • {sermon.scripture}</p>
                      <div className="flex gap-4 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Eye size={12} /> {sermon.views}</span>
                        <span className="flex items-center gap-1"><ThumbsUp size={12} /> {sermon.likes}</span>
                      </div>
                    </div>
                    <button onClick={async () => { if (confirm('Delete?')) { await api.deleteSermon(sermon.id); loadData(); }}} className="text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Upload Sermon</h2>
              <form onSubmit={handleSermonSubmit} className="space-y-4">
                <input name="title" required placeholder="Sermon Title" className="w-full px-4 py-3 border rounded-lg" />
                <textarea name="description" placeholder="Description" className="w-full px-4 py-3 border rounded-lg" rows={3} />
                <input name="speaker" placeholder="Speaker" className="w-full px-4 py-3 border rounded-lg" />
                <input name="date" type="date" className="w-full px-4 py-3 border rounded-lg" />
                <input name="scripture" placeholder="Scripture Reference" className="w-full px-4 py-3 border rounded-lg" />
                <input name="video" type="file" accept="video/*" className="w-full px-4 py-3 border rounded-lg" />
                <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">
                  {uploading ? 'Uploading...' : 'Upload Sermon'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Testimonies */}
        {activeTab === 'testimonies' && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Manage Testimonies</h2>
            <div className="space-y-3">
              {testimonies.map((testimony: any) => (
                <div key={testimony.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-bold">{testimony.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{testimony.content}</p>
                      <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${testimony.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {testimony.approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {!testimony.approved && (
                        <button onClick={async () => { await api.approveTestimony(testimony.id); loadData(); }} className="text-green-600 hover:text-green-700">
                          <Check size={18} />
                        </button>
                      )}
                      <button onClick={async () => { if (confirm('Delete?')) { await api.deleteTestimony(testimony.id); loadData(); }}} className="text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Groups */}
        {activeTab === 'groups' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Small Groups</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups.map((group: any) => (
                  <div key={group.id} className="border rounded-lg p-4">
                    {group.image_url && <img src={group.image_url} alt={group.name} className="w-full h-32 object-cover rounded-lg mb-3" />}
                    <h4 className="font-bold">{group.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{group.description}</p>
                    <p className="text-xs text-gray-500 mt-2">Leader: {group.leader}</p>
                    <button onClick={async () => { if (confirm('Delete?')) { await api.deleteGroup(group.id); loadData(); }}} className="mt-3 text-red-600 text-sm">
                      <Trash2 size={14} className="inline mr-1" /> Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Create Group</h2>
              <form onSubmit={handleGroupSubmit} className="space-y-4">
                <input name="name" required placeholder="Group Name" className="w-full px-4 py-3 border rounded-lg" />
                <textarea name="description" placeholder="Description" className="w-full px-4 py-3 border rounded-lg" rows={3} />
                <input name="leader" placeholder="Leader Name" className="w-full px-4 py-3 border rounded-lg" />
                <input name="schedule" placeholder="Schedule" className="w-full px-4 py-3 border rounded-lg" />
                <input name="image" type="file" accept="image/*" className="w-full px-4 py-3 border rounded-lg" />
                <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">
                  {uploading ? 'Creating...' : 'Create Group'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Announcements */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Active Announcements</h2>
              <div className="space-y-3">
                {announcements.map((announcement: any) => (
                  <div key={announcement.id} className="p-4 border rounded-lg flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-bold">{announcement.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                      <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${announcement.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {announcement.priority}
                      </span>
                    </div>
                    <button onClick={async () => { if (confirm('Delete?')) { await api.deleteAnnouncement(announcement.id); loadData(); }}} className="text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Create Announcement</h2>
              <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                <input name="title" required placeholder="Title" className="w-full px-4 py-3 border rounded-lg" />
                <textarea name="content" required placeholder="Content" className="w-full px-4 py-3 border rounded-lg" rows={4} />
                <select name="priority" className="w-full px-4 py-3 border rounded-lg">
                  <option value="normal">Normal</option>
                  <option value="high">High Priority</option>
                </select>
                <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">
                  {uploading ? 'Creating...' : 'Create Announcement'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Gallery */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Gallery Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((image: any) => (
                  <div key={image.id} className="relative group">
                    <img src={image.image_url} alt={image.title} className="w-full h-40 object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <button onClick={async () => { if (confirm('Delete?')) { await api.deleteGalleryImage(image.id); loadData(); }}} className="text-white">
                        <Trash2 size={24} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 truncate">{image.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add Image</h2>
              <form onSubmit={handleGallerySubmit} className="space-y-4">
                <input name="title" placeholder="Image Title" className="w-full px-4 py-3 border rounded-lg" />
                <input name="category" placeholder="Category" className="w-full px-4 py-3 border rounded-lg" />
                <input name="image" type="file" accept="image/*" required className="w-full px-4 py-3 border rounded-lg" />
                <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">
                  {uploading ? 'Uploading...' : 'Add Image'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Branch Images */}
        {activeTab === 'branches' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Branch Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {branches.map((branch: any) => (
                  <div key={branch.id} className="border rounded-lg overflow-hidden">
                    <img src={branch.image_url} alt={branch.branch_name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h4 className="font-bold">{branch.branch_name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{branch.description}</p>
                      <button onClick={async () => { if (confirm('Delete?')) { await api.deleteBranchImage(branch.id); loadData(); }}} className="mt-3 text-red-600 text-sm">
                        <Trash2 size={14} className="inline mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add Branch Image</h2>
              <form onSubmit={handleBranchSubmit} className="space-y-4">
                <input name="branch_name" required placeholder="Branch Name" className="w-full px-4 py-3 border rounded-lg" />
                <textarea name="description" placeholder="Description" className="w-full px-4 py-3 border rounded-lg" rows={3} />
                <input name="image" type="file" accept="image/*" required className="w-full px-4 py-3 border rounded-lg" />
                <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">
                  {uploading ? 'Uploading...' : 'Add Branch Image'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Dynamic Images */}
        {activeTab === 'dynamic' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Dynamic Images (All Sections)</h2>
              <div className="space-y-4">
                {dynamicImages.map((img: any) => (
                  <div key={img.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img src={img.image_url} alt={img.title} className="w-24 h-24 object-cover rounded-lg" />
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded mb-2">{img.section}</span>
                      <h4 className="font-bold">{img.title}</h4>
                      <p className="text-sm text-gray-600">{img.description}</p>
                    </div>
                    <button onClick={async () => { if (confirm('Delete?')) { await api.deleteDynamicImage(img.id); loadData(); }}} className="text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add Dynamic Image</h2>
              <form onSubmit={handleDynamicSubmit} className="space-y-4">
                <select name="section" required className="w-full px-4 py-3 border rounded-lg">
                  <option value="">Select Section</option>
                  <option value="hero">Hero Section</option>
                  <option value="about">About Section</option>
                  <option value="services">Services Section</option>
                  <option value="branches">Branches Section</option>
                  <option value="ministries">Ministries Section</option>
                  <option value="history">History Section</option>
                  <option value="values">Values Section</option>
                </select>
                <input name="title" placeholder="Title" className="w-full px-4 py-3 border rounded-lg" />
                <textarea name="description" placeholder="Description" className="w-full px-4 py-3 border rounded-lg" rows={3} />
                <input name="order" type="number" defaultValue={0} placeholder="Order" className="w-full px-4 py-3 border rounded-lg" />
                <input name="image" type="file" accept="image/*" required className="w-full px-4 py-3 border rounded-lg" />
                <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">
                  {uploading ? 'Uploading...' : 'Add Dynamic Image'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Church Plans */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Church Plans</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Plan Name</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {churchPlans.map((plan: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium">{plan.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{plan.description}</td>
                        <td className="px-4 py-3 text-sm">{plan.date}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            plan.status === 'completed' ? 'bg-green-100 text-green-700' :
                            plan.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {plan.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button 
                            onClick={() => {
                              const updated = churchPlans.filter((_, i) => i !== idx);
                              setChurchPlans(updated);
                              localStorage.setItem('church_plans', JSON.stringify(updated));
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add Church Plan</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const newPlan = {
                  name: formData.get('name'),
                  description: formData.get('description'),
                  date: formData.get('date'),
                  status: formData.get('status')
                };
                const updated = [...churchPlans, newPlan];
                setChurchPlans(updated);
                localStorage.setItem('church_plans', JSON.stringify(updated));
                form.reset();
              }} className="space-y-4">
                <input name="name" required placeholder="Plan Name" className="w-full px-4 py-3 border rounded-lg" />
                <textarea name="description" required placeholder="Description" className="w-full px-4 py-3 border rounded-lg" rows={3} />
                <input name="date" type="date" required className="w-full px-4 py-3 border rounded-lg" />
                <select name="status" required className="w-full px-4 py-3 border rounded-lg">
                  <option value="planned">Planned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">
                  Add Plan
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
