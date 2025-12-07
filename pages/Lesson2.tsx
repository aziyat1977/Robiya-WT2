import React, { useState, useEffect, useRef } from 'react';
import FocusSlide from '../components/FocusSlide';
import QuizSlide from '../components/QuizSlide';
import { VisualVariant } from '../components/LessonVisual';

// -- GAMIFICATION TYPES --
type StepType = 'content' | 'quiz';

interface VocabItem {
  term: string;
  ru: string;
  uz: string;
}

interface LessonStep {
  type: StepType;
  // Content props
  sectionTitle?: string;
  sectionSubtitle?: string;
  label?: string;
  content?: string | string[];
  theme?: string;
  vocab?: VocabItem[];
  visualVariant?: VisualVariant;
  // Quiz props
  question?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
}

// -- DATA BUILDER --
const buildSteps = (): LessonStep[] => {
  const steps: LessonStep[] = [];
  const addContent = (data: any) => steps.push({ type: 'content', ...data });
  const addQuiz = (data: any) => steps.push({ type: 'quiz', ...data });

  // PAGE 1: Planning A
  addContent({
    sectionTitle: "Planning Phase",
    sectionSubtitle: "Task Analysis",
    label: "Step A",
    visualVariant: "blueprint",
    content: "Address **all** parts of the prompt (Discuss both views **AND** give your opinion). \n\n**Topic:** Future of city life (**unlivable** vs. solved). \n**Type:** Discussion + Opinion.",
    theme: "indigo",
    vocab: [
      { term: "unlivable", ru: "непригодный для жизни", uz: "yashash uchun yaroqsiz" },
      { term: "overcrowding", ru: "перенаселенность", uz: "aholi zichligi" }
    ]
  });
  addQuiz({
    question: "What defines a 'Discussion + Opinion' essay type?",
    options: ["You only write about your opinion", "You discuss both views objectively, then give your opinion", "You list advantages and disadvantages only"],
    correctAnswer: 1,
    explanation: "The prompt asks for three specific things: Discuss Side A, Discuss Side B, and Give Your Opinion."
  });
  addQuiz({
    question: "What happens if you focus only on 'pollution' but ignore 'overcrowding'?",
    options: ["It's fine, they are similar", "You fail to fully address the task", "You get extra points for focus"],
    correctAnswer: 1,
    explanation: "You must address 'all parts of the prompt'. If the prompt mentions both, you must discuss both."
  });

  // PAGE 2: Position
  addContent({
    sectionTitle: "Planning Phase",
    sectionSubtitle: "Positioning",
    label: "Step B",
    visualVariant: "target",
    content: "Must have a clear, **nuanced** position stated immediately. \n\n**Position:** Acknowledge the severity of the threat, but argue that **technological innovation** is the only **viable** path.",
    theme: "indigo",
    vocab: [
      { term: "nuanced", ru: "детальный / с нюансами", uz: "batafsil / nozik farqli" },
      { term: "viable", ru: "жизнеспособный", uz: "yashashga qodir" }
    ]
  });
  addQuiz({
    question: "Why is a 'nuanced' position better than a simple 'I agree'?",
    options: ["It is longer", "It shows higher critical thinking and Band 9 Task Response", "It confuses the examiner"],
    correctAnswer: 1,
    explanation: "Band 9 requires a 'fully developed position'. Acknowledging the problem while proposing a solution is sophisticated."
  });
  addQuiz({
    question: "Where should the position be stated first?",
    options: ["In the conclusion only", "In the introduction", "In the second body paragraph"],
    correctAnswer: 1,
    explanation: "Your position must be clear 'throughout the response'. Stating it in the intro sets the direction."
  });

  // PAGE 3: Blueprint
  addContent({
    sectionTitle: "Planning Phase",
    sectionSubtitle: "Structure",
    label: "Step C",
    visualVariant: "hub",
    content: [
      "**BP1:** Why cities are threatened (Side A).",
      "**BP2:** Why technology is the solution (Side B).",
      "**BP3:** Why technology is **necessary** (**Reiterate** & Deepen Opinion)."
    ],
    theme: "indigo",
    vocab: [
      { term: "blueprint", ru: "план / схема", uz: "reja / chizma" },
      { term: "reiterate", ru: "повторить / подтвердить", uz: "takrorlamoq / ta'kidlamoq" }
    ]
  });
  addQuiz({
    question: "What is the function of Body Paragraph 3 in this specific plan?",
    options: ["To repeat the introduction", "To deepen and fully develop the writer's personal opinion", "To summarize the essay"],
    correctAnswer: 1,
    explanation: "In a Discussion + Opinion essay, adding a third paragraph dedicated to your opinion ensures it is central to the argument."
  });
  addQuiz({
    question: "Why is the order Side A -> Side B -> Opinion chosen?",
    options: ["It builds a logical flow towards the writer's conclusion", "It is random", "Alphabetical order"],
    correctAnswer: 0,
    explanation: "This structure is persuasive. You acknowledge the opposing view, present the solution, and then explain WHY that solution is best."
  });

  // PAGE 4: Introduction
  addContent({
    sectionTitle: "Essay Writing",
    sectionSubtitle: "Introduction",
    label: "Setting the Stage",
    visualVariant: "city",
    content: "The **prognosis** for the world’s major metropolises is divided. While one school of thought suggests that unchecked population density and environmental **degradation** will render urban centers uninhabitable, a counter-argument holds that human ingenuity will ensure sustainability.",
    theme: "blue",
    vocab: [
      { term: "prognosis", ru: "прогноз", uz: "prognoz" },
      { term: "degradation", ru: "деградация / ухудшение", uz: "tanazzul" }
    ]
  });
  addQuiz({
    question: "What is the meaning of 'prognosis' in this context?",
    options: ["A medical diagnosis", "A forecast or likely future outcome", "A type of city"],
    correctAnswer: 1,
    explanation: "Using 'prognosis' (often medical) to describe the health of a city is an excellent example of metaphorical collocation."
  });
  addQuiz({
    question: "How does the writer introduce the opposing views?",
    options: ["People say X. People say Y.", "Using 'While one school of thought suggests... a counter-argument holds...'", "I think X and Y."],
    correctAnswer: 1,
    explanation: "This complex sentence structure efficiently contrasts the two views in a single, cohesive sentence."
  });

  // PAGE 5: BP1 Threats
  addContent({
    sectionTitle: "Body Paragraph 1",
    sectionSubtitle: "Side A: The Threats",
    label: "Crisis of Scale",
    visualVariant: "smog",
    content: [
      "Cities are currently facing an inevitable crisis due to **escalating** human activity.",
      "The most immediate threat is severe **overcrowding**, which places an **untenable** strain on critical infrastructure."
    ],
    theme: "red",
    vocab: [
      { term: "escalating", ru: "нарастающий", uz: "kuchayib borayotgan" },
      { term: "untenable", ru: "неприемлемый / невыносимый", uz: "chidab bo'lmas" }
    ]
  });
  addQuiz({
    question: "What is the main topic of this paragraph?",
    options: ["How technology works", "The severity of the threats (overcrowding/pollution)", "The history of cities"],
    correctAnswer: 1,
    explanation: "The Topic Sentence clearly states 'cities are facing an inevitable crisis'. Every sentence after that supports this point."
  });
  addQuiz({
    question: "What does 'untenable' mean?",
    options: ["Under ten years old", "Cannot be maintained or defended against", "Very strong"],
    correctAnswer: 1,
    explanation: "If a situation is 'untenable', it is so bad that it cannot continue. Precise vocabulary for a crisis."
  });

  // PAGE 6: BP2 Solutions
  addContent({
    sectionTitle: "Body Paragraph 2",
    sectionSubtitle: "Side B: The Solution",
    label: "Innovation Defense",
    visualVariant: "chip",
    content: [
      "Conversely, the belief that technological innovation can **mitigate** these problems is grounded in recent breakthroughs.",
      "The necessity of vast agricultural land is being **circumvented** through vertical farming, addressing the root cause."
    ],
    theme: "green",
    vocab: [
      { term: "mitigate", ru: "смягчить / уменьшить", uz: "yumshatmoq" },
      { term: "circumvented", ru: "обойти / избежать", uz: "chetlab o'tmoq" }
    ]
  });
  addQuiz({
    question: "What specific example is given for food security?",
    options: ["Fast food", "Vertical farming", "Importing food"],
    correctAnswer: 1,
    explanation: "Listing 'vertical farming' is a concrete, task-specific example that supports the general claim of 'technological innovation'."
  });
  addQuiz({
    question: "What linking word signals the shift from BP1 to BP2?",
    options: ["Furthermore", "Conversely", "Therefore"],
    correctAnswer: 1,
    explanation: "'Conversely' is a contrast marker. It signals to the reader that we are now looking at the opposite perspective."
  });

  // PAGE 7: BP3 Opinion
  addContent({
    sectionTitle: "Body Paragraph 3",
    sectionSubtitle: "Opinion",
    label: "The Condition",
    visualVariant: "scale",
    content: "While both viewpoints contain merit, I strongly believe that the solution is **contingent** upon revolutionary technology. Without it, the consequences regarding global warming will be **catastrophic**.",
    theme: "yellow",
    vocab: [
      { term: "contingent", ru: "зависящий / условный", uz: "bog'liq / shartli" },
      { term: "catastrophic", ru: "катастрофический", uz: "halokatli" }
    ]
  });
  addQuiz({
    question: "Is the writer's opinion simple or conditional?",
    options: ["Simple: Tech is good.", "Conditional: Tech works ONLY IF adopted on a large scale.", "Negative: Tech is bad."],
    correctAnswer: 1,
    explanation: "The writer uses 'contingent upon' (depends on). This adds depth (nuance) to the argument."
  });
  addQuiz({
    question: "Why use strong words like 'catastrophic'?",
    options: ["To scare the reader", "To show the writer's strong feelings (Stance)", "It is a common word"],
    correctAnswer: 1,
    explanation: "Band 9 Task Response requires a 'clear position'. Using strong, precise adjectives helps convey conviction."
  });

  // PAGE 8: Conclusion
  addContent({
    sectionTitle: "Conclusion",
    sectionSubtitle: "Final Verdict",
    label: "The Future",
    visualVariant: "horizon",
    content: "The proposition that cities will **succumb** to overcrowding is well-founded. However, I assert that future liveability rests on the **trajectories** of successful technological deployment supported by government policy.",
    theme: "purple",
    vocab: [
      { term: "succumb", ru: "поддаться / погибнуть", uz: "yengilmoq / taslim bo'lmoq" },
      { term: "trajectories", ru: "траектории / пути", uz: "rivojlanish yo'llari" }
    ]
  });
  addQuiz({
    question: "Does the conclusion introduce new arguments?",
    options: ["Yes", "No, it summarizes and re-states the position", "Maybe"],
    correctAnswer: 1,
    explanation: "A conclusion should never introduce new ideas. It synthesizes the arguments made in the body paragraphs."
  });
  addQuiz({
    question: "What is the final 'assertion'?",
    options: ["Cities are doomed", "Tech + Policy is the only way", "We should move to the countryside"],
    correctAnswer: 1,
    explanation: "The essay concludes that technology is the solution, but adds the crucial condition of 'supported by government policy'."
  });

  // PAGE 9: Scorecard
  addContent({
    sectionTitle: "Band 9 Analysis",
    sectionSubtitle: "Scorecard",
    label: "Why it works",
    visualVariant: "coins",
    content: [
      "**Coherence**: Used effective **signposting** (Conversely, Crucially) to guide the logic.",
      "**Lexical Resource**: Used precise vocabulary like **systemic** innovation, not just 'big words'.",
      "**Task Response**: Addressed both sides and gave a clear opinion."
    ],
    theme: "indigo",
    vocab: [
      { term: "signposting", ru: "связующие слова", uz: "bog'lovchi so'zlar" },
      { term: "systemic", ru: "системный", uz: "tizimli" }
    ]
  });
  addQuiz({
    question: "What is 'signposting' in an essay?",
    options: ["Putting signs on the street", "Using words that tell the reader where the argument is going", "Signing your name"],
    correctAnswer: 1,
    explanation: "Words like 'However', 'First', 'Conversely' act as road signs, helping the examiner follow your train of thought."
  });
  addQuiz({
    question: "According to Cullen, what is more important than 'fancy' vocabulary?",
    options: ["Long words", "Precision and Collocation", "Slang"],
    correctAnswer: 1,
    explanation: "Band 9 is not about using obscure words. It is about using the *right* word for the specific context."
  });

  return steps;
};

