import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Calendar, Video, Users, MessageSquare, Bell, User } from 'lucide-react';
import { api } from '../lib/api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      searchData();
    } else {
      setResults({});
    }
  }, [query]);

  const searchData = async () => {
    setLoading(true);
    try {
      const data = await api.search(query);
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
    setLoading(false);
  };

  const totalResults = Object.values(results).reduce((acc: number, arr: any) => acc + (arr?.length || 0), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="relative max-w-3xl mx-auto mt-20 mb-20"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center gap-4">
                  <Search className="text-gray-400" size={24} />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search events, sermons, groups, members..."
                    className="flex-1 text-lg outline-none"
                    autoFocus
                  />
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-6">
                {loading && (
                  <div className="text-center py-8 text-gray-500">Searching...</div>
                )}

                {!loading && query.length > 2 && totalResults === 0 && (
                  <div className="text-center py-8 text-gray-500">No results found</div>
                )}

                {!loading && totalResults > 0 && (
                  <div className="space-y-6">
                    {results.events?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                          <Calendar size={16} /> Events ({results.events.length})
                        </h3>
                        <div className="space-y-2">
                          {results.events.map((event: any) => (
                            <a key={event.id} href="#services" onClick={onClose} className="block p-4 rounded-xl hover:bg-gray-50 transition-colors">
                              <h4 className="font-bold text-gray-900">{event.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{event.location} • {new Date(event.date).toLocaleDateString()}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {results.sermons?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                          <Video size={16} /> Sermons ({results.sermons.length})
                        </h3>
                        <div className="space-y-2">
                          {results.sermons.map((sermon: any) => (
                            <a key={sermon.id} href="#sermons" onClick={onClose} className="block p-4 rounded-xl hover:bg-gray-50 transition-colors">
                              <h4 className="font-bold text-gray-900">{sermon.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{sermon.speaker} • {sermon.scripture}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {results.groups?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                          <Users size={16} /> Groups ({results.groups.length})
                        </h3>
                        <div className="space-y-2">
                          {results.groups.map((group: any) => (
                            <a key={group.id} href="#ministries" onClick={onClose} className="block p-4 rounded-xl hover:bg-gray-50 transition-colors">
                              <h4 className="font-bold text-gray-900">{group.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{group.description}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {results.testimonies?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                          <MessageSquare size={16} /> Testimonies ({results.testimonies.length})
                        </h3>
                        <div className="space-y-2">
                          {results.testimonies.map((testimony: any) => (
                            <div key={testimony.id} className="p-4 rounded-xl bg-gray-50">
                              <h4 className="font-bold text-gray-900">{testimony.title}</h4>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{testimony.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {results.announcements?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                          <Bell size={16} /> Announcements ({results.announcements.length})
                        </h3>
                        <div className="space-y-2">
                          {results.announcements.map((announcement: any) => (
                            <div key={announcement.id} className="p-4 rounded-xl bg-blue-50">
                              <h4 className="font-bold text-gray-900">{announcement.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {results.members?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                          <User size={16} /> Members ({results.members.length})
                        </h3>
                        <div className="space-y-2">
                          {results.members.map((member: any) => (
                            <div key={member.id} className="p-4 rounded-xl bg-green-50">
                              <h4 className="font-bold text-gray-900">{member.full_name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{member.location}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
