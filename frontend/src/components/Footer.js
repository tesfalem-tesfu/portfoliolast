import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTelegram, FaTwitter, FaInstagram, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    },
    {
      icon: FaEnvelope,
      href: 'mailto:tesfutesfalemmarkos@gmail.com',
      label: 'Email'
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="relative bg-slate-900/50 backdrop-blur-sm border-t border-purple-500/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="py-12">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Tesfalem Markos Dola
                </h3>
                <p className="text-gray-400 mt-2">
                  Software Engineering Department Mastering
                </p>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Passionate software engineer specializing in department-level system architecture and modern web technologies.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-slate-700 transition-all duration-300"
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                Let's build something amazing together!
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-purple-500/20 mb-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm mb-4 md:mb-0"
            >
              © {currentYear} Tesfalem Markos Dola. All rights reserved.
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              {/* Scroll to Top Button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                <FaArrowUp size={16} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
