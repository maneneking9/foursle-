import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, MessageCircle, Sparkles, CheckCircle } from 'lucide-react';
import { api } from '../lib/api';

export default function UserFeedback() {
  const [activeTab, setActiveTab] = useState<'prayer' | 'feedback'>('prayer');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeTab === 'prayer') {
        await api.createPrayer({ title: name, description: message, user_id: null });
      } else {
        await api.createFeedback({ name, message });
      }
      setSuccess(true);
      setName('');
      setMessage('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert('Failed to submit. Please try again.');
    }
    setLoading(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-bold mb-4">
            <Sparkles size={16} />
            We're Here For You
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">Share Your Heart</h2>
          <p className="text-gray-600 text-lg">Submit a prayer request or share your feedback with us</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
        >
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('prayer')}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all ${
                activeTab === 'prayer'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart className="inline mr-2" size={20} />
              Prayer Request
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all ${
                activeTab === 'feedback'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <MessageCircle className="inline mr-2" size={20} />
              Feedback
            </button>
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  {activeTab === 'prayer'
                    ? 'Your prayer request has been received. We will pray for you.'
                    : 'Your feedback has been received. We appreciate your input!'}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {activeTab === 'prayer' ? 'Your Name (Optional)' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                    placeholder="Enter your name"
                    required={activeTab === 'feedback'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {activeTab === 'prayer' ? 'Prayer Request' : 'Your Feedback'}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all resize-none"
                    placeholder={
                      activeTab === 'prayer'
                        ? 'Share your prayer request...'
                        : 'Share your thoughts, suggestions, or ideas...'
                    }
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send size={20} />
                      Submit {activeTab === 'prayer' ? 'Prayer Request' : 'Feedback'}
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
