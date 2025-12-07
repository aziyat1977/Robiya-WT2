import React from 'react';

const Home: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-8">
      <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-2xl border border-gray-100">
        <div className="text-6xl mb-6">📚</div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          IELTS Writing Task 2 Masterclass
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Welcome to your interactive essay structure guide. Learn how to construct high-scoring essays with detailed component breakdowns.
        </p>
        <button 
          onClick={onStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition transform hover:scale-105 flex items-center justify-center mx-auto"
        >
          <span>Start Lesson 1</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;