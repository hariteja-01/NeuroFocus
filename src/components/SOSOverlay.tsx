import { useEffect, useState } from 'react';

interface SOSOverlayProps {
  active: boolean;
  onCancel: () => void;
}

export function SOSOverlay({ active, onCancel }: SOSOverlayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onCancel}
    >
      {/* Flashing Background */}
      <div className="absolute inset-0 bg-red-600 animate-[pulse_0.5s_ease-in-out_infinite]"></div>
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center p-12 border-8 border-white bg-red-600 text-white shadow-2xl transform scale-110 animate-[bounce_1s_infinite]">
        <div className="text-9xl mb-4">🚨</div>
        <h1 className="text-6xl font-black tracking-tighter mb-4">EMERGENCY</h1>
        <h2 className="text-4xl font-bold tracking-widest">ALERT ACTIVATED</h2>
        <p className="mt-8 text-xl font-mono bg-black/20 inline-block px-4 py-2 rounded">
          CLICK ANYWHERE TO CANCEL
        </p>
      </div>
      
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==')] opacity-20"></div>
    </div>
  );
}
