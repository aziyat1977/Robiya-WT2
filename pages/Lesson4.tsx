import React, { useState, useEffect, useRef } from 'react';
import FocusSlide from '../components/FocusSlide';
import QuizSlide from '../components/QuizSlide';
import { VisualVariant } from '../components/LessonVisual';

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

const buildSteps = (): LessonStep[] => {
  const steps: LessonStep[] = [];
  const addContent = (data: any) => steps.push({ type: 'content', ...data });
  const addQuiz = (data: any) => steps.push({ type: 'quiz', ...data });

  addContent({
    sectionTitle: "Planning Phase",
    sectionSubtitle: "Step A: Task Analysis",
    label: "Prompt Breakdown",
    visualVariant: "blueprint",
    content: "Address **all** parts of the prompt (Discuss both views **AND** give your opinion). \n\n**Topic:** Scope of Charity/Aid (Local vs. Global).",
    theme: "indigo",
    vocab: [
      { term: "scope", ru: "масштаб / сфера действия", uz: "ko'lam / doira" },
      { term: "domestic poverty", ru: "внутренняя бедность", uz: "ichki qashshoqlik" }
    ]
  });
  addQuiz({ question: "What defines a 'Discussion + Opinion' essay type?", options: ["Describe a problem", "Discuss both sides and give your position", "Tell a story"], correctAnswer: 1, explanation: "The prompt asks for three specific things: Discuss Side A, Discuss Side B, and Give Your Opinion." });
  addQuiz({ question: "Why is 'scope' a good word here?", options: ["It sounds scientific", "It precisely refers to how far the charity extends", "It is short"], correctAnswer: 1, explanation: "'Scope' refers to the extent or area that something deals with." });

  addContent({
    sectionTitle: "Planning Phase",
    sectionSubtitle: "Step B: Position",
    label: "Thesis Statement",
    visualVariant: "target",
    content: "**Position:** Partially Agree with the internationalist view. \n**Thesis:** While addressing domestic poverty is crucial, the **moral imperative** to alleviate suffering globally necessitates international aid.",
    theme: "indigo",
    vocab: [
      { term: "moral imperative", ru: "моральный долг", uz: "axloqiy majburiyat" },
      { term: "nuanced", ru: "детальный / с нюансами", uz: "nozik farqli" }
    ]
  });
  addQuiz({ question: "What does 'moral imperative' mean?", options: ["Something you must do because it is right", "A legal law", "A suggestion"], correctAnswer: 0, explanation: "An 'imperative' is a command or essential duty." });
  addQuiz({ question: "Why 'Partially Agree'?", options: ["It is safer", "It allows you to acknowledge the validity of local charity while prioritizing global crises", "You don't know the answer"], correctAnswer: 1, explanation: "A nuanced position often finds value in both sides but establishes a hierarchy." });

  addContent({
    sectionTitle: "Planning Phase",
    sectionSubtitle: "Step C: Structure",
    label: "The Blueprint",
    visualVariant: "hub",
    content: [
      "**BP1 (Side A):** Argue for the domestic focus (**Charity begins at home**).",
      "**BP2 (Side B):** Argue for the international focus (**Moral Imperative**).",
      "**BP3 (Opinion):** Reaffirm Opinion."
    ],
    theme: "indigo",
    vocab: [
      { term: "isolationist", ru: "изоляционистский", uz: "izolyatsionistik" },
      { term: "transcends", ru: "превосходит / выходит за пределы", uz: "chegaradan chiqadi" }
    ]
  });
  addQuiz({ question: "What is the function of BP3?", options: ["To repeat BP2", "To explain exactly WHY the writer chooses Side B over Side A", "To list examples"], correctAnswer: 1, explanation: "BP3 is the 'Opinion' paragraph. It synthesizes the discussion." });
  addQuiz({ question: "What does 'transcends national boundaries' mean?", options: ["Stays inside the country", "Goes beyond borders (global)", "Changes the map"], correctAnswer: 1, explanation: "Aid that 'transcends boundaries' goes wherever help is needed." });

  addContent({
    sectionTitle: "Essay Writing",
    sectionSubtitle: "Introduction",
    label: "Setting the Stage",
    visualVariant: "horizon",
    content: "The purpose and scope of charitable giving remains a topic of intense debate. This essay will discuss both the **isolationist** and **globalist** perspectives before asserting that **the moral imperative** necessitates a charitable scope that transcends geography.",
    theme: "blue",
    vocab: [
      { term: "acute", ru: "острый / критический", uz: "o'tkir / jiddiy" },
      { term: "alleviate", ru: "облегчить (страдания)", uz: "yengillashtirmoq" }
    ]
  });
  addQuiz({ question: "Why use the terms 'isolationist' and 'globalist'?", options: ["To sound political", "They are precise terms summarizing the two opposing views", "They are simple words"], correctAnswer: 1, explanation: "These terms package complex ideas into single, high-level words." });
  addQuiz({ question: "What is 'acute crisis'?", options: ["A small problem", "A sharp, severe, and immediate emergency", "A math angle"], correctAnswer: 1, explanation: "'Acute' describes something intense and short-term." });

  addContent({
    sectionTitle: "Body Paragraph 1",
    sectionSubtitle: "Side A: Domestic",
    label: "Efficiency",
    visualVariant: "coins",
    content: [
      "The perspective that **charity should begin at home** is rooted in practicality. Domestic giving minimizes administrative burdens; aid is distributed more **efficiently** when **logistical hurdles** are eliminated.",
      "**Example:** Local food banks."
    ],
    theme: "red",
    vocab: [
      { term: "logistical hurdles", ru: "логистические препятствия", uz: "logistik to'siqlar" },
      { term: "vicinities", ru: "окрестности / близость", uz: "atrof-muhit / yaqinlik" }
    ]
  });
  addQuiz({ question: "What is the main argument for domestic charity?", options: ["It is nicer", "It is more practical and efficient", "Foreigners don't need help"], correctAnswer: 1, explanation: "Sending money across the world is hard (logistics); giving it to a neighbor is easy." });
  addQuiz({ question: "What does 'logistical hurdles' refer to?", options: ["Jumping over fences", "The practical difficulties of organizing complex operations", "Logic puzzles"], correctAnswer: 1, explanation: "Logistics involves the organization of moving things." });

  addContent({
    sectionTitle: "Body Paragraph 2",
    sectionSubtitle: "Side B: Global",
    label: "Humanity",
    visualVariant: "scale",
    content: [
      "Conversely, the argument for a universal approach rests on the principle that **human dignity** is not defined by nationality. Limiting efforts becomes **morally indefensible** when vast populations face **existential threats**.",
      "**Key Idea:** Crises overwhelm single nations."
    ],
    theme: "green",
    vocab: [
      { term: "morally indefensible", ru: "морально недопустимый", uz: "axloqiy jihatdan oqlab bo'lmaydigan" },
      { term: "existential threats", ru: "угрозы существованию", uz: "mavjudlikka tahdidlar" }
    ]
  });
  addQuiz({ question: "What linking word introduces the contrast?", options: ["Conversely", "Moreover", "Therefore"], correctAnswer: 0, explanation: "'Conversely' signals that we are flipping the coin to look at the other side." });
  addQuiz({ question: "What is an 'existential threat'?", options: ["A threat to life/existence itself", "A philosophical question", "A small danger"], correctAnswer: 0, explanation: "Use 'existential threat' for things that can kill large numbers of people." });

  addContent({
    sectionTitle: "Body Paragraph 3",
    sectionSubtitle: "Opinion",
    label: "Verdict",
    visualVariant: "gavel",
    content: [
      "**I firmly believe** that the ethical framework of the 21st century demands that **global solidarity** take precedence. The vulnerability of those facing catastrophic disaster **supersedes** localized needs.",
      "**Nuance:** Maintain domestic ops, but reserve capacity for global crises."
    ],
    theme: "yellow",
    vocab: [
      { term: "solidarity", ru: "солидарность / единство", uz: "birdamlik" },
      { term: "supersedes", ru: "вытесняет / имеет приоритет", uz: "ustun keladi / o'rnini bosadi" }
    ]
  });
  addQuiz({ question: "What does 'supersedes' mean?", options: ["Comes after", "Replaces or takes priority over", "Ignores"], correctAnswer: 1, explanation: "If A supersedes B, A is more important." });
  addQuiz({ question: "How does the writer add nuance?", options: ["By saying we should ignore local people", "By saying we should do BOTH, but prioritize Global in crises", "By saying nothing"], correctAnswer: 1, explanation: "Balance is key for Band 9." });

  addContent({
    sectionTitle: "Conclusion",
    sectionSubtitle: "Summary",
    label: "Final thought",
    visualVariant: "horizon",
    content: "I conclude that while organizations should remain engaged with domestic welfare, their ultimate duty is to deploy resources **where human need is most acute**. Charity must be an international **endeavor** transcending **geopolitical** lines.",
    theme: "purple",
    vocab: [
      { term: "endeavor", ru: "начинание / усилие", uz: "sa'y-harakat" },
      { term: "geopolitical", ru: "геополитический", uz: "geosiyosiy" }
    ]
  });
  addQuiz({ question: "Does the conclusion match the thesis?", options: ["No", "Yes, it reaffirms the 'Crisis First' approach", "It introduces new topics"], correctAnswer: 1, explanation: "Consistency is vital." });
  addQuiz({ question: "What is the tone of 'transcending geopolitical lines'?", options: ["Casual", "Highly Academic and Formal", "Funny"], correctAnswer: 1, explanation: "It suggests that humanity is more important than political borders." });

  addContent({
    sectionTitle: "Band 9 Analysis",
    sectionSubtitle: "Scorecard",
    label: "Takeaways",
    visualVariant: "coins",
    content: [
      "**Task Response:** Fully discussed both views and provided a clear opinion.",
      "**Cohesion:** Used 'Conversely', 'Furthermore', and 'Crucially'.",
      "**Lexical Resource:** 'Moral imperative', 'Logistical hurdles', 'Acute crises'."
    ],
    theme: "indigo",
    vocab: [
      { term: "collocations", ru: "словосочетания", uz: "so'z birikmalari" },
      { term: "reasoned", ru: "обоснованный", uz: "asoslangan" }
    ]
  });
  addQuiz({ question: "What is the most important takeaway for Task Response?", options: ["Write a lot", "Address all parts of the prompt", "Use big words"], correctAnswer: 1, explanation: "If the prompt says 'Discuss both views', you MUST discuss both." });
  addQuiz({ question: "Why are 'collocations' important?", options: ["They show natural control", "They are hard to spell", "They make sentences longer"], correctAnswer: 0, explanation: "Examiners look for natural phrasing." });

  return steps;
};

