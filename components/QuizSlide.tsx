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
      const t2 = setTimeout(() => setStage(2), 500);
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
      // Trigger Confetti
      setConfetti(Array.from({ length: 20 }, (_, i) => i));
    } else {
      // Trigger Shake
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    if (onAnswer) onAnswer(isCorrect);
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
      
      {/* Confetti Container */}
      {confetti.map((i) => (
        <div 
          key={i}
          className="confetti-piece"
          style={{
            left: `${50 + (Math.random() * 40 - 20)}%`,
            top: '20%',
            backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4'][Math.floor(Math.random() * 3)],
            transform: `rotate(${Math.random() * 360}deg)`,
            animationDelay: `${Math.random() * 0.5}s`
          }}
        />
      ))}

      {/* Main Game Card */}
      <div className={`glass-panel rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-700 bg-white/70 ${stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-lg">
              🧠
            </span>
            <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">Knowledge Check</span>
          </div>
          <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-500 animate-[liquid-fill_2s_infinite]"></div>
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-snug">
          {question}
        </h2>

        {/* Options Grid */}
        <div className={`grid grid-cols-1 gap-3 transition-all duration-700 delay-200 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {options.map((option, idx) => {
            let stateStyle = "bg-white border-gray-200 hover:border-indigo-400 hover:shadow-lg hover:-translate-y-0.5";
            if (hasSubmitted) {
              if (idx === correctAnswer) stateStyle = "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 shadow-emerald-100";
              else if (selected === idx) stateStyle = "bg-rose-50 border-rose-500 ring-2 ring-rose-200 opacity-60";
              else stateStyle = "bg-gray-50 border-gray-100 opacity-40 grayscale";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={hasSubmitted}
                className={`group relative w-full p-4 text-left rounded-xl border transition-all duration-200 ${stateStyle}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                    hasSubmitted && idx === correctAnswer ? 'bg-emerald-500 text-white' : 
                    hasSubmitted && selected === idx ? 'bg-rose-500 text-white' :
                    'bg-gray-100 text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-base font-medium text-gray-800">{option}</span>
                  
                  {/* Result Icon */}
                  {hasSubmitted && idx === correctAnswer && (
                    <span className="ml-auto text-xl animate-pop-in">✅</span>
                  )}
                  {hasSubmitted && selected === idx && idx !== correctAnswer && (
                    <span className="ml-auto text-xl animate-pop-in">❌</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation / Feedback - Overlay or Insert */}
        {hasSubmitted && (
          <div className="mt-6 overflow-hidden rounded-xl animate-pop-in">
            <div className={`p-4 ${selected === correctAnswer ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-rose-500 to-orange-500'} text-white shadow-lg`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl filter drop-shadow-md">
                  {selected === correctAnswer ? '🎉' : '🤔'}
                </div>
                <div>
                  <h3 className="text-sm font-black mb-1 uppercase tracking-wide">
                    {selected === correctAnswer ? 'Brilliant!' : 'Not quite right'}
                  </h3>
                  <p className="text-white/95 font-essay text-base leading-relaxed">
                    {explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* CSS for Shake Animation injected locally for this component scope */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
};

export default QuizSlide;