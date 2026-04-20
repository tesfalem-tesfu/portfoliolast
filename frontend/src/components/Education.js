import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaAward } from 'react-icons/fa';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    // Use fallback data directly to avoid API issues
    setEducation([
      {
        id: 1,
        institution: 'Haramaya University',
        degree: 'Bachelor of Science',
        field_of_study: 'Software Engineering',
        start_date: '2015-09-01',
        end_date: '2019-06-01',
        gpa: 3.8,
        description: 'Graduated with honors. Specialized in software engineering, web development, and enterprise system architecture. Relevant coursework: Data Structures, Algorithms, Database Systems, Software Architecture.'
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getGPAColor = (gpa) => {
    if (gpa >= 3.7) return 'text-green-400';
    if (gpa >= 3.3) return 'text-blue-400';
    if (gpa >= 3.0) return 'text-yellow-400';
    return 'text-gray-400';
  };

  if (loading) {
    return (
      <section id="education" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-purple-900/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Education
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              My academic background and educational achievements
            </p>
          </motion.div>

          {/* Education Cards */}
          <div className="space-y-8">
            {Array.isArray(education) ? education.map((edu, index) => (
              <motion.div
                key={edu.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden transition-all duration-300"
              >
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-pink-500/10 blur-3xl pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 relative z-10">
                  {/* Left Column - Institution Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaGraduationCap className="text-white text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-white">{edu.institution}</h3>
                        <p className="text-purple-400 text-lg">{edu.degree}</p>
                        {edu.field_of_study && (
                          <p className="text-gray-400">{edu.field_of_study}</p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {edu.description && (
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {edu.description}
                      </p>
                    )}

                    {/* Date and Status */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center text-gray-400">
                        <FaCalendarAlt className="mr-2 text-purple-400" />
                        <span>
                          {formatDate(edu.start_date)} - {edu.current_study ? 'Present' : formatDate(edu.end_date)}
                        </span>
                      </div>
                      {edu.current_study && (
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                          Currently Studying
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Achievements */}
                  <div className="md:text-right">
                    {/* Achievements */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-end text-gray-400 text-sm">
                        <FaAward className="mr-2 text-purple-400" />
                        <span>Dean's List</span>
                      </div>
                      <div className="flex items-center justify-end text-gray-400 text-sm">
                        <FaAward className="mr-2 text-purple-400" />
                        <span>Honor Society</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-8">
                <p className="text-gray-400">Education information loading...</p>
              </div>
            )}
          </div>

          {/* Additional Education Info */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-pink-500/20 blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Continuous Learning
                </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Certifications */}
                <div>
                  <h4 className="text-lg font-medium text-purple-400 mb-4">Certifications</h4>
                  <div className="space-y-3">
                    {[
                      'AWS Certified Solutions Architect',
                      'Google Cloud Professional Developer',
                      'MongoDB Certified Developer',
                      'React Advanced Patterns'
                    ].map((cert, index) => (
                      <motion.div
                        key={cert}
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>{cert}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Online Courses */}
                <div>
                  <h4 className="text-lg font-medium text-purple-400 mb-4">Online Courses</h4>
                  <div className="space-y-3">
                    {[
                      'Advanced JavaScript Patterns',
                      'Machine Learning Fundamentals',
                      'System Design Interview',
                      'DevOps and CI/CD'
                    ].map((course, index) => (
                      <motion.div
                        key={course}
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                      >
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span>{course}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Learning Stats */}
              <div className="mt-8 pt-8 border-t border-purple-500/20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { number: '15+', label: 'Courses Completed' },
                    { number: 'In Progress', label: 'Certifications' },
                    { number: '3+', label: 'Projects Completed' },
                    { number: '1+', label: 'Projects Delivered' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      whileHover={{ scale: 1.05 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
