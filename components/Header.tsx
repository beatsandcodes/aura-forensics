
import React from 'react';

interface HeaderProps {
  onViewChange: (view: 'lab' | 'docs' | 'ethics') => void;
  activeView: string;
}

const Header: React.FC<HeaderProps> = ({ onViewChange, activeView }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => onViewChange('lab')}
      >
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.432c2.735 0 5.23-.915 7.218-2.454C20.806 17.312 21.667 15.222 21.667 13c0-4.787-3.88-8.667-8.667-8.667S4.333 8.213 4.333 13c0 2.222.861 4.312 2.449 5.978A11.93 11.93 0 0012 21.432z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Aura<span className="text-indigo-400">Forensics</span></h1>
          <p className="text-xs text-slate-400 mono uppercase tracking-widest">AI Detection Lab</p>
        </div>
      </div>
      <nav className="flex items-center gap-4 md:gap-8">
        <button 
          onClick={() => onViewChange('docs')}
          className={`text-sm font-medium transition-colors ${activeView === 'docs' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}
        >
          Documentation
        </button>
        <button 
          onClick={() => onViewChange('ethics')}
          className={`text-sm font-medium transition-colors ${activeView === 'ethics' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}
        >
          Safety Ethics
        </button>
        <button 
          onClick={() => onViewChange('lab')}
          className={`hidden md:block px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-md transition-all border border-indigo-400/20 shadow-lg shadow-indigo-500/10 ${activeView === 'lab' ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900' : ''}`}
        >
          Open Lab
        </button>
      </nav>
    </header>
  );
};

export default Header;