const STEPS = buildSteps();

const Lesson4: React.FC = () => {
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
  const handleNext = () => { if (currentStep < STEPS.length - 1) { setXp(prev => prev + 5); setCurrentStep(prev => prev + 1); } else { setShowLevelUp(true); } };
  const handlePrev = () => { if (currentStep > 0) setCurrentStep(prev => prev - 1); };
  const handleQuizAnswer = (isCorrect: boolean) => { if (isCorrect) { setXp(prev => prev + 50 + (streak * 10)); setStreak(prev => prev + 1); } else { setStreak(0); } };

  if (showLevelUp) {
    return (
      <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden flex flex-col items-center justify-center bg-[#0F172A] relative text-white perspective-container z-[60]">
        <div className="sunburst-ray"></div>
        <div className="relative z-10 text-center animate-pop-in">
          <h2 className="text-2xl font-bold text-gray-400 tracking-[0.5em] uppercase mb-8">Mission Accomplished</h2>
          <div className="badge-container w-80 h-96 mx-auto mb-10 cursor-pointer">
            <div ref={badgeRef} className="w-full h-full relative transition-transform duration-100 ease-out">
              <div className="absolute inset-0 holographic-bg rounded-[40px] border-4 border-[#FDB931]/30 flex flex-col items-center justify-center p-8 overflow-hidden">
                <div className="text-center">
                  <h1 className="text-5xl font-black mb-1 diamond-text tracking-tighter">GLOBAL</h1>
                  <p className="text-sm font-bold text-[#FDB931] tracking-widest uppercase">Humanitarian</p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-6 border-t border-white/10">
                  <div className="text-center"><div className="text-xs text-gray-400 uppercase">XP</div><div className="text-xl font-bold text-white">{xp}</div></div>
                  <div className="text-center"><div className="text-xs text-gray-400 uppercase">Streak</div><div className="text-xl font-bold text-[#FFD700]">{streak}</div></div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => window.location.reload()} className="px-10 py-4 bg-white text-gray-900 rounded-full font-black text-lg tracking-wider hover:scale-105 transition-all">RETURN HOME</button>
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
            {activeData.type === 'content' ? <FocusSlide {...activeData} content={activeData.content || ""} theme={activeData.theme || "indigo"} animated={true} onVocabLearned={() => setXp(prev => prev + 15)} /> : <QuizSlide {...activeData} options={activeData.options || []} correctAnswer={activeData.correctAnswer || 0} explanation={activeData.explanation || ""} animated={true} onAnswer={handleQuizAnswer} />}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[80px] bg-white border-t border-gray-200 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl flex justify-between items-center">
          <button onClick={handlePrev} disabled={currentStep === 0} className={`px-4 py-3 rounded-xl flex items-center gap-2 font-bold transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-600 hover:bg-gray-100 active:scale-95'}`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>Prev</button>
          <button onClick={handleNext} className="group relative px-6 py-3 bg-gray-900 text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all w-full sm:w-auto min-w-[120px]"><span className="relative z-10 font-bold text-base tracking-widest uppercase flex items-center justify-center gap-2">{currentStep === STEPS.length - 1 ? 'Finish' : 'Next'}<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></span></button>
        </div>
      </div>
    </div>
  );
};

export default Lesson4;