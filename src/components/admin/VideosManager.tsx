import { useState, useEffect } from 'react';
import { Video, Plus, X, Trash2, Youtube, Link, Play, Eye, Edit2 } from 'lucide-react';
import { api } from '../../lib/api';
import ImageUpload from './ImageUpload';

export default function VideosManager() {
  const [videos, setVideos] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    video_url: '', 
    video_type: 'youtube', // youtube, vimeo, upload
    thumbnail: '', 
    category: '',
    duration: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    try {
      const data = await api.getVideos();
      setVideos(data);
    } catch (error) {
      console.error('Failed to load:', error);
    }
    setLoading(false);
  };

  const extractYouTubeId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const extractVimeoId = (url: string): string | null => {
    const match = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
    return match ? match[1] : null;
  };

  const getVideoEmbedUrl = (video: any): string => {
    if (video.video_type === 'youtube' && video.video_url) {
      const id = extractYouTubeId(video.video_url);
      return id ? `https://www.youtube.com/embed/${id}` : video.video_url;
    }
    if (video.video_type === 'vimeo' && video.video_url) {
      const id = extractVimeoId(video.video_url);
      return id ? `https://player.vimeo.com/video/${id}` : video.video_url;
    }
    return video.video_url || '';
  };

  const handleSave = async () => {
    if (!formData.title || !formData.video_url) {
      alert('Please fill in title and video URL');
      return;
    }
    setLoading(true);
    try {
      const videoData = {
        title: formData.title,
        description: formData.description,
        video_url: formData.video_url,
        video_type: formData.video_type,
        thumbnail: formData.thumbnail,
        category: formData.category,
        duration: formData.duration
      };
      
      if (editingVideo?.id) {
        await api.updateVideo(editingVideo.id, videoData);
      } else {
        await api.createVideo(videoData);
      }
      
      setShowModal(false);
      setEditingVideo(null);
      setFormData({ title: '', description: '', video_url: '', video_type: 'youtube', thumbnail: '', category: '', duration: '' });
      loadVideos();
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save video');
    }
    setLoading(false);
  };

  const handleEdit = (video: any) => {
    setEditingVideo(video);
    setFormData({
      title: video.title || '',
      description: video.description || '',
      video_url: video.video_url || '',
      video_type: video.video_type || 'youtube',
      thumbnail: video.thumbnail || '',
      category: video.category || '',
      duration: video.duration || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this video?')) return;
    try {
      await api.deleteVideo(id);
      loadVideos();
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete video');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Video Library</h2>
          <p className="text-sm text-slate-500">Manage your church videos and sermons</p>
        </div>
        <button 
          onClick={() => { setEditingVideo(null); setFormData({ title: '', description: '', video_url: '', video_type: 'youtube', thumbnail: '', category: '', duration: '' }); setShowModal(true); }} 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <Plus size={20} /> Add Video
        </button>
      </div>

      {loading && videos.length === 0 ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-slate-500">Loading videos...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl">
          <Video size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">No videos yet. Add your first video!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100">
              <div className="relative h-48 bg-slate-200 group">
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                ) : video.video_type === 'youtube' ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500 to-red-700">
                    <Youtube size={48} className="text-white" />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video size={48} className="text-slate-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={() => window.open(getVideoEmbedUrl(video), '_blank')}
                    className="bg-white p-3 rounded-full hover:bg-blue-50 transition-colors"
                  >
                    <Play size={20} className="text-blue-600" />
                  </button>
                  <button 
                    onClick={() => handleEdit(video)}
                    className="bg-white p-3 rounded-full hover:bg-green-50 transition-colors"
                  >
                    <Edit2 size={20} className="text-green-600" />
                  </button>
                </div>
                {video.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{video.title}</h3>
                  <div className="flex gap-1">
                    {video.video_type === 'youtube' && <Youtube size={16} className="text-red-600" />}
                    {video.video_type === 'vimeo' && <Video size={16} className="text-blue-600" />}
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                <div className="flex items-center justify-between">
                  {video.category && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">{video.category}</span>
                  )}
                  <button 
                    onClick={() => handleDelete(video.id)} 
                    className="p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">{editingVideo ? 'Edit Video' : 'Add New Video'}</h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-5">
              {/* Video Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Video Source</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'youtube', icon: Youtube, label: 'YouTube', color: 'red' },
                    { id: 'vimeo', icon: Video, label: 'Vimeo', color: 'blue' },
                    { id: 'url', icon: Link, label: 'URL Link', color: 'purple' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({...formData, video_type: type.id})}
                      className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                        formData.video_type === type.id 
                          ? `border-${type.color}-500 bg-${type.color}-50` 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <type.icon size={20} className={formData.video_type === type.id ? `text-${type.color}-600` : 'text-slate-400'} />
                      <span className={`text-xs font-medium ${formData.video_type === type.id ? `text-${type.color}-700` : 'text-slate-500'}`}>{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Video URL {formData.video_type === 'youtube' && '(YouTube)'}
                </label>
                <input 
                  type="text" 
                  placeholder={formData.video_type === 'youtube' ? 'https://youtube.com/watch?v=...' : 'https://...'}
                  value={formData.video_url} 
                  onChange={(e) => setFormData({...formData, video_url: e.target.value})} 
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
                {formData.video_url && (
                  <div className="mt-2 rounded-lg overflow-hidden bg-slate-100">
                    {formData.video_type === 'youtube' && extractYouTubeId(formData.video_url) && (
                      <img src={`https://img.youtube.com/vi/${extractYouTubeId(formData.video_url)}/maxresdefault.jpg`} alt="Preview" className="w-full h-32 object-cover" />
                    )}
                  </div>
                )}
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Thumbnail Image</label>
                <ImageUpload
                  value={formData.thumbnail}
                  onChange={(url) => setFormData({...formData, thumbnail: url})}
                  label=""
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Title *</label>
                <input 
                  type="text" 
                  placeholder="Enter video title"
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea 
                  placeholder="Enter video description"
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  rows={3}
                />
              </div>

              {/* Category & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Sermon, Youth"
                    value={formData.category} 
                    onChange={(e) => setFormData({...formData, category: e.target.value})} 
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Duration</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 45:00"
                    value={formData.duration} 
                    onChange={(e) => setFormData({...formData, duration: e.target.value})} 
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button 
                onClick={handleSave} 
                disabled={loading || !formData.title || !formData.video_url} 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold disabled:opacity-50 hover:shadow-lg transition-all"
              >
                {loading ? 'Saving...' : editingVideo ? 'Update Video' : 'Add Video'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