const STEPS = buildSteps();

// -- MAIN COMPONENT --
const Lesson2: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [bgClass, setBgClass] = useState("bg-gray-100");
  const badgeRef = useRef<HTMLDivElement>(null);

  const activeData = STEPS[currentStep];

  // Dynamic Background
  useEffect(() => {
    if (activeData.theme === 'red') setBgClass("bg-rose-50");
    else if (activeData.theme === 'green') setBgClass("bg-emerald-50");
    else if (activeData.theme === 'indigo') setBgClass("bg-indigo-50");
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

  useEffect(() => {
    if (showLevelUp) playVictorySound();
  }, [showLevelUp]);

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
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="confetti-piece" style={{ left: `${Math.random() * 100}%`, top: `-10%`, animation: `confetti ${2 + Math.random() * 2}s linear infinite`, animationDelay: `${Math.random() * 2}s`, backgroundColor: ['#FFD700', '#C0C0C0', '#ffffff'][Math.floor(Math.random()*3)] }} />
        ))}
        <div className="relative z-10 text-center animate-pop-in">
          <h2 className="text-2xl font-bold text-gray-400 tracking-[0.5em] uppercase mb-8">Lesson Complete</h2>
          <div className="badge-container w-80 h-96 mx-auto mb-10 cursor-pointer" onMouseMove={handleBadgeMove} onMouseLeave={() => badgeRef.current && (badgeRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`)}>
            <div ref={badgeRef} className="w-full h-full relative transition-transform duration-100 ease-out">
              <div className="absolute inset-0 holographic-bg rounded-[40px] border-4 border-[#FDB931]/30 flex flex-col items-center justify-center p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_2.5s_infinite]"></div>
                <div className="text-center">
                  <h1 className="text-5xl font-black mb-1 diamond-text tracking-tighter">FUTURE</h1>
                  <p className="text-sm font-bold text-[#FDB931] tracking-widest uppercase">City Architect</p>
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
      {/* HUD */}
      <div className="absolute top-0 left-0 w-full h-[60px] bg-white/95 backdrop-blur-md border-b border-gray-200/50 px-4 py-2 shadow-sm z-50 flex items-center">
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-8 h-8 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300">
               <div className="absolute bottom-0 left-0 w-full bg-indigo-600 transition-all duration-500 liquid-wave" style={{ height: `${((currentStep + 1) / STEPS.length) * 100}%` }}></div>
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-bold text-gray-400 uppercase leading-none">Progress</p>
              <p className="text-sm font-black text-gray-800 leading-none">{Math.round(((currentStep + 1) / STEPS.length) * 100)}%</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-center"><p className="text-xs font-bold text-gray-400 uppercase leading-none">XP</p><p className="text-lg font-black text-indigo-600 leading-none">{xp}</p></div>
            <div className="text-center"><p className="text-xs font-bold text-gray-400 uppercase leading-none">Streak</p><p className={`text-lg font-black leading-none ${streak > 2 ? 'text-orange-500 animate-pulse' : 'text-gray-600'}`}>{streak}</p></div>
          </div>
        </div>
      </div>

      {/* Stage */}
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

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full h-[80px] bg-white border-t border-gray-200 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl flex justify-between items-center">
          <button onClick={handlePrev} disabled={currentStep === 0} className={`px-4 py-3 rounded-xl flex items-center gap-2 font-bold transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-600 hover:bg-gray-100 active:scale-95'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            <span className="hidden sm:inline">Prev</span>
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

export default Lesson2;