import { useState, useEffect } from 'react';
import { UserPlus, Trash2, Plus, X } from 'lucide-react';
import { api } from '../../lib/api';

export default function NewChristiansManager() {
  const [christians, setChristians] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', notes: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadChristians();
  }, []);

  const loadChristians = async () => {
    setLoading(true);
    try {
      const data = await api.getNewChristians();
      setChristians(data);
    } catch (error) {
      console.error('Failed to load:', error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.date) {
      alert('Please fill in name and date');
      return;
    }
    setLoading(true);
    try {
      await api.createNewChristian(formData);
      setShowModal(false);
      setFormData({ name: '', email: '', phone: '', date: '', notes: '' });
      loadChristians();
    } catch (error) {
      alert('Failed to save');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this record?')) return;
    try {
      await api.deleteNewChristian(id);
      loadChristians();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">New Christians</h2>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
          <Plus size={20} /> Add New Christian
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">Name</th>
              <th className="text-left px-6 py-4 font-semibold">Email</th>
              <th className="text-left px-6 py-4 font-semibold">Phone</th>
              <th className="text-left px-6 py-4 font-semibold">Date</th>
              <th className="text-left px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {christians.map((person) => (
              <tr key={person.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{person.name}</td>
                <td className="px-6 py-4">{person.email}</td>
                <td className="px-6 py-4">{person.phone}</td>
                <td className="px-6 py-4">{new Date(person.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(person.id)} className="p-2 hover:bg-red-50 rounded">
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Christian</h3>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <textarea placeholder="Notes" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={3} />
              <button onClick={handleSave} disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50">
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
