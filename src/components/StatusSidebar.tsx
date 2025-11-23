import { useGesture } from '../context/GestureContext';

const gestureStates = ['IDLE', 'UP', 'DOWN', 'CLICK'] as const;

export function StatusSidebar() {
  const { currentGesture, isSystemReady } = useGesture();

  return (
    <div className="bg-slate-900 border-l-4 border-[#00ff9d] p-6 flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-[#00ff9d] font-mono text-xl mb-2">SYSTEM STATUS</h2>
        <div className={`px-4 py-2 rounded-md font-mono text-sm ${
          isSystemReady 
            ? 'bg-[#00ff9d] text-slate-950' 
            : 'bg-slate-800 text-slate-500'
        }`}>
          {isSystemReady ? '● READY' : '○ INITIALIZING'}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <h3 className="text-[#00ff9d] font-mono text-sm mb-2">GESTURE STATE</h3>
        {gestureStates.map((state) => (
          <div
            key={state}
            className={`p-4 rounded-md border-2 transition-all duration-300 ${
              currentGesture === state
                ? 'bg-[#00ff9d] border-[#00ff9d] text-slate-950 shadow-[0_0_15px_rgba(0,255,157,0.5)]'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold">{state}</span>
              {currentGesture === state && (
                <span className="animate-pulse">●</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-700 pt-4">
        <p className="text-[#00ff9d] font-mono text-xs text-center">
          Use ↑ ↓ to navigate<br />
          Press ENTER to select
        </p>
      </div>
    </div>
  );
}
