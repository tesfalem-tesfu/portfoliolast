const Joi = require('joi');

// Common validation schemas
const schemas = {
  // User validation
  login: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required()
  }),

  register: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),

  // Profile validation
  profile: Joi.object({
    full_name: Joi.string().min(2).max(100).required(),
    title: Joi.string().min(2).max(150).required(),
    bio: Joi.string().max(1000).optional(),
    avatar_url: Joi.string().uri().optional(),
    resume_url: Joi.string().uri().optional(),
    github_url: Joi.string().uri().optional(),
    linkedin_url: Joi.string().uri().optional(),
    twitter_url: Joi.string().uri().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().max(20).optional(),
    location: Joi.string().max(100).optional()
  }),

  // Project validation
  project: Joi.object({
    title: Joi.string().min(2).max(150).required(),
    description: Joi.string().min(10).required(),
    short_description: Joi.string().max(255).optional(),
    technologies: Joi.array().items(Joi.string()).required(),
    live_url: Joi.string().uri().optional(),
    github_url: Joi.string().uri().optional(),
    featured: Joi.boolean().optional(),
    status: Joi.string().valid('completed', 'in_progress', 'planned').optional(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().optional(),
    images: Joi.array().items(Joi.string().uri()).optional(),
    display_order: Joi.number().integer().min(0).optional()
  }),

  // Skill validation
  skill: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    category: Joi.string().min(2).max(50).required(),
    proficiency_level: Joi.string().valid('beginner', 'intermediate', 'advanced', 'expert').required(),
    years_experience: Joi.number().min(0).max(50).optional(),
    icon_url: Joi.string().uri().optional(),
    display_order: Joi.number().integer().min(0).optional()
  }),

  // Experience validation
  experience: Joi.object({
    company: Joi.string().min(2).max(100).required(),
    position: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(1000).optional(),
    start_date: Joi.date().required(),
    end_date: Joi.date().optional(),
    current_job: Joi.boolean().optional(),
    location: Joi.string().max(100).optional(),
    company_logo: Joi.string().uri().optional(),
    technologies: Joi.array().items(Joi.string()).optional(),
    display_order: Joi.number().integer().min(0).optional()
  }),

  // Education validation
  education: Joi.object({
    institution: Joi.string().min(2).max(100).required(),
    degree: Joi.string().min(2).max(100).required(),
    field_of_study: Joi.string().max(100).optional(),
    start_date: Joi.date().required(),
    end_date: Joi.date().optional(),
    current_study: Joi.boolean().optional(),
    gpa: Joi.number().min(0).max(4).optional(),
    description: Joi.string().max(1000).optional(),
    display_order: Joi.number().integer().min(0).optional()
  }),

  // Contact message validation
  contactMessage: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().max(200).optional(),
    message: Joi.string().min(10).required()
  }),

  // Testimonial validation
  testimonial: Joi.object({
    client_name: Joi.string().min(2).max(100).required(),
    client_position: Joi.string().max(100).optional(),
    client_company: Joi.string().max(100).optional(),
    client_avatar: Joi.string().uri().optional(),
    testimonial: Joi.string().min(10).required(),
    rating: Joi.number().min(1).max(5).optional(),
    featured: Joi.boolean().optional(),
    display_order: Joi.number().integer().min(0).optional()
  })
};

// Validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }
    next();
  };
};

// Specific validation middleware exports
module.exports = {
  validateLogin: validate(schemas.login),
  validateRegister: validate(schemas.register),
  validateProfile: validate(schemas.profile),
  validateProject: validate(schemas.project),
  validateSkill: validate(schemas.skill),
  validateExperience: validate(schemas.experience),
  validateEducation: validate(schemas.education),
  validateContactMessage: validate(schemas.contactMessage),
  validateTestimonial: validate(schemas.testimonial),
  schemas
};
