import React, { useState, useEffect } from 'react';
import FocusSlide from '../components/FocusSlide';
import QuizSlide from '../components/QuizSlide';

type StepType = 'content' | 'quiz';

interface VocabItem {
  term: string;
  ru: string;
  uz: string;
}

interface BaseStep {
  type: StepType;
}

interface ContentStep extends BaseStep {
  type: 'content';
  sectionTitle: string;
  sectionSubtitle?: string;
  label: string;
  content: string | string[];
  theme: string;
  vocab?: VocabItem[];
}

interface QuizStep extends BaseStep {
  type: 'quiz';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

type LessonStep = ContentStep | QuizStep;

const buildSteps = (): LessonStep[] => {
  const steps: LessonStep[] = [];

  const addSlide = (
    contentSlide: Omit<ContentStep, 'type'>, 
    quizzes: { q: string, opts: string[], ans: number, expl: string }[]
  ) => {
    steps.push({ type: 'content', ...contentSlide });
    quizzes.forEach(quiz => {
      steps.push({
        type: 'quiz',
        question: quiz.q,
        options: quiz.opts,
        correctAnswer: quiz.ans,
        explanation: quiz.expl
      });
    });
  };

  // -- 1. Introduction --
  addSlide({
    sectionTitle: "Introduction",
    sectionSubtitle: "The Paradox",
    label: "Context",
    content: "The digital revolution has created a **paradox** of connectivity: we are hyper-connected yet increasingly **isolated**. This essay will discuss whether social media is a tool for bridging distances or a barrier to genuine intimacy.",
    theme: "indigo",
    vocab: [
      { term: "paradox", ru: "парадокс", uz: "paradoks" },
      { term: "intimacy", ru: "близость", uz: "yaqinlik" }
    ]
  }, [
    {
      q: "What is the 'paradox' mentioned?",
      opts: ["Computers are fast but slow", "We are connected techically but lonely emotionally", "Phones are expensive"],
      ans: 1,
      expl: "A paradox is a contradiction. The contradiction here is having 1000 friends online but 0 in real life."
    },
    {
      q: "What is the function of this intro?",
      opts: ["To define computer terms", "To present the core conflict (Bridge vs Barrier) and set the essay's scope", "To complain"],
      ans: 1,
      expl: "It sets the stage by identifying the central tension of the topic."
    }
  ]);

  // -- 2. BP1: Connection --
  addSlide({
    sectionTitle: "Body Paragraph 1",
    sectionSubtitle: "Side A: The Bridge",
    label: "Maintaining Ties",
    content: [
      "Proponents argue that technology **obliterates** geographical boundaries. It allows the **diaspora** to maintain vital familial bonds and enables niche communities to flourish across continents.",
      "**Key Concept:** Global Reach."
    ],
    theme: "blue",
    vocab: [
      { term: "obliterates", ru: "уничтожает / стирает", uz: "yo'q qiladi" },
      { term: "diaspora", ru: "диаспора (люди вне родины)", uz: "diaspora" }
    ]
  }, [
    {
      q: "What does 'obliterates' mean here?",
      opts: ["Creates", "Completely destroys/wipes out", "Draws"],
      ans: 1,
      expl: "Using strong verbs like 'obliterate' adds power. Technology doesn't just 'reduce' distance; it wipes it out."
    },
    {
      q: "Why mention 'diaspora'?",
      opts: ["It sounds fancy", "It refers to a specific group (immigrants) for whom this technology is essential", "Randomly"],
      ans: 1,
      expl: "For people living away from their home country (diaspora), social media isn't a toy; it's a lifeline."
    }
  ]);

  // -- 3. BP2: Isolation --
  addSlide({
    sectionTitle: "Body Paragraph 2",
    sectionSubtitle: "Side B: The Barrier",
    label: "Superficiality",
    content: [
      "However, critics contend that screen time replaces face-to-face interaction with **superficial** validation. The curation of 'perfect' lives fosters **inadequacy** and erodes the social skills required for conflict resolution and empathy.",
      "**Key Concept:** Quantity over Quality."
    ],
    theme: "red",
    vocab: [
      { term: "superficial", ru: "поверхностный", uz: "yuzaki" },
      { term: "inadequacy", ru: "неполноценность", uz: "yetishmovchilik hissi" }
    ]
  }, [
    {
      q: "What is the danger of 'curated' lives?",
      opts: ["They look messy", "They make others feel inadequate (not good enough) because they are fake", "They are boring"],
      ans: 1,
      expl: "If everyone posts only their best moments, viewers feel their own real lives are 'inadequate'."
    },
    {
      q: "What does 'superficial' mean?",
      opts: ["Deep", "On the surface / lacking depth", "Super fast"],
      ans: 1,
      expl: "Online likes are 'superficial' compared to the deep support of a real friend."
    }
  ]);

  // -- 4. Opinion --
  addSlide({
    sectionTitle: "Opinion",
    sectionSubtitle: "The Verdict",
    label: "Agency Matters",
    content: "I believe the impact is determined by **agency**. If used passively to consume content, it isolates. If used actively to **augment** real-world relationships, it enriches. Technology is a tool, not a master.",
    theme: "yellow",
    vocab: [
      { term: "augment", ru: "дополнять / усиливать", uz: "to'ldirmoq / kuchaytirmoq" },
      { term: "agency", ru: "активность / воля", uz: "faollik / ixtiyor" }
    ]
  }, [
    {
      q: "What is the writer's nuanced opinion?",
      opts: ["Tech is bad", "Tech is good", "It depends on HOW you use it (Active vs Passive)"],
      ans: 2,
      expl: "This is a Band 9 distinction. It moves beyond 'Good/Bad' to analyze the *method* of use."
    },
    {
      q: "What does 'augment' mean?",
      opts: ["Replace", "Add to/Improve", "Delete"],
      ans: 1,
      expl: "The writer argues we should use tech to *add to* our real lives, not replace them."
    }
  ]);

  return steps;
};

const STEPS = buildSteps();

const Lesson9: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const activeData = STEPS[currentStep];

