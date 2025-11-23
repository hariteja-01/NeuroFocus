import { motion } from 'framer-motion';
import { FuturisticCard } from './FuturisticCard';

export function PatientProfileCard({ patient }) {
  // Example patient data structure
  // const patient = {
  //   name: 'Jane Doe',
  //   age: 29,
  //   avatarUrl: '/avatar.png',
  //   id: 'P-001',
  //   status: 'Stable',
  // };

  return (
    <FuturisticCard className="flex flex-col gap-4">
      <div>
        <div className="font-orbitron text-2xl text-neon-blue mb-1">{patient.name}</div>
        <div className="font-mono text-slate-400 text-xs mb-1">ID: {patient.id}</div>
        <div className="font-mono text-slate-400 text-xs">Age: {patient.age}</div>
        <div className="font-mono text-neon-green text-sm mt-2">{patient.status}</div>
      </div>
    </FuturisticCard>
  );
}
