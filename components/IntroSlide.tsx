import React from 'react';

interface IntroSlideProps {
  title: string;
  question: string;
  thesis: string;
  arguments: string[];
}

const IntroSlide: React.FC<IntroSlideProps> = ({ title, question, thesis, arguments: args }) => {
  return (
    <div className="p-10 rounded-xl shadow-2xl bg-indigo-50 border-4 border-indigo-200 mb-10">
      <h1 className="text-4xl font-extrabold mb-6 text-indigo-900 text-center">
        {title} ☕
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500 mb-6">
        <h3 className="text-xl font-bold mb-3 text-indigo-700">IELTS Task 2 Question:</h3>
        <p className="text-gray-700 italic">
          {question}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-xl font-bold mb-3 text-green-700">Thesis Position</h3>
          <p className="font-semibold text-gray-700">
            {thesis}
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-xl font-bold mb-3 text-purple-700">Main Arguments</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {args.map((arg, index) => (
              <li key={index} className="font-medium">{arg}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IntroSlide;