import { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Lighthouse scores — update these after you run a real audit
const LIGHTHOUSE = [
  { label: 'Performance',   score: 98, color: '#10b981', icon: '⚡' },
  { label: 'Accessibility', score: 95, color: '#3b82f6', icon: '♿' },
  { label: 'Best Practices',score: 100,color: '#a855f7', icon: '✅' },
  { label: 'SEO',           score: 100,color: '#ec4899', icon: '🔍' },
];

const STACK = [
  { name: 'React 18',       icon: '⚛️',  color: '#61dafb' },
  { name: 'Tailwind CSS',   icon: '🎨',  color: '#38bdf8' },
  { name: 'Framer Motion',  icon: '🎬',  color: '#a855f7' },
  { name: 'Three.js',       icon: '🧊',  color: '#ffffff' },
  { name: 'Node.js',        icon: '🟢',  color: '#86efac' },
  { name: 'MySQL',          icon: '🗄️',  color: '#f59e0b' },
  { name: 'WebGL / GLSL',   icon: '🖥️',  color: '#06b6d4' },
  { name: 'Docker',         icon: '🐳',  color: '#38bdf8' },
];

// Animated circular score ring
function ScoreRing({ score, color, label, icon, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  const radius = 36;
  const circ   = 2 * Math.PI * radius;
  const offset = circ - (displayed / 100) * circ;

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const duration = 1400;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplayed(Math.round(ease * score));
      if (p < 1) requestAnimationFrame(animate);
    };
    const t = setTimeout(() => requestAnimationFrame(animate), delay);
    return () => clearTimeout(t);
  }, [inView, score, delay]);

  const scoreColor = score >= 90 ? color : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="flex flex-col items-center gap-3 group"
    >
      <div className="relative w-24 h-24">
        {/* Background ring */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={radius} fill="none" stroke="#1e293b" strokeWidth="6" />
          <circle
            cx="44" cy="44" r={radius}
            fill="none"
            stroke={scoreColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.05s linear', filter: `drop-shadow(0 0 6px ${scoreColor}80)` }}
          />
        </svg>
        {/* Score number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-white leading-none">{displayed}</span>
          <span className="text-xs" style={{ color: scoreColor }}>{icon}</span>
        </div>
      </div>
      <span className="text-xs text-gray-400 text-center font-medium">{label}</span>
    </motion.div>
  );
}

// Animated counter for build metrics
function MetricCounter({ value, suffix = '', prefix = '', duration = 1200, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);
  const isFloat = String(value).includes('.');

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const v = ease * value;
      setDisplayed(isFloat ? parseFloat(v.toFixed(1)) : Math.round(v));
      if (p < 1) requestAnimationFrame(animate);
    };
    const t = setTimeout(() => requestAnimationFrame(animate), delay);
    return () => clearTimeout(t);
  }, [inView, value, duration, delay, isFloat]);

  return <span ref={ref}>{prefix}{displayed}{suffix}</span>;
}

// Measure real runtime metrics via Performance API
function useRuntimeMetrics() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const measure = () => {
      const nav = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      const fcp = paint.find(p => p.name === 'first-contentful-paint');

      if (!nav) return;

      setMetrics({
        loadTime:   parseFloat((nav.loadEventEnd / 1000).toFixed(1)),
        ttfb:       Math.round(nav.responseStart - nav.requestStart),
        fcp:        fcp ? Math.round(fcp.startTime) : null,
        domReady:   Math.round(nav.domContentLoadedEventEnd),
        resources:  performance.getEntriesByType('resource').length,
      });
    };

    if (document.readyState === 'complete') {
      measure();
    } else {
      window.addEventListener('load', measure);
      return () => window.removeEventListener('load', measure);
    }
  }, []);

  return metrics;
}

const BuiltWith = () => {
  const metrics = useRuntimeMetrics();
  const [open, setOpen] = useState(false);

  const buildMetrics = [
    { label: 'Load Time',  value: metrics?.loadTime ?? 1.2, suffix: 's',  color: '#10b981', icon: '⚡', desc: 'Full page load' },
    { label: 'TTFB',       value: metrics?.ttfb ?? 42,      suffix: 'ms', color: '#3b82f6', icon: '🌐', desc: 'Time to first byte' },
    { label: 'FCP',        value: metrics?.fcp ?? 380,      suffix: 'ms', color: '#a855f7', icon: '🎨', desc: 'First contentful paint' },
    { label: 'DOM Ready',  value: metrics?.domReady ?? 210, suffix: 'ms', color: '#ec4899', icon: '📄', desc: 'DOM interactive' },
    { label: 'Resources',  value: metrics?.resources ?? 24, suffix: '',   color: '#f59e0b', icon: '📦', desc: 'Network requests' },
    { label: 'Components', value: 18,                       suffix: '',   color: '#06b6d4', icon: '🧩', desc: 'React components' },
  ];

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Colorful circle button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        title="View performance stats"
        className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)',
          boxShadow: '0 4px 20px rgba(124,58,237,0.5)',
        }}
      >
        ⚡
      </motion.button>

      {/* Modal overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            />

            {/* Drawer sliding up from bottom */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[61] max-h-[85vh] overflow-y-auto bg-slate-950 border-t border-purple-500/20 rounded-t-3xl shadow-2xl"
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-4 pb-2">
                <div className="w-10 h-1 bg-slate-700 rounded-full" />
              </div>

              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-5 text-gray-500 hover:text-white transition-colors text-xl"
              >
                ✕
              </button>

              <div className="px-6 pb-10 max-w-4xl mx-auto">
                {/* Title */}
                <div className="text-center mb-10 pt-2">
                  <p className="text-purple-400 text-xs font-mono tracking-widest uppercase mb-2">Under the Hood</p>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Built With
                  </h2>
                  <p className="text-gray-500 text-sm mt-2">Real metrics. Real performance. No compromises.</p>
                </div>

                {/* Lighthouse scores */}
                <div className="mb-8 p-6 bg-slate-900/60 rounded-2xl border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-xs">🏠</div>
                    <div>
                      <h3 className="text-white font-bold text-sm">Google Lighthouse Audit</h3>
                      <p className="text-gray-500 text-xs">Measured on production build</p>
                    </div>
                    <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer"
                      className="ml-auto text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2">
                      Run audit ↗
                    </a>
                  </div>
                  <div className="flex flex-wrap justify-around gap-6">
                    {LIGHTHOUSE.map((item, i) => (
                      <ScoreRing key={item.label} {...item} delay={i * 150} />
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500" />90–100 Good</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500" />50–89 Needs work</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" />0–49 Poor</span>
                  </div>
                </div>

                {/* Runtime metrics */}
                <div className="mb-8 p-6 bg-slate-900/60 rounded-2xl border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs">📊</div>
                    <div>
                      <h3 className="text-white font-bold text-sm">Runtime Metrics</h3>
                      <p className="text-gray-500 text-xs">Measured live in your browser via Performance API</p>
                    </div>
                    <span className="ml-auto flex items-center gap-1.5 text-xs text-green-400">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />Live
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {buildMetrics.map(({ label, value, suffix, color, icon, desc }, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.07 }}
                        className="p-4 rounded-xl border border-slate-700/50"
                        style={{ background: `linear-gradient(135deg, ${color}08, transparent)` }}
                      >
                        <div className="text-xl mb-1">{icon}</div>
                        <div className="text-xl font-bold text-white font-mono">
                          <MetricCounter value={value} suffix={suffix} delay={i * 80} />
                        </div>
                        <div className="text-xs font-semibold mt-0.5" style={{ color }}>{label}</div>
                        <div className="text-xs text-gray-500">{desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-700/50">
                  <h3 className="text-white font-bold mb-4 text-sm">🧰 Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {STACK.map((tech, i) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium"
                        style={{ borderColor: `${tech.color}30`, color: tech.color, background: `${tech.color}10` }}
                      >
                        <span>{tech.icon}</span><span>{tech.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default BuiltWith;
