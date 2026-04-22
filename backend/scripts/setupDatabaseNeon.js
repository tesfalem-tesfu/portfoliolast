const { query, connectDB, closeConnection } = require('../config/database-neon');
const bcrypt = require('bcryptjs');

const setupDatabase = async () => {
  try {
    console.log('Setting up Neon PostgreSQL database: portfolio-db...');
    
    await connectDB();
    
    // Create tables
    console.log('Creating tables...');
    
    // Profiles table
    await query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        title VARCHAR(255),
        bio TEXT,
        email VARCHAR(255),
        phone VARCHAR(50),
        location VARCHAR(255),
        github_url VARCHAR(500),
        linkedin_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Skills table
    await query(`
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        proficiency_level INTEGER,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Projects table
    await query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        short_description TEXT,
        description TEXT,
        technologies JSONB,
        live_url VARCHAR(500),
        github_url VARCHAR(500),
        featured BOOLEAN DEFAULT FALSE,
        status VARCHAR(50) DEFAULT 'completed',
        images JSONB,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Experience table
    await query(`
      CREATE TABLE IF NOT EXISTS experience (
        id SERIAL PRIMARY KEY,
        company VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        description TEXT,
        technologies JSONB,
        start_date DATE,
        end_date DATE,
        current BOOLEAN DEFAULT FALSE,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Education table
    await query(`
      CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY,
        institution VARCHAR(255) NOT NULL,
        degree VARCHAR(255),
        field_of_study VARCHAR(255),
        start_date DATE,
        end_date DATE,
        gpa DECIMAL(3,2),
        description TEXT,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Testimonials table
    await query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255),
        company VARCHAR(255),
        testimonial TEXT NOT NULL,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        featured BOOLEAN DEFAULT FALSE,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Contact messages table
    await query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Insert sample data
    console.log('Inserting sample data...');
    
    // Profile
    await query(`
      INSERT INTO profiles (name, title, bio, email, phone, location, github_url, linkedin_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT DO NOTHING
    `, [
      'Tesfalem Tesfu',
      'Software Engineer',
      'Passionate software engineer with expertise in modern web technologies and a focus on creating innovative solutions.',
      'tesfutesfalemmarkos@gmail.com',
      '+251-912-345-678',
      'Addis Ababa, Ethiopia',
      'https://github.com/tesfalem-tesfu',
      'https://linkedin.com/in/tesfalem-tesfu'
    ]);
    
    // Skills
    const skills = [
      ['JavaScript', 'Frontend', 90, 1],
      ['React', 'Frontend', 85, 2],
      ['Node.js', 'Backend', 80, 3],
      ['Python', 'Backend', 75, 4],
      ['MySQL', 'Database', 70, 5],
      ['PostgreSQL', 'Database', 70, 6],
      ['Tailwind CSS', 'Frontend', 85, 7],
      ['Git', 'Tools', 80, 8]
    ];
    
    for (const [name, category, proficiency, order] of skills) {
      await query(`
        INSERT INTO skills (name, category, proficiency_level, display_order)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT DO NOTHING
      `, [name, category, proficiency, order]);
    }
    
    // Projects
    await query(`
      INSERT INTO projects (title, short_description, description, technologies, live_url, github_url, featured, status, images, display_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT DO NOTHING
    `, [
      'Sorting Quiz Game',
      'Visual sorting algorithm learning game',
      'An engaging educational game that teaches sorting algorithms through colorful visualizations.',
      JSON.stringify(['React', 'JavaScript', 'CSS3', 'HTML5']),
      'https://sortv2.onrender.com',
      'https://github.com/tesfalem-tesfu/sorting-game',
      true,
      'completed',
      JSON.stringify(['/images/Screenshot (21).png']),
      1
    ]);
    
    // Education
    await query(`
      INSERT INTO education (institution, degree, field_of_study, start_date, end_date, gpa, description, display_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT DO NOTHING
    `, [
      'Haramaya University',
      'Bachelor of Science',
      'Software Engineering',
      '2015-09-01',
      '2019-06-01',
      3.8,
      'Graduated with honors. Specialized in software engineering, web development, and enterprise system architecture.',
      1
    ]);
    
    console.log('Database setup completed successfully!');
    
  } catch (error) {
    console.error('Database setup error:', error.message);
    throw error;
  } finally {
    await closeConnection();
  }
};

// Run setup
if (require.main === module) {
  setupDatabase()
    .then(() => {
      console.log('Setup completed. Exiting...');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Setup failed:', error);
      process.exit(1);
    });
}

module.exports = setupDatabase;
