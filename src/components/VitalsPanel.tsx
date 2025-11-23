import { motion } from 'framer-motion';
import { useGesture } from '../context/GestureContext';
import { FuturisticCard } from './FuturisticCard';

export function VitalsPanel() {
  // Example data, replace with real vitals from context or props
  const vitals = [
    { label: 'Heart Rate', value: 78, unit: 'bpm', min: 60, max: 100 },
    { label: 'SpO₂', value: 98, unit: '%', min: 95, max: 100 },
    { label: 'Temp', value: 36.7, unit: '°C', min: 36, max: 37.5 },
    { label: 'BP', value: '120/80', unit: 'mmHg', min: 0, max: 0 },
  ];

  return (
    <FuturisticCard className="w-full mb-6">
      <h2 className="font-orbitron text-neon-blue text-lg mb-4 tracking-widest">VITALS</h2>
      <div className="grid grid-cols-2 gap-4">
        {vitals.map((v) => (
          <div key={v.label} className="flex flex-col items-center">
            <span className="font-mono text-slate-400 text-xs mb-1 tracking-widest">{v.label}</span>
            <motion.div
              className="text-3xl font-bold text-neon-green drop-shadow-[0_0_8px_#00ff9d]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {v.value}
              <span className="text-base text-neon-blue ml-1">{v.unit}</span>
            </motion.div>
          </div>
        ))}
      </div>
    </FuturisticCard>
  );
}
