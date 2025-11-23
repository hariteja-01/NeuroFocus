import { motion } from 'framer-motion';
import { FuturisticCard } from './FuturisticCard';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Example data, replace with real data
const data = [
  { time: '00:00', value: 78 },
  { time: '00:01', value: 80 },
  { time: '00:02', value: 77 },
  { time: '00:03', value: 82 },
  { time: '00:04', value: 79 },
  { time: '00:05', value: 81 },
];

export function AnimatedVitalsGraph() {
  return (
    <FuturisticCard className="w-full">
      <h2 className="font-orbitron text-neon-blue text-lg mb-4 tracking-widest">ECG TREND</h2>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis domain={[70, 90]} hide />
          <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #00eaff', color: '#00eaff' }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00eaff"
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
            animationDuration={800}
            className="drop-shadow-[0_0_8px_#00eaff]"
          />
        </LineChart>
      </ResponsiveContainer>
    </FuturisticCard>
  );
}
