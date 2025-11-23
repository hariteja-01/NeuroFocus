import { motion } from 'framer-motion';
import * as anime from 'animejs';
import { useEffect, useRef } from 'react';

export function AnimatedHUDLoader() {
  const pathRef = useRef(null);

  useEffect(() => {
    if (pathRef.current) {
      // Polyfill for anime.setDashoffset
      const getDashoffset = (el: SVGPathElement) => {
        try {
          return el.getTotalLength();
        } catch {
          return 1000;
        }
      };
      const dashOffset = getDashoffset(pathRef.current);
      (anime as any)({
        targets: pathRef.current,
        strokeDashoffset: [dashOffset, 0],
        easing: 'easeInOutSine',
        duration: 2000,
        direction: 'alternate',
        loop: true,
      });
    }
  }, []);

  return (
    <motion.div
      className="flex items-center justify-center w-full h-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          ref={pathRef}
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="#00eaff"
          strokeWidth="4"
          strokeDasharray="314"
          strokeDashoffset="314"
          filter="url(#glow)"
        />
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}
