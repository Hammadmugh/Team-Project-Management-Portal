import axios from 'axios';

const API_BASE_URL = 'https://team-project-management-portal-back.vercel.app/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests interceptor
apiClient.interceptors.request.use(
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

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH ENDPOINTS ====================

export const authAPI = {
  register: (email, password) =>
    apiClient.post('/auth/register', { email, password }),
  
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
};

// ==================== PROJECTS ENDPOINTS ====================

export const projectsAPI = {
  // Get all projects with optional filters
  getProjects: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.title) params.append('title', filters.title);
    
    return apiClient.get(`/projects?${params.toString()}`);
  },
  
  // Get single project
  getProject: (projectId) =>
    apiClient.get(`/projects/${projectId}`),
  
  // Create new project
  createProject: (projectData) =>
    apiClient.post('/projects', projectData),
  
  // Update project
  updateProject: (projectId, projectData) =>
    apiClient.put(`/projects/${projectId}`, projectData),
  
  // Delete project
  deleteProject: (projectId) =>
    apiClient.delete(`/projects/${projectId}`),
  
  // Get project statistics
  getStats: () =>
    apiClient.get('/projects/stats'),
  
  // Add team member to project
  addTeamMember: (projectId, memberId) =>
    apiClient.post(`/projects/${projectId}/team-members`, { memberId }),
  
  // Remove team member from project
  removeTeamMember: (projectId, memberId) =>
    apiClient.delete(`/projects/${projectId}/team-members`, { data: { memberId } }),
};

// ==================== MEMBERS ENDPOINTS ====================

export const membersAPI = {
  // Get all members with optional filters
  getMembers: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.role) params.append('role', filters.role);
    if (filters.name) params.append('name', filters.name);
    
    return apiClient.get(`/members?${params.toString()}`);
  },
  
  // Get single member
  getMember: (memberId) =>
    apiClient.get(`/members/${memberId}`),
  
  // Create new member
  createMember: (memberData) =>
    apiClient.post('/members', memberData),
  
  // Update member
  updateMember: (memberId, memberData) =>
    apiClient.put(`/members/${memberId}`, memberData),
  
  // Delete member
  deleteMember: (memberId) =>
    apiClient.delete(`/members/${memberId}`),
};

export default apiClient;
