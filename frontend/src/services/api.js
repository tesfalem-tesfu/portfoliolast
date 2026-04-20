import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Portfolio API endpoints
export const portfolioAPI = {
  // Profile
  getProfile: () => api.get('/portfolio/profile'),
  updateProfile: (data) => api.put('/admin/profile', data),

  // Skills
  getSkills: (category) => api.get('/portfolio/skills', { params: { category } }),
  createSkill: (data) => api.post('/admin/skills', data),
  updateSkill: (id, data) => api.put(`/admin/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/admin/skills/${id}`),

  // Projects
  getProjects: (params) => api.get('/portfolio/projects', { params }),
  getProject: (id) => api.get(`/portfolio/projects/${id}`),
  createProject: (data) => api.post('/admin/projects', data),
  updateProject: (id, data) => api.put(`/admin/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),

  // Experience
  getExperience: () => api.get('/portfolio/experience'),
  createExperience: (data) => api.post('/admin/experience', data),
  updateExperience: (id, data) => api.put(`/admin/experience/${id}`, data),
  deleteExperience: (id) => api.delete(`/admin/experience/${id}`),

  // Education
  getEducation: () => api.get('/portfolio/education'),
  createEducation: (data) => api.post('/admin/education', data),
  updateEducation: (id, data) => api.put(`/admin/education/${id}`, data),
  deleteEducation: (id) => api.delete(`/admin/education/${id}`),

  // Testimonials
  getTestimonials: (params) => api.get('/portfolio/testimonials', { params }),
  createTestimonial: (data) => api.post('/admin/testimonials', data),
  updateTestimonial: (id, data) => api.put(`/admin/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/admin/testimonials/${id}`),

  // Stats
  getStats: () => api.get('/portfolio/stats'),
  getTechnologies: () => api.get('/portfolio/technologies'),
};

// Contact API endpoints
export const contactAPI = {
  sendMessage: (data) => api.post('/contact', data),
  getMessages: (params) => api.get('/contact/messages', { params }),
  updateMessageStatus: (id, status) => api.put(`/contact/messages/${id}/status`, { status }),
};

// Auth API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
  verifyToken: (token) => api.post('/auth/verify', { token }),
};

// Admin API endpoints
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  
  // File upload
  uploadFile: (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/admin/upload/${type}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;
