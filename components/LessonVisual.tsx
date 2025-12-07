import React from 'react';

export type VisualVariant = 
  | 'coffee-cup' 
  | 'blueprint' 
  | 'radar' 
  | 'clones' 
  | 'target' 
  | 'scale' 
  | 'crate' 
  | 'coins' 
  | 'gray-wash' 
  | 'dna' 
  | 'hub' 
  | 'gavel' 
  | 'horizon';

interface LessonVisualProps {
  variant: VisualVariant;
}

const LessonVisual: React.FC<LessonVisualProps> = ({ variant }) => {
  return (
    <div className="w-32 h-32 md:w-40 md:h-40 relative perspective-container flex items-center justify-center pointer-events-none">
      {/* COFFEE CUP (Lead-In) */}
      {variant === 'coffee-cup' && (
        <div className="relative animate-float">
          <div className="w-20 h-24 bg-gradient-to-r from-amber-700 to-amber-900 rounded-b-3xl relative overflow-hidden shadow-xl transform rotate-x-12">
            <div className="absolute top-0 left-0 w-full h-4 bg-amber-200/20"></div>
            <div className="absolute top-4 left-4 w-2 h-16 bg-white/10 rounded-full blur-[2px]"></div>
          </div>
          <div className="absolute top-2 -right-6 w-10 h-12 border-4 border-amber-800 rounded-r-2xl border-l-0"></div>
          {/* Steam */}
          <div className="absolute -top-10 left-4 w-2 h-8 bg-white/40 blur-md rounded-full animate-[float_3s_infinite_0s]"></div>
          <div className="absolute -top-8 left-10 w-2 h-6 bg-white/40 blur-md rounded-full animate-[float_3s_infinite_1s]"></div>
        </div>
      )}

      {/* BLUEPRINT (Intro) */}
      {variant === 'blueprint' && (
        <div className="relative w-24 h-32 transform rotate-y-12 rotate-z-6 animate-float">
          <div className="absolute inset-0 bg-blue-600 rounded-lg shadow-lg opacity-90 transform translate-z-0 border border-blue-300 flex flex-col gap-2 p-2">
            <div className="h-2 w-1/2 bg-blue-200/50 rounded"></div>
            <div className="h-2 w-full bg-blue-200/30 rounded"></div>
            <div className="h-2 w-full bg-blue-200/30 rounded"></div>
          </div>
          <div className="absolute inset-0 bg-blue-500 rounded-lg shadow-lg opacity-80 transform -translate-x-4 -translate-y-4 -translate-z-4 border border-blue-300"></div>
          <div className="absolute inset-0 bg-blue-400 rounded-lg shadow-lg opacity-70 transform -translate-x-8 -translate-y-8 -translate-z-8 border border-blue-300"></div>
        </div>
      )}

      {/* RADAR (Context) */}
      {variant === 'radar' && (
        <div className="relative w-32 h-32">
          {/* Globe base */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-700 rounded-full shadow-2xl opacity-90 flex items-center justify-center overflow-hidden border-2 border-indigo-300/30">
            <div className="w-full h-full opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent)]"></div>
          </div>
          {/* Pulsing Dots */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-red-400 rounded-full animate-[ping_1.5s_infinite]"></div>
          <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-red-400 rounded-full animate-[ping_2s_infinite]"></div>
        </div>
      )}

      {/* CLONES (Concept) */}
      {variant === 'clones' && (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-12 h-16 bg-gray-200 rounded-md border border-gray-300 shadow-md transform -translate-x-10 translate-y-2 rotate-[-10deg]"></div>
          <div className="absolute w-12 h-16 bg-gray-200 rounded-md border border-gray-300 shadow-md transform -translate-x-0 translate-y-0"></div>
          <div className="absolute w-12 h-16 bg-gray-200 rounded-md border border-gray-300 shadow-md transform translate-x-10 translate-y-2 rotate-[10deg]"></div>
          {/* Stamp */}
          <div className="absolute w-12 h-16 flex items-center justify-center z-10">
             <div className="w-8 h-8 rounded-full border-2 border-red-500 opacity-50"></div>
          </div>
        </div>
      )}

      {/* TARGET (Thesis) */}
      {variant === 'target' && (
        <div className="relative w-32 h-32 flex items-center justify-center animate-[pop-in_1s_ease-out]">
          <div className="absolute w-32 h-32 rounded-full border-4 border-red-500 bg-white shadow-xl"></div>
          <div className="absolute w-20 h-20 rounded-full border-4 border-red-500 bg-red-100"></div>
          <div className="absolute w-8 h-8 rounded-full bg-red-600"></div>
          {/* Arrow */}
          <div className="absolute w-24 h-1 bg-gray-800 transform rotate-45 -translate-x-8 -translate-y-8 origin-bottom-right shadow-2xl">
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-700 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* SCALE (BP1) */}
      {variant === 'scale' && (
        <div className="relative w-32 h-24 flex flex-col items-center justify-end animate-float">
          {/* Base */}
          <div className="w-2 h-16 bg-gray-400 rounded-full"></div>
          <div className="w-20 h-2 bg-gray-400 rounded-full absolute top-4 transform -rotate-12 transition-transform duration-[2s]"></div>
          {/* Pans */}
          <div className="absolute top-8 left-2 w-8 h-8 bg-yellow-400 rounded-full shadow-lg transform translate-y-4"></div>
          <div className="absolute top-2 right-2 w-8 h-8 border-2 border-gray-400 rounded-full bg-transparent transform -translate-y-4"></div>
        </div>
      )}

      {/* CRATE (Evidence) */}
      {variant === 'crate' && (
        <div className="relative w-24 h-24 transform rotate-x-12 rotate-y-12 animate-float">
          <div className="w-full h-full bg-amber-700 border-4 border-amber-800 grid grid-cols-3 grid-rows-3 gap-1 p-1 shadow-2xl">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-amber-900/30 rounded-sm"></div>
            ))}
          </div>
          <div className="absolute -right-4 top-4 w-4 h-full bg-amber-900 skew-y-12 origin-top-left"></div>
          <div className="absolute -top-4 left-4 w-full h-4 bg-amber-600 skew-x-12 origin-top-left"></div>
        </div>
      )}

      {/* COINS (Result) */}
      {variant === 'coins' && (
        <div className="relative w-20 h-32">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-12 h-12 rounded-full border-4 border-yellow-600 bg-yellow-400 shadow-md flex items-center justify-center text-yellow-800 font-bold"
              style={{ 
                bottom: `${i * 10}px`, 
                left: `${i % 2 === 0 ? 0 : 10}px`,
                animation: `float 3s infinite ${i * 0.2}s`
              }}
            >
              $
            </div>
          ))}
          <div className="absolute top-0 right-0 text-red-600 text-4xl font-black animate-bounce">↓</div>
        </div>
      )}

      {/* GRAY WASH (BP2) */}
      {variant === 'gray-wash' && (
        <div className="grid grid-cols-2 gap-2 w-24 h-24 transform rotate-12">
          <div className="bg-red-400 rounded-lg animate-[pulse_2s_infinite]"></div>
          <div className="bg-blue-400 rounded-lg animate-[pulse_2s_infinite_0.5s]"></div>
          <div className="bg-green-400 rounded-lg animate-[pulse_2s_infinite_1s]"></div>
          <div className="bg-yellow-400 rounded-lg animate-[pulse_2s_infinite_1.5s]"></div>
          <div className="absolute inset-0 bg-gray-500/50 backdrop-grayscale z-10 rounded-xl animate-[pop-in_3s_ease-in-out_infinite_alternate]"></div>
        </div>
      )}

      {/* DNA (Metaphor) */}
      {variant === 'dna' && (
        <div className="relative w-16 h-32 flex justify-center">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-full flex justify-between items-center"
              style={{ top: `${i * 12}px` }}
            >
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-[shimmer_1s_infinite_alternate]" style={{ animationDelay: `${i * 0.1}s` }}></div>
              <div className="h-0.5 bg-indigo-200 w-full mx-1"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-[shimmer_1s_infinite_alternate-reverse]" style={{ animationDelay: `${i * 0.1}s` }}></div>
            </div>
          ))}
        </div>
      )}

      {/* HUB (Social) */}
      {variant === 'hub' && (
        <div className="relative w-32 h-32 animate-[spin_10s_linear_infinite]">
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-8 h-8 bg-indigo-600 rounded-full shadow-lg z-10"></div>
          </div>
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <div 
              key={i}
              className="absolute top-1/2 left-1/2 w-12 h-0.5 bg-indigo-300 origin-left"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <div className="absolute right-0 -top-1.5 w-3 h-3 bg-indigo-400 rounded-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* GAVEL (Conclusion) */}
      {variant === 'gavel' && (
        <div className="relative w-32 h-32 flex items-center justify-center">
           {/* Handle */}
           <div className="w-2 h-24 bg-amber-800 transform rotate-[-45deg] translate-y-4 rounded shadow-lg"></div>
           {/* Head */}
           <div className="absolute w-20 h-10 bg-amber-900 rounded-md transform rotate-[-45deg] -translate-y-4 shadow-xl border-2 border-amber-700"></div>
           {/* Motion lines */}
           <div className="absolute -left-4 top-10 w-8 h-0.5 bg-gray-400 transform rotate-[-20deg]"></div>
           <div className="absolute -left-2 top-14 w-6 h-0.5 bg-gray-400 transform rotate-[-20deg]"></div>
        </div>
      )}

      {/* HORIZON (Future) */}
      {variant === 'horizon' && (
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-purple-200 bg-gray-900 shadow-2xl">
           <div className="absolute bottom-0 w-full h-1/2 bg-purple-900/50"></div>
           <div className="absolute bottom-0 left-0 right-0 h-px bg-purple-400 shadow-[0_0_10px_#a855f7]"></div>
           {/* Sun */}
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 bg-gradient-to-t from-yellow-300 to-purple-500 rounded-full blur-sm"></div>
           {/* Grid */}
           <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(0deg,transparent_48%,rgba(168,85,247,0.3)_50%,transparent_52%),linear-gradient(90deg,transparent_48%,rgba(168,85,247,0.3)_50%,transparent_52%)] bg-[length:20px_20px] transform perspective(200px) rotateX(60deg)"></div>
        </div>
      )}

    </div>
  );
};

export default LessonVisual;
