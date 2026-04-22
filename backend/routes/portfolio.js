const express = require('express');
const { query } = require('../config/database-neon');

const router = express.Router();

// @route   GET /api/portfolio/profile
// @desc    Get profile information
// @access  Public
router.get('/profile', async (req, res) => {
  try {
    const profiles = await query('SELECT * FROM profiles ORDER BY id DESC LIMIT 1');
    
    if (profiles.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profiles[0]);
  } catch (error) {
    console.error('Get profile error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/portfolio/skills
// @desc    Get all skills
// @access  Public
router.get('/skills', async (req, res) => {
  try {
    const { category } = req.query;
    let sql = 'SELECT * FROM skills';
    let params = [];

    if (category) {
      sql += ' WHERE category = ?';
      params.push(category);
    }

    sql += ' ORDER BY display_order ASC, proficiency_level DESC';

    const skills = await query(sql, params);
    res.json(skills);
  } catch (error) {
    console.error('Get skills error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/portfolio/projects
// @desc    Get all projects
// @access  Public
router.get('/projects', async (req, res) => {
  try {
    const { featured, status, limit } = req.query;
    let sql = 'SELECT * FROM projects';
    let params = [];

    const conditions = [];
    if (featured === 'true') {
      conditions.push('featured = TRUE');
    }
    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY display_order ASC, created_at DESC';

    if (limit) {
      sql += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const projects = await query(sql, params);
    
    // Parse JSON fields
    const formattedProjects = projects.map(project => ({
      ...project,
      technologies: JSON.parse(project.technologies || '[]'),
      images: JSON.parse(project.images || '[]')
    }));

    res.json(formattedProjects);
  } catch (error) {
    console.error('Get projects error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/portfolio/projects/:id
// @desc    Get single project by ID
// @access  Public
router.get('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await query('SELECT * FROM projects WHERE id = ?', [id]);

    if (projects.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const project = {
      ...projects[0],
      technologies: JSON.parse(projects[0].technologies || '[]'),
      images: JSON.parse(projects[0].images || '[]')
    };

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/portfolio/experience
// @desc    Get all experience
// @access  Public
router.get('/experience', async (req, res) => {
  try {
    const experience = await query(
      'SELECT * FROM experience ORDER BY display_order ASC, start_date DESC'
    );
    
    // Parse JSON fields
    const formattedExperience = experience.map(exp => ({
      ...exp,
      technologies: JSON.parse(exp.technologies || '[]')
    }));

    res.json(formattedExperience);
  } catch (error) {
    console.error('Get experience error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/portfolio/education
// @desc    Get all education
// @access  Public
router.get('/education', async (req, res) => {
  try {
    const education = await query(
      'SELECT * FROM education ORDER BY display_order ASC, start_date DESC'
    );
    res.json(education);
  } catch (error) {
    console.error('Get education error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/portfolio/testimonials
// @desc    Get all testimonials
// @access  Public
router.get('/testimonials', async (req, res) => {
  try {
    const { featured, limit } = req.query;
    let sql = 'SELECT * FROM testimonials';
    let params = [];

    if (featured === 'true') {
      sql += ' WHERE featured = TRUE';
    }

    sql += ' ORDER BY display_order ASC, created_at DESC';

    if (limit) {
      sql += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const testimonials = await query(sql, params);
    res.json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/portfolio/stats
// @desc    Get portfolio statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const [
      projectCount,
      skillCount,
      experienceCount,
      educationCount,
      testimonialCount
    ] = await Promise.all([
      query('SELECT COUNT(*) as count FROM projects'),
      query('SELECT COUNT(*) as count FROM skills'),
      query('SELECT COUNT(*) as count FROM experience'),
      query('SELECT COUNT(*) as count FROM education'),
      query('SELECT COUNT(*) as count FROM testimonials')
    ]);

    const stats = {
      projects: projectCount[0].count,
      skills: skillCount[0].count,
      experience: experienceCount[0].count,
      education: educationCount[0].count,
      testimonials: testimonialCount[0].count
    };

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/portfolio/technologies
// @desc    Get all unique technologies used in projects
// @access  Public
router.get('/technologies', async (req, res) => {
  try {
    const projects = await query('SELECT technologies FROM projects WHERE technologies IS NOT NULL');
    
    const allTechnologies = new Set();
    projects.forEach(project => {
      try {
        const technologies = JSON.parse(project.technologies || '[]');
        technologies.forEach(tech => allTechnologies.add(tech));
      } catch (e) {
        console.error('Error parsing technologies:', e);
      }
    });

    res.json(Array.from(allTechnologies).sort());
  } catch (error) {
    console.error('Get technologies error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
