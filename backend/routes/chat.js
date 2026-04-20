const express = require('express');
const { query } = require('../config/database');
const { GoogleGenAI } = require('@google/genai');

const router = express.Router();

let ai;
const initAI = () => {
  try {
    if (process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
  } catch (error) {
    console.warn("GoogleGenAI initialized failed, ensure GEMINI_API_KEY is in .env");
  }
};
initAI();

router.post('/', async (req, res) => {
  try {
    const { messages } = req.body; 
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Valid messages array required' });
    }

    if (!ai) {
        // Try to reinit in case it was added to process.env later
        initAI();
        if(!ai) {
            return res.status(503).json({ 
                error: 'AI is not configured. Add GEMINI_API_KEY to your .env file.',
                fallback: true
            });
        }
    }

    // Fetch dynamic context from the database
    const [profiles, skills, projects, experience] = await Promise.all([
      query('SELECT * FROM profiles ORDER BY id DESC LIMIT 1'),
      query('SELECT * FROM skills'),
      query('SELECT * FROM projects'),
      query('SELECT * FROM experience')
    ]);

    const profile = profiles[0] || {};
    const contextData = {
      name: profile.full_name || 'Tesfalem Markos Dola',
      role: profile.title || 'Software Engineer',
      bio: profile.bio || '',
      email: profile.email || 'tesfutesfalemmarkos@gmail.com',
      skills: skills.map(s => `${s.name} (${s.category})`).join(', '),
      projects: projects.map(p => `Project: ${p.title} - Tech: ${p.technologies}`).join(' | '),
      experience: experience.map(e => `${e.title} at ${e.company} (${e.start_date.toString().substring(0,10)} to ${e.current_job ? 'Present' : (e.end_date ? e.end_date.toString().substring(0,10) : 'Present')})`).join(' | ')
    };

    const systemInstruction = `You are a helpful, professional AI assistant for ${contextData.name}'s portfolio website. 
Your goal is to answer questions about their skills, experience, and projects. 
Data about ${contextData.name}:
Role: ${contextData.role}
Bio: ${contextData.bio}
Email: ${contextData.email}
Skills: ${contextData.skills}
Projects: ${contextData.projects}
Experience: ${contextData.experience}

Be concise, polite, and enthusiastic. Format using basic markdown. Do not hallucinate capabilities or projects not listed here. If asked for pricing/availability, tell the user to use the contact form. Keep your replies under 100 words.`;

    const formattedContents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'AI generation failed', fallback: true });
  }
});

module.exports = router;
