import React from 'react';

interface HeaderProps {
  onViewChange: (view: 'lab' | 'docs' | 'ethics') => void;
  activeView: string;
}

const Header: React.FC<HeaderProps> = ({ onViewChange, activeView }) => {
  // Check if the API key is configured
  const isConfigured = !!process.env.API_KEY && process.env.API_KEY !== "undefined" && process.env.API_KEY !== "";

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-1 sm:gap-4 overflow-hidden">
      {/* Logo Section - Uses min-w-0 to allow shrinking on tiny screens */}
      <div 
        className="flex items-center gap-1.5 sm:gap-3 cursor-pointer group flex-1 min-w-0"
        onClick={() => onViewChange('lab')}
      >
        <div className="w-7 h-7 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
          <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.432c2.735 0 5.23-.915 7.218-2.454C20.806 17.312 21.667 15.222 21.667 13c0-4.787-3.88-8.667-8.667-8.667S4.333 8.213 4.333 13c0 2.222.861 4.312 2.449 5.978A11.93 11.93 0 0012 21.432z" />
          </svg>
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1 overflow-hidden">
            <h1 className="text-[12px] sm:text-xl font-bold tracking-tight text-white truncate leading-none">
              Aura<span className="text-indigo-400">Forensics</span>
            </h1>
            {isConfigured && (
              <span 
                className="flex h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse flex-shrink-0" 
                title="Forensic Engine Online"
              ></span>
            )}
          </div>
          <p className="text-[6px] sm:text-xs text-slate-500 mono uppercase tracking-[0.05em] sm:tracking-[0.15em] leading-none truncate mt-0.5 sm:mt-1">Detection Lab</p>
        </div>
      </div>
      
      {/* Navigation Section - flex-shrink-0 ensures buttons don't disappear */}
      <nav className="flex items-center gap-2.5 sm:gap-6 flex-shrink-0">
        <button 
          onClick={() => onViewChange('docs')}
          className={`text-[10px] sm:text-sm font-semibold uppercase tracking-wider transition-colors ${activeView === 'docs' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
        >
          {/* Label automatically shortens on mobile/tablet */}
          Docs<span className="hidden lg:inline">umentation</span>
        </button>
        <button 
          onClick={() => onViewChange('ethics')}
          className={`text-[10px] sm:text-sm font-semibold uppercase tracking-wider transition-colors ${activeView === 'ethics' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
        >
          Ethics
        </button>
        <button 
          onClick={() => onViewChange('lab')}
          className={`hidden sm:block px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] sm:text-xs font-bold rounded-md transition-all border border-indigo-400/20 shadow-lg shadow-indigo-500/10 ${activeView === 'lab' ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900' : ''}`}
        >
          Open Lab
        </button>
      </nav>
    </header>
  );
};

export default Header;
