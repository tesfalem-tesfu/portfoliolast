const { query, connectDB, closeConnection } = require('../config/database-neon');

const testContactForm = async () => {
  try {
    console.log('Testing contact form functionality...');
    
    await connectDB();
    
    // Test 1: Check if contact_messages table exists
    console.log('1. Checking contact_messages table...');
    const tableCheck = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'contact_messages'
      );
    `);
    
    if (tableCheck[0].exists) {
      console.log('   contact_messages table exists');
    } else {
      console.log('   contact_messages table does NOT exist');
      return;
    }
    
    // Test 2: Test inserting a message
    console.log('2. Testing message insertion...');
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
    
    // Test 3: Test retrieving messages
    console.log('3. Testing message retrieval...');
    const messages = await query('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5');
    
    console.log(`   Found ${messages.length} messages:`);
    messages.forEach(msg => {
      console.log(`   - ID: ${msg.id}, Name: ${msg.name}, Email: ${msg.email}, Status: ${msg.status}`);
    });
    
    console.log('Contact form test completed successfully!');
    
  } catch (error) {
    console.error('Contact form test error:', error.message);
    throw error;
  } finally {
    await closeConnection();
  }
};

testContactForm()
  .then(() => {
    console.log('Test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Test failed:', error);
    process.exit(1);
  });
