import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { VitalsPanel } from '../components/VitalsPanel';
import { PatientProfileCard } from '../components/PatientProfileCard';
import { ThreeDHealthHUD } from '../components/ThreeDHealthHUD';
import { AnimatedVitalsGraph } from '../components/AnimatedVitalsGraph';
import { FuturisticCard } from '../components/FuturisticCard';
import { ConfidenceGraph } from '../components/ConfidenceGraph';
import { SOSOverlay } from '../components/SOSOverlay';

const patient = {
  name: 'Hari Teja',
  age: 20,
  id: 'P-001',
  status: 'Stable',
};

const navItems = [
  { label: 'Dashboard', icon: '🏠' },
  { label: 'Patients', icon: '🧑‍⚕️' },
  { label: 'Diagnostics', icon: '🩺' },
  { label: 'Analytics', icon: '📊' },
  { label: 'Settings', icon: '⚙️' },
];

interface HUDLayoutProps {
  children: ReactNode;
}

export function HUDLayout({ children }: HUDLayoutProps) {
  const [activeNav, setActiveNav] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [sosActive, setSosActive] = useState(false);

  // Theme switching logic
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen w-full bg-hud-gradient ${theme === 'dark' ? 'dark' : ''} relative`} role="main" aria-label="Medical HUD Dashboard">
      <SOSOverlay active={sosActive} onCancel={() => setSosActive(false)} />
      
      {/* Header Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-glass backdrop-blur-hud border-b border-neon-blue/30 shadow-hud" aria-label="Main Navigation">
        <nav className="container mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="font-orbitron text-2xl text-neon-blue tracking-widest">NeuroFocus</h1>
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.label}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-orbitron text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-blue ${
                    activeNav === idx ? 'bg-neon-blue/20 text-neon-blue shadow-neon-blue' : 'text-slate-400 hover:text-neon-blue'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveNav(idx)}
                  aria-label={item.label}
                  tabIndex={0}
                  role="menuitem"
                >
                  <span className="text-lg" aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
          <motion.button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-neon-blue border border-neon-blue/30 shadow-hud focus:outline-none focus:ring-2 focus:ring-neon-blue"
            whileTap={{ rotate: 180 }}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            tabIndex={0}
          >
            <span className="text-xl" aria-hidden="true">{theme === 'dark' ? '🌙' : '☀️'}</span>
          </motion.button>
        </nav>
      </header>

      {/* Main HUD Grid */}
      <main className="pt-24 px-8 pb-8 grid grid-cols-1 md:grid-cols-3 gap-8" aria-label="HUD Content">
        <section className="col-span-1 flex flex-col gap-8" aria-label="Patient and Vitals">
          <PatientProfileCard patient={patient} />
          <VitalsPanel />
          <AnimatedVitalsGraph />
        </section>
        <section className="col-span-2 flex flex-col gap-8" aria-label="3D and Classifier">
          <ThreeDHealthHUD />
          <FuturisticCard>
            <h2 className="font-orbitron text-neon-blue text-lg mb-4 tracking-widest">Live Classifier Confidence</h2>
            <ConfidenceGraph />
          </FuturisticCard>
          {children}
        </section>
      </main>
    </div>
  );
}
