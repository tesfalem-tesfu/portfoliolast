import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaQuoteLeft, FaStar, FaUser } from 'react-icons/fa';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/portfolio/testimonials');
        if (response.ok) {
          const data = await response.json();
          // Remove duplicates by client name and ensure array
          const uniqueTestimonials = Array.isArray(data) ? 
            data.filter((testimonial, index, self) => 
              index === self.findIndex((t) => t.client_name === testimonial.client_name)
            ) : [];
          setTestimonials(uniqueTestimonials);
        } else {
          // Fallback data only if API fails
          setTestimonials([
            {
              id: 1,
              client_name: 'Abeba Kebede',
              client_position: 'CEO',
              client_company: 'Ethiopian Tech Solutions',
              client_avatar: 'https://via.placeholder.com/100x100/8B5CF6/ffffff?text=Abeba',
              testimonial: 'Tesfalem is an exceptional developer who delivered our project on time and exceeded our expectations. His technical skills and attention to detail are outstanding.',
              rating: 5.0,
              featured: true
            },
            {
              id: 2,
              client_name: 'Kaleb Tadesse',
              client_position: 'CTO',
              client_company: 'Digital Ethiopia',
              client_avatar: 'https://via.placeholder.com/100x100/F59E0B/ffffff?text=Kaleb',
              testimonial: 'Working with Tesfalem was a great experience. He quickly understood our requirements and provided innovative solutions that improved our workflow significantly.',
              rating: 4.8,
              featured: false
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback data only on error
        setTestimonials([
          {
            id: 1,
            client_name: 'Abeba Kebede',
            client_position: 'CEO',
            client_company: 'Ethiopian Tech Solutions',
            client_avatar: 'https://via.placeholder.com/100x100/8B5CF6/ffffff?text=Abeba',
            testimonial: 'Tesfalem is an exceptional developer who delivered our project on time and exceeded our expectations. His technical skills and attention to detail are outstanding.',
            rating: 5.0,
            featured: true
          },
          {
            id: 2,
            client_name: 'Kaleb Tadesse',
            client_position: 'CTO',
            client_company: 'Digital Ethiopia',
            client_avatar: 'https://via.placeholder.com/100x100/F59E0B/ffffff?text=Kaleb',
            testimonial: 'Working with Tesfalem was a great experience. He quickly understood our requirements and provided innovative solutions that improved our workflow significantly.',
            rating: 4.8,
            featured: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
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
        ease: "easeInOut"
      }
    }
  };

  const renderStars = (rating) => {
    const ratingNum = parseFloat(rating);
    const fullStars = Math.floor(ratingNum);
    const hasHalfStar = ratingNum % 1 !== 0;
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} className="text-yellow-400" />
        ))}
        {hasHalfStar && <FaStar className="text-yellow-400 opacity-50" />}
        {[...Array(5 - Math.ceil(ratingNum))].map((_, index) => (
          <FaStar key={`empty-${index}`} className="text-gray-600" />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-sky-900/10 to-transparent"></div>
      
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
                Client Testimonials
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              What my clients and colleagues have to say about working with me
            </p>
          </motion.div>

          {/* Featured Testimonials List */}
          {testimonials.filter(t => t.featured).length > 0 && (
            <motion.div variants={itemVariants} className="mb-16">
              <div className="space-y-8">
                {testimonials.filter(t => t.featured).map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden mb-8"
                  >
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-pink-500/10 blur-3xl pointer-events-none"></div>
                    
                    <div className="text-center max-w-4xl mx-auto relative z-10">
                      {/* Quote Icon */}
                      <div className="mb-6">
                        <FaQuoteLeft className="text-purple-400 text-4xl mx-auto opacity-50" />
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8 italic">
                        "{testimonial.testimonial}"
                      </blockquote>

                      {/* Client Info */}
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/30">
                          {testimonial.client_avatar ? (
                            <img
                              src={testimonial.client_avatar}
                              alt={testimonial.client_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                              <FaUser className="text-white text-2xl" />
                            </div>
                          )}
                        </div>
                        <div className="text-left">
                          <div className="text-white font-semibold text-lg">
                            {testimonial.client_name}
                          </div>
                          <div className="text-purple-400">
                            {testimonial.client_position}
                            {testimonial.client_company && (
                              <span> at {testimonial.client_company}</span>
                            )}
                          </div>
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* All Testimonials Grid */}
          {testimonials.filter(t => !t.featured).length > 0 && (
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">
              More Reviews
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.filter(t => !t.featured).map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>
                  
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Quote Icon */}
                  <div className="mb-4">
                    <FaQuoteLeft className="text-purple-400 text-2xl opacity-50" />
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-300 leading-relaxed mb-6 italic">
                    "{testimonial.testimonial}"
                  </blockquote>

                  {/* Rating */}
                  <div className="mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/30 flex-shrink-0">
                      {testimonial.client_avatar ? (
                        <img
                          src={testimonial.client_avatar}
                          alt={testimonial.client_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <FaUser className="text-white text-lg" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-white font-semibold text-sm">
                        {testimonial.client_name}
                      </div>
                      <div className="text-purple-400 text-xs">
                        {testimonial.client_position}
                        {testimonial.client_company && (
                          <span> at {testimonial.client_company}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
              ))}
            </div>
          </motion.div>
          )}

          {/* Empty State */}
          {testimonials.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <div className="text-gray-400 text-lg">
                No testimonials available yet.
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
