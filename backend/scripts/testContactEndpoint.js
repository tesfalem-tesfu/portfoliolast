// Test contact endpoint directly
const { query, connectDB, closeConnection } = require('../config/database-neon');

const testContactEndpoint = async () => {
  try {
    console.log('Testing contact endpoint functionality...');
    
    // Test 1: Database connection
    await connectDB();
    console.log('1. Database connected successfully');
    
    // Test 2: Check if contact_messages table exists
    const tableCheck = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'contact_messages'
      );
    `);
    
    if (tableCheck[0].exists) {
      console.log('2. contact_messages table exists');
    } else {
      console.log('2. contact_messages table does NOT exist - creating it...');
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
      console.log('   contact_messages table created');
    }
    
    // Test 3: Test inserting a message
    console.log('3. Testing message insertion...');
    const testMessage = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Message',
      message: 'This is a test message from the test script.'
    };
    
    const result = await query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING id',
      [testMessage.name, testMessage.email, testMessage.subject, testMessage.message]
    );
    
    console.log(`   Message inserted with ID: ${result[0].id}`);
    
    // Test 4: Test retrieving messages
    console.log('4. Testing message retrieval...');
    const messages = await query('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5');
    
    console.log(`   Found ${messages.length} messages:`);
    messages.forEach(msg => {
      console.log(`   - ID: ${msg.id}, Name: ${msg.name}, Email: ${msg.email}, Status: ${msg.status}`);
    });
    
    console.log('Contact endpoint test completed successfully!');
    
  } catch (error) {
    console.error('Contact endpoint test error:', error.message);
    throw error;
  } finally {
    await closeConnection();
  }
};

testContactEndpoint()
  .then(() => {
    console.log('Test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Test failed:', error);
    process.exit(1);
  });
