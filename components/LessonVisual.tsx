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
  | 'horizon'
  | 'city'        // Lesson 2
  | 'smog'        // Lesson 2
  | 'chip'        // Lesson 2
  | 'plant';      // Lesson 2

interface LessonVisualProps {
  variant: VisualVariant;
}

// Helper for "Rim Light" style shadows
const shading = "inset 2px 2px 5px rgba(255,255,255,0.3), inset -3px -3px 7px rgba(0,0,0,0.2), 5px 10px 15px rgba(0,0,0,0.2)";

const LessonVisual: React.FC<LessonVisualProps> = ({ variant }) => {
  return (
    <div className="w-24 h-24 md:w-32 md:h-32 relative perspective-container flex items-center justify-center pointer-events-none select-none">
      
      {/* --- LESSON 1 VISUALS --- */}
      
      {variant === 'coffee-cup' && (
        <div className="relative animate-[float_6s_ease-in-out_infinite] scale-75">
          <div 
            className="w-20 h-24 rounded-b-[1.5rem] relative overflow-hidden transform rotate-x-12"
            style={{ 
              background: 'linear-gradient(135deg, #78350f, #451a03)',
              boxShadow: shading
            }}
          >
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full blur-[1px]"></div>
          </div>
          <div 
            className="absolute top-3 -right-5 w-10 h-14 border-6 border-[#5e2506] rounded-r-xl border-l-0 shadow-lg"
            style={{ zIndex: -1 }}
          ></div>
          <div className="absolute -top-10 left-5 w-2 h-8 bg-white/20 blur-md rounded-full animate-[float-particle_3s_ease-out_infinite]"></div>
          <div className="absolute -top-6 left-10 w-1.5 h-6 bg-white/20 blur-md rounded-full animate-[float-particle_3s_ease-out_infinite_1s]"></div>
        </div>
      )}

      {variant === 'blueprint' && (
        <div className="relative w-24 h-32 transform rotate-y-12 rotate-z-6 animate-[float_7s_ease-in-out_infinite] scale-75">
          <div className="absolute inset-0 bg-blue-600/80 rounded-lg border border-blue-300/50 backdrop-blur-sm shadow-[0_0_30px_rgba(37,99,235,0.3)] flex flex-col p-2 gap-1.5">
             <div className="h-1.5 w-1/2 bg-white/40 rounded"></div>
             <div className="h-px w-full bg-white/20"></div>
             <div className="flex-1 border border-dashed border-white/20 rounded"></div>
          </div>
          <div className="absolute inset-0 bg-blue-500/30 rounded-lg transform -translate-x-4 -translate-y-4 -translate-z-10 border border-blue-300/20"></div>
          <div className="absolute top-0 right-0 w-4 h-px bg-white/30 origin-right rotate-[45deg]"></div>
        </div>
      )}

      {variant === 'radar' && (
        <div className="relative w-28 h-28 scale-75">
          <div 
            className="absolute inset-0 rounded-full border border-indigo-400/30 bg-indigo-900/20 shadow-[inset_0_0_20px_rgba(99,102,241,0.2)] overflow-hidden flex items-center justify-center"
            style={{ backdropFilter: 'blur(2px)' }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.2)_1px,transparent_1px)] bg-[size:15px_15px]"></div>
            <div className="absolute w-1/2 h-full top-0 left-1/2 bg-gradient-to-l from-indigo-500/50 to-transparent origin-left animate-[spin_3s_linear_infinite]"></div>
          </div>
          <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444] animate-ping"></div>
          <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444] animate-[ping_2s_infinite]"></div>
        </div>
      )}

      {variant === 'clones' && (
        <div className="relative w-full h-full flex items-center justify-center scale-75">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className="absolute w-12 h-16 rounded-lg border border-gray-400/50 flex flex-col items-center justify-center shadow-xl backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, #e5e7eb, #9ca3af)',
                transform: `translateX(${(i-1)*30}px) translateY(${(i-1)*8}px) translateZ(${i*10}px)`,
                zIndex: i,
                boxShadow: shading
              }}
            >
               <div className="w-6 h-6 rounded-full bg-gray-300 shadow-inner mb-1.5"></div>
               <div className="w-6 h-1 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      )}

      {variant === 'target' && (
        <div className="relative w-28 h-28 flex items-center justify-center scale-75">
          <div className="absolute inset-0 rounded-full border-[10px] border-red-500 bg-white shadow-[0_8px_16px_rgba(0,0,0,0.2)]" style={{ transform: 'rotateX(30deg)' }}></div>
          <div className="absolute w-16 h-16 rounded-full border-[10px] border-red-500 bg-white shadow-inner" style={{ transform: 'rotateX(30deg) translateZ(8px)' }}></div>
          <div className="absolute w-4 h-4 rounded-full bg-red-600 shadow-lg" style={{ transform: 'rotateX(30deg) translateZ(16px)' }}></div>
          <div 
            className="absolute w-24 h-1 bg-gray-800 shadow-xl"
            style={{ 
              transform: 'rotate(45deg) rotateY(10deg) translateZ(40px)',
              top: '40%',
              left: '-10%'
            }}
          >
             <div className="absolute right-0 w-3 h-3 bg-gray-800 rotate-45 -top-1"></div>
          </div>
        </div>
      )}

      {variant === 'scale' && (
        <div className="relative w-28 h-28 flex items-center justify-center animate-[float_5s_ease-in-out_infinite] scale-75">
          <div className="w-2.5 h-20 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full shadow-lg"></div>
          <div 
            className="absolute top-6 w-24 h-1.5 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full transition-transform duration-[3s] ease-in-out"
            style={{ transform: 'rotate(-15deg)' }}
          ></div>
          <div 
            className="absolute left-1 top-6 w-8 h-8 rounded-full shadow-lg border border-gray-400"
            style={{ 
              background: 'radial-gradient(circle at 30% 30%, #fcd34d, #d97706)', 
              transform: 'translateY(25px)',
              boxShadow: 'inset 1.5px 1.5px 4px rgba(255,255,255,0.4), 0 4px 8px rgba(0,0,0,0.3)'
            }}
          ></div>
          <div 
            className="absolute right-1 top-6 w-8 h-8 rounded-full border-2 border-gray-400 bg-white/20 backdrop-blur-sm transform -translate-y-8"
          ></div>
        </div>
      )}

      {variant === 'crate' && (
        <div className="relative w-24 h-24 transform rotate-x-12 rotate-y-[-12deg] animate-[float_6s_ease-in-out_infinite] scale-75">
          <div className="w-full h-full bg-[#78350f] border-4 border-[#451a03] grid grid-cols-2 grid-rows-2 gap-0.5 p-0.5 shadow-[8px_8px_25px_rgba(0,0,0,0.4)]">
            <div className="bg-[#92400e] shadow-inner"></div>
            <div className="bg-[#92400e] shadow-inner"></div>
            <div className="bg-[#92400e] shadow-inner"></div>
            <div className="bg-[#92400e] shadow-inner"></div>
          </div>
          <div className="absolute -right-3 top-1.5 w-3 h-full bg-[#451a03] skew-y-[45deg] origin-top-left"></div>
          <div className="absolute -top-3 left-3 w-full h-3 bg-[#b45309] skew-x-[45deg] origin-top-left"></div>
        </div>
      )}

      {variant === 'coins' && (
        <div className="relative w-20 h-28 scale-75">
          {[0, 1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className="absolute w-10 h-10 rounded-full border border-yellow-300 flex items-center justify-center font-bold text-yellow-900 shadow-lg"
              style={{ 
                background: 'radial-gradient(circle at 30% 30%, #fde047, #ca8a04)',
                bottom: `${i * 10}px`, 
                left: `${(i%2)*8}px`,
                transform: `scaleY(0.5) translateY(${i*1.5}px)`,
                zIndex: i
              }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-yellow-200/50"></div>
              $
            </div>
          ))}
          <div className="absolute top-0 right-0 text-red-500 text-4xl font-black filter drop-shadow-md animate-bounce">↓</div>
        </div>
      )}

      {variant === 'gray-wash' && (
        <div className="grid grid-cols-2 gap-1.5 w-24 h-24 transform rotate-6 scale-75">
          {['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'].map((color, i) => (
            <div key={i} className={`rounded-lg shadow-md ${color} animate-pulse`}></div>
          ))}
          <div 
            className="absolute inset-0 bg-gray-500/80 backdrop-grayscale z-10 rounded-xl border border-white/20 shadow-xl"
            style={{ animation: 'pop-in 4s ease-in-out infinite alternate' }}
          ></div>
        </div>
      )}

      {variant === 'dna' && (
        <div className="relative w-16 h-32 flex justify-center perspective-[500px] scale-75">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-full flex justify-between items-center"
              style={{ top: `${i * 12}px`, transform: `rotateY(${i*20}deg)` }}
            >
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_8px_#6366f1]"></div>
              <div className="h-0.5 bg-indigo-300/50 w-full mx-0.5"></div>
              <div className="w-2.5 h-2.5 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]"></div>
            </div>
          ))}
        </div>
      )}

      {variant === 'hub' && (
        <div className="relative w-28 h-28 animate-[spin_20s_linear_infinite] scale-75">
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-8 h-8 bg-indigo-600 rounded-full shadow-[0_0_16px_#4f46e5] z-10 border-2 border-white/20"></div>
          </div>
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <div 
              key={i}
              className="absolute top-1/2 left-1/2 w-12 h-px bg-gradient-to-r from-indigo-400 to-transparent origin-left"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <div className="absolute right-0 -top-1 w-2.5 h-2.5 bg-indigo-400 rounded-full shadow-sm"></div>
            </div>
          ))}
        </div>
      )}

      {variant === 'gavel' && (
        <div className="relative w-28 h-28 flex items-center justify-center scale-75">
           <div className="w-2.5 h-24 bg-gradient-to-r from-amber-800 to-amber-950 transform rotate-[-45deg] translate-y-5 rounded-full shadow-lg"></div>
           <div 
             className="absolute w-20 h-10 bg-gradient-to-b from-amber-800 to-amber-950 rounded-lg transform rotate-[-45deg] -translate-y-5 shadow-2xl border-x-4 border-yellow-600/50"
             style={{ boxShadow: shading }}
           ></div>
           <div className="absolute -left-1 top-10 w-8 h-1 bg-gray-400/50 blur-sm transform rotate-[-20deg]"></div>
        </div>
      )}

      {variant === 'horizon' && (
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-purple-900 bg-[#1a0b2e] shadow-[0_0_25px_rgba(88,28,135,0.5)] scale-75">
           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-t from-yellow-300 to-pink-500 rounded-full blur-[1.5px]"></div>
           <div 
             className="absolute bottom-0 w-full h-1/2"
             style={{ 
               background: 'linear-gradient(transparent 95%, #a855f7 95%)',
               backgroundSize: '100% 8px',
               transform: 'perspective(80px) rotateX(45deg) scale(1.5)'
             }}
           ></div>
           <div className="absolute bottom-1/3 left-0 w-full h-6 bg-[#1a0b2e]" style={{ clipPath: 'polygon(0% 100%, 20% 0%, 50% 100%, 80% 20%, 100% 100%)' }}></div>
        </div>
      )}

      {/* --- LESSON 2 VISUALS --- */}

      {/* CITY (Intro/Context) - Skyscrapers */}
      {variant === 'city' && (
        <div className="relative w-28 h-28 flex items-end justify-center pb-2 scale-75">
           {/* Building 1 */}
           <div className="w-6 h-16 bg-blue-900 mx-0.5 rounded-t shadow-lg relative z-10">
             <div className="w-full h-full grid grid-cols-2 gap-0.5 p-0.5">
               {[...Array(8)].map((_,i) => <div key={i} className="bg-yellow-100/50 w-full h-1 rounded-[1px]"></div>)}
             </div>
           </div>
           {/* Building 2 */}
           <div className="w-8 h-24 bg-indigo-900 mx-0.5 rounded-t-lg shadow-xl relative z-20 -ml-2">
             <div className="w-full h-full grid grid-cols-3 gap-0.5 p-0.5">
               {[...Array(12)].map((_,i) => <div key={i} className="bg-blue-200/50 w-full h-1.5 rounded-[1px] animate-pulse" style={{ animationDelay: `${i*0.2}s` }}></div>)}
             </div>
           </div>
           {/* Building 3 */}
           <div className="w-5 h-12 bg-purple-900 mx-0.5 rounded-t shadow-md relative z-10 -ml-2"></div>
           {/* Cloud */}
           <div className="absolute top-2 right-0 w-12 h-6 bg-white/10 blur-md rounded-full"></div>
        </div>
      )}

      {/* SMOG (Threat) - Toxic Cloud */}
      {variant === 'smog' && (
        <div className="relative w-28 h-28 flex items-center justify-center scale-75">
           <div className="absolute w-20 h-20 bg-gray-600 rounded-full blur-xl opacity-60 animate-pulse"></div>
           <div className="absolute w-16 h-16 bg-amber-900/40 rounded-full blur-lg top-2 left-2 animate-[float_4s_infinite]"></div>
           <div className="text-4xl relative z-10 filter drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">⚠️</div>
           {/* Particles */}
           {[...Array(5)].map((_,i) => (
             <div key={i} className="absolute w-1 h-1 bg-gray-400 rounded-full animate-[float-particle_3s_linear_infinite]" style={{ left: `${Math.random()*100}%`, animationDelay: `${i}s` }}></div>
           ))}
        </div>
      )}

      {/* CHIP (Tech) - Circuit Board */}
      {variant === 'chip' && (
        <div className="relative w-24 h-24 bg-emerald-900 rounded-lg border-2 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center overflow-hidden scale-75">
           {/* Circuit Lines */}
           <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,rgba(16,185,129,0.2)_50%,transparent_55%)] bg-[size:10px_10px]"></div>
           {/* Core */}
           <div className="w-10 h-10 bg-black border border-emerald-400 flex items-center justify-center shadow-inner relative z-10">
             <div className="w-1 h-1 bg-emerald-400 rounded-full animate-ping"></div>
           </div>
           {/* Traces */}
           <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-emerald-500"></div>
           <div className="absolute bottom-0 left-1/2 w-0.5 h-6 bg-emerald-500"></div>
           <div className="absolute left-0 top-1/2 w-6 h-0.5 bg-emerald-500"></div>
           <div className="absolute right-0 top-1/2 w-6 h-0.5 bg-emerald-500"></div>
        </div>
      )}

      {/* PLANT (Sustainability) - Vertical Farm */}
      {variant === 'plant' && (
        <div className="relative w-24 h-32 flex items-end justify-center scale-75">
           <div className="w-16 h-24 bg-blue-50/10 border border-white/20 rounded-lg backdrop-blur-sm relative overflow-hidden flex flex-col justify-end p-2 gap-2 shadow-xl">
             <div className="w-full h-2 bg-green-500/80 rounded shadow-[0_0_10px_#22c55e]"></div>
             <div className="w-full h-2 bg-green-500/80 rounded shadow-[0_0_10px_#22c55e]"></div>
             <div className="w-full h-2 bg-green-500/80 rounded shadow-[0_0_10px_#22c55e]"></div>
           </div>
           {/* Leaf */}
           <div className="absolute -top-2 right-2 text-3xl filter drop-shadow-lg animate-[float_3s_ease-in-out_infinite]">🌱</div>
        </div>
      )}

    </div>
  );
};

export default LessonVisual;