import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Spotlight canvas — soft radial glow that follows cursor
function Spotlight({ mouseX, mouseY }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;

    const unsubX = mouseX.on('change', v => { cx = v; });
    const unsubY = mouseY.on('change', v => { cy = v; });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Outer soft glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 320);
      grad.addColorStop(0,    'rgba(139, 92, 246, 0.10)');
      grad.addColorStop(0.4,  'rgba(139, 92, 246, 0.04)');
      grad.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Inner tighter glow
      const inner = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100);
      inner.addColorStop(0,   'rgba(192, 132, 252, 0.12)');
      inner.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = inner;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9997]"
    />
  );
}

const CursorEffect = () => {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  // Outer ring — slow spring
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  // Dot — snappy
  const dotX = useSpring(mouseX, { stiffness: 600, damping: 35 });
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 35 });

  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  // Only on desktop
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    window.addEventListener('mousemove', onMove);

    // Attach hover listeners to interactive elements
    const attach = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    attach();
    // Re-attach after a short delay for dynamically rendered elements
    const t = setTimeout(attach, 1500);

    return () => {
      window.removeEventListener('mousemove', onMove);
      clearTimeout(t);
    };
  }, [mouseX, mouseY, visible, isTouch]);

  if (isTouch || !visible) return null;

  return (
    <>
      {/* Spotlight glow layer */}
      <Spotlight mouseX={mouseX} mouseY={mouseY} />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width:  hovered ? 52 : 36,
          height: hovered ? 52 : 36,
          borderColor: hovered
            ? 'rgba(236, 72, 153, 0.7)'
            : 'rgba(139, 92, 246, 0.5)',
          backgroundColor: hovered
            ? 'rgba(236, 72, 153, 0.06)'
            : 'transparent',
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width:  hovered ? 5 : 6,
          height: hovered ? 5 : 6,
          backgroundColor: hovered ? '#ec4899' : '#a855f7',
          boxShadow: hovered
            ? '0 0 8px 2px rgba(236,72,153,0.6)'
            : '0 0 6px 1px rgba(168,85,247,0.5)',
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CursorEffect;
