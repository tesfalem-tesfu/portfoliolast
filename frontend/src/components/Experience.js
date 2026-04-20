import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaBuilding, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const FALLBACK = [
  {
    id: 1,
    company: 'Ethiotech Solutions',
    position: 'Senior Software Engineer',
    description:
      'Leading development of enterprise-level software solutions for Ethiopian businesses. Implemented microservices architecture and improved system performance by 45%.',
    start_date: '2022-01-01',
    end_date: null,
    current_job: true,
    location: 'Addis Ababa, Ethiopia',
    technologies: ['React', 'Node.js', 'AWS', 'MySQL', 'Docker'],
    achievement: '45% performance boost',
    color: '#a855f7',
  },
  {
    id: 2,
    company: 'Digital Ethiopia',
    position: 'Full Stack Developer',
    description:
      'Built and maintained multiple client projects using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality solutions.',
    start_date: '2020-06-01',
    end_date: '2021-12-31',
    current_job: false,
    location: 'Addis Ababa, Ethiopia',
    technologies: ['Vue.js', 'Express', 'MySQL', 'MongoDB', 'Python'],
    achievement: '10+ projects shipped',
    color: '#ec4899',
  },
];

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
      })
    : '';

const calcDuration = (start, end, current) => {
  const s = new Date(start);
  const e = current ? new Date() : new Date(end);
  const m =
    (e.getFullYear() - s.getFullYear()) * 12 +
    (e.getMonth() - s.getMonth());
  const y = Math.floor(m / 12),
    rm = m % 12;
  if (y === 0) return `${rm}mo`;
  if (rm === 0) return `${y}yr`;
  return `${y}yr ${rm}mo`;
};

// Timeline Card
function TimelineCard({ job, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.3'],
  });

  const rawProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
  });

  const opacity = useTransform(rawProgress, [0, 0.4, 1], [0, 1, 1]);
  const y = useTransform(rawProgress, [0, 1], [80, 0]);
  const scale = useTransform(rawProgress, [0, 1], [0.92, 1]);
  const lineH = useTransform(rawProgress, [0, 1], ['0%', '100%']);
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start mb-24 last:mb-0">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-slate-700/40 hidden md:block" />

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-px hidden md:block origin-top"
        style={{ height: lineH, backgroundColor: job.color, opacity: 0.7 }}
      />

      <motion.div
        style={{ opacity, scale }}
        className="absolute left-1/2 -translate-x-1/2 top-6 z-10 hidden md:flex items-center justify-center"
      >
        <div
          className="w-5 h-5 rounded-full border-4 border-slate-900 shadow-lg"
          style={{
            backgroundColor: job.color,
            boxShadow: `0 0 16px ${job.color}80`,
          }}
        />
        <span className="absolute whitespace-nowrap text-xs font-mono text-gray-400 mt-10 top-0">
          {formatDate(job.start_date)}
        </span>
      </motion.div>

      <div
        className={`w-full md:w-[46%] ${
          isLeft ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'
        }`}
      >
        <motion.div style={{ opacity, y, scale }} className="relative group">
          <div
            className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
            style={{
              background: `linear-gradient(135deg, ${job.color}40, transparent)`,
            }}
          />

          <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden transition-all duration-300 z-10">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none z-0" style={{ backgroundColor: job.color }}></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${job.color}, ${job.color}80)`,
                  }}
                >
                  <FaBuilding className="text-white text-lg" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {job.position}
                  </h3>
                  <p
                    className="font-semibold text-sm mt-0.5"
                    style={{ color: job.color }}
                  >
                    {job.company}
                  </p>
                </div>
              </div>

              {job.current_job && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/15 text-green-400 rounded-full text-xs font-medium">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Current
                </span>
              )}
            </div>

            <p className="text-gray-400 text-sm mb-5">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-5">
              <span className="flex items-center gap-1.5">
                <FaCalendarAlt style={{ color: job.color }} />
                {formatDate(job.start_date)} —{' '}
                {job.current_job
                  ? 'Present'
                  : formatDate(job.end_date)}
                <span className="ml-1 px-1.5 py-0.5 rounded bg-slate-800">
                  {calcDuration(
                    job.start_date,
                    job.end_date,
                    job.current_job
                  )}
                </span>
              </span>

              {job.location && (
                <span className="flex items-center gap-1.5">
                  <FaMapMarkerAlt style={{ color: job.color }} />
                  {job.location}
                </span>
              )}
            </div>

            {job.achievement && (
              <div
                className="inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold mb-5"
                style={{
                  background: `${job.color}18`,
                  color: job.color,
                }}
              >
                ⚡ {job.achievement}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {job.technologies?.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full text-xs bg-slate-800 text-gray-300"
                >
                  {t}
                </span>
              ))}
            </div>

            </div>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 z-20"
              style={{ width: lineH, backgroundColor: job.color }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Main Component
const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch('/api/portfolio/experience');
        if (res.ok) {
          const data = await res.json();
          setExperience(Array.isArray(data) ? data : FALLBACK);
        } else {
          setExperience(FALLBACK);
        }
      } catch {
        setExperience(FALLBACK);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, []);

  if (loading) {
    return (
      <section className="py-20 flex justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-gray-950">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 pointer-events-none"></div>
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-purple-400 text-sm font-mono tracking-widest uppercase mb-3">Career Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Scroll through my professional story, each chapter shaped who I am as an engineer.
          </p>
        </motion.div>

        <div className="relative">
          {experience.map((job, i) => (
            <TimelineCard key={job.id || i} job={job} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { n: '0+',  l: 'Years Experience' },
            { n: '1+', l: 'Projects Delivered' },
            { n: '3+', l: 'Projects Completed' },
            { n: 'In Progress', l: 'Certifications' },
          ].map(({ n, l }) => (
            <div key={l} className="text-center py-4">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">{n}</div>
              <div className="text-gray-500 text-sm">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;