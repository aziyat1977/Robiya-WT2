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
  visualVariant?: VisualVariant; // New prop
  onVocabLearned?: () => void; // Callback for XP
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
  onVocabLearned
}) => {
  const [stage, setStage] = useState(animated ? 0 : 100);
  const [activeLang, setActiveLang] = useState<'ru' | 'uz' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    // Calculate rotation (max 5 degrees)
    const rotateX = (0.5 - y) * 10;
    const rotateY = (x - 0.5) * 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  useEffect(() => {
    if (!animated) {
      setStage(100);
      return;
    }
    setStage(0);
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let delay = 300;

    timeouts.push(setTimeout(() => setStage(1), delay)); // Header
    delay += 300;
    timeouts.push(setTimeout(() => setStage(2), delay)); // Label
    delay += 300;
    
    const contentArray = Array.isArray(content) ? content : [content];
    contentArray.forEach((_, index) => {
      timeouts.push(setTimeout(() => setStage(3 + index), delay));
      delay += 500; // Time to read
    });

    const vocabStart = 3 + contentArray.length;
    timeouts.push(setTimeout(() => setStage(vocabStart), delay));

    return () => timeouts.forEach(clearTimeout);
  }, [content, animated]);

  // Color Mapping for Themes
  const themeColors: Record<string, string> = {
    indigo: 'from-indigo-500 to-purple-600',
    red: 'from-rose-500 to-red-600',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-emerald-500 to-teal-600',
    yellow: 'from-amber-400 to-orange-500',
    purple: 'from-violet-500 to-fuchsia-600',
  };

  const accentColor = themeColors[theme] || themeColors.indigo;

  const renderContent = (text: string) => {
    if (!vocab.length) return renderMarkdown(text);
    
    let parts: (string | React.ReactNode)[] = [text];
    vocab.forEach((v, vIdx) => {
      const newParts: (string | React.ReactNode)[] = [];
      parts.forEach(part => {
        if (typeof part === 'string') {
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
                  accent={accentColor}
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
    <React.Fragment key={keyPrefix}>
      {text.split('**').map((part, i) => 
        i % 2 === 1 ? <strong key={i} className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${accentColor}`}>{part}</strong> : part
      )}
    </React.Fragment>
  );

  const contentArray = Array.isArray(content) ? content : [content];

  return (
    <div className="flex items-center justify-center py-2 perspective-container w-full h-full relative">
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full relative transition-transform duration-200 ease-out"
      >
        {/* Background Glow */}
        <div className={`absolute -inset-4 bg-gradient-to-r ${accentColor} opacity-20 blur-xl rounded-[2rem] transition-all duration-1000 ${stage > 0 ? 'scale-100' : 'scale-90'}`}></div>

        {/* Main Card */}
        <div className="relative glass-panel rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden bg-white/60 min-h-[60vh] md:min-h-[50vh] flex flex-col">
          
          {/* Decorative shapes */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${accentColor} opacity-10 rounded-bl-full transition-transform duration-1000 ${stage > 0 ? 'translate-x-0' : 'translate-x-full'}`} />

          {/* Translation Controls (Top Right) */}
          {vocab.length > 0 && (
            <div className="absolute top-4 left-4 md:left-auto md:right-4 flex gap-2 z-30">
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveLang(activeLang === 'ru' ? null : 'ru'); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold shadow-sm transition-all border border-white/50 ${activeLang === 'ru' ? 'bg-indigo-600 text-white scale-105' : 'bg-white/80 text-gray-600 hover:bg-white'}`}
              >
                Ru
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveLang(activeLang === 'uz' ? null : 'uz'); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold shadow-sm transition-all border border-white/50 ${activeLang === 'uz' ? 'bg-indigo-600 text-white scale-105' : 'bg-white/80 text-gray-600 hover:bg-white'}`}
              >
                Uz
              </button>
            </div>
          )}

          {/* Translation Pop-up Panel */}
          {activeLang && vocab.length > 0 && (
            <div className="absolute top-14 left-4 md:left-auto md:right-4 bg-white/95 p-5 rounded-2xl shadow-2xl z-40 w-64 backdrop-blur-xl border border-white/50 animate-pop-in">
              <h4 className="text-[10px] font-black uppercase text-gray-400 mb-3 tracking-widest border-b border-gray-100 pb-2">
                {activeLang === 'ru' ? 'Russian Translation' : 'Uzbek Translation'}
              </h4>
              <div className="space-y-3">
                {vocab.map((v, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-bold text-gray-800 text-sm">{v.term}</span>
                    <span className={`text-base font-serif font-medium leading-tight text-transparent bg-clip-text bg-gradient-to-r ${accentColor}`}>
                      {activeLang === 'ru' ? v.ru : v.uz}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HEADER SECTION WITH 3D VISUAL */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 mb-6 relative z-10">
             
             {/* Text Header */}
             <div className={`text-center md:text-left transition-all duration-700 transform flex-1 ${stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
               <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">{sectionTitle}</h3>
               <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight shimmer-text mb-3">
                 {sectionSubtitle || label}
               </h1>
               {/* Label Chip */}
               <div className={`inline-flex px-4 py-1.5 rounded-full bg-gradient-to-r ${accentColor} text-white font-bold shadow-md shadow-indigo-500/30 items-center gap-2 text-sm transition-all duration-700 delay-100 ${stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                 <span>✨</span>
                 {label}
               </div>
             </div>

             {/* 3D Visual Asset (Hidden on very small screens if needed, or scaled) */}
             {visualVariant && (
               <div className={`transition-all duration-1000 transform ${stage >= 1 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-12'}`}>
                  <LessonVisual variant={visualVariant} />
               </div>
             )}
          </div>

          {/* Content (Stage 3+) */}
          <div className="space-y-4 flex-grow flex flex-col justify-center">
            {contentArray.map((line, idx) => (
              <div 
                key={idx}
                className={`font-essay text-xl md:text-2xl leading-relaxed text-gray-800 transition-all duration-700 transform ${stage >= 3 + idx ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              >
                <div className="flex gap-4">
                  <div className={`w-1.5 min-h-full rounded-full bg-gradient-to-b ${accentColor} opacity-40 flex-shrink-0`}></div>
                  <p>{renderContent(line)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Vocab Prompt (Last Stage) */}
          {vocab.length > 0 && (
             <div className={`mt-auto pt-6 border-t border-gray-200/50 transition-all duration-1000 transform ${stage >= (3 + contentArray.length) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
               <p className="text-center text-gray-400 text-xs font-semibold uppercase tracking-widest animate-pulse">
                 Hover over highlighted words or click Ru/Uz for help
               </p>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Interactive Tooltip Component
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
      className="relative inline-block cursor-help mx-1 group"
    >
      <span className={`relative z-10 font-bold border-b-2 border-dashed border-gray-400 group-hover:border-transparent transition-colors duration-300 ${collected ? 'text-green-600' : 'text-gray-800'}`}>
        {term}
        <span className={`absolute inset-0 bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-20 rounded -z-10 transition-opacity`}></span>
      </span>
      
      {/* Tooltip Popup */}
      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 bg-gray-900 text-white p-3 rounded-xl shadow-2xl transition-all duration-300 pointer-events-none z-50 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="text-center">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Translation</div>
          <div className="font-bold text-base mb-1">{ru}</div>
          <div className="text-xs text-gray-300 italic">{uz}</div>
          {collected && <div className="mt-1 text-xs font-bold text-green-400 animate-bounce">+10 XP</div>}
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </span>
  );
};

export default FocusSlide;
