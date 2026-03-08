import { useState } from 'react';
import { Lock, Mail, ArrowLeft, Eye, EyeOff, Shield, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '../lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await api.login(email, password);
      if (result.success) {
        localStorage.setItem('admin_user', JSON.stringify(result.user));
        if (rememberMe) {
          localStorage.setItem('remember_email', email);
        }
        
        if (result.user.role === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Backend API not available. This is a demo deployment. Please run locally for full functionality.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md relative z-10"
      >
        <a href="/" className="inline-flex items-center gap-2 text-white hover:text-white/80 mb-8 transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
          <ArrowLeft size={20} />
          <span className="font-semibold">Back to Home</span>
        </a>

        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
        >
          <div className="text-center mb-8">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <Lock size={36} className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all bg-white"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all bg-white"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                Forgot password?
              </a>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                >
                  <Shield size={16} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 relative overflow-hidden group"
            >
              <span className="relative z-10">{loading ? 'Signing in...' : 'Sign In'}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 font-semibold hover:text-blue-700">
                Sign Up
              </a>
            </p>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-3">Quick Access</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEmail('manane@gmail.com');
                    setPassword('2026');
                  }}
                  className="flex-1 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-xs font-semibold hover:bg-purple-100 transition-colors"
                >
                  Admin Demo
                </button>
                <a
                  href="/join"
                  className="flex-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors text-center"
                >
                  Join Church
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
            <Shield size={16} />
            <span>Secure & Encrypted Connection</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
