import React, { useState } from 'react';
import Lesson1 from './pages/Lesson1';
import Lesson2 from './pages/Lesson2';
import Lesson3 from './pages/Lesson3';
import Lesson4 from './pages/Lesson4';
import Lesson5 from './pages/Lesson5';
import Lesson6 from './pages/Lesson6';
import Lesson7 from './pages/Lesson7';
import Lesson8 from './pages/Lesson8';
import Lesson9 from './pages/Lesson9';
import Lesson10 from './pages/Lesson10';
import Home from './pages/Home';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'lesson1' | 'lesson2' | 'lesson3' | 'lesson4' | 'lesson5' | 'lesson6' | 'lesson7' | 'lesson8' | 'lesson9' | 'lesson10'>('home');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navigateTo = (view: 'home' | 'lesson1' | 'lesson2' | 'lesson3' | 'lesson4' | 'lesson5' | 'lesson6' | 'lesson7' | 'lesson8' | 'lesson9' | 'lesson10') => {
    setCurrentView(view);
    closeSidebar();
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans relative overflow-x-hidden flex flex-col">
      
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-30 h-16 flex items-center px-4 transition-all">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Open Menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="ml-4 font-bold text-xl text-gray-800 tracking-tight">
          IELTS Masterclass
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar Menu */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-indigo-50 h-16">
          <h2 className="font-extrabold text-xl text-indigo-900">Course Menu</h2>
          <button onClick={closeSidebar} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <button 
            onClick={() => navigateTo('home')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
              currentView === 'home' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3">🏠</span> Home
          </button>
          
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Lessons</p>
          </div>

          <button 
            onClick={() => navigateTo('lesson1')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
              currentView === 'lesson1' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3 text-lg">☕</span> 
            <div>
              <div className="text-sm font-semibold">Lesson 1</div>
              <div className="text-xs opacity-75">Coffee Chains Essay</div>
            </div>
          </button>

          <button 
            onClick={() => navigateTo('lesson2')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
              currentView === 'lesson2' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3 text-lg">🏙️</span> 
            <div>
              <div className="text-sm font-semibold">Lesson 2</div>
              <div className="text-xs opacity-75">Future of City Life</div>
            </div>
          </button>

          <button 
            onClick={() => navigateTo('lesson3')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
              currentView === 'lesson3' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3 text-lg">💻</span> 
            <div>
              <div className="text-sm font-semibold">Lesson 3</div>
              <div className="text-xs opacity-75">Remote Work</div>
            </div>
          </button>

          <button 
            onClick={() => navigateTo('lesson4')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
              currentView === 'lesson4' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3 text-lg">🌍</span> 
            <div>
              <div className="text-sm font-semibold">Lesson 4</div>
              <div className="text-xs opacity-75">International Aid</div>
            </div>
          </button>

          <button 
            onClick={() => navigateTo('lesson5')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
              currentView === 'lesson5' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3 text-lg">⚖️</span> 
            <div>
              <div className="text-sm font-semibold">Lesson 5</div>
              <div className="text-xs opacity-75">Crime & Punishment</div>
            </div>
          </button>

          <button 
            onClick={() => navigateTo('lesson6')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
              currentView === 'lesson6' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3 text-lg">🎓</span> 
            <div>
              <div className="text-sm font-semibold">Lesson 6</div>
              <div className="text-xs opacity-75">Function of University</div>
            </div>
          </button>

          <button 
            onClick={() => navigateTo('lesson7')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
              currentView === 'lesson7' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3 text-lg">🌿</span> 
            <div>
              <div className="text-sm font-semibold">Lesson 7</div>
              <div className="text-xs opacity-75">Environment Responsibility</div>
            </div>
          </button>
          
          <button 
            onClick={() => navigateTo('lesson8')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
              currentView === 'lesson8' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3 text-lg">⛰️</span> 
            <div>
              <div className="text-sm font-semibold">Lesson 8</div>
              <div className="text-xs opacity-75">Frontier Tourism</div>
            </div>
          </button>

          <button 
            onClick={() => navigateTo('lesson9')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
              currentView === 'lesson9' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3 text-lg">📱</span> 
            <div>
              <div className="text-sm font-semibold">Lesson 9</div>
              <div className="text-xs opacity-75">Technology & Connection</div>
            </div>
          </button>

          <button 
            onClick={() => navigateTo('lesson10')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
              currentView === 'lesson10' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3 text-lg">🗣️</span> 
            <div>
              <div className="text-sm font-semibold">Lesson 10</div>
              <div className="text-xs opacity-75">Globalization & Language</div>
            </div>
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="pt-16 flex-grow flex flex-col transition-all duration-300">
        {currentView === 'home' && <Home onStart={() => navigateTo('lesson1')} />}
        {currentView === 'lesson1' && <Lesson1 />}
        {currentView === 'lesson2' && <Lesson2 />}
        {currentView === 'lesson3' && <Lesson3 />}
        {currentView === 'lesson4' && <Lesson4 />}
        {currentView === 'lesson5' && <Lesson5 />}
        {currentView === 'lesson6' && <Lesson6 />}
        {currentView === 'lesson7' && <Lesson7 />}
        {currentView === 'lesson8' && <Lesson8 />}
        {currentView === 'lesson9' && <Lesson9 />}
        {currentView === 'lesson10' && <Lesson10 />}
      </main>
      
    </div>
  );
}

export default App;