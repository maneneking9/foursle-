import { useState } from 'react';
import { User, Users, Plus, Trash2, ArrowLeft, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '../lib/api';

export default function MemberRegistrationPage() {
  const [isFamilyHead, setIsFamilyHead] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    district: '',
    sector: '',
    date_of_birth: '',
    gender: '',
    marital_status: '',
    occupation: ''
  });
  const [familyMembers, setFamilyMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const rwandaLocations = [
    'Kigali City',
    'Eastern Province',
    'Northern Province',
    'Southern Province',
    'Western Province'
  ];

  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, {
      full_name: '',
      phone: '',
      date_of_birth: '',
      gender: '',
      relationship: ''
    }]);
  };

  const removeFamilyMember = (index: number) => {
    setFamilyMembers(familyMembers.filter((_, i) => i !== index));
  };

  const updateFamilyMember = (index: number, field: string, value: string) => {
    const updated = [...familyMembers];
    updated[index][field] = value;
    setFamilyMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await api.registerMember({
        ...formData,
        is_family_head: isFamilyHead,
        family_members: isFamilyHead ? familyMembers : []
      });

      if (result.success) {
        setSuccess(true);
        // Redirect to home after 1.5 seconds
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        alert(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600">Welcome to our church family. Redirecting...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft size={20} />
          <span className="font-semibold">Back to Home</span>
        </a>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users size={36} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Church Member Registration</h1>
            <p className="text-gray-600 mt-2">Join our church family in Rwanda</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Registration Type */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setIsFamilyHead(false)}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  !isFamilyHead ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500'
                }`}
              >
                <User size={24} />
                <span className="font-bold text-sm">Individual</span>
              </button>
              <button
                type="button"
                onClick={() => setIsFamilyHead(true)}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  isFamilyHead ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500'
                }`}
              >
                <Users size={24} />
                <span className="font-bold text-sm">Family Registration</span>
              </button>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <select
                  value={formData.marital_status}
                  onChange={(e) => setFormData({...formData, marital_status: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MapPin size={20} className="text-blue-600" />
                Location in Rwanda
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select Province *</option>
                  {rwandaLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="District"
                  value={formData.district}
                  onChange={(e) => setFormData({...formData, district: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Sector"
                  value={formData.sector}
                  onChange={(e) => setFormData({...formData, sector: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Family Members */}
            {isFamilyHead && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">Family Members</h3>
                  <button
                    type="button"
                    onClick={addFamilyMember}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                  >
                    <Plus size={16} />
                    Add Member
                  </button>
                </div>

                {familyMembers.map((member, index) => (
                  <div key={index} className="p-4 border-2 border-gray-200 rounded-xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Member {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFamilyMember(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={member.full_name}
                        onChange={(e) => updateFamilyMember(index, 'full_name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={member.phone}
                        onChange={(e) => updateFamilyMember(index, 'phone', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                      <input
                        type="date"
                        value={member.date_of_birth}
                        onChange={(e) => updateFamilyMember(index, 'date_of_birth', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                      <select
                        value={member.gender}
                        onChange={(e) => updateFamilyMember(index, 'gender', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      <select
                        value={member.relationship}
                        onChange={(e) => updateFamilyMember(index, 'relationship', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none md:col-span-2"
                      >
                        <option value="">Relationship</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Child">Child</option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Complete Registration'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
