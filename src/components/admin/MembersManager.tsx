import { useState, useEffect } from 'react';
import { UserPlus, Trash2, Plus, X, Upload, Camera } from 'lucide-react';
import { api } from '../../lib/api';

export default function MembersManager() {
  const [members, setMembers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', dateOfBirth: '', gender: '',
    maritalStatus: '', occupation: '', photo: '', membershipDate: '', notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setLoading(true);
    try {
      const data = await api.getMembers();
      setMembers(data);
    } catch (error) {
      console.error('Failed to load:', error);
    }
    setLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({...formData, photo: reader.result as string});
      setUploading(false);
    };
    reader.onerror = () => {
      alert('Failed to read image');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in required fields (Name, Email, Phone)');
      return;
    }
    setLoading(true);
    try {
      await api.createMember({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dateOfBirth,
        gender: formData.gender,
        marital_status: formData.maritalStatus,
        occupation: formData.occupation,
        address: formData.address,
        membership_date: formData.membershipDate,
        notes: formData.notes,
        photo: formData.photo
      });
      setShowModal(false);
      setFormData({
        name: '', email: '', phone: '', address: '', dateOfBirth: '', gender: '',
        maritalStatus: '', occupation: '', photo: '', membershipDate: '', notes: ''
      });
      loadMembers();
    } catch (error) {
      alert('Failed to save');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this member?')) return;
    try {
      await api.deleteMember(id);
      loadMembers();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Church Members</h2>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
          <Plus size={20} /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl p-6 shadow-sm relative">
            <button onClick={() => handleDelete(member.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
              <Trash2 size={18} />
            </button>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                    {member.name?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg truncate">{member.name}</h3>
                <p className="text-sm text-gray-600 truncate">{member.email}</p>
                <p className="text-sm text-gray-600">{member.phone}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Gender:</span> {member.gender}</p>
              <p><span className="font-medium">Occupation:</span> {member.occupation}</p>
              <p><span className="font-medium">Joined:</span> {member.membershipDate ? new Date(member.membershipDate).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Add New Member</h3>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                    {formData.photo ? (
                      <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={48} className="text-gray-400" />
                    )}
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="photo-upload" />
                  <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                    <Upload size={16} />
                  </label>
                </div>
              </div>
              {uploading && <p className="text-center text-sm text-blue-600">Uploading...</p>}
              
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="col-span-2 px-4 py-2 border rounded-lg" required />
                <input type="email" placeholder="Email *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="px-4 py-2 border rounded-lg" required />
                <input type="tel" placeholder="Phone *" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="px-4 py-2 border rounded-lg" required />
                <input type="date" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} className="px-4 py-2 border rounded-lg" />
                <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="px-4 py-2 border rounded-lg">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <select value={formData.maritalStatus} onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})} className="px-4 py-2 border rounded-lg">
                  <option value="">Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
                <input type="text" placeholder="Occupation" value={formData.occupation} onChange={(e) => setFormData({...formData, occupation: e.target.value})} className="px-4 py-2 border rounded-lg" />
                <input type="text" placeholder="Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="col-span-2 px-4 py-2 border rounded-lg" />
                <input type="date" placeholder="Membership Date" value={formData.membershipDate} onChange={(e) => setFormData({...formData, membershipDate: e.target.value})} className="px-4 py-2 border rounded-lg" />
              </div>
              <textarea placeholder="Notes" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={3} />
              <button onClick={handleSave} disabled={loading || uploading} className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50 font-semibold">
                {loading ? 'Saving...' : 'Save Member'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
