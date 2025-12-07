import React, { useState, useEffect, useRef } from 'react';
import LessonVisual, { VisualVariant } from './LessonVisual';

interface VocabItem {
  term: string;
  ru: string;
  uz: string;
}

interface FocusSlideProps {
  sectionTitle: string;
  sectionSubtitle?: string;
  label: string;
  content: string | string[];
  theme: string;
  vocab?: VocabItem[];
  animated?: boolean;
  visualVariant?: VisualVariant;
  videoUrl?: string;
  onVocabLearned?: () => void;
}

const FocusSlide: React.FC<FocusSlideProps> = ({ 
  sectionTitle, 
  sectionSubtitle, 
  label, 
  content, 
  theme,
  vocab = [],
  animated = false,
  visualVariant,
  videoUrl,
  onVocabLearned
}) => {
  const [stage, setStage] = useState(animated ? 0 : 100);
  const [activeLang, setActiveLang] = useState<'ru' | 'uz' | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  // CINEMATIC CURSOR TRACKING
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    setCursorPos({ x: (x / width) * 100, y: (y / height) * 100 });

    const rotateX = (0.5 - (y / height)) * 3;
    const rotateY = ((x / width) - 0.5) * 3;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.005, 1.005, 1.005)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setCursorPos({ x: 50, y: 50 });
  };

  useEffect(() => {
    if (!animated) {
      setStage(100);
      return;
    }
    setStage(0);
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let delay = 100;

    timeouts.push(setTimeout(() => setStage(1), delay)); // Header
    delay += 300;
    timeouts.push(setTimeout(() => setStage(2), delay)); // Label
    delay += 200;
    
    // Video delay
    if (videoUrl) {
      timeouts.push(setTimeout(() => setStage(2.5), delay));
      delay += 300;
    }
    
    const contentArray = Array.isArray(content) ? content : [content];
    contentArray.forEach((_, index) => {
      timeouts.push(setTimeout(() => setStage(3 + index), delay));
      delay += 300;
    });

    const vocabStart = 3 + contentArray.length;
    timeouts.push(setTimeout(() => setStage(vocabStart), delay));

    return () => timeouts.forEach(clearTimeout);
  }, [content, animated, videoUrl]);

  const themeColors: Record<string, string> = {
    indigo: 'from-indigo-500 via-purple-500 to-indigo-600',
    red: 'from-rose-500 via-red-500 to-orange-600',
    blue: 'from-blue-500 via-cyan-500 to-teal-500',
    green: 'from-emerald-500 via-green-500 to-lime-600',
    yellow: 'from-amber-400 via-orange-400 to-yellow-500',
    purple: 'from-violet-500 via-fuchsia-500 to-purple-600',
  };
  const accentGradient = themeColors[theme] || themeColors.indigo;

  const renderContent = (text: string) => {
    if (!vocab.length) return renderMarkdown(text);
    let parts: (string | React.ReactNode)[] = [text];
    
    vocab.forEach((v, vIdx) => {
      const newParts: (string | React.ReactNode)[] = [];
      parts.forEach(part => {
        if (typeof part === 'string') {
          // Use regex to keep delimiters
          const split = part.split(v.term);
          split.forEach((s, i) => {
            newParts.push(s);
            if (i < split.length - 1) {
              newParts.push(
                <VocabTooltip 
                  key={`${vIdx}-${i}`} 
                  term={v.term} 
                  ru={v.ru} 
                  uz={v.uz} 
                  accent={accentGradient}
                  onLearn={onVocabLearned}
                />
              );
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });
    return parts.map((p, i) => typeof p === 'string' ? renderMarkdown(p, i) : p);
  };

  const renderMarkdown = (text: string, keyPrefix: any = 'txt') => (
    <span key={keyPrefix} className="inline-block">
      {text.split(' ').map((word, i) => {
        // Handle punctuation attached to bold text (e.g., "**Word**.")
        const match = word.match(/(\*\*.*?\*\*)(.*)/);
        let content = word;
        let suffix = "";
        
        if (match) {
           content = match[1];
           suffix = match[2];
        }
        
        const isBold = content.includes('**');
        const cleanWord = content.replace(/\*\*/g, '');
        
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom mr-1.5">
             <span className={`inline-block word-animate ${isBold ? `font-black text-transparent bg-clip-text bg-gradient-to-r ${accentGradient}` : ''}`} style={{ animationDelay: `${i * 0.02}s` }}>
               {cleanWord}{suffix}
             </span>
          </span>
        );
      })}
    </span>
  );

  const contentArray = Array.isArray(content) ? content : [content];

  return (
    <div className="flex items-center justify-center py-1 perspective-container w-full h-full relative">
      
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
         <div className="god-rays"></div>
      </div>

      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full relative transition-transform duration-100 ease-out z-10 flex flex-col justify-center h-full max-h-full"
      >
        <div className={`absolute -inset-1 bg-gradient-to-r ${accentGradient} opacity-30 blur-2xl rounded-[2rem] transition-all duration-1000 ${stage > 0 ? 'scale-100' : 'scale-90'}`}></div>

        {/* MAIN GLASS CARD - HEIGHT FULL */}
        <div 
          className="relative glass-panel rounded-xl p-4 md:p-6 overflow-hidden flex flex-col h-full"
          style={{
            background: `
              radial-gradient(
                600px circle at ${cursorPos.x}% ${cursorPos.y}%, 
                rgba(255,255,255,0.15),
                transparent 40%
              ),
              rgba(255, 255, 255, 0.75)
            `
          }}
        >
          {/* HEADER SECTION - Compacted */}
          <div className="flex items-start justify-between gap-2 mb-2 relative z-10 flex-none">
             <div className="flex-1">
               <div className={`transition-all duration-700 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                  <h3 className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 mb-0.5">
                    {sectionTitle}
                  </h3>
               </div>
               
               <div className={`transition-all duration-700 delay-100 ${stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                 <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight shimmer-text">
                   {sectionSubtitle || label}
                 </h1>
               </div>
               
               <div className={`mt-1 inline-flex transition-all duration-500 delay-200 ${stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                 <div className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${accentGradient} text-white text-[10px] font-bold shadow-md flex items-center gap-1`}>
                   <span>✨</span> {label}
                 </div>
               </div>
             </div>

             {visualVariant && (
               <div className={`flex-none transform transition-all duration-1000 ${stage >= 1 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 translate-x-10'}`}>
                  <div className="scale-75 origin-top-right">
                    <LessonVisual variant={visualVariant} />
                  </div>
               </div>
             )}
          </div>

          {/* CONTENT SECTION - Spaced out */}
          <div className="flex-grow flex flex-col justify-center relative z-10 overflow-y-auto pr-1 overscroll-contain">
            
            {/* VIDEO PLAYER */}
            {videoUrl && (
              <div className={`w-full rounded-lg overflow-hidden shadow-lg mb-4 flex-none relative z-20 group transition-all duration-700 ${stage >= 2.5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <video 
                  src={videoUrl} 
                  controls 
                  autoPlay 
                  muted
                  playsInline
                  loop 
                  className="w-full h-auto max-h-[30vh] object-cover bg-black"
                />
              </div>
            )}

            <div className="space-y-2">
              {contentArray.map((line, idx) => (
                <div 
                  key={idx}
                  className={`font-essay text-base md:text-lg leading-relaxed text-gray-800 transition-opacity duration-500 ${stage >= 3 + idx ? 'opacity-100' : 'opacity-0'}`}
                >
                  {stage >= 3 + idx && (
                    <div className="flex gap-3 group">
                      <div className={`w-0.5 mt-1.5 rounded-full bg-gradient-to-b ${accentGradient} opacity-30 h-full min-h-[1.5em]`}></div>
                      <div>{renderContent(line)}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER AREA */}
          <div className={`flex-none mt-2 pt-2 border-t border-gray-200/50 flex justify-between items-center transition-all duration-1000 ${stage >= (3 + contentArray.length) ? 'opacity-100' : 'opacity-0'}`}>
             <p className="text-gray-400 text-[9px] font-bold uppercase tracking-[0.2em] animate-pulse">
               Interact with keywords
             </p>

             {/* Translation UI */}
             {vocab.length > 0 && (
                <div className="relative z-30">
                  <div className="flex gap-2">
                    {['ru', 'uz'].map((lang) => (
                      <button 
                        key={lang}
                        onClick={(e) => { e.stopPropagation(); setActiveLang(activeLang === lang ? null : lang as 'ru' | 'uz'); }}
                        className={`
                          px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm transition-all
                          ${activeLang === lang 
                            ? `bg-gradient-to-r ${accentGradient} text-white` 
                            : 'bg-white/80 text-gray-500 hover:bg-gray-100'
                          }
                        `}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  
                  {/* Translation Panel Popup */}
                  {activeLang && (
                    <div className="absolute bottom-full right-0 mb-3 bg-white/95 p-4 rounded-xl shadow-2xl z-40 w-56 backdrop-blur-xl border border-white/60 animate-pop-in origin-bottom-right">
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {vocab.map((v, i) => (
                          <div key={i}>
                            <span className="font-bold text-gray-900 text-sm block mb-0.5">{v.term}</span>
                            <span className={`text-sm block font-essay text-transparent bg-clip-text bg-gradient-to-r ${accentGradient}`}>
                              {activeLang === 'ru' ? v.ru : v.uz}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const VocabTooltip: React.FC<{term: string, ru: string, uz: string, accent: string, onLearn?: () => void}> = ({term, ru, uz, accent, onLearn}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [collected, setCollected] = useState(false);

  const handleEnter = () => {
    setIsHovered(true);
    if (!collected && onLearn) {
      setCollected(true);
      onLearn();
    }
  };

  return (
    <span 
      onMouseEnter={handleEnter}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-block cursor-help mx-0.5 group align-baseline"
    >
      <span 
        className={`relative z-10 font-bold border-b-2 border-dashed border-gray-300 group-hover:border-transparent transition-all duration-300 px-0.5 rounded ${collected ? 'text-emerald-700 bg-emerald-50/50' : 'text-gray-900'}`}
      >
        {term}
        <span className={`absolute inset-0 bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-10 rounded -z-10 transition-opacity`}></span>
      </span>
      
      {/* TOOLTIP */}
      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 bg-gray-900/95 text-white p-3 rounded-xl shadow-2xl backdrop-blur-md pointer-events-none z-50 ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}>
        <div className="text-center">
          <div className="font-bold text-sm mb-1 diamond-text">{term}</div>
          <div className="h-px w-full bg-white/20 my-2"></div>
          <div className="text-xs space-y-1.5">
             <div className="flex justify-between"><span className="text-gray-400">RU</span> <span>{ru}</span></div>
             <div className="flex justify-between"><span className="text-gray-400">UZ</span> <span>{uz}</span></div>
          </div>
        </div>
      </div>
    </span>
  );
};

export default FocusSlide;