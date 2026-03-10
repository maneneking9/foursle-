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
    return await res.json();
  },

  register: async (email: string, password: string, name: string) => {
    const res = await safeFetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    return await res.json();
  },

  getProfile: async (userId: number) => {
    const res = await safeFetch(`${API_URL}/api/auth/profile/${userId}`);
    return await res.json();
  },

  updateProfile: async (userId: number, data: { name: string; email: string }) => {
    const res = await safeFetch(`${API_URL}/api/auth/profile/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  changePassword: async (userId: number, oldPassword: string, newPassword: string) => {
    const res = await safeFetch(`${API_URL}/api/auth/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, oldPassword, newPassword })
    });
    return await res.json();
  },

  getHeroSlides: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/hero-slides`);
      return await res.json();
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
    return await res.json();
  },

  updateHeroSlide: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/admin/hero-slides/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  deleteHeroSlide: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/admin/hero-slides/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  getEvents: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/events`);
      return await res.json();
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
    return await res.json();
  },

  updateEvent: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  deleteEvent: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/events/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  registerForEvent: async (eventId: number, userId: number) => {
    const res = await safeFetch(`${API_URL}/api/events/${eventId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    });
    return await res.json();
  },

  getPrayers: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/prayers`);
      return await res.json();
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
    return await res.json();
  },

  prayForRequest: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/prayers/${id}/pray`, {
      method: 'POST'
    });
    return await res.json();
  },

  getSermons: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/sermons`);
      return await res.json();
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
    return await res.json();
  },

  updateSermon: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/sermons/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  deleteSermon: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/admin/sermons/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  viewSermon: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/sermons/${id}/view`, {
      method: 'POST'
    });
    return await res.json();
  },

  likeSermon: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/sermons/${id}/like`, {
      method: 'POST'
    });
    return await res.json();
  },

  getTestimonies: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/testimonies`);
      return await res.json();
    } catch {
      return [];
    }
  },

  getAdminTestimonies: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/admin/testimonies`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createTestimony: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/testimonies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  approveTestimony: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/admin/testimonies/${id}/approve`, {
      method: 'PUT'
    });
    return await res.json();
  },

  deleteTestimony: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/testimonies/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  getGroups: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/groups`);
      return await res.json();
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
    return await res.json();
  },

  updateGroup: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/groups/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  deleteGroup: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/groups/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  getAnnouncements: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/announcements`);
      return await res.json();
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
    return await res.json();
  },

  updateAnnouncement: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/announcements/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  deleteAnnouncement: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/announcements/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  getGallery: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/gallery`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createGalleryImage: async (data: any) => {
    try {
      const res = await safeFetch(`${API_URL}/api/admin/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to create gallery image');
      }
      return res.json().catch(() => ({ success: true }));
    } catch (error: any) {
      console.error('Create gallery error:', error);
      throw error;
    }
  },

  updateGalleryImage: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/admin/gallery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  deleteGalleryImage: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/admin/gallery/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  // Videos
  getVideos: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/videos`);
      return await res.json();
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
    return await res.json();
  },

  updateVideo: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/videos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  deleteVideo: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/videos/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  // Flyers
  getFlyers: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/flyers`);
      return await res.json();
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
    return await res.json();
  },

  updateFlyer: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/flyers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  deleteFlyer: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/flyers/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
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
      return await res.json();
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
    return await res.json();
  },

  deleteBranchImage: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/branch-images/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  getDynamicImages: async (section?: string) => {
    try {
      const url = section ? `${API_URL}/api/dynamic-images?section=${section}` : `${API_URL}/api/dynamic-images`;
      const res = await safeFetch(url);
      return await res.json();
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
    return await res.json();
  },

  deleteDynamicImage: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/dynamic-images/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  search: async (query: string) => {
    try {
      const res = await safeFetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
      return await res.json();
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
    return await res.json();
  },

  getMembers: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/members`);
      return await res.json();
    } catch {
      return [];
    }
  },

  getMember: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/members/${id}`);
    return await res.json();
  },

  getMembersByLocation: async (location: string) => {
    const res = await safeFetch(`${API_URL}/api/members/location/${location}`);
    return await res.json();
  },

  // Branches
  getBranches: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/branches`);
      return await res.json();
    } catch {
      return [];
    }
  },

  getBranch: async (slug: string) => {
    const res = await safeFetch(`${API_URL}/api/branches/${slug}`);
    return await res.json();
  },

  createBranch: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/branches`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  updateBranch: async (id: number, data: any) => {
    const res = await safeFetch(`${API_URL}/api/branches/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  deleteBranch: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/branches/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  getChurchProfile: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/church-profile`);
      return await res.json();
    } catch {
      return { logo: '/logo.jpg', name: 'Foursquare Church', tagline: 'CityLight Church' };
    }
  },

  updateChurchProfile: async (data: { logo?: string; name?: string; tagline?: string; citylightLogo?: string; wordlightLogo?: string }) => {
    const res = await safeFetch(`${API_URL}/api/church-profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  createFeedback: async (data: { name: string; message: string }) => {
    const res = await safeFetch(`${API_URL}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  getFeedback: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/feedback`);
      return await res.json();
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
    return await res.json();
  },

  getMembershipRequests: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/membership-requests`);
      return await res.json();
    } catch {
      return [];
    }
  },

  getVolunteerRequests: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/volunteer-requests`);
      return await res.json();
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
    return await res.json();
  },

  deleteVolunteerRequest: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/volunteer-requests/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  createVolunteerRequest: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/volunteer-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  // Finance Management
  getTransactions: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/finance/transactions`);
      return await res.json();
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
    return await res.json();
  },

  deleteTransaction: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/admin/transactions/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  getFinanceSummary: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/finance/summary`);
      return await res.json();
    } catch {
      return { income: 0, expenses: 0, balance: 0 };
    }
  },

  // New Christians
  getNewChristians: async () => {
    try {
      const res = await safeFetch(`${API_URL}/api/new-christians`);
      return await res.json();
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
    return await res.json();
  },

  deleteNewChristian: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/admin/newchristians/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  // Members Management
  createMember: async (data: any) => {
    const res = await safeFetch(`${API_URL}/api/admin/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  deleteMember: async (id: number) => {
    const res = await safeFetch(`${API_URL}/api/admin/members/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  }
};
