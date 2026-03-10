const API_URL = import.meta.env.VITE_API_URL || '';

const safeFetch = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok && response.status >= 500) {
      throw new Error('Server error. Please try again.');
    }
    return response;
  } catch (error: any) {
    if (error.message.includes('fetch')) {
      throw new Error('Cannot connect to server');
    }
    throw error;
  }
};

export const api = {
  login: async (email: string, password: string) => {
    const res = await safeFetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  register: async (email: string, password: string, name: string) => {
    const res = await safeFetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    return res.json();
  },

  getProfile: async (userId: number) => {
    const res = await safeFetch(`${API_URL}/api/auth/profile/${userId}`);
    return res.json();
  },

  updateProfile: async (userId: number, data: { name: string; email: string }) => {
    const res = await safeFetch(`${API_URL}/api/auth/profile/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  changePassword: async (userId: number, oldPassword: string, newPassword: string) => {
    const res = await safeFetch(`${API_URL}/api/auth/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, oldPassword, newPassword })
    });
    return res.json();
  },

  getHeroSlides: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/hero-slides`);
      return res.json();
    } catch {
      return [];
    }
  },
  
  createHeroSlide: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/admin/hero-slides`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateHeroSlide: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/admin/hero-slides/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteHeroSlide: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/admin/hero-slides/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  getEvents: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/events`);
      return res.json();
    } catch {
      return [];
    }
  },

  createEvent: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateEvent: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteEvent: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/events/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  registerForEvent: async (eventId: number, userId: number) => {
    const res = await safeFetch(`${API_URL}/api/events/${eventId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    });
    return res.json();
  },

  getPrayers: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/prayers`);
      return res.json();
    } catch {
      return [];
    }
  },

  createPrayer: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/prayers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  prayForRequest: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/prayers/${id}/pray`, {
      method: 'POST'
    });
    return res.json();
  },

  getSermons: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/sermons`);
      return res.json();
    } catch {
      return [];
    }
  },

  createSermon: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/sermons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateSermon: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/sermons/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteSermon: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/admin/sermons/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  viewSermon: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/sermons/${id}/view`, {
      method: 'POST'
    });
    return res.json();
  },

  likeSermon: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/sermons/${id}/like`, {
      method: 'POST'
    });
    return res.json();
  },

  getTestimonies: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/testimonies`);
      return res.json();
    } catch {
      return [];
    }
  },

  getAdminTestimonies: async () => {
    const res = await safeFetch(`${API_URL}/api/admin/testimonies`);
    return res.json();
  },

  createTestimony: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/testimonies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  approveTestimony: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/admin/testimonies/${id}/approve`, {
      method: 'PUT'
    });
    return res.json();
  },

  deleteTestimony: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/testimonies/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  getGroups: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/groups`);
      return res.json();
    } catch {
      return [];
    }
  },

  createGroup: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/groups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateGroup: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/groups/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteGroup: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/groups/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  getAnnouncements: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/announcements`);
      return res.json();
    } catch {
      return [];
    }
  },

  createAnnouncement: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/announcements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateAnnouncement: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/announcements/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteAnnouncement: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/announcements/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  getGallery: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/gallery`);
      return res.json();
    } catch {
      return [];
    }
  },

  createGalleryImage: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateGalleryImage: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/gallery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteGalleryImage: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/admin/gallery/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // Videos
  getVideos: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/videos`);
      return res.json();
    } catch {
      return [];
    }
  },

  createVideo: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/videos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateVideo: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/videos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteVideo: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/videos/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // Flyers
  getFlyers: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/flyers`);
      return res.json();
    } catch {
      return [];
    }
  },

  createFlyer: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/flyers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateFlyer: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/flyers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteFlyer: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/flyers/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  uploadFile: async (file: File, folder?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder || 'uploads');
    formData.append('resource_type', file.type.startsWith('video') ? 'video' : 'auto');
    
    const res = await safeFetch(`${API_URL}/api/upload-file`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    return data.url;
  },

  getBranchImages: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/branch-images`);
      return res.json();
    } catch {
      return [];
    }
  },

  createBranchImage: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/branch-images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteBranchImage: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/branch-images/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  getDynamicImages: async (section?: string) => {
    try {
      const url = section ? `${API_URL}/api/dynamic-images?section=${section}` : `${API_URL}/api/dynamic-images`;
      const res = await safeFetch(url);
      return res.json();
    } catch {
      return [];
    }
  },

  createDynamicImage: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/dynamic-images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteDynamicImage: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/dynamic-images/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  search: async (query: string) => {
    try {
      const res = await safeFetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
      return res.json();
    } catch {
      return { events: [], sermons: [], groups: [], testimonies: [], announcements: [], members: [] };
    }
  },

  registerMember: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/members/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  getMembers: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/members`);
      return res.json();
    } catch {
      return [];
    }
  },

  getMember: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/members/${id}`);
    return res.json();
  },

  getMembersByLocation: async (location: string) => {
    const res = await safeFetch(`${API_URL}/api/members/location/${location}`);
    return res.json();
  },

  // Branches
  getBranches: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/branches`);
      return res.json();
    } catch {
      return [];
    }
  },

  getBranch: async (slug: string) => {
    const res = await safeFetch(`${API_URL}/api/branches/${slug}`);
    return res.json();
  },

  createBranch: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/branches`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateBranch: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/branches/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteBranch: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/branches/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  getChurchProfile: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/church-profile`);
      return res.json();
    } catch {
      return { logo: '/logo.jpg', name: 'Foursquare Church', tagline: 'CityLight Church' };
    }
  },

  updateChurchProfile: async (data: { logo?: string; name?: string; tagline?: string }) => {
    const res = await safeFetch(`${API_URL}/api/church-profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  createFeedback: async (data: { name: string; message: string }) => {
    const res = await safeFetch(`${API_URL}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  getFeedback: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/feedback`);
      return res.json();
    } catch {
      return [];
    }
  },

  createMembershipRequest: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/membership-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  getMembershipRequests: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/membership-requests`);
      return res.json();
    } catch {
      return [];
    }
  },

  getVolunteerRequests: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/volunteer-requests`);
      return res.json();
    } catch {
      return [];
    }
  },

  updateVolunteerRequest: async (id: number, status: string) => {
    const res = await safeFetch(`${API_URL}/api/volunteer-requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  deleteVolunteerRequest: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/volunteer-requests/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  createVolunteerRequest: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/volunteer-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Finance Management
  getTransactions: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/finance/transactions`);
      return res.json();
    } catch {
      return [];
    }
  },

  createTransaction: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/finance/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteTransaction: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/admin/transactions/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  getFinanceSummary: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/finance/summary`);
      return res.json();
    } catch {
      return { income: 0, expenses: 0, balance: 0 };
    }
  },

  // New Christians
  getNewChristians: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/new-christians`);
      return res.json();
    } catch {
      return [];
    }
  },

  createNewChristian: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/new-christians`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteNewChristian: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/admin/newchristians/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // Members Management
  createMember: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/admin/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteMember: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/admin/members/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  }
};
