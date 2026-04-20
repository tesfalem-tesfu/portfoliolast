const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { query, transaction } = require('../config/database');
const { auth, adminAuth } = require('../middleware/auth');
const {
  validateProfile,
  validateProject,
  validateSkill,
  validateExperience,
  validateEducation,
  validateTestimonial
} = require('../middleware/validation');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads', file.fieldname);
    try {
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image and PDF files are allowed'));
    }
  }
});

// Apply admin authentication to all admin routes
router.use(adminAuth);

// Profile Management
router.put('/profile', upload.single('avatar'), validateProfile, async (req, res) => {
  try {
    const profileData = req.body;
    
    // Add avatar URL if file was uploaded
    if (req.file) {
      profileData.avatar_url = `/uploads/avatars/${req.file.filename}`;
    }

    // Check if profile exists
    const existingProfile = await query('SELECT id FROM profiles ORDER BY id DESC LIMIT 1');
    
    let result;
    if (existingProfile.length > 0) {
      // Update existing profile
      const updateFields = Object.keys(profileData).map(key => `${key} = ?`).join(', ');
      const updateValues = Object.values(profileData);
      updateValues.push(existingProfile[0].id);
      
      result = await query(
        `UPDATE profiles SET ${updateFields}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        updateValues
      );
    } else {
      // Create new profile
      const fields = Object.keys(profileData).join(', ');
      const placeholders = Object.keys(profileData).map(() => '?').join(', ');
      const values = Object.values(profileData);
      
      result = await query(
        `INSERT INTO profiles (${fields}) VALUES (${placeholders})`,
        values
      );
    }

    res.json({
      message: 'Profile updated successfully',
      profileId: existingProfile.length > 0 ? existingProfile[0].id : result.insertId
    });

  } catch (error) {
    console.error('Profile update error:', error.message);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Projects Management
router.post('/projects', upload.array('images', 5), validateProject, async (req, res) => {
  try {
    const projectData = req.body;
    
    // Handle images
    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map(file => `/uploads/projects/${file.filename}`);
      projectData.images = JSON.stringify(imageUrls);
    } else {
      projectData.images = JSON.stringify([]);
    }

    // Handle technologies array
    if (projectData.technologies) {
      if (typeof projectData.technologies === 'string') {
        projectData.technologies = JSON.parse(projectData.technologies);
      }
      projectData.technologies = JSON.stringify(projectData.technologies);
    }

    const fields = Object.keys(projectData).join(', ');
    const placeholders = Object.keys(projectData).map(() => '?').join(', ');
    const values = Object.values(projectData);

    const result = await query(
      `INSERT INTO projects (${fields}) VALUES (${placeholders})`,
      values
    );

    res.status(201).json({
      message: 'Project created successfully',
      projectId: result.insertId
    });

  } catch (error) {
    console.error('Project creation error:', error.message);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

router.put('/projects/:id', upload.array('images', 5), validateProject, async (req, res) => {
  try {
    const { id } = req.params;
    const projectData = req.body;

    // Handle images
    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map(file => `/uploads/projects/${file.filename}`);
      projectData.images = JSON.stringify(imageUrls);
    }

    // Handle technologies array
    if (projectData.technologies) {
      if (typeof projectData.technologies === 'string') {
        projectData.technologies = JSON.parse(projectData.technologies);
      }
      projectData.technologies = JSON.stringify(projectData.technologies);
    }

    const updateFields = Object.keys(projectData).map(key => `${key} = ?`).join(', ');
    const updateValues = Object.values(projectData);
    updateValues.push(id);

    const result = await query(
      `UPDATE projects SET ${updateFields}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      updateValues
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project updated successfully' });

  } catch (error) {
    console.error('Project update error:', error.message);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Get project images to delete files
    const project = await query('SELECT images FROM projects WHERE id = ?', [id]);
    
    if (project.length > 0 && project[0].images) {
      try {
        const images = JSON.parse(project[0].images);
        for (const imageUrl of images) {
          const filePath = path.join(__dirname, '..', 'uploads', imageUrl.replace('/uploads/', ''));
          try {
            await fs.unlink(filePath);
          } catch (fileError) {
            console.error('Failed to delete image file:', fileError.message);
          }
        }
      } catch (parseError) {
        console.error('Failed to parse images JSON:', parseError.message);
      }
    }

    const result = await query('DELETE FROM projects WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });

  } catch (error) {
    console.error('Project deletion error:', error.message);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Skills Management
router.post('/skills', validateSkill, async (req, res) => {
  try {
    const skillData = req.body;
    const fields = Object.keys(skillData).join(', ');
    const placeholders = Object.keys(skillData).map(() => '?').join(', ');
    const values = Object.values(skillData);

    const result = await query(
      `INSERT INTO skills (${fields}) VALUES (${placeholders})`,
      values
    );

    res.status(201).json({
      message: 'Skill created successfully',
      skillId: result.insertId
    });

  } catch (error) {
    console.error('Skill creation error:', error.message);
    res.status(500).json({ error: 'Failed to create skill' });
  }
});

router.put('/skills/:id', validateSkill, async (req, res) => {
  try {
    const { id } = req.params;
    const skillData = req.body;

    const updateFields = Object.keys(skillData).map(key => `${key} = ?`).join(', ');
    const updateValues = Object.values(skillData);
    updateValues.push(id);

    const result = await query(
      `UPDATE skills SET ${updateFields}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      updateValues
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.json({ message: 'Skill updated successfully' });

  } catch (error) {
    console.error('Skill update error:', error.message);
    res.status(500).json({ error: 'Failed to update skill' });
  }
});

router.delete('/skills/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM skills WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.json({ message: 'Skill deleted successfully' });

  } catch (error) {
    console.error('Skill deletion error:', error.message);
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

// Experience Management
router.post('/experience', validateExperience, async (req, res) => {
  try {
    const experienceData = req.body;

    // Handle technologies array
    if (experienceData.technologies) {
      if (typeof experienceData.technologies === 'string') {
        experienceData.technologies = JSON.parse(experienceData.technologies);
      }
      experienceData.technologies = JSON.stringify(experienceData.technologies);
    }

    const fields = Object.keys(experienceData).join(', ');
    const placeholders = Object.keys(experienceData).map(() => '?').join(', ');
    const values = Object.values(experienceData);

    const result = await query(
      `INSERT INTO experience (${fields}) VALUES (${placeholders})`,
      values
    );

    res.status(201).json({
      message: 'Experience created successfully',
      experienceId: result.insertId
    });

  } catch (error) {
    console.error('Experience creation error:', error.message);
    res.status(500).json({ error: 'Failed to create experience' });
  }
});

// Education Management
router.post('/education', validateEducation, async (req, res) => {
  try {
    const educationData = req.body;
    const fields = Object.keys(educationData).join(', ');
    const placeholders = Object.keys(educationData).map(() => '?').join(', ');
    const values = Object.values(educationData);

    const result = await query(
      `INSERT INTO education (${fields}) VALUES (${placeholders})`,
      values
    );

    res.status(201).json({
      message: 'Education created successfully',
      educationId: result.insertId
    });

  } catch (error) {
    console.error('Education creation error:', error.message);
    res.status(500).json({ error: 'Failed to create education' });
  }
});

// Testimonials Management
router.post('/testimonials', validateTestimonial, async (req, res) => {
  try {
    const testimonialData = req.body;
    const fields = Object.keys(testimonialData).join(', ');
    const placeholders = Object.keys(testimonialData).map(() => '?').join(', ');
    const values = Object.values(testimonialData);

    const result = await query(
      `INSERT INTO testimonials (${fields}) VALUES (${placeholders})`,
      values
    );

    res.status(201).json({
      message: 'Testimonial created successfully',
      testimonialId: result.insertId
    });

  } catch (error) {
    console.error('Testimonial creation error:', error.message);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

// Dashboard Stats
router.get('/dashboard/stats', async (req, res) => {
  try {
    const [
      projectCount,
      skillCount,
      experienceCount,
      educationCount,
      testimonialCount,
      messageCount,
      recentMessages
    ] = await Promise.all([
      query('SELECT COUNT(*) as count FROM projects'),
      query('SELECT COUNT(*) as count FROM skills'),
      query('SELECT COUNT(*) as count FROM experience'),
      query('SELECT COUNT(*) as count FROM education'),
      query('SELECT COUNT(*) as count FROM testimonials'),
      query('SELECT COUNT(*) as count FROM contact_messages'),
      query('SELECT id, name, email, subject, created_at, status FROM contact_messages ORDER BY created_at DESC LIMIT 5')
    ]);

    const stats = {
      projects: projectCount[0].count,
      skills: skillCount[0].count,
      experience: experienceCount[0].count,
      education: educationCount[0].count,
      testimonials: testimonialCount[0].count,
      messages: messageCount[0].count,
      recentMessages
    };

    res.json(stats);

  } catch (error) {
    console.error('Dashboard stats error:', error.message);
    res.status(500).json({ error: 'Failed to get dashboard stats' });
  }
});

module.exports = router;
