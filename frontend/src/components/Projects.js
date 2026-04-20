import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaCode, FaEye } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    // Use only frontend data to avoid backend API with old projects
    setProjects([
      {
        id: 1,
        title: 'Sorting Quiz Game',
        short_description: 'Visual sorting algorithm learning game with interactive animations',
        description: 'An engaging educational game that teaches sorting algorithms through colorful visualizations. Features bubble sort, selection sort, insertion sort, merge sort, quick sort, and heap sort with step-by-step animations, speed controls, and quiz modes to test understanding.',
        technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Animations'],
        live_url: 'https://sortv2.onrender.com',
        github_url: '',
        featured: true,
        status: 'completed',
        images: ['/images/Screenshot (21).png']
      }
    ]);
    setLoading(false);
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

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter);

  const featuredProjects = projects.filter(project => project.featured);

  if (loading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900"></div>
      
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
                Featured Projects
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore my latest work and side projects showcasing various technologies and skills
            </p>
          </motion.div>

          {/* Featured Projects List */}
          {featuredProjects.length > 0 && (
            <motion.div variants={itemVariants} className="mb-16">
              <div className="space-y-8">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden transition-all duration-300 mb-8 last:mb-0"
                  >
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-pink-500/10 blur-3xl pointer-events-none"></div>
                    
                    <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
                      <div className="order-2 lg:order-1">
                        <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {project.description}
                        </p>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300 text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                          {project.live_url && (
                            <motion.a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                            >
                              <FaExternalLinkAlt />
                              Live Demo
                            </motion.a>
                          )}
                          {project.github_url && (
                            <motion.a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all duration-300"
                            >
                              <FaGithub />
                              Source Code
                            </motion.a>
                          )}
                        </div>
                      </div>
                      
                      <div className="order-1 lg:order-2">
                        <div className="relative group">
                          <img
                            src={project.images?.[0] || 'https://via.placeholder.com/600x400/4F46E5/ffffff?text=Project'}
                            alt={project.title}
                            className="rounded-xl shadow-2xl w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Filter Tabs */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="inline-flex rounded-xl p-1">
              {['all', 'completed', 'in_progress', 'planned'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                    filter === status
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {status === 'all' ? 'All Projects' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden transition-all duration-300 flex flex-col h-full relative group"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"></div>
                  <img
                    src={project.images?.[0] || 'https://via.placeholder.com/400x300/4F46E5/ffffff?text=Project'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.short_description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-700/50 text-purple-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-slate-700/50 text-gray-400 text-xs rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex gap-2">
                      {project.live_url && (
                        <motion.a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                        >
                          <FaExternalLinkAlt size={14} />
                        </motion.a>
                      )}
                      {project.github_url && (
                        <motion.a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all duration-300"
                        >
                          <FaGithub size={14} />
                        </motion.a>
                      )}
                    </div>

                    {(project.live_url || project.github_url) && (
                      <motion.a
                        href={project.live_url || project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 text-center py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-lg hover:text-white transition-all duration-300"
                      >
                        View Details
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <div className="text-gray-400 text-lg">
                No projects found for the selected filter.
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
