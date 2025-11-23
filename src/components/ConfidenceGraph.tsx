import { useGesture } from '../context/GestureContext';

export function ConfidenceGraph() {
  const { results } = useGesture();

  return (
    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 backdrop-blur-sm">
      <h3 className="text-[#00ff9d] font-mono text-xs mb-3 tracking-widest uppercase flex items-center gap-2">
        <span className="w-2 h-2 bg-[#00ff9d] rounded-full animate-pulse"></span>
        Neural Link Status
      </h3>
      
      <div className="space-y-3">
        {results.map((item) => {
          const isHighConfidence = item.value >= 0.85;
          const width = `${Math.max(5, item.value * 100)}%`;
          
          return (
            <div key={item.label} className="group">
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className={isHighConfidence ? 'text-white font-bold' : 'text-slate-500'}>
                  {item.label.toUpperCase()}
                </span>
                <span className={isHighConfidence ? 'text-[#00ff9d]' : 'text-slate-600'}>
                  {(item.value * 100).toFixed(0)}%
                </span>
              </div>
              
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
                {/* Background grid lines */}
                <div className="absolute inset-0 w-full h-full opacity-20" 
                     style={{ backgroundImage: 'linear-gradient(90deg, transparent 95%, #000 95%)', backgroundSize: '10% 100%' }}>
                </div>
                
                {/* Bar */}
                <div 
                  className={`h-full transition-all duration-300 ease-out relative ${
                    isHighConfidence ? 'bg-[#00ff9d] shadow-[0_0_10px_#00ff9d]' : 'bg-slate-700'
                  }`}
                  style={{ width }}
                >
                  {/* Glitch effect on high confidence */}
                  {isHighConfidence && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {results.length === 0 && (
          <div className="text-center py-4 text-slate-600 font-mono text-xs animate-pulse">
            WAITING FOR SIGNAL...
          </div>
        )}
      </div>
    </div>
  );
}
