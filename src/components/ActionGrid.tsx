import { useGesture } from '../context/GestureContext';

interface Action {
  id: number;
  label: string;
  icon: string;
  color: string;
}

const actions: Action[] = [
  { id: 0, label: 'CALL NURSE', icon: '🏥', color: 'bg-red-500' },
  { id: 1, label: 'MUSIC', icon: '🎵', color: 'bg-blue-500' },
  { id: 2, label: 'LIGHTS', icon: '💡', color: 'bg-yellow-500' },
  { id: 3, label: 'MESSAGE', icon: '💬', color: 'bg-green-500' },
];

export function ActionGrid() {
  const { focusedIndex } = useGesture();

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {actions.map((action) => {
        const isFocused = focusedIndex === action.id;
        
        return (
          <button
            key={action.id}
            className={`relative h-48 rounded-lg border-4 transition-all duration-300 font-mono font-bold text-2xl ${
              isFocused
                ? 'border-[#00ff9d] bg-[#00ff9d] text-slate-950 shadow-[0_0_30px_rgba(0,255,157,0.6)] scale-105'
                : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <span className="text-6xl">{action.icon}</span>
              <span>{action.label}</span>
              {isFocused && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-[#00ff9d] rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,157,0.8)]" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
