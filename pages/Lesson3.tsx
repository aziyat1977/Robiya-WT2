import React, { useState, useEffect, useRef } from 'react';
import FocusSlide from '../components/FocusSlide';
import QuizSlide from '../components/QuizSlide';
import { VisualVariant } from '../components/LessonVisual';

// -- Types --
type StepType = 'content' | 'quiz';

interface VocabItem {
  term: string;
  ru: string;
  uz: string;
}

interface LessonStep {
  type: StepType;
  sectionTitle?: string;
  sectionSubtitle?: string;
  label?: string;
  content?: string | string[];
  theme?: string;
  vocab?: VocabItem[];
  visualVariant?: VisualVariant;
  question?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
}

// -- Lesson Data Construction --
const buildSteps = (): LessonStep[] => {
  const steps: LessonStep[] = [];
  const addContent = (data: any) => steps.push({ type: 'content', ...data });
  const addQuiz = (data: any) => steps.push({ type: 'quiz', ...data });

  // 1. Introduction
  addContent({
    sectionTitle: "Introduction",
    sectionSubtitle: "The Setup",
    label: "Grammar & Precision",
    visualVariant: "chip",
    content: [
      "The shift toward **decentralized employment** is arguably the most significant change in modern professional life.",
      "**Analysis:** Use of the passive voice ('is arguably...') and complex noun phrases ('decentralized employment') demonstrates **Grammatical Range and Accuracy**."
    ],
    theme: "indigo",
    vocab: [
      { term: "decentralized", ru: "децентрализованный", uz: "markazlashmagan" },
      { term: "employment", ru: "занятость", uz: "bandlik" }
    ]
  });
  addQuiz({
    question: "Why use 'decentralized employment' instead of 'working from home'?",
    options: ["It sounds harder", "It is precise academic vocabulary (Band 9 Lexical Resource)", "It takes up more space"],
    correctAnswer: 1,
    explanation: "Band 9 requires specific, academic vocabulary. 'Decentralized employment' describes the *nature* of the work structure, not just the location."
  });
  addQuiz({
    question: "What is the effect of 'is arguably the most significant change'?",
    options: ["It makes the statement softer and more academic", "It makes it a fact", "It shows uncertainty"],
    correctAnswer: 0,
    explanation: "Using qualifiers like 'arguably' shows nuance and academic tone. It avoids making absolute statements that can be easily disproven."
  });

  // 2. Thesis
  addContent({
    sectionTitle: "Introduction",
    sectionSubtitle: "The Thesis",
    label: "Task Response",
    visualVariant: "target",
    content: [
      "While the argument persists that this distance **impairs** general work habits, I believe it **fosters** superior self-management.",
      "**Analysis:** The thesis uses strong, opposing vocabulary ('impairs' vs 'fosters') to state a nuanced position immediately."
    ],
    theme: "indigo",
    vocab: [
      { term: "impairs", ru: "ухудшает / ослабляет", uz: "yomonlashtiradi / pasaytiradi" },
      { term: "fosters", ru: "способствует / воспитывает", uz: "rivojlantiradi" }
    ]
  });
  addQuiz({
    question: "What is the 'Cullen Rule' for the introduction?",
    options: ["Keep it a secret", "Provide a clear 'Roadmap' and Thesis immediately", "Write 100 words"],
    correctAnswer: 1,
    explanation: "Pauline Cullen emphasizes that the introduction must act as a roadmap. The examiner should know exactly what your position is before they read the body."
  });
  addQuiz({
    question: "Why is 'fosters superior self-management' better than 'is better'?",
    options: ["It is longer", "It is specific colocation", "It is slang"],
    correctAnswer: 1,
    explanation: "'Fosters' collocated with 'self-management' shows precise control of vocabulary. It explains *how* it is better, not just *that* it is better."
  });

  // 3. BP1 Concession
  addContent({
    sectionTitle: "Body Paragraph 1",
    sectionSubtitle: "The Counter-Argument",
    label: "Defining the Problem",
    visualVariant: "radar",
    content: [
      "It is necessary to **acknowledge** that, initially, the **erosion of the spatial boundary** between personal and professional life can lead to **fragmented** attention.",
      "**Analysis:** 'Erosion of the spatial boundary' is high-level vocabulary for 'no separation between work and home'."
    ],
    theme: "red",
    vocab: [
      { term: "erosion", ru: "разрушение / эрозия", uz: "yemirilish" },
      { term: "fragmented", ru: "фрагментированный / раздробленный", uz: "bo'lingan" }
    ]
  });
  addQuiz({
    question: "What is the function of 'It is necessary to acknowledge'?",
    options: ["To Concede", "To Refute", "To Conclude"],
    correctAnswer: 0,
    explanation: "This phrase signals a Concession. You are admitting the other side has a point. This 'balance' is critical for a high Task Response score."
  });
  addQuiz({
    question: "What does 'erosion of the spatial boundary' mean?",
    options: ["The walls falling down", "The disappearance of the physical line between home and office", "Soil erosion"],
    correctAnswer: 1,
    explanation: "This complex noun phrase perfectly describes the psychological issue of working where you sleep. It is Band 9 Lexical Resource."
  });

  // 4. BP1 Detail
  addContent({
    sectionTitle: "Body Paragraph 1",
    sectionSubtitle: "Cohesion & Detail",
    label: "The Social Cost",
    visualVariant: "hub",
    content: [
      "**Furthermore**, the lack of **incidental** social interaction **impedes** spontaneous collaboration. **Therefore**, the transition phase presents a risk to habits.",
      "**Analysis:** Uses 'Furthermore' to add a point and 'Therefore' to link back to the main topic (risk to habits)."
    ],
    theme: "red",
    vocab: [
      { term: "incidental", ru: "случайный / попутный", uz: "tasodifiy" },
      { term: "impedes", ru: "препятствует / затрудняет", uz: "to'sqinlik qiladi" }
    ]
  });
  addQuiz({
    question: "Why does the writer limit the damage to 'spontaneous' collaboration?",
    options: ["They forgot other types", "To show nuance (Accuracy)", "To sound smart"],
    correctAnswer: 1,
    explanation: "Planned collaboration works fine remotely. Only 'spontaneous' (water-cooler) chats are lost. Identifying this distinction shows deep task understanding."
  });
  addQuiz({
    question: "What cohesive device signals the summary of the paragraph?",
    options: ["Furthermore", "Therefore", "Incidental"],
    correctAnswer: 1,
    explanation: "'Therefore' is a cause-effect linker. It tells the reader 'Because of X and Y, the result is Z', closing the logical loop of the paragraph."
  });

  // 5. BP2 Pivot
  addContent({
    sectionTitle: "Body Paragraph 2",
    sectionSubtitle: "The Core Argument",
    label: "The Pivot",
    visualVariant: "blueprint",
    content: [
      "**Despite** these transitional issues, remote work **ultimately** improves habits. The primary benefit is the **elimination** of non-productive activities.",
      "**Analysis:** 'Despite' creates a strong shift from Concession to Argument. 'Elimination of non-productive activities' is precise vocabulary."
    ],
    theme: "green",
    vocab: [
      { term: "elimination", ru: "устранение", uz: "bartaraf etish" },
      { term: "ultimately", ru: "в конечном счете", uz: "oxir-oqibat" }
    ]
  });
  addQuiz({
    question: "What is 'non-productive activities' a synonym for?",
    options: ["Sleeping", "Wasting time (commuting, gossip)", "Working hard"],
    correctAnswer: 1,
    explanation: "Instead of saying 'wasting time', the writer uses 'non-productive activities'. This is formal, objective, and academic."
  });
  addQuiz({
    question: "How does 'Despite' function here?",
    options: ["It adds information", "It contrasts with the previous paragraph", "It gives an example"],
    correctAnswer: 1,
    explanation: "It bridges BP1 and BP2. It says 'Even though BP1 is true, BP2 is MORE true'. This connection is vital for Coherence & Cohesion."
  });

  // 6. BP2 Evidence
  addContent({
    sectionTitle: "Body Paragraph 2",
    sectionSubtitle: "Specific Evidence",
    label: "Measurable Outcomes",
    visualVariant: "scale",
    content: [
      "The focus shifts from **presenteeism** (simply being visible at a desk) to achieving **measurable outcomes**. This encourages **self-discipline**.",
      "**Analysis:** Uses field-specific terms ('presenteeism') and links the benefit directly to 'self-discipline' (the prompt's topic)."
    ],
    theme: "green",
    vocab: [
      { term: "presenteeism", ru: "презентеизм (сидение на работе)", uz: "ishda shunchaki bo'lish" },
      { term: "self-discipline", ru: "самодисциплина", uz: "o'z-o'zini intizomlash" }
    ]
  });
  addQuiz({
    question: "What is 'presenteeism'?",
    options: ["Giving presents", "The practice of being at work just to be seen, not to work", "Presenting slides"],
    correctAnswer: 1,
    explanation: "Using a specific business term like 'presenteeism' demonstrates high lexical awareness and fits the topic of 'Work Habits' perfectly."
  });
  addQuiz({
    question: "How does this prove the thesis?",
    options: ["It shows work is harder", "It argues that results matter more than time, which requires better habits", "It doesn't"],
    correctAnswer: 1,
    explanation: "The argument is that you can't fake working at home; you have to produce results. This *requires* the improved habit of self-discipline."
  });

  // 7. BP3 Deepening
  addContent({
    sectionTitle: "Body Paragraph 3",
    sectionSubtitle: "The Mechanism",
    label: "Autonomy & Accountability",
    visualVariant: "gavel",
    content: [
      "The strongest counter-argument lies in the link between **autonomy** and **accountability**. The problem is not the location but the individual’s lack of skills.",
      "**Analysis:** Deepens the argument by identifying the mechanism of change (autonomy) and refuting the prompt's assumption."
    ],
    theme: "yellow",
    vocab: [
      { term: "autonomy", ru: "автономия / независимость", uz: "muxtoriyat / mustaqillik" },
      { term: "accountability", ru: "подотчетность / ответственность", uz: "javobgarlik" }
    ]
  });
  addQuiz({
    question: "What is the 'Refutation' technique used here?",
    options: ["Agreeing with everyone", "Redefining the problem (It's not location, it's skill)", "Ignoring the question"],
    correctAnswer: 1,
    explanation: "The writer attacks the premise of the question. They argue that if you have bad habits at home, it's YOUR fault, not the home's fault. This is critical thinking."
  });
  addQuiz({
    question: "Why are 'autonomy' and 'accountability' linked?",
    options: ["They start with A", "With freedom (autonomy) comes the need to be responsible (accountability)", "They are opposites"],
    correctAnswer: 1,
    explanation: "This pair of concepts is central to modern management theory. Using them together shows you understand the deeper concepts of the topic."
  });

  // 8. BP3 Distinction
  addContent({
    sectionTitle: "Body Paragraph 3",
    sectionSubtitle: "Comparison",
    label: "Active vs. Passive",
    visualVariant: "coins",
    content: [
      "**Crucially**, successful remote arrangements force individuals to develop **active, self-directed** professional habits rather than passive ones.",
      "**Analysis:** Uses 'Crucially' to signal the most important point. Contrasts 'Active' vs 'Passive' habits."
    ],
    theme: "yellow",
    vocab: [
      { term: "crucially", ru: "что особенно важно", uz: "eng muhimi" },
      { term: "self-directed", ru: "самостоятельный", uz: "o'zini o'zi boshqaradigan" }
    ]
  });
  addQuiz({
    question: "What is a 'passive' work habit described here?",
    options: ["Sleeping", "Being dictated by the clock (doing things just because it's 9am)", "Working hard"],
    correctAnswer: 1,
    explanation: "The essay argues that office work can be passive (just following rules), whereas remote work requires you to actively manage your time."
  });
  addQuiz({
    question: "Why is 'Crucially' a good connector here?",
    options: ["It sounds cool", "It signals that this is the main point / climax of the argument", "It means 'cruel'"],
    correctAnswer: 1,
    explanation: "Use 'Crucially' only for your most important point. It wakes the examiner up and says 'Pay attention, this is the core idea'."
  });

  // 9. Conclusion
  addContent({
    sectionTitle: "Conclusion",
    sectionSubtitle: "The Final Verdict",
    label: "Future Demands",
    visualVariant: "horizon",
    content: [
      "I maintain that this trend does not impair habits. The future of work demands greater autonomy, **compelling** professionals to cultivate these **vulnerabilities** into strengths.",
      "**Analysis:** Restates thesis ('maintain'). Ends with a powerful forward-looking statement."
    ],
    theme: "purple",
    vocab: [
      { term: "compelling", ru: "принуждающий / заставляющий", uz: "majbur qiluvchi" },
      { term: "vulnerabilities", ru: "уязвимости / слабости", uz: "zaifliklar" }
    ]
  });
  addQuiz({
    question: "What does 'compelling' mean in this context?",
    options: ["Interesting", "Forcing / Obliging", "Selling"],
    correctAnswer: 1,
    explanation: "Here, 'compelling' means the situation is *forcing* people to change. It is a strong verb indicating inevitable change."
  });
  addQuiz({
    question: "What is the final impression left on the examiner?",
    options: ["Remote work is easy", "Remote work is a difficult but necessary evolution of professional skills", "Remote work is bad"],
    correctAnswer: 1,
    explanation: "The conclusion frames remote work not just as 'convenient', but as an evolutionary step in professional discipline. This is a very strong Band 9 ending."
  });

  return steps;
};

