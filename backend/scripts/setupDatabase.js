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
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'portfolio_db'} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`📁 Database '${process.env.DB_NAME || 'portfolio_db'}' created or already exists`);

    // Switch to the database
    await connection.execute(`USE ${process.env.DB_NAME || 'portfolio_db'}`);

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

  // Users table (for admin authentication)
  await connection.execute(`
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
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      title VARCHAR(150) NOT NULL,
      bio TEXT,
      avatar_url VARCHAR(255),
      resume_url VARCHAR(255),
      github_url VARCHAR(255),
      linkedin_url VARCHAR(255),
      twitter_url VARCHAR(255),
      email VARCHAR(100),
      phone VARCHAR(20),
      location VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Skills table
  await connection.execute(`
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
  await connection.execute(`
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
  await connection.execute(`
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
  await connection.execute(`
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
  await connection.execute(`
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
  await connection.execute(`
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
  await connection.execute(`
    INSERT IGNORE INTO users (username, email, password, role) 
    VALUES ('admin', 'admin@portfolio.com', ?, 'admin')
  `, [hashedPassword]);

  // Insert sample profile
  await connection.execute(`
    INSERT IGNORE INTO profiles (id, full_name, title, bio, email, phone, location, github_url, linkedin_url)
    VALUES (1, 'John Doe', 'Full Stack Developer', 
    'Passionate full stack developer with expertise in modern web technologies. 
    I love creating beautiful, functional, and user-centered digital experiences.',
    'john.doe@example.com', '+1 (555) 123-4567', 'San Francisco, CA',
    'https://github.com/johndoe', 'https://linkedin.com/in/johndoe')
  `);

  // Insert sample skills
  const skills = [
    ['JavaScript', 'Frontend', 'expert', 5.0, 'fab fa-js'],
    ['React', 'Frontend', 'expert', 4.5, 'fab fa-react'],
    ['Node.js', 'Backend', 'expert', 4.5, 'fab fa-node'],
    ['Python', 'Backend', 'advanced', 3.5, 'fab fa-python'],
    ['MySQL', 'Database', 'advanced', 3.0, 'fas fa-database'],
    ['MongoDB', 'Database', 'intermediate', 2.5, 'fas fa-leaf'],
    ['Docker', 'DevOps', 'intermediate', 2.0, 'fab fa-docker'],
    ['AWS', 'Cloud', 'intermediate', 2.0, 'fab fa-aws']
  ];

  for (const [name, category, level, years, icon] of skills) {
    await connection.execute(`
      INSERT IGNORE INTO skills (name, category, proficiency_level, years_experience, icon_url)
      VALUES (?, ?, ?, ?, ?)
    `, [name, category, level, years, icon]);
  }

  // Insert sample projects
  const projects = [
    [
      'E-Commerce Platform',
      'A full-featured e-commerce platform with user authentication, payment processing, and inventory management.',
      'Modern e-commerce solution with React and Node.js',
      JSON.stringify(['React', 'Node.js', 'MySQL', 'Stripe']),
      'https://example-ecommerce.com',
      'https://github.com/johndoe/ecommerce',
      true,
      'completed',
      '2023-01-15',
      '2023-04-20',
      JSON.stringify(['https://via.placeholder.com/600x400/4F46E5/ffffff?text=E-Commerce']),
      1
    ],
    [
      'Task Management App',
      'A collaborative task management application with real-time updates and team collaboration features.',
      'Real-time task management for teams',
      JSON.stringify(['React', 'Socket.io', 'Express', 'MongoDB']),
      'https://example-tasks.com',
      'https://github.com/johndoe/taskmanager',
      true,
      'completed',
      '2023-05-01',
      '2023-07-15',
      JSON.stringify(['https://via.placeholder.com/600x400/10B981/ffffff?text=Task+Manager']),
      2
    ],
    [
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
    ]
  ];

  for (const project of projects) {
    await connection.execute(`
      INSERT IGNORE INTO projects (title, description, short_description, technologies, live_url, github_url, featured, status, start_date, end_date, images, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, project);
  }

  // Insert sample experience
  const experiences = [
    [
      'Tech Corp',
      'Senior Full Stack Developer',
      'Led development of enterprise web applications serving 1M+ users. Implemented microservices architecture and improved system performance by 40%.',
      '2022-01-01',
      null,
      true,
      'New York, NY',
      'https://via.placeholder.com/100x100/4F46E5/ffffff?text=Tech',
      JSON.stringify(['React', 'Node.js', 'AWS', 'PostgreSQL']),
      1
    ],
    [
      'StartupXYZ',
      'Full Stack Developer',
      'Built and maintained multiple client projects using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality solutions.',
      '2020-06-01',
      '2021-12-31',
      false,
      'San Francisco, CA',
      'https://via.placeholder.com/100x100/10B981/ffffff?text=Startup',
      JSON.stringify(['Vue.js', 'Express', 'MySQL', 'Docker']),
      2
    ]
  ];

  for (const exp of experiences) {
    await connection.execute(`
      INSERT IGNORE INTO experience (company, position, description, start_date, end_date, current_job, location, company_logo, technologies, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, exp);
  }

  // Insert sample education
  await connection.execute(`
    INSERT IGNORE INTO education (id, institution, degree, field_of_study, start_date, end_date, gpa, description, display_order)
    VALUES (1, 'University of Technology', 'Bachelor of Science', 'Computer Science', '2016-09-01', '2020-06-01', 3.8, 
    'Graduated Magna Cum Laude. Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems.', 1)
  `);

  // Insert sample testimonials
  const testimonials = [
    [
      'Sarah Johnson',
      'CEO',
      'TechStart Inc.',
      'https://via.placeholder.com/100x100/8B5CF6/ffffff?text=Sarah',
      'John is an exceptional developer who delivered our project on time and exceeded our expectations. His technical skills and attention to detail are outstanding.',
      5.0,
      true,
      1
    ],
    [
      'Michael Chen',
      'CTO',
      'Digital Solutions',
      'https://via.placeholder.com/100x100/F59E0B/ffffff?text=Michael',
      'Working with John was a great experience. He quickly understood our requirements and provided innovative solutions that improved our workflow significantly.',
      4.8,
      false,
      2
    ]
  ];

  for (const testimonial of testimonials) {
    await connection.execute(`
      INSERT IGNORE INTO testimonials (client_name, client_position, client_company, client_avatar, testimonial, rating, featured, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, testimonial);
  }

  console.log('✅ Initial data seeded successfully');
};

// Run the setup
setupDatabase();
