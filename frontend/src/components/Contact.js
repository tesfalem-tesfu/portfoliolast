import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTelegram, FaTwitter, FaInstagram, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';
import BuiltWith from './BuiltWith';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://portfolio-backend.onrender.com'}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'tesfutesfalemmarkos@gmail.com',
      href: 'mailto:tesfutesfalemmarkos@gmail.com'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+251 912 345 678',
      href: 'tel:+251912345678'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Addis Ababa, Ethiopia',
      href: '#'
    }
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

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-gray-900/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I would love to hear from you!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-pink-500/20 blur-3xl"></div>
                
                <h3 className="text-2xl font-bold text-white mb-8 relative z-10 flex items-center gap-3">
                  <FaPaperPlane className="text-purple-400" />
                  Send Me a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="Tesfalem Markos Dola"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Send Message button — full width */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="h-full">
              <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden h-full flex flex-col justify-between">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-pink-500/20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl"></div>
                
                <div className="space-y-8 relative z-10">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="text-white text-xl" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">{info.label}</div>
                        <div className="text-white font-medium">{info.value}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Connect With Me
                    </h3>
                
                <div className="grid grid-cols-3 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex flex-col items-center space-y-2 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700/70 transition-all duration-300 group"
                    >
                      <social.icon className="text-2xl text-purple-400 group-hover:text-white transition-colors" />
                      <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                        {social.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      Current Availability
                    </h4>
                <p className="text-gray-300 mb-3">
                  I am currently available for freelance projects and full-time opportunities.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">
                    Available for work
                  </span>
                </div>
              </div>

                  {/* Built With — circle button below availability */}
                  <div className="flex items-center gap-4 pt-6 border-t border-slate-700/50">
                    <BuiltWith />
                    <div>
                      <p className="text-white text-sm font-medium">Performance Stats</p>
                      <p className="text-gray-500 text-xs">Lighthouse scores & build metrics</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
