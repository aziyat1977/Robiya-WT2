import React, { useState, useEffect } from 'react';
import FocusSlide from '../components/FocusSlide';
import QuizSlide from '../components/QuizSlide';

// -- Types --

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

// -- Lesson Data Construction --

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

  // -- 1. Planning: Task Analysis --
  addSlide({
    sectionTitle: "Cullen Planning Phase",
    sectionSubtitle: "Step A: Task Analysis",
    label: "Prompt Breakdown",
    content: "Some think universities should provide **knowledge and skills** related to a future career. Others think the function is to give access to knowledge for its own sake. \n\n**Type:** Discuss both views + Opinion.",
    theme: "indigo",
    vocab: [
      { term: "tertiary education", ru: "высшее образование", uz: "oliy ta'lim" },
      { term: "vocational", ru: "профессиональный (прикладной)", uz: "kasb-hunar" }
    ]
  }, [
    {
      q: "What are the two contrasting views?",
      opts: ["Public vs Private School", "Vocational (Job) Focus vs Academic (Knowledge) Focus", "Science vs Arts"],
      ans: 1,
      expl: "The prompt contrasts 'skills for future career' (Vocational) with 'knowledge for its own sake' (Academic/Theoretical)."
    },
    {
      q: "Does 'knowledge for its own sake' mean useless knowledge?",
      opts: ["Yes", "No, it refers to theoretical understanding, critical thinking, and cultural breadth", "It means memorizing facts"],
      ans: 1,
      expl: "In an academic context, this refers to pure science, philosophy, and arts—subjects that develop the mind but may not have a direct 'factory' application."
    }
  ]);

  // -- 2. Planning: Position --
  addSlide({
    sectionTitle: "Cullen Planning Phase",
    sectionSubtitle: "Step B: Position",
    label: "Thesis Statement",
    content: "**Position:** Balanced View. \n**Thesis:** While improving **employability** is a practical necessity, I believe the **fundamental** purpose of university is to develop critical thinking and theoretical understanding.",
    theme: "indigo",
    vocab: [
      { term: "employability", ru: "способность к трудоустройству", uz: "ishga joylashish qobiliyati" },
      { term: "fundamental", ru: "основополагающий", uz: "asosiy" }
    ]
  }, [
    {
      q: "Why is 'employability' a key word?",
      opts: ["It is long", "It precisely describes the quality of being suitable for paid work", "It means being an employee"],
      ans: 1,
      expl: "Using 'employability' instead of 'getting a job' shows Band 9 Lexical Resource."
    },
    {
      q: "What is the writer's stance?",
      opts: ["Universities are job factories", "Universities should only teach philosophy", "Jobs are important, but the core mission is intellectual development"],
      ans: 2,
      expl: "The thesis gives weight to the job argument ('practical necessity') but places the 'fundamental purpose' on the intellectual side."
    }
  ]);

  // -- 3. Planning: Blueprint --
  addSlide({
    sectionTitle: "Cullen Planning Phase",
    sectionSubtitle: "Step C: Structure",
    label: "The Outline",
    content: [
      "**BP1 (Side A):** The Utilitarian View (Economic investment requires financial return/jobs).",
      "**BP2 (Side B):** The Academic View (Innovation comes from pure research/theory).",
      "**BP3 (Opinion):** A degree should teach you *how* to think, not just *what* to do."
    ],
    theme: "indigo",
    vocab: [
      { term: "utilitarian", ru: "утилитарный / практичный", uz: "amaliy / foydali" },
      { term: "innovation", ru: "инновация", uz: "innovatsiya" }
    ]
  }, [
    {
      q: "What does 'Utilitarian' mean?",
      opts: ["Beautiful", "Designed to be useful or practical rather than attractive", "Related to utilities"],
      ans: 1,
      expl: "The 'Utilitarian' view of education treats it as a tool to get money/jobs, rather than a spiritual or intellectual journey."
    },
    {
      q: "How does BP2 challenge BP1?",
      opts: ["It says BP1 is wrong", "It argues that true economic value actually comes from theory/innovation, not just job training", "It ignores BP1"],
      ans: 1,
      expl: "A sophisticated argument doesn't just say 'No'. It argues that the opposing view is shortsighted. Innovation requires theory."
    }
  ]);

  // -- 4. Introduction --
  addSlide({
    sectionTitle: "Essay Writing",
    sectionSubtitle: "Introduction",
    label: "The Context",
    content: "The primary function of **tertiary education** remains a contentious issue. While many view university as a direct **conduit** to the workforce, others argue it should remain a sanctuary for **intellectual curiosity**.",
    theme: "blue",
    vocab: [
      { term: "conduit", ru: "канал / средство передачи", uz: "vositachi / yo'l" },
      { term: "contentious", ru: "спорным", uz: "bahsli" }
    ]
  }, [
    {
      q: "What metaphor is used here?",
      opts: ["Sanctuary", "Factory", "Playground"],
      ans: 0,
      expl: "Calling university a 'sanctuary' (a safe place) for curiosity implies it needs protection from the pressures of the 'real world'."
    },
    {
      q: "What does 'conduit' mean?",
      opts: ["A pipe or channel", "A barrier", "A conductor"],
      ans: 0,
      expl: "Describing university as a 'conduit' to the workforce means viewing it merely as a pipe you pass through to get a job."
    }
  ]);

  // -- 5. BP1: Job Market --
  addSlide({
    sectionTitle: "Body Paragraph 1",
    sectionSubtitle: "Side A: The Economic Reality",
    label: "Return on Investment",
    content: [
      "Proponents of the practical view argue that in a competitive global economy, degrees must be **vocational**. Given the high cost of tuition, students expect a **tangible return on investment** in the form of high-paying employment.",
      "**Example:** Engineering and Medicine."
    ],
    theme: "red",
    vocab: [
      { term: "tangible", ru: "ощутимый", uz: "sezilarli / aniq" },
      { term: "vocational", ru: "профессионально-ориентированный", uz: "kasbga yo'naltirilgan" }
    ]
  }, [
    {
      q: "Why is 'Return on Investment' (ROI) mentioned?",
      opts: ["It is a business essay", "It acknowledges the reality that students pay money and want money back", "To confuse the reader"],
      ans: 1,
      expl: "Applying economic logic (ROI) to education is the core of the 'utilitarian' argument. It strengthens Side A."
    },
    {
      q: "What kinds of degrees support this view best?",
      opts: ["Philosophy", "STEM (Science, Tech, Engineering, Medicine)", "History"],
      ans: 1,
      expl: "Engineering and Medicine are purely vocational. You study them specifically to do that job. They are the strongest examples for Side A."
    }
  ]);

  // -- 6. BP2: Knowledge --
  addSlide({
    sectionTitle: "Body Paragraph 2",
    sectionSubtitle: "Side B: The Academic Ideal",
    label: "Theoretical Underpinnings",
    content: [
      "However, treating universities solely as job training centers undervalues their role in fostering **theoretical underpinnings**. Progress in science and society relies on **blue-sky research**—knowledge pursued without immediate commercial application.",
      "**Key Concept:** Innovation requires abstract thought."
    ],
    theme: "green",
    vocab: [
      { term: "theoretical underpinnings", ru: "теоретические основы", uz: "nazariy asoslar" },
      { term: "blue-sky research", ru: "фундаментальные исследования", uz: "fundamental tadqiqotlar" }
    ]
  }, [
    {
      q: "What is 'blue-sky research'?",
      opts: ["Research on the weather", "Research driven by curiosity without immediate real-world use", "Research on airplanes"],
      ans: 1,
      expl: "This is a high-level idiom. It refers to scientific research where the 'real world' applications might not be known for 50 years (e.g., Quantum physics)."
    },
    {
      q: "How does this paragraph connect 'theory' to 'progress'?",
      opts: ["It says theory is boring", "It argues that without abstract theory, we wouldn't have new inventions", "It says progress is fast"],
      ans: 1,
      expl: "The argument is that if we only taught 'job skills', we would never invent anything new. Theory is the seed of innovation."
    }
  ]);

  // -- 7. BP3: Opinion --
  addSlide({
    sectionTitle: "Body Paragraph 3",
    sectionSubtitle: "The Writer's Opinion",
    label: "Synthesis",
    content: "I believe that while universities must ensure graduates are not **destitute**, their distinct value lies in teaching **cognitive flexibility**. A specific job skill becomes obsolete in ten years; the ability to analyze complex systems lasts a lifetime.",
    theme: "yellow",
    vocab: [
      { term: "destitute", ru: "обездоленный / нищий", uz: "chou-so'qsiz / g'arib" },
      { term: "obsolete", ru: "устаревший", uz: "eskirgan" }
    ]
  }, [
    {
      q: "What is the contrast between 'job skill' and 'cognitive flexibility'?",
      opts: ["Short-term vs Long-term", "Hard vs Easy", "Cheap vs Expensive"],
      ans: 0,
      expl: "The writer argues that job skills become 'obsolete' (short-term), while thinking skills last a 'lifetime' (long-term). This is the 'why' of the opinion."
    },
    {
      q: "What does 'destitute' mean?",
      opts: ["Rich", "Without the basic necessities of life", "Sad"],
      ans: 1,
      expl: "It's an extreme word for poor. The writer admits universities shouldn't leave students poor, but money isn't the *only* goal."
    }
  ]);

  // -- 8. Conclusion --
  addSlide({
    sectionTitle: "Conclusion",
    sectionSubtitle: "Final Verdict",
    label: "The Hierarchy of Purpose",
    content: "In conclusion, while university education has a clear economic function, its **overriding** purpose is to advance human understanding. Reducing the academy to a mere **vocational college** stifles the innovation that drives society forward.",
    theme: "purple",
    vocab: [
      { term: "overriding", ru: "главенствующий / основной", uz: "ustuvor / hal qiluvchi" },
      { term: "stifles", ru: "подавляет / душит", uz: "bo'g'adi / to'sqinlik qiladi" }
    ]
  }, [
    {
      q: "What does 'reducing' mean here?",
      opts: ["Making smaller", "Simplifying something in a way that creates a loss of value", "Dieting"],
      ans: 1,
      expl: "To 'reduce' X to Y implies X was something greater. Reducing university to a trade school implies a loss of its soul."
    },
    {
      q: "What is the final warning?",
      opts: ["Universities will close", "Focusing only on jobs 'stifles innovation'", "Tuition is too high"],
      ans: 1,
      expl: "The essay ends with a warning: if we focus too much on jobs, we stop inventing the future (innovation)."
    }
  ]);

  // -- 9. Scorecard --
  addSlide({
    sectionTitle: "Band 9 Analysis",
    sectionSubtitle: "Key Takeaways",
    label: "Why this works",
    content: [
      "**Task Response:** Addressed the tension between 'skills' and 'knowledge' directly.",
      "**Lexical Resource:** Used precise academic terms: 'Tertiary education', 'Cognitive flexibility', 'Obsolete'.",
      "**Coherence:** Used 'While', 'However', 'In conclusion' to structure the debate."
    ],
    theme: "indigo",
    vocab: [
      { term: "tension", ru: "напряжение / противоречие", uz: "taranglik / ziddiyat" },
      { term: "academic", ru: "академический", uz: "akademik" }
    ]
  }, [
    {
      q: "Why is 'Cognitive Flexibility' a Band 9 term?",
      opts: ["It is long", "It is a precise psychological term describing a high-level mental skill", "It sounds funny"],
      ans: 1,
      expl: "Instead of saying 'good thinking', using 'cognitive flexibility' shows you know the specific vocabulary of education and psychology."
    },
    {
      q: "What is the 'tension' in an essay?",
      opts: ["The writer is nervous", "The conflict between two opposing ideas", "The paper is tight"],
      ans: 1,
      expl: "A good Discussion essay explores the 'tension' or conflict between the two views, rather than just listing them separately."
    }
  ]);

  return steps;
};

const STEPS = buildSteps();

const Lesson6: React.FC = () => {
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
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Lesson 6: Function of University</h1>
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

export default Lesson6;