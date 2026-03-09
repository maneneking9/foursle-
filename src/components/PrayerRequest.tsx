import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Phone, CheckCircle, Lock, Users, Clock } from 'lucide-react';
import { api } from '../lib/api';

export default function PrayerRequest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    request: '',
    confidential: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.createPrayer({
        title: formData.category,
        description: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCategory: ${formData.category}\nConfidential: ${formData.confidential ? 'Yes' : 'No'}\n\n${formData.request}`,
        user_id: null
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', category: '', request: '', confidential: false });
      }, 3000);
    } catch (error) {
      alert('Failed to submit prayer request. Please try again.');
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6">
            <CheckCircle size={80} className="text-green-500 mx-auto" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">Prayer Request Submitted!</h2>
          <p className="text-xl text-gray-600">Our prayer team will lift you up in prayer. God hears you!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold mb-6">
            <Heart size={20} />
            Prayer Request
          </div>
          <h1 className="text-5xl font-black mb-6">Submit Your Prayer Request</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Submit your prayer requests and our dedicated prayer team will lift you up in prayer. 
            We believe in the power of prayer and the strength of community.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <Users className="text-blue-600 mb-4" size={40} />
            <h3 className="text-2xl font-bold mb-4">How We Pray</h3>
            <div className="space-y-4 text-gray-600">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Our Prayer Process:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Your request is shared with our prayer team</li>
                  <li>• We pray daily for your specific needs</li>
                  <li>• Confidential requests are kept private</li>
                  <li>• We may follow up if you provide contact info</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Prayer Categories:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Personal struggles and challenges</li>
                  <li>• Family relationships and health</li>
                  <li>• Financial difficulties</li>
                  <li>• Spiritual growth and guidance</li>
                  <li>• Healing and restoration</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl italic text-sm">
                "For where two or three gather in my name, there am I with them." - Matthew 18:20
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Submit Your Prayer Request</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Your Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none" 
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number (Optional)</label>
                  <input 
                    type="tel" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Prayer Request Category *</label>
                <select 
                  required 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select a category</option>
                  <option value="Personal Struggles">Personal Struggles</option>
                  <option value="Family & Relationships">Family & Relationships</option>
                  <option value="Health & Healing">Health & Healing</option>
                  <option value="Financial Difficulties">Financial Difficulties</option>
                  <option value="Spiritual Growth">Spiritual Growth</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Your Prayer Request *</label>
                <textarea 
                  required 
                  value={formData.request} 
                  onChange={(e) => setFormData({...formData, request: e.target.value})} 
                  rows={6} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none" 
                  placeholder="Share your prayer request with us..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  checked={formData.confidential} 
                  onChange={(e) => setFormData({...formData, confidential: e.target.checked})} 
                  className="mt-1" 
                />
                <label className="text-sm text-gray-600 flex items-center gap-2">
                  <Lock size={16} className="text-gray-400" />
                  Keep this request confidential (only shared with prayer team leaders)
                </label>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl text-center">
              <Phone className="inline mr-2 text-blue-600" size={20} />
              <span className="text-sm font-semibold text-gray-700">
                Need immediate prayer? Call our prayer hotline: <a href="tel:+250785465329" className="text-blue-600 font-bold">(+250) 785-465-329</a>
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <Clock className="text-purple-600 mb-4" size={40} />
            <h3 className="text-2xl font-bold mb-4">Prayer Guidelines</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">What to Include:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Specific details about your situation</li>
                  <li>• Names of people involved (if appropriate)</li>
                  <li>• Your desired outcome or prayer focus</li>
                  <li>• Any updates on previous requests</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Our Commitment:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• We pray for each request daily</li>
                  <li>• Your privacy is our priority</li>
                  <li>• We may reach out for updates</li>
                  <li>• We celebrate answered prayers together</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-3xl p-8 shadow-lg">
            <Heart className="mb-4" size={40} />
            <h3 className="text-2xl font-bold mb-4">The Power of Prayer</h3>
            <div className="space-y-4 text-sm opacity-90">
              <p>Prayer is not just a religious duty—it's a powerful conversation with God. When we pray together as a community, we tap into the incredible promise that God is present among us.</p>
              <p>Our prayer team is committed to standing with you in faith, believing that God hears and answers prayers according to His perfect will.</p>
              <p className="font-bold text-lg">"The prayer of a righteous person is powerful and effective." - James 5:16</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
