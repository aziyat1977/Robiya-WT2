import React from 'react';

export type BackgroundVariant = 
  | 'cafe-ambience'     // Warm, steam, beans, cozy
  | 'corporate-grid'    // Blueprint, cold, structured, lines
  | 'global-network'    // Map, nodes, connecting lines
  | 'economic-machine'  // Industrial, falling coins, heavy
  | 'cultural-pattern'  // Organic, paisley/mandala, soft
  | 'homogenized-wall'  // Repeating patterns, uniform, boring
  | 'future-horizon';   // Purple, neon, forward-looking

interface LessonBackgroundProps {
  variant?: BackgroundVariant;
  theme?: string;
}

const LessonBackground: React.FC<LessonBackgroundProps> = ({ variant = 'cafe-ambience', theme }) => {
  
  // -- SHARED OVERLAYS --
  const NoiseOverlay = () => (
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
    ></div>
  );

  const Vignette = () => (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-40"></div>
  );

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-1000 ease-in-out">
      <NoiseOverlay />
      <Vignette />

      {/* --- 1. CAFE AMBIENCE (Warm, Organic) --- */}
      {variant === 'cafe-ambience' && (
        <div className="absolute inset-0 bg-[#2C1A1D]">
          {/* Warm Spotlights */}
          <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-orange-500/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-amber-700/20 rounded-full blur-[100px]"></div>
          
          {/* Floating Coffee Beans (SVG) */}
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute opacity-10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${10 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              <svg width="60" height="60" viewBox="0 0 100 100" fill="#4A3B32" style={{ transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random()})` }}>
                <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28 90 10 72 10 50S28 10 50 10s40 18 40 40-18 40-40 40z"/>
                <path d="M50 15c-2 0-4 15-4 35s2 35 4 35 4-15 4-35-2-35-4-35z" fill="#3E2F28"/>
              </svg>
            </div>
          ))}
          
          {/* Rising Steam */}
          <div className="absolute bottom-0 left-1/2 w-40 h-full bg-gradient-to-t from-white/5 to-transparent blur-xl transform -translate-x-1/2 skew-x-12 origin-bottom animate-[shimmer_8s_infinite]"></div>
        </div>
      )}

      {/* --- 2. CORPORATE GRID (Blueprint, Structured) --- */}
      {variant === 'corporate-grid' && (
        <div className="absolute inset-0 bg-[#0F172A]">
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{ 
              backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', 
              backgroundSize: '40px 40px',
              transform: 'perspective(500px) rotateX(20deg) scale(1.5)',
              transformOrigin: 'top center'
            }}
          ></div>
          
          {/* Moving Blueprint Lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-blue-400/50 shadow-[0_0_10px_#60a5fa] animate-[scan_5s_linear_infinite]"></div>
          
          {/* Floating Geometric Cubes */}
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="absolute border border-blue-500/30 w-20 h-20 opacity-20 animate-[spin_20s_linear_infinite]"
              style={{
                top: `${20 + i * 30}%`,
                left: `${10 + i * 30}%`,
                animationDuration: `${15 + i * 5}s`
              }}
            ></div>
          ))}
        </div>
      )}

      {/* --- 3. GLOBAL NETWORK (Map, Expansion) --- */}
      {variant === 'global-network' && (
        <div className="absolute inset-0 bg-[#022c22]"> {/* Dark Green base for Starbucks vibe */}
          {/* World Map Dots */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4ade80 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          {/* Expanding Nodes */}
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full border border-green-400/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"
              style={{
                width: '100px',
                height: '100px',
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${i * 0.5}s`
              }}
            ></div>
          ))}
          
          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="#4ade80" strokeWidth="1" strokeDasharray="5,5" />
            <line x1="80%" y1="10%" x2="20%" y2="90%" stroke="#4ade80" strokeWidth="1" strokeDasharray="5,5" />
          </svg>
        </div>
      )}

      {/* --- 4. ECONOMIC MACHINE (Industrial, Red) --- */}
      {variant === 'economic-machine' && (
        <div className="absolute inset-0 bg-[#450a0a]">
          {/* Heavy Machinery Gears Background */}
          <div className="absolute -right-20 -top-20 w-[600px] h-[600px] border-[40px] border-dashed border-red-900/30 rounded-full animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute -left-20 -bottom-20 w-[500px] h-[500px] border-[30px] border-dashed border-red-900/30 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
          
          {/* Falling Coins/Gold dust */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-yellow-500/40 rounded-full blur-[1px]"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                top: `-10px`,
                left: `${Math.random() * 100}%`,
                animation: `rain ${3 + Math.random()}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      )}

      {/* --- 5. CULTURAL PATTERN (Organic, Diversity) --- */}
      {variant === 'cultural-pattern' && (
        <div className="absolute inset-0 bg-[#3f6212]">
          {/* Mandala / Paisley Overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{ 
              backgroundImage: `radial-gradient(circle at center, transparent 0%, #3f6212 100%), repeating-conic-gradient(#3f6212 0 15deg, #65a30d 15deg 30deg)`
            }}
          ></div>
          
          {/* Slow Organic Pulse */}
          <div className="absolute inset-0 bg-gradient-to-tr from-green-900/50 to-transparent mix-blend-multiply animate-pulse"></div>
          
          {/* Floating Cultural Symbols (Abstract) */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl animate-[float_8s_infinite]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-orange-500/20 rounded-full blur-2xl animate-[float_9s_infinite_reverse]"></div>
        </div>
      )}

      {/* --- 6. HOMOGENIZED WALL (Uniform, Boring) --- */}
      {variant === 'homogenized-wall' && (
        <div className="absolute inset-0 bg-[#737373]">
          {/* Repeating identical pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{ 
              backgroundImage: 'linear-gradient(45deg, #525252 25%, transparent 25%, transparent 75%, #525252 75%, #525252), linear-gradient(45deg, #525252 25%, transparent 25%, transparent 75%, #525252 75%, #525252)',
              backgroundPosition: '0 0, 10px 10px',
              backgroundSize: '20px 20px'
            }}
          ></div>
          {/* Fog overlay (fading out culture) */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-400/20 to-gray-800/80"></div>
        </div>
      )}

      {/* --- 7. FUTURE HORIZON (Purple, Space) --- */}
      {variant === 'future-horizon' && (
        <div className="absolute inset-0 bg-[#1e1b4b]">
          {/* Cyber Grid Floor */}
          <div 
            className="absolute bottom-0 w-full h-[50%]"
            style={{
              background: 'linear-gradient(transparent 0%, #8b5cf6 100%)',
              opacity: 0.2,
              transform: 'perspective(200px) rotateX(45deg) scale(2)'
            }}
          ></div>
          
          {/* Horizon Line Glow */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-fuchsia-500 shadow-[0_0_50px_#d946ef]"></div>
          
          {/* Stars */}
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: Math.random() > 0.9 ? '3px' : '1px',
                height: Math.random() > 0.9 ? '3px' : '1px',
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${1 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      )}

    </div>
  );
};

export default LessonBackground;
