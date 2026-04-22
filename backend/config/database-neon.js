// Neon PostgreSQL Database Configuration
const pkg = require("pg");
const { Client } = pkg;
const dotenv = require('dotenv');

dotenv.config();

// Database connection using Neon PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Connect to database
const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to Neon PostgreSQL database');
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw error;
  }
};

// Execute query with error handling
const query = async (sql, params = []) => {
  try {
    const result = await client.query(sql, params);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error.message);
    throw error;
  }
};

// Execute transaction
const transaction = async (callback) => {
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
};

// Test database connection
const testConnection = async () => {
  try {
    await connectDB();
    const result = await client.query('SELECT NOW()');
    console.log('Neon database test successful:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Neon connection failed:', error.message);
    return false;
  }
};

// Close connection
const closeConnection = async () => {
  try {
    await client.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing connection:', error.message);
  }
};

module.exports = {
  client,
  query,
  transaction,
  testConnection,
  connectDB,
  closeConnection
};
