import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMinus, FaExpand } from 'react-icons/fa';

const COMMANDS = {
  help: () => [
    { text: 'Available commands:', color: 'text-purple-400' },
    { text: '  whoami          — about Tesfalem', color: 'text-gray-300' },
    { text: '  ls projects     — list all projects', color: 'text-gray-300' },
    { text: '  cat skills.txt  — view skills', color: 'text-gray-300' },
    { text: '  cat contact.txt — contact info', color: 'text-gray-300' },
    { text: '  experience      — work history', color: 'text-gray-300' },
    { text: '  education       — academic background', color: 'text-gray-300' },
    { text: '  social          — social media links', color: 'text-gray-300' },
    { text: '  clear           — clear terminal', color: 'text-gray-300' },
    { text: '  exit            — close terminal', color: 'text-gray-300' },
  ],
  whoami: () => [
    { text: 'Tesfalem Markos Dola', color: 'text-green-400' },
    { text: '─────────────────────────────────────', color: 'text-gray-600' },
    { text: 'Role     : Full Stack Developer & Software Engineer', color: 'text-gray-300' },
    { text: 'Location : Addis Ababa, Ethiopia', color: 'text-gray-300' },
    { text: 'Focus    : Web Development, System Architecture, AI/ML', color: 'text-gray-300' },
    { text: 'Status   : Available for work ✓', color: 'text-green-400' },
    { text: '', color: '' },
    { text: 'Passionate about building scalable systems and modern web apps.', color: 'text-gray-400' },
  ],
  'ls projects': () => [
    { text: 'drwxr-xr-x  projects/', color: 'text-blue-400' },
    { text: '├── E-Commerce Platform      [React, Node.js, MySQL, Stripe]     ✓ completed', color: 'text-gray-300' },
    { text: '├── Task Management App      [React, Socket.io, Express, MongoDB] ✓ completed', color: 'text-gray-300' },
    { text: '└── Portfolio Website        [React, Tailwind, Node.js, MySQL]    ✓ completed', color: 'text-gray-300' },
    { text: '', color: '' },
    { text: 'tip: visit the Projects section for live demos & source code', color: 'text-yellow-400' },
  ],
  'cat skills.txt': () => [
    { text: '# skills.txt', color: 'text-purple-400' },
    { text: '─────────────────────────────────────', color: 'text-gray-600' },
    { text: 'Frontend  : JavaScript ████████████ expert', color: 'text-cyan-400' },
    { text: '            React      ████████████ expert', color: 'text-cyan-400' },
    { text: '            HTML/CSS   ████████████ expert', color: 'text-cyan-400' },
    { text: 'Backend   : Node.js    ████████████ expert', color: 'text-green-400' },
    { text: '            Python     █████████░░░ advanced', color: 'text-green-400' },
    { text: '            PHP        █████████░░░ advanced', color: 'text-green-400' },
    { text: 'Database  : MySQL      █████████░░░ advanced', color: 'text-orange-400' },
    { text: '            MongoDB    ███████░░░░░ intermediate', color: 'text-orange-400' },
    { text: 'DevOps    : Docker     ███████░░░░░ intermediate', color: 'text-blue-400' },
    { text: '            AWS        ███████░░░░░ intermediate', color: 'text-blue-400' },
    { text: 'AI/ML     : Machine Learning  ███████░░░░░ intermediate', color: 'text-pink-400' },
  ],
  'cat contact.txt': () => [
    { text: '# contact.txt', color: 'text-purple-400' },
    { text: '─────────────────────────────────────', color: 'text-gray-600' },
    { text: 'Email    : tesfutesfalemmarkos@gmail.com', color: 'text-gray-300' },
    { text: 'Phone    : +251 912 345 678', color: 'text-gray-300' },
    { text: 'Location : Addis Ababa, Ethiopia', color: 'text-gray-300' },
    { text: '', color: '' },
    { text: 'tip: scroll to the Contact section to send a message', color: 'text-yellow-400' },
  ],
  experience: () => [
    { text: '# work experience', color: 'text-purple-400' },
    { text: '─────────────────────────────────────', color: 'text-gray-600' },
    { text: '2022 → Present', color: 'text-green-400' },
    { text: '  Senior Software Engineer @ Ethiotech Solutions', color: 'text-white' },
    { text: '  Stack: React, Node.js, AWS, MySQL, Docker', color: 'text-gray-400' },
    { text: '', color: '' },
    { text: '2020 → 2021', color: 'text-blue-400' },
    { text: '  Full Stack Developer @ Digital Ethiopia', color: 'text-white' },
    { text: '  Stack: Vue.js, Express, MySQL, MongoDB, Python', color: 'text-gray-400' },
  ],
  education: () => [
    { text: '# education', color: 'text-purple-400' },
    { text: '─────────────────────────────────────', color: 'text-gray-600' },
    { text: 'BSc Software Engineering', color: 'text-white' },
    { text: 'Haramaya University  |  2015 – 2019', color: 'text-gray-400' },
    { text: 'GPA: 3.8  |  Graduated with Honors', color: 'text-green-400' },
    { text: '', color: '' },
    { text: 'Certifications:', color: 'text-purple-400' },
    { text: '  • AWS Certified Solutions Architect', color: 'text-gray-300' },
    { text: '  • Google Cloud Professional Developer', color: 'text-gray-300' },
    { text: '  • MongoDB Certified Developer', color: 'text-gray-300' },
  ],
  social: () => [
    { text: '# social links', color: 'text-purple-400' },
    { text: '─────────────────────────────────────', color: 'text-gray-600' },
    { text: 'GitHub    : https://github.com/tesfalem-tesfu', color: 'text-blue-400' },
    { text: 'LinkedIn  : https://linkedin.com/in/tesfutesfalemmarkos', color: 'text-blue-400' },
    { text: 'Telegram  : https://t.me/tesfu_22', color: 'text-blue-400' },
    { text: 'Twitter   : https://x.com/tesfutesfalemmarkos', color: 'text-blue-400' },
    { text: 'Instagram : https://instagram.com/markostesfalem', color: 'text-blue-400' },
  ],
};

