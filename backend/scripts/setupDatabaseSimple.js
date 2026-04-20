const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const setupDatabase = async () => {
  let connection;
  
  try {
    // Connect to MySQL without database selected
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('🔗 Connected to MySQL server');

    // Create database if not exists
    const dbName = process.env.DB_NAME || 'portfolio_db';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`📁 Database '${dbName}' created or already exists`);

    // Switch to the database
    await connection.query(`USE \`${dbName}\``);
    console.log(`📋 Using database '${dbName}'`);

    // Create tables
    await createTables(connection);
    
    // Seed initial data
    await seedData(connection);

    console.log('✅ Database setup completed successfully');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

const createTables = async (connection) => {
  console.log('📋 Creating tables...');

  // Users table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'user') DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Profile table
  await connection.query('DROP TABLE IF EXISTS profiles');
  await connection.query(`
    CREATE TABLE profiles (
      id INT PRIMARY KEY AUTO_INCREMENT,
      full_name VARCHAR(255) NOT NULL,
      title VARCHAR(255),
      bio TEXT,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      location VARCHAR(255),
      github_url VARCHAR(500),
      linkedin_url VARCHAR(500),
      telegram_url VARCHAR(500),
      twitter_url VARCHAR(500),
      avatar_url VARCHAR(500),
      resume_url VARCHAR(500),
      display_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Skills table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS skills (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      category VARCHAR(50) NOT NULL,
      proficiency_level ENUM('beginner', 'intermediate', 'advanced', 'expert') NOT NULL,
      years_experience DECIMAL(3,1),
      icon_url VARCHAR(255),
      display_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Projects table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      description TEXT NOT NULL,
      short_description VARCHAR(255),
      technologies JSON,
      live_url VARCHAR(255),
      github_url VARCHAR(255),
      featured BOOLEAN DEFAULT FALSE,
      status ENUM('completed', 'in_progress', 'planned') DEFAULT 'completed',
      start_date DATE,
      end_date DATE,
      images JSON,
      display_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Experience table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS experience (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company VARCHAR(100) NOT NULL,
      position VARCHAR(100) NOT NULL,
      description TEXT,
      start_date DATE NOT NULL,
      end_date DATE,
      current_job BOOLEAN DEFAULT FALSE,
      location VARCHAR(100),
      company_logo VARCHAR(255),
      technologies JSON,
      display_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Education table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS education (
      id INT AUTO_INCREMENT PRIMARY KEY,
      institution VARCHAR(100) NOT NULL,
      degree VARCHAR(100) NOT NULL,
      field_of_study VARCHAR(100),
      start_date DATE NOT NULL,
      end_date DATE,
      current_study BOOLEAN DEFAULT FALSE,
      gpa DECIMAL(3,2),
      description TEXT,
      display_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Contact messages table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      subject VARCHAR(200),
      message TEXT NOT NULL,
      status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Testimonials table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      client_name VARCHAR(100) NOT NULL,
      client_position VARCHAR(100),
      client_company VARCHAR(100),
      client_avatar VARCHAR(255),
      testimonial TEXT NOT NULL,
      rating DECIMAL(2,1) DEFAULT 5.0,
      featured BOOLEAN DEFAULT FALSE,
      display_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  console.log('✅ All tables created successfully');
};

const seedData = async (connection) => {
  console.log('🌱 Seeding initial data...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await connection.query(
    'INSERT IGNORE INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
    ['admin', 'admin@portfolio.com', hashedPassword, 'admin']
  );

  // Clear existing profile to avoid duplicates
  await connection.query('DELETE FROM profiles');

  // Insert sample profile
  await connection.query(`
    INSERT INTO profiles (id, full_name, title, bio, email, phone, location, github_url, linkedin_url, telegram_url, twitter_url, avatar_url, resume_url, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [1, 'Tesfalem Markos Dola', 'Software Engineering Department Mastering', 
    'Passionate software engineer with expertise in modern web technologies and department-level system architecture.', 
    'tesfutesfalemmarkos@gmail.com', '+251 912 345 678', 'Addis Ababa, Ethiopia',
    'https://github.com/tesfalem-tesfu', 'https://linkedin.com/in/tesfutesfalemmarkos', 
    'https://t.me/tesfalem_dola', 'https://x.com/tesfutesfalemmarkos', '/images/profile.png', 
    'https://example.com/resume.pdf', 1]);

  // Insert sample skills
  const skills = [
    ['JavaScript', 'Frontend', 'expert', 5.0, 'fab fa-js'],
    ['React', 'Frontend', 'expert', 4.5, 'fab fa-react'],
    ['HTML', 'Frontend', 'expert', 5.0, 'fab fa-html5'],
    ['CSS', 'Frontend', 'expert', 5.0, 'fab fa-css3-alt'],
    ['PHP', 'Backend', 'advanced', 3.5, 'fab fa-php'],
    ['Node.js', 'Backend', 'expert', 4.5, 'fab fa-node'],
    ['Python', 'Backend', 'advanced', 3.5, 'fab fa-python'],
    ['MySQL', 'Database', 'advanced', 3.0, 'fas fa-database'],
    ['MongoDB', 'Database', 'intermediate', 2.5, 'fas fa-leaf'],
    ['Mobile App', 'Mobile', 'intermediate', 2.0, 'fas fa-mobile-alt'],
    ['Machine Learning', 'AI/ML', 'intermediate', 2.0, 'fas fa-brain'],
    ['Docker', 'DevOps', 'intermediate', 2.0, 'fab fa-docker'],
    ['AWS', 'Cloud', 'intermediate', 2.0, 'fab fa-aws']
  ];

  // Clear existing skills to avoid duplicates
  await connection.query('DELETE FROM skills');
  
  for (const [name, category, level, years, icon] of skills) {
    await connection.query(
      'INSERT INTO skills (name, category, proficiency_level, years_experience, icon_url) VALUES (?, ?, ?, ?, ?)',
      [name, category, level, years, icon]
    );
  }

  // Clear existing projects to avoid duplicates
  await connection.query('DELETE FROM projects');

  // Insert sample projects
  await connection.query(`
    INSERT INTO projects (title, description, short_description, technologies, live_url, github_url, featured, status, start_date, end_date, images, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    'E-Commerce Platform',
    'A full-featured e-commerce platform with user authentication, payment processing, and inventory management.',
    'Modern e-commerce solution with React and Node.js',
    JSON.stringify(['React', 'Node.js', 'MySQL', 'Stripe']),
    'https://example-ecommerce.com',
    'https://github.com/tesfalem-tesfu/ecommerce',
    true,
    'completed',
    '2023-01-15',
    '2023-04-20',
    JSON.stringify(['https://via.placeholder.com/600x400/4F46E5/ffffff?text=E-Commerce']),
    1
  ]);

  await connection.query(`
    INSERT INTO projects (title, description, short_description, technologies, live_url, github_url, featured, status, start_date, end_date, images, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    'Task Management App',
    'A collaborative task management application with real-time updates and team collaboration features.',
    'Real-time task management for teams',
    JSON.stringify(['React', 'Socket.io', 'Express', 'MongoDB']),
    'https://example-tasks.com',
    'https://github.com/tesfalem-tesfu/taskmanager',
    true,
    'completed',
    '2023-05-01',
    '2023-07-15',
    JSON.stringify(['https://via.placeholder.com/600x400/10B981/ffffff?text=Task+Manager']),
    2
  ]);

  await connection.query(`
    INSERT INTO projects (title, description, short_description, technologies, live_url, github_url, featured, status, start_date, end_date, images, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    'Sorting Game',
    'A gamified visualization of various sorting algorithms.',
    'Visual sorting game',
    JSON.stringify(['JavaScript', 'HTML5', 'CSS3']),
    'https://sortv2.onrender.com',
    '',
    true,
    'completed',
    '2024-01-01',
    '2024-02-01',
    JSON.stringify(['https://via.placeholder.com/600x400/8B5CF6/ffffff?text=Sorting+Game']),
    3
  ]);

  // Clear existing experience to avoid duplicates
  await connection.query('DELETE FROM experience');

  // Insert sample experience
  await connection.query(`
    INSERT INTO experience (company, position, description, start_date, end_date, current_job, location, company_logo, technologies, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    'Ethiotech Solutions',
    'Senior Software Engineer',
    'Leading development of enterprise-level software solutions for Ethiopian businesses. Implemented microservices architecture and improved system performance by 45%.',
    '2022-01-01',
    null,
    true,
    'Addis Ababa, Ethiopia',
    'https://via.placeholder.com/100x100/4F46E5/ffffff?text=Ethiotech',
    JSON.stringify(['React', 'Node.js', 'AWS', 'MySQL', 'Docker']),
    1
  ]);

  await connection.query(`
    INSERT INTO experience (company, position, description, start_date, end_date, current_job, location, company_logo, technologies, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    'Digital Ethiopia',
    'Full Stack Developer',
    'Built and maintained multiple client projects using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality solutions for local businesses.',
    '2020-06-01',
    '2021-12-31',
    false,
    'Addis Ababa, Ethiopia',
    'https://via.placeholder.com/100x100/10B981/ffffff?text=Digital',
    JSON.stringify(['Vue.js', 'Express', 'MySQL', 'MongoDB', 'Python']),
    2
  ]);

  // Clear existing education to avoid duplicates
  await connection.query('DELETE FROM education');

  // Insert sample education
  await connection.query(`
    INSERT INTO education (id, institution, degree, field_of_study, start_date, end_date, gpa, description, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [1, 'Haramaya University', 'Bachelor of Science', 'Software Engineering', '2015-09-01', '2019-06-01', 3.8, 
    'Graduated with honors. Specialized in software engineering, web development, and enterprise system architecture. Relevant coursework: Data Structures, Algorithms, Database Systems, Software Architecture.', 1]);

  // Clear existing testimonials to avoid duplicates
  await connection.query('DELETE FROM testimonials');

  // Insert sample testimonials
  await connection.query(`
    INSERT INTO testimonials (client_name, client_position, client_company, client_avatar, testimonial, rating, featured, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    'Abeba Kebede',
    'CEO',
    'Ethiopian Tech Solutions',
    'https://via.placeholder.com/100x100/8B5CF6/ffffff?text=Abeba',
    'Tesfalem delivered exceptional results on our e-commerce platform. His attention to detail and problem-solving skills are outstanding. Highly recommend!',
    5.0,
    true,
    1
  ]);

  await connection.query(`
    INSERT INTO testimonials (client_name, client_position, client_company, client_avatar, testimonial, rating, featured, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    'Kaleb Tadesse',
    'Project Manager',
    'Digital Ethiopia',
    'https://via.placeholder.com/100x100/F59E0B/ffffff?text=Kaleb',
    'Working with Tesfalem was a great experience. He quickly understood our requirements and delivered high-quality solutions on time.',
    4.8,
    false,
    2
  ]);

  console.log('✅ Initial data seeded successfully');
};

// Run the setup
setupDatabase();
