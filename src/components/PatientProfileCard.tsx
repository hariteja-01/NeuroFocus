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
    <FuturisticCard className="flex items-center gap-6">
      <div className="relative">
        <img
          src={patient.avatarUrl || '/avatar.png'}
          alt="Avatar"
          className="w-20 h-20 rounded-full border-4 border-neon-blue shadow-neon-blue object-cover"
        />
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-neon-green rounded-full border-2 border-white animate-pulse"></span>
      </div>
      <div>
        <div className="font-orbitron text-2xl text-neon-blue mb-1">{patient.name}</div>
        <div className="font-mono text-slate-400 text-xs mb-1">ID: {patient.id}</div>
        <div className="font-mono text-slate-400 text-xs">Age: {patient.age}</div>
        <div className="font-mono text-neon-green text-sm mt-2">{patient.status}</div>
      </div>
    </FuturisticCard>
  );
}
