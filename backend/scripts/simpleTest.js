// Simple database test (minimal code to avoid shell limits)
const { query, connectDB, closeConnection } = require('../config/database-neon');

const quickTest = async () => {
  try {
    await connectDB();
    const result = await query('SELECT NOW()');
    console.log('Database connected:', result[0]);
    await closeConnection();
    process.exit(0);
  } catch (error) {
    console.error('Database error:', error.message);
    process.exit(1);
  }
};

quickTest();
