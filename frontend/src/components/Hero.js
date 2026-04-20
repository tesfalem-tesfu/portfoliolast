import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTelegram, FaTwitter, FaInstagram, FaDownload, FaArrowDown } from 'react-icons/fa';
import Typed from 'typed.js';

const Hero = () => {
  const [profile, setProfile] = useState({
    full_name: 'Tesfalem Markos Dola',
    title: 'Software Engineering Department Mastering',
    bio: 'Passionate software engineer with expertise in modern web technologies and department-level system architecture.',
    avatar_url: '/images/profile.png',
    github_url: 'https://github.com/tesfalem-tesfu',
    linkedin_url: 'https://linkedin.com/in/tesfutesfalemmarkos',
    telegram_url: 'https://t.me/tesfu_22',
    twitter_url: 'https://x.com/tesfutesfalemmarkos',
    resume_url: 'https://example.com/resume.pdf'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/portfolio/profile');
        if (response.ok) {
          const data = await response.json();
          setProfile(data[0]);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!loading && profile) {
      const typed = new Typed('#typed-text', {
        strings: [
          'Software Engineering Department Mastering',
          'Full Stack Developer',
          'System Architect',
          'Problem Solver',
          'Tech Innovator'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      });
      return () => typed.destroy();
    }
  }, [loading, profile]);

  const socialLinks = [
    { icon: FaGithub,    href: 'https://github.com/tesfalem-tesfu',          label: 'GitHub' },
    { icon: FaLinkedin,  href: 'https://linkedin.com/in/tesfutesfalemmarkos', label: 'LinkedIn' },
    { icon: FaTelegram,  href: 'https://t.me/tesfu_22',                       label: 'Telegram' },
    { icon: FaTwitter,   href: 'https://x.com/tesfutesfalemmarkos',           label: 'X (Twitter)' },
    { icon: FaInstagram, href: 'https://instagram.com/markostesfalem',        label: 'Instagram' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 px-4 sm:px-6 lg:px-8">

      {/* Profile photo — top left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-20 left-6 z-20"
      >
        <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
          <div className="absolute inset-1 rounded-full overflow-hidden shadow-2xl border-4 border-slate-800/30">
            <img
              src={profile?.avatar_url || '/images/profile.png'}
              alt={profile?.full_name || 'Tesfalem Markos Dola'}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/300/4F46E5/ffffff?text=TMD'; }}
            />
          </div>
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-950"></div>
        </div>
      </motion.div>

      {/* Centered content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center gap-6 text-center max-w-2xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <span className="text-purple-300 text-lg font-medium">Hello, I'm</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gradient mb-4 sm:mb-6 animate-glow"
            style={{
              textShadow: '0 0 30px rgba(147, 51, 234, 0.5)',
              transform: 'perspective(1000px) rotateX(5deg)'
            }}
          >
            {profile?.full_name || 'Tesfalem Markos Dola'}
          </motion.h1>

          <motion.div variants={itemVariants} className="h-8">
            <h2 className="text-2xl md:text-3xl text-gray-200">
              <span id="typed-text"></span>
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 leading-relaxed"
          >
            {profile?.bio || 'Passionate full stack developer with expertise in modern web technologies.'}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-premium px-6 sm:px-8 py-2.5 sm:py-3 text-white rounded-xl font-medium text-sm sm:text-base relative overflow-hidden group"
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
            
            <motion.a
              href="/images/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Tesfalem_Markos_Dola_CV.pdf"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-premium px-6 sm:px-8 py-2.5 sm:py-3 text-white rounded-xl font-medium text-sm sm:text-base relative overflow-hidden group flex items-center justify-center gap-2"
            >
              <FaDownload className="text-sm sm:text-base relative z-10" />
              <span className="text-sm sm:text-base relative z-10">Download CV</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="glass-morphism-dark p-3 text-gray-400 hover:text-white transition-all duration-300 rounded-xl hover:scale-110 group"
              >
                {React.createElement(social.icon, { size: 20, className: "group-hover:text-purple-400 transition-colors" })}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <a href="#about" className="text-gray-400 hover:text-white transition-colors">
          <FaArrowDown size={20} />
        </a>
      </motion.div>

      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-purple-500/20 rounded-lg transform rotate-45"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-pink-500/20 rounded-full"></div>
      <div className="absolute top-1/3 right-20 w-12 h-12 border-2 border-blue-500/20 rounded-lg transform rotate-12"></div>
    </section>
  );
};

export default Hero;
