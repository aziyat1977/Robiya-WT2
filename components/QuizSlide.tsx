import React, { useState, useEffect } from 'react';

interface QuizSlideProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  onAnswer?: (isCorrect: boolean) => void;
  animated?: boolean;
}

const QuizSlide: React.FC<QuizSlideProps> = ({ 
  question, 
  options, 
  correctAnswer, 
  explanation,
  onAnswer,
  animated = false
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [shake, setShake] = useState(false);
  const [confetti, setConfetti] = useState<number[]>([]);
  const [stage, setStage] = useState(animated ? 0 : 100);

  useEffect(() => {
    if (animated) {
      setStage(0);
      const t1 = setTimeout(() => setStage(1), 200);
      const t2 = setTimeout(() => setStage(2), 400);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      setStage(100);
    }
  }, [question, animated]);

  const handleSelect = (index: number) => {
    if (hasSubmitted) return;
    
    setSelected(index);
    setHasSubmitted(true);
    const isCorrect = index === correctAnswer;

    if (isCorrect) {
      setConfetti(Array.from({ length: 30 }, (_, i) => i));
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    if (onAnswer) onAnswer(isCorrect);
  };

  return (
    <div className={`relative w-full max-w-lg mx-auto h-full flex flex-col justify-center ${shake ? 'animate-[shake_0.4s_cubic-bezier(.36,.07,.19,.97)_both]' : ''}`}>
      
      {confetti.map((i) => (
        <div 
          key={i}
          className="particle"
          style={{
            left: `${50 + (Math.random() * 60 - 30)}%`,
            top: '40%',
            width: `${Math.random() * 6 + 3}px`,
            height: `${Math.random() * 6 + 3}px`,
            backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#A855F7'][Math.floor(Math.random() * 4)],
            animation: `confetti ${1 + Math.random()}s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}

      {/* Main Container - HEIGHT FULL */}
      <div className={`glass-panel rounded-2xl p-4 md:p-6 shadow-2xl transition-all duration-700 bg-white/80 backdrop-blur-xl border border-white/60 flex flex-col h-full overflow-y-auto ${stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        
        {/* HEADER */}
        <div className="flex-none flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow text-white font-bold text-sm">
              ?
            </div>
            <div>
              <span className="text-[9px] font-black tracking-[0.2em] text-gray-400 uppercase block">Challenge</span>
              <span className="text-sm font-bold text-gray-800">Knowledge Check</span>
            </div>
          </div>
          <div className="h-1.5 w-20 bg-gray-100 rounded-full overflow-hidden shadow-inner">
             <div className="h-full bg-indigo-500 rounded-full animate-[liquid-fill_3s_infinite_alternate] w-full origin-left"></div>
          </div>
        </div>

        {/* QUESTION */}
        <div className="flex-grow flex items-center mb-3">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
            {question}
          </h2>
        </div>

        {/* OPTIONS GRID */}
        <div className={`flex-shrink-0 grid grid-cols-1 gap-2 transition-all duration-700 delay-200 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {options.map((option, idx) => {
            let stateClass = "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5"; 
            let icon = String.fromCharCode(65 + idx);
            
            if (hasSubmitted) {
              if (idx === correctAnswer) {
                stateClass = "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-200 shadow-emerald-100";
                icon = "✓";
              } else if (selected === idx) {
                stateClass = "bg-rose-50 border-rose-500 ring-1 ring-rose-200 opacity-80";
                icon = "✕";
              } else {
                stateClass = "bg-gray-50 border-gray-100 opacity-50 grayscale";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={hasSubmitted}
                className={`group relative w-full p-3 text-left rounded-xl border transition-all duration-200 active:scale-95 ${stateClass}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black transition-colors shadow-sm ${
                    hasSubmitted && idx === correctAnswer ? 'bg-emerald-500 text-white' : 
                    hasSubmitted && selected === idx ? 'bg-rose-500 text-white' :
                    'bg-gray-100 text-gray-500 group-hover:bg-indigo-600 group-hover:text-white'
                  }`}>
                    {icon}
                  </div>
                  <span className="text-sm md:text-base font-medium text-gray-800 leading-snug">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* FEEDBACK REVEAL */}
        {hasSubmitted && (
          <div className="flex-none mt-4 overflow-hidden rounded-xl animate-[pop-in_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]">
            <div className={`p-3 ${selected === correctAnswer ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-rose-500 to-orange-600'} text-white shadow-xl relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:10px_10px]"></div>
              <div className="flex items-start gap-3 relative z-10">
                <div className="text-xl filter drop-shadow-md animate-bounce">
                  {selected === correctAnswer ? '🌟' : '💡'}
                </div>
                <div>
                  <h3 className="text-[10px] font-black mb-0.5 uppercase tracking-widest opacity-80">
                    {selected === correctAnswer ? 'Correct' : 'Insight'}
                  </h3>
                  <p className="font-essay text-sm leading-snug text-white">
                    {explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default QuizSlide;