import React from 'react';

interface SlideRow {
  label: string;
  content: string;
}

interface SlideProps {
  title: string;
  subtitle?: string;
  rows: SlideRow[];
  bgColor: string;
}

const Slide: React.FC<SlideProps> = ({ title, subtitle, rows, bgColor }) => {
  return (
    <div className={`p-8 rounded-lg shadow-xl mb-10 ${bgColor} text-gray-800`}>
      <h2 className="text-3xl font-extrabold border-b-4 border-yellow-500 pb-2 mb-4 text-center">
        {title}
      </h2>
      {subtitle && (
        <h3 className="text-xl font-semibold mb-6 text-center text-gray-600">{subtitle}</h3>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-600 uppercase w-1/4">
                Component
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-600 uppercase w-3/4">
                Content
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-4 px-6 font-bold text-gray-900 border-r border-gray-200 align-top">
                  {row.label}
                </td>
                <td className="py-4 px-6 italic text-gray-700">
                  {/* Render bold markdown-like syntax */}
                  {row.content.split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i} className="font-bold text-gray-900">{part}</strong> : part
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Slide;