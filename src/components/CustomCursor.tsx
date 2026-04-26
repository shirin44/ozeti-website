import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering]   = useState(false);
  const [isVisible,  setIsVisible]    = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const x = useSpring(rawX, { stiffness: 600, damping: 36, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 600, damping: 36, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setIsHovering(!!el.closest('a, button, [data-cursor-hover]'));
    };

    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, [isVisible, rawX, rawY]);

  /* Only on pointer (non-touch) devices */
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999,
          borderRadius: '50%',
          border: '1.5px solid var(--rouge)',
          opacity: isVisible ? (isHovering ? 1 : 0.35) : 0,
        }}
        animate={{
          width:  isHovering ? 40 : 0,
          height: isHovering ? 40 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Inner dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999,
          borderRadius: '50%',
          background: 'var(--rouge)',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width:  isHovering ? 5 : 8,
          height: isHovering ? 5 : 8,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </>
  );
}
