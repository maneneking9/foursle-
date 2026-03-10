import { useState, useEffect } from 'react';
import { Video, Plus, X, Trash2, Upload } from 'lucide-react';
import { api } from '../../lib/api';

export default function VideosManager() {
  const [videos, setVideos] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', video_url: '', thumbnail: '', category: '' });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('video/')) {
      alert('Please select a video file');
      return;
    }
    
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({...formData, video_url: reader.result as string});
      setUploading(false);
    };
    reader.onerror = () => {
      alert('Failed to read video');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({...formData, thumbnail: reader.result as string});
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.video_url) {
      alert('Please fill in title and upload video');
      return;
    }
    setLoading(true);
    try {
      await api.createVideo({
        title: formData.title,
        description: formData.description,
        video: formData.video_url,
        thumbnail: formData.thumbnail,
        category: formData.category
      });
      setShowModal(false);
      setFormData({ title: '', description: '', video_url: '', thumbnail: '', category: '' });
      loadVideos();
    } catch (error) {
      alert('Failed to save');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this video?')) return;
    try {
      await api.deleteVideo(id);
      loadVideos();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Videos</h2>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
          <Plus size={20} /> Upload Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="relative h-48 bg-gray-200">
              {video.thumbnail ? (
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video size={48} className="text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <a href={video.video_url} target="_blank" rel="noopener noreferrer" className="bg-white p-3 rounded-full">
                  <Video size={24} className="text-blue-600" />
                </a>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{video.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{video.category}</span>
                <button onClick={() => handleDelete(video.id)} className="p-2 hover:bg-red-50 rounded">
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Upload Video</h3>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Video File</label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <input type="file" accept="video/*" onChange={handleFileUpload} className="hidden" id="video-upload" />
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">{uploading ? 'Uploading...' : 'Click to upload video'}</p>
                  </label>
                </div>
                {formData.video_url && <p className="text-xs text-green-600 mt-2">✓ Video uploaded</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Thumbnail (Optional)</label>
                <input type="file" accept="image/*" onChange={handleThumbnailUpload} className="w-full px-4 py-2 border rounded-lg" />
                {formData.thumbnail && <p className="text-xs text-green-600 mt-1">✓ Thumbnail uploaded</p>}
              </div>
              <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={3} />
              <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <button onClick={handleSave} disabled={loading || uploading || !formData.video_url} className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Video'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
