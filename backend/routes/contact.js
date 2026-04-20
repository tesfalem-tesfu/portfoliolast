const express = require('express');
const nodemailer = require('nodemailer');
const { query } = require('../config/database');
const { validateContactMessage } = require('../middleware/validation');

const router = express.Router();

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// @route   POST /api/contact
// @desc    Send contact message
// @access  Public
router.post('/', validateContactMessage, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save message to database
    const result = await query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject || 'Contact Form Submission', message]
    );

    // Send email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();
        
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'tesfutesfalemmarkos@gmail.com',
          subject: `New Contact Form Message: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4f46e5;">New Message from Portfolio Contact Form</h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <p style="color: #666; font-size: 12px;">
                This message was sent from your portfolio contact form.
              </p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="color: #666; font-size: 12px;">
                Best regards,<br>
                Tesfalem Markos Dola<br>
                Software Engineer
              </p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('Contact email sent successfully');
      } catch (emailError) {
        console.error('Failed to send contact email:', emailError);
        // Don't fail the request if email fails, just log it
      }
    }

    // Send confirmation email to sender
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();
        
        const confirmationMailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Thank you for contacting me',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
                Thank You for Reaching Out!
              </h2>
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p>Hi ${name},</p>
                <p>Thank you for contacting me. I have received your message and will get back to you as soon as possible.</p>
                <div style="background-color: white; padding: 15px; border-left: 4px solid #10B981; margin-top: 10px;">
                  <strong>Your message:</strong><br>
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              <p style="color: #666;">
                Best regards,<br>
                Tesfalem Markos Dola
              </p>
            </div>
          `
        };

        await transporter.sendMail(confirmationMailOptions);
        console.log('Confirmation email sent successfully');
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the request if email fails, just log it
      }
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      messageId: result.insertId
    });

  } catch (error) {
    console.error('Contact form error:', error.message);
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.' 
    });
  }
});

// @route   GET /api/contact/messages
// @desc    Get all contact messages (admin only)
// @access  Private (Admin)
router.get('/messages', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied' });
    }

    // This would normally use auth middleware, but for simplicity we'll check admin status here
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const users = await query('SELECT role FROM users WHERE id = ?', [decoded.id]);
    if (users.length === 0 || users[0].role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { status, page = 1, limit = 20 } = req.query;
    let sql = 'SELECT * FROM contact_messages';
    let params = [];
    const conditions = [];

    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

    const messages = await query(sql, params);

    // Get total count for pagination
    let countSql = 'SELECT COUNT(*) as total FROM contact_messages';
    let countParams = [];
    
    if (conditions.length > 0) {
      countSql += ' WHERE ' + conditions.join(' AND ');
      countParams = params.slice(0, -2); // Remove limit and offset
    }

    const countResult = await query(countSql, countParams);

    res.json({
      messages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get messages error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/contact/messages/:id/status
// @desc    Update message status (admin only)
// @access  Private (Admin)
router.put('/messages/:id/status', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied' });
    }

    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const users = await query('SELECT role FROM users WHERE id = ?', [decoded.id]);
    if (users.length === 0 || users[0].role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!['unread', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await query(
      'UPDATE contact_messages SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({ message: 'Message status updated successfully' });

  } catch (error) {
    console.error('Update message status error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
