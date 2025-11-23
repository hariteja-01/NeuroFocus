import { motion } from 'framer-motion';

export function FuturisticCard({ children, className = '' }) {
  return (
    <motion.div
      className={`bg-glass backdrop-blur-hud rounded-2xl shadow-hud border border-neon-blue/30 p-6 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
    >
      {children}
    </motion.div>
  );
}
