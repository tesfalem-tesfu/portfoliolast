import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaSun, 
  FaMoon, 
  FaBars, 
  FaTimes, 
  FaGithub, 
  FaLinkedin, 
  FaTelegram, 
  FaTwitter,
  FaEnvelope,
  FaInstagram, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaPaperPlane, 
  FaDownload, 
  FaArrowDown, 
  FaAward
} from 'react-icons/fa';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      href: 'https://github.com/tesfalem-tesfu',
      label: 'GitHub'
    },
    {
      icon: FaLinkedin,
      href: 'https://linkedin.com/in/tesfutesfalemmarkos',
      label: 'LinkedIn'
    },
    {
      icon: FaTelegram,
      href: 'https://t.me/tesfu_22',
      label: 'Telegram'
    },
    {
      icon: FaTwitter,
      href: 'https://x.com/tesfutesfalemmarkos',
      label: 'X (Twitter)'
    },
    {
      icon: FaInstagram,
      href: 'https://instagram.com/markostesfalem',
      label: 'Instagram'
    }
  ];

  const handleNavClick = (href) => {
    // Close mobile menu
    setIsOpen(false);
    
    // Simple direct navigation
    if (href === '#home') {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      // Find element and scroll to it
      const element = document.getElementById(href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              TMD
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/10"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Social Links */}
            <div className="flex items-center space-x-3">
              <motion.a
                href="https://github.com/tesfalem-tesfu"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub size={18} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/tesfutesfalemmarkos"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={18} />
              </motion.a>
              <motion.a
                href="https://x.com/tesfutesfalemmarkos"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter size={18} />
              </motion.a>
            </div>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-300" />}
            </motion.button>

            {/* Admin Button */}
            <Link
              to="/admin"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-sm font-medium"
            >
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-300" />}
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1, rotate: isOpen ? 90 : 0 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              {isOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 z-50 bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-lg"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex justify-between items-center px-4 py-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">Menu</h2>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <FaTimes className="text-white" />
                </motion.button>
              </div>
              
              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center px-6 py-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 text-lg font-medium"
                    >
                      <span className="mr-3">{item.name}</span>
                      <FaArrowDown className="text-xs opacity-60" />
                    </motion.a>
                  ))}
                </div>
              </div>
              
              {/* Mobile Footer */}
              <div className="px-4 py-4 border-t border-white/10">
                <div className="flex justify-center space-x-6">
                  <motion.a
                    href="https://github.com/tesfalem-tesfu"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaGithub size={20} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/tesfutesfalemmarkos"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaLinkedin size={20} />
                  </motion.a>
                  <motion.a
                    href="https://x.com/tesfutesfalemmarkos"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTwitter size={20} />
                  </motion.a>
                  <motion.a
                    href="mailto:tesfalem.dola@example.com"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaEnvelope size={20} />
                  </motion.a>
                </div>
                
                <div className="mt-4 px-3">
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="w-full block text-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium"
                  >
                    Admin Panel
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
