import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import LoadingScreen from './components/LoadingScreen';
import Terminal from './components/Terminal';
import AiChat from './components/AiChat';
import CursorEffect from './components/CursorEffect';
import ShaderBackground from './components/ShaderBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AdminPanel from './components/AdminPanel';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Backtick or Ctrl+` opens terminal
      if (e.key === '`' || (e.ctrlKey && e.key === '`')) {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setTerminalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : 'light'}`}>
        <div className="bg-slate-900 min-h-screen">
          {/* Premium Animated Background */}
          <div className="fixed inset-0 z-0">
            {/* Base Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
              style={{
                backgroundImage: `url("/images/back.jpg")`,
                filter: 'blur(1px)',
                transform: 'scale(1.1)'
              }}
            ></div>
            
            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient bg-300%"></div>
            
            {/* Premium Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
            </div>
            
            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`
                  }}
                ></div>
              ))}
            </div>
            
            {/* Decorative Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="h-full w-full bg-grid-pattern"></div>
            </div>
          </div>
          
          {/* Floating Interactive Elements */}
          <div className="fixed inset-0 pointer-events-none z-10">
            <div 
              className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl transition-transform duration-300 ease-out"
              style={{
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
              }}
            ></div>
            <div 
              className="absolute top-40 right-20 w-24 h-24 bg-pink-500/10 rounded-full blur-lg transition-transform duration-300 ease-out"
              style={{
                transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
              }}
            ></div>
            <div 
              className="absolute bottom-32 left-32 w-28 h-28 bg-blue-500/10 rounded-full blur-lg transition-transform duration-300 ease-out"
              style={{
                transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
              }}
            ></div>
          </div>
          
          {/* Subtle Background Overlay */}
          <div className="fixed inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 z-0"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            
            <main>
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Experience />
                    <Education />
                    <Contact />
                  </>
                } />
                <Route path="/admin" element={<AdminPanel />} />
              </Routes>
            </main>
            
            <Footer />
            <ScrollToTop />

            {/* Terminal Easter Egg */}
            <AnimatePresence>
              {terminalOpen && (
                <Terminal onClose={() => setTerminalOpen(false)} />
              )}
            </AnimatePresence>

            {/* AI Chat */}
            <AnimatePresence>
              {chatOpen && (
                <AiChat onClose={() => setChatOpen(false)} />
              )}
            </AnimatePresence>

            {/* Floating action buttons — terminal hint + AI chat */}
            <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 items-start">
              <AnimatePresence>
                {!terminalOpen && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 3 }}
                    onClick={() => setTerminalOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-900/90 border border-purple-500/30 rounded-lg text-xs font-mono text-gray-400 hover:text-purple-400 hover:border-purple-500/60 transition-all duration-300 backdrop-blur-sm"
                  >
                    <span className="text-purple-400">$</span> press <kbd className="px-1 py-0.5 bg-slate-700 rounded text-gray-300">`</kbd> to open terminal
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* AI Chat toggle button */}
            <AnimatePresence>
              {!chatOpen && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: 2, type: 'spring' }}
                  onClick={() => setChatOpen(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-purple-500/40 transition-shadow"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: darkMode ? '#1e293b' : '#ffffff',
                color: darkMode ? '#e2e8f0' : '#1e293b',
                border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
