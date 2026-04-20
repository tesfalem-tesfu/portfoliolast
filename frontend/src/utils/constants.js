// Application constants
export const APP_CONFIG = {
  name: 'Professional Portfolio',
  version: '1.0.0',
  description: 'A professional full-stack portfolio application',
  author: 'Tesfalem Markos Dola'
};

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
    verify: '/auth/verify'
  },
  portfolio: {
    profile: '/portfolio/profile',
    skills: '/portfolio/skills',
    projects: '/portfolio/projects',
    experience: '/portfolio/experience',
    education: '/portfolio/education',
    testimonials: '/portfolio/testimonials',
    stats: '/portfolio/stats',
    technologies: '/portfolio/technologies'
  },
  contact: {
    send: '/contact',
    messages: '/contact/messages'
  },
  admin: {
    dashboard: '/admin/dashboard/stats'
  }
};

// Status options
export const PROJECT_STATUS = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in_progress',
  PLANNED: 'planned'
};

export const SKILL_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert'
};

export const MESSAGE_STATUS = {
  UNREAD: 'unread',
  READ: 'read',
  REPLIED: 'replied'
};

// Categories
export const SKILL_CATEGORIES = {
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  DATABASE: 'Database',
  DEVOPS: 'DevOps',
  CLOUD: 'Cloud',
  MOBILE: 'Mobile',
  DESIGN: 'Design'
};

// Validation patterns
export const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  username: /^[a-zA-Z0-9_]{3,30}$/
};

// File upload limits
export const UPLOAD_LIMITS = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  allowedDocumentTypes: ['application/pdf'],
  maxImageCount: 5
};

// Animation durations
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8
};

// Breakpoints
export const BREAKPOINTS = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Theme colors
export const THEME_COLORS = {
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b'
  },
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
  }
};

// Error messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  server: 'Server error. Please try again later.',
  unauthorized: 'Unauthorized access. Please login.',
  notFound: 'Resource not found.',
  validation: 'Please check your input and try again.',
  upload: 'File upload failed. Please try again.',
  generic: 'Something went wrong. Please try again.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  saved: 'Saved successfully!',
  updated: 'Updated successfully!',
  deleted: 'Deleted successfully!',
  sent: 'Sent successfully!',
  uploaded: 'Uploaded successfully!',
  created: 'Created successfully!'
};

// Loading messages
export const LOADING_MESSAGES = {
  saving: 'Saving...',
  loading: 'Loading...',
  uploading: 'Uploading...',
  sending: 'Sending...',
  processing: 'Processing...'
};

// Social media links
export const SOCIAL_LINKS = {
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com'
};

// Navigation items
export const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
];

// Default values
export const DEFAULTS = {
  avatar: 'https://via.placeholder.com/150x150/4F46E5/ffffff?text=Avatar',
  logo: 'https://via.placeholder.com/100x100/4F46E5/ffffff?text=Logo',
  image: 'https://via.placeholder.com/600x400/4F46E5/ffffff?text=Image',
  pagination: {
    page: 1,
    limit: 10
  }
};

// Local storage keys
export const STORAGE_KEYS = {
  token: 'token',
  user: 'user',
  theme: 'theme',
  language: 'language',
  preferences: 'preferences'
};

// Date formats
export const DATE_FORMATS = {
  short: 'MM/dd/yyyy',
  long: 'MMMM dd, yyyy',
  time: 'h:mm a',
  datetime: 'MM/dd/yyyy h:mm a',
  iso: 'yyyy-MM-dd'
};

// Regex patterns
export const REGEX_PATTERNS = {
  htmlTags: /<[^>]*>/g,
  whitespace: /^\s+|\s+$/g,
  numbers: /\d+/g,
  letters: /[a-zA-Z]/g,
  specialChars: /[!@#$%^&*(),.?":{}|<>]/
};

// File types
export const FILE_TYPES = {
  images: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
  documents: ['pdf', 'doc', 'docx', 'txt'],
  videos: ['mp4', 'avi', 'mov', 'wmv'],
  audio: ['mp3', 'wav', 'ogg', 'flac']
};

// Time units
export const TIME_UNITS = {
  millisecond: 1,
  second: 1000,
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  year: 365 * 24 * 60 * 60 * 1000
};
