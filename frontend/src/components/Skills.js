import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaDatabase, 
  FaDocker, 
  FaAws,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaBootstrap,
  FaPhp,
  FaMobileAlt,
  FaBrain
} from 'react-icons/fa';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/portfolio/skills');
        if (response.ok) {
          const data = await response.json();
          // Remove duplicates by name (more reliable than id) and ensure array
          const uniqueSkills = Array.isArray(data) ? 
            data.filter((skill, index, self) => 
              index === self.findIndex((s) => s.name === skill.name)
            ) : [];
          setSkills(uniqueSkills);
        } else {
          // Fallback data only if API fails
          setSkills([
            { id: 1, name: 'JavaScript', category: 'Frontend', proficiency_level: 'expert', icon_url: 'fab fa-js' },
            { id: 2, name: 'React', category: 'Frontend', proficiency_level: 'expert', icon_url: 'fab fa-react' },
            { id: 3, name: 'HTML', category: 'Frontend', proficiency_level: 'expert', icon_url: 'fab fa-html5' },
            { id: 4, name: 'CSS', category: 'Frontend', proficiency_level: 'expert', icon_url: 'fab fa-css3-alt' },
            { id: 5, name: 'PHP', category: 'Backend', proficiency_level: 'advanced', icon_url: 'fab fa-php' },
            { id: 6, name: 'Node.js', category: 'Backend', proficiency_level: 'expert', icon_url: 'fab fa-node' },
            { id: 7, name: 'Python', category: 'Backend', proficiency_level: 'advanced', icon_url: 'fab fa-python' },
            { id: 8, name: 'MySQL', category: 'Database', proficiency_level: 'advanced', icon_url: 'fas fa-database' },
            { id: 9, name: 'MongoDB', category: 'Database', proficiency_level: 'intermediate', icon_url: 'fas fa-leaf' },
            { id: 10, name: 'Mobile App', category: 'Mobile', proficiency_level: 'intermediate', icon_url: 'fas fa-mobile-alt' },
            { id: 11, name: 'Machine Learning', category: 'AI/ML', proficiency_level: 'intermediate', icon_url: 'fas fa-brain' },
            { id: 12, name: 'Docker', category: 'DevOps', proficiency_level: 'intermediate', icon_url: 'fab fa-docker' },
            { id: 13, name: 'AWS', category: 'Cloud', proficiency_level: 'intermediate', icon_url: 'fab fa-aws' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
        // Fallback data only on error
        setSkills([
          { id: 1, name: 'JavaScript', category: 'Frontend', proficiency_level: 'expert', icon_url: 'fab fa-js' },
          { id: 2, name: 'React', category: 'Frontend', proficiency_level: 'expert', icon_url: 'fab fa-react' },
          { id: 3, name: 'HTML', category: 'Frontend', proficiency_level: 'expert', icon_url: 'fab fa-html5' },
          { id: 4, name: 'CSS', category: 'Frontend', proficiency_level: 'expert', icon_url: 'fab fa-css3-alt' },
          { id: 5, name: 'PHP', category: 'Backend', proficiency_level: 'advanced', icon_url: 'fab fa-php' },
          { id: 6, name: 'Node.js', category: 'Backend', proficiency_level: 'expert', icon_url: 'fab fa-node' },
          { id: 7, name: 'Python', category: 'Backend', proficiency_level: 'advanced', icon_url: 'fab fa-python' },
          { id: 8, name: 'MySQL', category: 'Database', proficiency_level: 'advanced', icon_url: 'fas fa-database' },
          { id: 9, name: 'MongoDB', category: 'Database', proficiency_level: 'intermediate', icon_url: 'fas fa-leaf' },
          { id: 10, name: 'Mobile App', category: 'Mobile', proficiency_level: 'intermediate', icon_url: 'fas fa-mobile-alt' },
          { id: 11, name: 'Machine Learning', category: 'AI/ML', proficiency_level: 'intermediate', icon_url: 'fas fa-brain' },
          { id: 12, name: 'Docker', category: 'DevOps', proficiency_level: 'intermediate', icon_url: 'fab fa-docker' },
          { id: 13, name: 'AWS', category: 'Cloud', proficiency_level: 'intermediate', icon_url: 'fab fa-aws' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const getIcon = (iconUrl) => {
    const iconMap = {
      'fab fa-js': <FaJs className="text-yellow-400" />,
      'fab fa-react': <FaReact className="text-cyan-400" />,
      'fab fa-node': <FaNodeJs className="text-green-400" />,
      'fab fa-python': <FaPython className="text-blue-400" />,
      'fas fa-database': <FaDatabase className="text-orange-400" />,
      'fas fa-leaf': <FaDatabase className="text-green-500" />,
      'fab fa-docker': <FaDocker className="text-blue-500" />,
      'fab fa-aws': <FaAws className="text-orange-500" />,
      'fab fa-git-alt': <FaGitAlt className="text-red-500" />,
      'fab fa-html5': <FaHtml5 className="text-orange-600" />,
      'fab fa-css3-alt': <FaCss3Alt className="text-blue-600" />,
      'fab fa-bootstrap': <FaBootstrap className="text-purple-600" />,
      'fab fa-php': <FaPhp className="text-purple-500" />,
      'fas fa-mobile-alt': <FaMobileAlt className="text-blue-400" />,
      'fas fa-brain': <FaBrain className="text-pink-500" />
    };
    return iconMap[iconUrl] || <FaJs className="text-gray-400" />;
  };

  const getProficiencyColor = (level) => {
    const colors = {
      beginner: 'bg-red-500',
      intermediate: 'bg-yellow-500',
      advanced: 'bg-blue-500',
      expert: 'bg-green-500'
    };
    return colors[level] || 'bg-gray-500';
  };

  const getProficiencyWidth = (level) => {
    const widths = {
      beginner: 25,
      intermediate: 50,
      advanced: 75,
      expert: 100
    };
    return widths[level] || 0;
  };

  // Group skills by category
  const skillsByCategory = Array.isArray(skills) ? skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {}) : {};

  const categories = Object.keys(skillsByCategory);

  if (loading) {
    return (
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Technical Skills
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and proficiency levels
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl"></div>
                
                <h3 className="text-xl font-bold text-white mb-6 text-center relative z-10">
                  {category}
                </h3>
                <div className="space-y-4 relative z-10">
                  {skillsByCategory[category].map((skill, skillIndex) => (
                    <motion.div
                      key={skill.id}
                      whileHover={{ scale: 1.02 }}
                      className="py-3 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">
                            {getIcon(skill.icon_url)}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{skill.name}</h4>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getProficiencyColor(skill.proficiency_level)}`}>
                            {skill.proficiency_level}
                          </span>
                        </div>
                      </div>
                      
                      {/* Proficiency Bar */}
                      <div className="relative">
                        <div className="bg-slate-600 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: inView ? `${getProficiencyWidth(skill.proficiency_level)}%` : 0 }}
                            transition={{ 
                              delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05,
                              duration: 0.8,
                              ease: "easeOut"
                            }}
                            className={`h-full ${getProficiencyColor(skill.proficiency_level)} rounded-full`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Section */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-16 w-64 h-32 rounded-full bg-pink-500/10 blur-3xl"></div>
              
              <h3 className="text-2xl font-bold text-white mb-8 text-center relative z-10">
                Additional Technologies & Tools
              </h3>
              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                {[
                  'Git', 'RESTful APIs', 'GraphQL', 'TypeScript', 'Tailwind CSS',
                  'Redux', 'Jest', 'Webpack', 'CI/CD', 'Agile', 'Scrum',
                  'Figma', 'Postman', 'Linux', 'Nginx', 'Redis'
                ].map((tech, index) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: inView ? 1 : 0, 
                      scale: inView ? 1 : 0.8 
                    }}
                    transition={{ 
                      delay: 0.8 + index * 0.05,
                      duration: 0.5
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300 hover:text-white transition-all duration-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
