const { query, connectDB, closeConnection } = require('../config/database-neon');

const createContactTable = async () => {
  try {
    console.log('Creating contact_messages table...');
    
    await connectDB();
    
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
    
    console.log('Contact messages table created successfully!');
    
  } catch (error) {
    console.error('Error creating table:', error.message);
    throw error;
  } finally {
    await closeConnection();
  }
};

createContactTable()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
