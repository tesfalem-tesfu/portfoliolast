import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUser, 
  FaProjectDiagram, 
  FaCode, 
  FaBriefcase, 
  FaGraduationCap, 
  FaComments, 
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      window.location.href = '/';
      return;
    }
    fetchStats();
  }, [token]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        toast.error('Failed to fetch dashboard stats');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Error loading dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
    { id: 'skills', label: 'Skills', icon: FaCode },
    { id: 'experience', label: 'Experience', icon: FaBriefcase },
    { id: 'education', label: 'Education', icon: FaGraduationCap },
    { id: 'testimonials', label: 'Testimonials', icon: FaComments },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 min-h-screen p-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Admin Panel
            </h2>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <item.icon className="text-xl" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700 transition-all duration-300"
            >
              <FaSignOutAlt className="text-xl" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white capitalize">{activeTab}</h1>
            <p className="text-gray-400">Manage your {activeTab}</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {activeTab === 'dashboard' && <DashboardContent stats={stats} />}
            {activeTab === 'profile' && <ProfileContent token={token} />}
            {activeTab === 'projects' && <ProjectsContent token={token} />}
            {activeTab === 'skills' && <SkillsContent token={token} />}
            {activeTab === 'experience' && <ExperienceContent token={token} />}
            {activeTab === 'education' && <EducationContent token={token} />}
            {activeTab === 'testimonials' && <TestimonialsContent token={token} />}
            {activeTab === 'settings' && <SettingsContent />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = ({ stats }) => {
  const statCards = [
    { label: 'Projects', value: stats?.projects || 0, icon: FaProjectDiagram, color: 'from-blue-500 to-cyan-500' },
    { label: 'Skills', value: stats?.skills || 0, icon: FaCode, color: 'from-purple-500 to-pink-500' },
    { label: 'Experience', value: stats?.experience || 0, icon: FaBriefcase, color: 'from-green-500 to-emerald-500' },
    { label: 'Messages', value: stats?.messages || 0, icon: FaComments, color: 'from-orange-500 to-red-500' }
  ];

  return (
    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
            <h3 className="text-gray-400">{stat.label}</h3>
          </motion.div>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Messages</h2>
        {stats?.recentMessages?.length > 0 ? (
          <div className="space-y-4">
            {stats.recentMessages.map((message) => (
              <div key={message.id} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">{message.name}</h4>
                  <span className="text-xs text-gray-400">
                    {new Date(message.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{message.subject}</p>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  message.status === 'unread' ? 'bg-red-500/20 text-red-400' :
                  message.status === 'read' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {message.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No recent messages</p>
        )}
      </div>
    </motion.div>
  );
};

// Placeholder components for other tabs
const ProfileContent = ({ token }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
    <h2 className="text-xl font-semibold text-white mb-4">Profile Management</h2>
    <p className="text-gray-400">Profile editing functionality coming soon...</p>
  </div>
);

const ProjectsContent = ({ token }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
    <h2 className="text-xl font-semibold text-white mb-4">Projects Management</h2>
    <p className="text-gray-400">Projects CRUD functionality coming soon...</p>
  </div>
);

const SkillsContent = ({ token }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
    <h2 className="text-xl font-semibold text-white mb-4">Skills Management</h2>
    <p className="text-gray-400">Skills CRUD functionality coming soon...</p>
  </div>
);

const ExperienceContent = ({ token }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
    <h2 className="text-xl font-semibold text-white mb-4">Experience Management</h2>
    <p className="text-gray-400">Experience CRUD functionality coming soon...</p>
  </div>
);

const EducationContent = ({ token }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
    <h2 className="text-xl font-semibold text-white mb-4">Education Management</h2>
    <p className="text-gray-400">Education CRUD functionality coming soon...</p>
  </div>
);

const TestimonialsContent = ({ token }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
    <h2 className="text-xl font-semibold text-white mb-4">Testimonials Management</h2>
    <p className="text-gray-400">Testimonials CRUD functionality coming soon...</p>
  </div>
);

const SettingsContent = () => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
    <h2 className="text-xl font-semibold text-white mb-4">Settings</h2>
    <p className="text-gray-400">Settings functionality coming soon...</p>
  </div>
);

export default AdminPanel;
