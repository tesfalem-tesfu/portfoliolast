import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

import { FaTimes, FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
const KB = {
  name: 'Tesfalem Markos Dola',
  role: 'Full Stack Developer & Software Engineer',
  location: 'Addis Ababa, Ethiopia',
  email: 'tesfutesfalemmarkos@gmail.com',
  phone: '+251 912 345 678',
  github: 'https://github.com/tesfalem-tesfu',
  linkedin: 'https://linkedin.com/in/tesfutesfalemmarkos',
  telegram: 'https://t.me/tesfu_22',
  twitter: 'https://x.com/tesfutesfalemmarkos',
  instagram: 'https://instagram.com/markostesfalem',
  experience: '5+ years',
  education: 'BSc Software Engineering, Haramaya University (2015–2019), GPA 3.8',
  skills: {
    frontend: ['JavaScript', 'React', 'HTML', 'CSS', 'Tailwind CSS', 'TypeScript'],
    backend: ['Node.js', 'Python', 'PHP', 'Express'],
    database: ['MySQL', 'MongoDB'],
    devops: ['Docker', 'AWS', 'CI/CD', 'Linux'],
    other: ['Machine Learning', 'GraphQL', 'REST APIs', 'Git'],
  },
  projects: [
    { name: 'E-Commerce Platform', tech: 'React, Node.js, MySQL, Stripe', status: 'completed' },
    { name: 'Task Management App', tech: 'React, Socket.io, Express, MongoDB', status: 'completed' },
    { name: 'Portfolio Website', tech: 'React, Tailwind, Node.js, MySQL', status: 'completed' },
  ],
  jobs: [
    { company: 'Ethiotech Solutions', role: 'Senior Software Engineer', period: '2022–Present' },
    { company: 'Digital Ethiopia', role: 'Full Stack Developer', period: '2020–2021' },
  ],
  availability: 'Available for freelance and full-time opportunities',
  bio: 'Passionate software engineer specializing in full-stack development, system architecture, and modern web technologies. Focused on building scalable, efficient solutions.',
};

function getAnswer(question) {
  const q = question.toLowerCase().trim();

  if (/^(hi|hello|hey|howdy|sup|greetings)/.test(q))
    return `Hi there! 👋 I'm Tesfalem's AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch!`;

  if (/who are you|what are you|your name|about you/.test(q))
    return `I'm an AI assistant for ${KB.name}'s portfolio. I can answer questions about his skills, projects, work experience, education, and contact info. What would you like to know?`;

  if (/name|who is/.test(q))
    return `His name is **${KB.name}** — a ${KB.role} based in ${KB.location}.`;

  if (/location|where|city|country|based/.test(q))
    return `Tesfalem is based in **${KB.location}**, Ethiopia. He's open to remote work and relocation opportunities.`;

  if (/contact|email|reach|phone|message/.test(q))
    return `You can reach Tesfalem at:\n📧 ${KB.email}\n📞 ${KB.phone}\n\nOr use the Contact section on this page to send a direct message!`;

  if (/github/.test(q))
    return `Tesfalem's GitHub: ${KB.github}\n\nYou can find his open-source projects and contributions there.`;

  if (/linkedin/.test(q))
    return `Tesfalem's LinkedIn: ${KB.linkedin}`;

  if (/telegram/.test(q))
    return `Tesfalem's Telegram: ${KB.telegram} (@tesfu_22)`;

  if (/twitter|x\.com/.test(q))
    return `Tesfalem's Twitter/X: ${KB.twitter}`;

  if (/social|instagram|connect/.test(q))
    return `Tesfalem's social links:\n🐙 GitHub: ${KB.github}\n💼 LinkedIn: ${KB.linkedin}\n✈️ Telegram: ${KB.telegram}\n🐦 Twitter: ${KB.twitter}\n📸 Instagram: ${KB.instagram}`;

  if (/skill|tech|stack|know|language|framework|tool/.test(q))
    return `Tesfalem's tech stack:\n\n🎨 **Frontend:** ${KB.skills.frontend.join(', ')}\n⚙️ **Backend:** ${KB.skills.backend.join(', ')}\n🗄️ **Database:** ${KB.skills.database.join(', ')}\n☁️ **DevOps:** ${KB.skills.devops.join(', ')}\n🔧 **Other:** ${KB.skills.other.join(', ')}`;

  if (/react/.test(q))
    return `Yes! React is one of Tesfalem's core skills. He uses it at an expert level for building modern, performant UIs — including this portfolio itself.`;

  if (/node|backend|server/.test(q))
    return `Tesfalem is an expert in Node.js for backend development. He builds RESTful APIs, real-time apps with Socket.io, and scalable server architectures.`;

  if (/python|machine learning|ai|ml/.test(q))
    return `Tesfalem has intermediate-level experience with Python and Machine Learning. He's worked on ML fundamentals and data-driven features in projects.`;

  if (/docker|aws|cloud|devops/.test(q))
    return `Tesfalem has intermediate experience with Docker and AWS. He's worked with containerization, CI/CD pipelines, and cloud deployments.`;

  if (/project|work|built|portfolio|app/.test(q)) {
    const list = KB.projects.map(p => `• **${p.name}** — ${p.tech}`).join('\n');
    return `Here are some of Tesfalem's projects:\n\n${list}\n\nCheck the Projects section for live demos and source code!`;
  }

  if (/experience|year|senior|job|work history/.test(q)) {
    const jobs = KB.jobs.map(j => `• **${j.role}** at ${j.company} (${j.period})`).join('\n');
    return `Tesfalem has **${KB.experience}** of professional experience:\n\n${jobs}`;
  }

  if (/education|degree|university|study|gpa|grade/.test(q))
    return `🎓 **${KB.education}**\n\nHe graduated with honors and specialized in software engineering, web development, and enterprise system architecture.`;

  if (/certif/.test(q))
    return `Tesfalem holds certifications in:\n• AWS Certified Solutions Architect\n• Google Cloud Professional Developer\n• MongoDB Certified Developer\n• React Advanced Patterns`;

  if (/available|hire|freelance|job|opportunit/.test(q))
    return `✅ ${KB.availability}. Feel free to reach out via the Contact section or email him at ${KB.email}`;

  if (/salary|rate|cost|price|charge/.test(q))
    return `For pricing and rates, please reach out directly via the Contact section or email ${KB.email} — Tesfalem will be happy to discuss based on your project needs.`;

  if (/thank|thanks|appreciate/.test(q))
    return `You're welcome! 😊 Feel free to ask anything else, or head to the Contact section to get in touch with Tesfalem directly.`;

  if (/bye|goodbye|see you|cya/.test(q))
    return `Goodbye! 👋 Don't hesitate to come back if you have more questions. You can also reach Tesfalem at ${KB.email}`;

  return `I'm not sure about that specific question. Here's what I can help with:\n\n• Skills & tech stack\n• Projects & demos\n• Work experience\n• Education & certifications\n• Contact information\n• Availability for work\n\nTry asking something like "What are his skills?" or "How can I contact him?"`;
}

const SUGGESTIONS = [
  'What are his skills?',
  'Show me his projects',
  'How can I contact him?',
  'Is he available for hire?',
  'What is his experience?',
];

const AiChat = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hi! 👋 I'm Tesfalem's AI assistant. I know everything about his skills, projects, and experience. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const answer = getAnswer(userMsg);
      setTyping(false);
      setMessages(prev => [...prev, { role: 'assistant', text: answer }]);
    }, 600 + Math.random() * 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Render message text with basic markdown (bold, newlines)
  const renderText = (text) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
          )}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 z-50 w-full max-w-sm"
    >
      <div className="bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ height: '480px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <FaRobot className="text-white text-sm" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Tesfalem's AI Assistant</div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/70 text-xs">Online</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors p-1">
            <FaTimes size={14} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user'
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                  : 'bg-slate-700'
                }`}>
                {msg.role === 'user'
                  ? <FaUser size={10} className="text-white" />
                  : <FaRobot size={10} className="text-purple-400" />
                }
              </div>
              <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-tr-sm'
                  : 'bg-slate-800 text-gray-300 rounded-tl-sm'
                }`}>
                {renderText(msg.text)}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 items-end"
            >
              <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                <FaRobot size={10} className="text-purple-400" />
              </div>
              <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions (only show at start) */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 bg-slate-800 text-purple-300 rounded-full hover:bg-slate-700 hover:text-white transition-all duration-200"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-3 border-t border-slate-700/50">
          <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 py-2 border border-slate-700 focus-within:border-purple-500/50 transition-colors">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500"
            />
            <motion.button
              onClick={() => sendMessage()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={!input.trim()}
              className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center disabled:opacity-40 transition-opacity"
            >
              <FaPaperPlane size={11} className="text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AiChat;