const STEPS = buildSteps();

const Lesson3: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [bgClass, setBgClass] = useState("bg-gray-100");
  const badgeRef = useRef<HTMLDivElement>(null);

  const activeData = STEPS[currentStep];

  useEffect(() => {
    if (activeData.theme === 'red') setBgClass("bg-rose-50");
    else if (activeData.theme === 'green') setBgClass("bg-emerald-50");
    else if (activeData.theme === 'indigo') setBgClass("bg-indigo-50");
    else if (activeData.theme === 'yellow') setBgClass("bg-amber-50");
    else if (activeData.theme === 'purple') setBgClass("bg-violet-50");
    else setBgClass("bg-gray-50");
  }, [currentStep, activeData.theme]);

  // Victory Sound
  const playVictorySound = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 3 ? 'triangle' : 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.3, now + i * 0.1 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 1.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 1.5);
    });
  };

  useEffect(() => { if (showLevelUp) playVictorySound(); }, [showLevelUp]);

  const handleBadgeMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return;
    const { left, top, width, height } = badgeRef.current.getBoundingClientRect();
    const rotateX = (0.5 - (e.clientY - top) / height) * 30;
    const rotateY = ((e.clientX - left) / width - 0.5) * 30;
    badgeRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setXp(prev => prev + 5);
      setCurrentStep(prev => prev + 1);
    } else {
      setShowLevelUp(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setXp(prev => prev + 50 + (streak * 10));
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  if (showLevelUp) {
    return (
      <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden flex flex-col items-center justify-center bg-[#0F172A] relative text-white perspective-container z-[60]">
        <div className="sunburst-ray"></div>
        <div className="relative z-10 text-center animate-pop-in">
          <h2 className="text-2xl font-bold text-gray-400 tracking-[0.5em] uppercase mb-8">Mission Accomplished</h2>
          <div className="badge-container w-80 h-96 mx-auto mb-10 cursor-pointer" onMouseMove={handleBadgeMove} onMouseLeave={() => badgeRef.current && (badgeRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`)}>
            <div ref={badgeRef} className="w-full h-full relative transition-transform duration-100 ease-out">
              <div className="absolute inset-0 holographic-bg rounded-[40px] border-4 border-[#FDB931]/30 flex flex-col items-center justify-center p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_2.5s_infinite]"></div>
                <div className="text-center">
                  <h1 className="text-5xl font-black mb-1 diamond-text tracking-tighter">ELITE</h1>
                  <p className="text-sm font-bold text-[#FDB931] tracking-widest uppercase">Remote Architect</p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-6 border-t border-white/10">
                  <div className="text-center"><div className="text-xs text-gray-400 uppercase">XP</div><div className="text-xl font-bold text-white">{xp}</div></div>
                  <div className="text-center"><div className="text-xs text-gray-400 uppercase">Streak</div><div className="text-xl font-bold text-[#FFD700]">{streak}</div></div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => window.location.reload()} className="px-10 py-4 bg-white text-gray-900 rounded-full font-black text-lg tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all">RETURN HOME</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 h-[100dvh] w-screen overflow-hidden transition-colors duration-1000 ease-in-out ${bgClass} font-sans`}>
      <div className="absolute top-0 left-0 w-full h-[60px] bg-white/95 backdrop-blur-md border-b border-gray-200/50 px-4 py-2 shadow-sm z-50 flex items-center">
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-8 h-8 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300">
               <div className="absolute bottom-0 left-0 w-full bg-indigo-600 transition-all duration-500 liquid-wave" style={{ height: `${((currentStep + 1) / STEPS.length) * 100}%` }}></div>
            </div>
            <div className="hidden md:block"><p className="text-xs font-bold text-gray-400 uppercase leading-none">Progress</p><p className="text-sm font-black text-gray-800 leading-none">{Math.round(((currentStep + 1) / STEPS.length) * 100)}%</p></div>
          </div>
          <div className="flex gap-6">
            <div className="text-center"><p className="text-xs font-bold text-gray-400 uppercase leading-none">XP</p><p className="text-lg font-black text-indigo-600 leading-none">{xp}</p></div>
            <div className="text-center"><p className="text-xs font-bold text-gray-400 uppercase leading-none">Streak</p><p className={`text-lg font-black leading-none ${streak > 2 ? 'text-orange-500 animate-pulse' : 'text-gray-600'}`}>{streak}</p></div>
          </div>
        </div>
      </div>

      <div className="absolute top-[60px] bottom-[80px] left-0 right-0 flex items-center justify-center p-2 sm:p-4 z-20 overflow-hidden">
        <div className="w-full max-w-3xl h-full flex flex-col justify-center relative">
          <div key={currentStep} className="w-full h-full flex flex-col justify-center">
            {activeData.type === 'content' ? (
              <FocusSlide 
                {...activeData}
                label={activeData.label || ""}
                sectionTitle={activeData.sectionTitle || ""}
                content={activeData.content || ""}
                theme={activeData.theme || "indigo"}
                animated={true}
                visualVariant={activeData.visualVariant}
                onVocabLearned={() => setXp(prev => prev + 15)}
              />
            ) : (
              <QuizSlide 
                {...activeData}
                question={activeData.question || ""}
                options={activeData.options || []}
                correctAnswer={activeData.correctAnswer || 0}
                explanation={activeData.explanation || ""}
                animated={true}
                onAnswer={handleQuizAnswer}
              />
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[80px] bg-white border-t border-gray-200 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl flex justify-between items-center">
          <button onClick={handlePrev} disabled={currentStep === 0} className={`px-4 py-3 rounded-xl flex items-center gap-2 font-bold transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-600 hover:bg-gray-100 active:scale-95'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg><span className="hidden sm:inline">Prev</span>
          </button>
          <button onClick={handleNext} className="group relative px-6 py-3 bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto min-w-[120px]">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shimmer-text"></div>
            <span className="relative z-10 font-bold text-base tracking-widest uppercase flex items-center justify-center gap-2">
              {currentStep === STEPS.length - 1 ? 'Finish' : 'Next'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lesson3;