import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaLightbulb, FaRocket, FaHeart, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const About = () => {
  const [profile, setProfile] = useState({
    full_name: 'Tesfalem Markos Dola',
    title: 'Software Engineering Department Mastering',
    bio: `I am a passionate software engineer specializing in department-level system architecture and modern web technologies. With a strong foundation in software engineering principles, I excel at creating scalable, efficient solutions that solve real-world problems.

    My expertise spans across full-stack development, from designing intuitive user interfaces to building robust backend systems. I believe in writing clean, maintainable code and following best practices in software development.

    Currently, I'm focused on leveraging cutting-edge technologies to build innovative solutions that make a meaningful impact in the software industry and beyond.`,
    avatar_url: '/images/profile.png',
    github_url: 'https://github.com/tesfalem-tesfu',
    linkedin_url: 'https://linkedin.com/in/tesfutesfalemmarkos',
    telegram_url: 'https://t.me/tesfu_22',
    twitter_url: 'https://x.com/tesfutesfalemmarkos'
  });
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
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
    
    // Fallback timeout to ensure content shows
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, []);

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

  const coreValues = [
    {
      icon: FaCode,
      title: 'Clean Architecture',
      description: 'Building scalable, maintainable software systems with clean code principles and solid design patterns.'
    },
    {
      icon: FaRocket,
      title: 'Performance Excellence',
      description: 'Optimizing applications for maximum efficiency, speed, and exceptional user experience.'
    },
    {
      icon: FaLightbulb,
      title: 'Innovation Focus',
      description: 'Continuously exploring cutting-edge technologies and creative solutions to complex problems.'
    },
    {
      icon: FaHeart,
      title: 'Quality Commitment',
      description: 'Dedicated to delivering high-quality, robust solutions that exceed expectations.'
    }
  ];

  const stats = [
    { number: '0+', label: 'Years Experience' },
    { number: '3+', label: 'Projects Completed' },
    { number: '1+', label: 'Projects Delivered' },
    { number: 'In Progress', label: 'Certifications' }
  ];

  if (loading) {
    return (
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 relative scroll-mt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>
      
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
                About Me
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get to know more about me, my background, and what drives my passion for software engineering
            </p>
          </motion.div>

          {/* About Me Card */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden max-w-4xl mx-auto">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-pink-500/20 blur-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">
                  About Me
                </h3>
                
                <div className="text-center mb-8">
                  <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                    {profile?.bio || 'Passionate software engineer with expertise in modern web technologies.'}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {coreValues.map((value, index) => (
                    <div key={value.title} className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <value.icon className="text-white text-2xl" />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">{value.title}</h4>
                      <p className="text-gray-400 text-sm">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