  return (
    <div className="container mx-auto p-4 md:p-6 font-sans max-w-3xl flex flex-col min-h-full">
      <div className="mb-6 sticky top-16 bg-gray-100 pt-4 z-10 pb-4">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Lesson 9: Tech & Connection</h1>
            <p className="text-sm text-gray-500 font-medium">Step {currentStep + 1} of {STEPS.length}</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 ease-out ${activeData.type === 'quiz' ? 'bg-indigo-400' : 'bg-indigo-600'}`} style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}></div>
        </div>
      </div>
      
      <div className="flex-grow pb-24">
        <div key={currentStep} className="animate-fade-in-up">
          {activeData.type === 'content' ? (
            <FocusSlide 
              sectionTitle={activeData.sectionTitle}
              sectionSubtitle={activeData.sectionSubtitle}
              label={activeData.label}
              content={activeData.content}
              theme={activeData.theme}
              vocab={activeData.vocab}
            />
          ) : (
            <QuizSlide 
              question={activeData.question}
              options={activeData.options}
              correctAnswer={activeData.correctAnswer}
              explanation={activeData.explanation}
            />
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="max-w-3xl mx-auto flex justify-between items-center px-4">
          <button onClick={handlePrev} disabled={currentStep === 0} className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all duration-200 ${currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600 active:scale-95'}`}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>Back
          </button>
          <button onClick={handleNext} disabled={currentStep === STEPS.length - 1} className={`flex items-center px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-200 transform ${currentStep === STEPS.length - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/30 active:scale-95'}`}>
            {currentStep === STEPS.length - 1 ? 'Lesson Complete' : 'Next'}
            {currentStep !== STEPS.length - 1 && (<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lesson9;