const BOOT_SEQUENCE = [
  { text: 'Initializing portfolio terminal v1.0.0...', color: 'text-green-400', delay: 0 },
  { text: 'Loading profile data...', color: 'text-gray-400', delay: 300 },
  { text: 'All systems operational.', color: 'text-green-400', delay: 600 },
  { text: '', color: '', delay: 800 },
  { text: 'Welcome! Type "help" to see available commands.', color: 'text-purple-400', delay: 900 },
  { text: '', color: '', delay: 900 },
];

const Terminal = ({ onClose }) => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Boot sequence
  useEffect(() => {
    let timeouts = [];
    BOOT_SEQUENCE.forEach((line) => {
      const t = setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, line.delay);
      timeouts.push(t);
    });
    const done = setTimeout(() => setBooted(true), 1000);
    timeouts.push(done);
    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  const runCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const prompt = { text: `guest@tesfalem:~$ ${cmd}`, color: 'text-white' };

    if (trimmed === 'clear') {
      setLines([]);
      return;
    }
    if (trimmed === 'exit') {
      onClose();
      return;
    }

    const output = COMMANDS[trimmed];
    if (output) {
      setLines(prev => [...prev, prompt, ...output()]);
    } else if (trimmed === '') {
      setLines(prev => [...prev, prompt]);
    } else {
      setLines(prev => [
        ...prev,
        prompt,
        { text: `command not found: ${cmd}. Type "help" for available commands.`, color: 'text-red-400' },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input;
      if (cmd.trim()) setHistory(prev => [cmd, ...prev]);
      setHistoryIndex(-1);
      runCommand(cmd);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setInput(history[next] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? '' : history[next]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 z-50 w-full max-w-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Window chrome */}
      <div className="bg-slate-900 border border-purple-500/30 rounded-xl shadow-2xl overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-xs font-mono">guest@tesfalem: ~</span>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 transition-colors">
            <FaTimes size={12} />
          </button>
        </div>

        {/* Terminal body */}
        <div className="h-80 overflow-y-auto p-4 font-mono text-sm bg-slate-950/80 backdrop-blur-sm">
          {lines.map((line, i) => (
            <div key={i} className={`leading-relaxed ${line.color}`}>
              {line.text || '\u00A0'}
            </div>
          ))}

          {/* Input line */}
          {booted && (
            <div className="flex items-center mt-1">
              <span className="text-purple-400 mr-2">guest@tesfalem:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white outline-none caret-purple-400"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 bg-slate-800 border-t border-slate-700 text-xs text-gray-500 font-mono">
          press <kbd className="px-1 py-0.5 bg-slate-700 rounded text-gray-400">↑↓</kbd> for history &nbsp;·&nbsp; type <span className="text-purple-400">help</span> for commands &nbsp;·&nbsp; <span className="text-purple-400">esc</span> to close
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;
