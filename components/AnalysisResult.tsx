
import React, { useRef, useEffect } from 'react';
import { DetectionResult } from '../types';

interface AnalysisResultProps {
  result: DetectionResult;
  mediaUrl: string;
  onReset: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, mediaUrl, onReset }) => {
  const isAI = result.isAI;
  const confidencePercent = Math.round(result.confidence * 100);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = result.metadata.mimeType.startsWith('video');

  // Auto-pause video when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Left: Media Preview & Forensic Overlay */}
      <div className="space-y-4">
        <div className="relative group rounded-2xl overflow-hidden border border-slate-700 bg-black aspect-video lg:h-[500px] flex items-center justify-center shadow-2xl">
          {isVideo ? (
            <video 
              ref={videoRef}
              src={mediaUrl} 
              controls 
              playsInline
              className="w-full h-full object-contain"
              preload="auto"
            />
          ) : (
            <img 
              src={mediaUrl} 
              alt="Forensic Preview" 
              className="max-h-full max-w-full object-contain" 
            />
          )}
          
          {/* Status Badge Overlay */}
          <div className="absolute top-4 left-4 z-10">
            <div className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest backdrop-blur-md shadow-xl border flex items-center gap-2
              ${isAI ? 'bg-red-500/80 text-white border-red-400' : 'bg-emerald-500/80 text-white border-emerald-400'}
            `}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${isAI ? 'bg-white' : 'bg-white'}`}></span>
              {isAI ? 'AI Signature Detected' : 'No AI Signatures Found'}
            </div>
          </div>

          {/* Forensic Crosshair Overlay (Decorative) */}
          <div className="absolute inset-0 pointer-events-none border border-white/5 opacity-30">
            <div className="absolute top-1/2 left-4 right-4 h-px bg-white/10"></div>
            <div className="absolute left-1/2 top-4 bottom-4 w-px bg-white/10"></div>
          </div>
        </div>
        
        <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between">
          <div className="flex gap-6">
            <div className="space-y-1">
              <span className="block mono text-[10px] text-slate-500 uppercase tracking-tighter">Media Format</span>
              <p className="text-xs font-bold text-slate-300">{result.metadata.mimeType.split('/')[1].toUpperCase()}</p>
            </div>
            <div className="space-y-1">
              <span className="block mono text-[10px] text-slate-500 uppercase tracking-tighter">Source Type</span>
              <p className="text-xs font-bold text-slate-300">{result.metadata.fileSize || 'Standard Upload'}</p>
            </div>
            {isVideo && (
              <div className="space-y-1">
                <span className="block mono text-[10px] text-slate-500 uppercase tracking-tighter">Analysis Mode</span>
                <p className="text-xs font-bold text-indigo-400">Temporal Coherence</p>
              </div>
            )}
          </div>
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-white font-bold rounded-lg transition-colors border border-slate-700"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Lab
          </button>
        </div>
      </div>

      {/* Right: Detailed Analysis */}
      <div className="space-y-6">
        <section className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] -mr-16 -mt-16 opacity-20 ${isAI ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Forensic Report
            </h2>
            <div className="text-right">
              <span className="block text-[10px] text-slate-500 mono uppercase mb-1 tracking-widest">Confidence Index</span>
              <span className={`text-3xl font-black tracking-tighter ${isAI ? 'text-red-400' : 'text-emerald-400'}`}>
                {confidencePercent}%
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-1.5 mb-8 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${isAI ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]' : 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]'}`}
              style={{ width: `${confidencePercent}%` }}
            ></div>
          </div>

          <div className="space-y-4">
             <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Neural Summary</h4>
             <p className="text-slate-300 leading-relaxed text-sm bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
               {result.reasoning}
             </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Anomalies Detected
            </h3>
            <span className="text-[10px] text-slate-600 mono">{result.artifacts.length} Findings</span>
          </div>
          
          <div className="grid gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {result.artifacts.length > 0 ? result.artifacts.map((artifact, idx) => (
              <div key={idx} className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-indigo-500/30 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      artifact.severity === 'high' ? 'bg-red-500' : 
                      artifact.severity === 'medium' ? 'bg-orange-500' : 
                      'bg-slate-500'
                    }`}></span>
                    <span className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">{artifact.type}</span>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter ${
                    artifact.severity === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                    artifact.severity === 'medium' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 
                    'bg-slate-800 text-slate-500'
                  }`}>
                    {artifact.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">{artifact.description}</p>
              </div>
            )) : (
              <div className="p-12 text-center bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-slate-700 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm italic">Clean Scan: No obvious synthetic fingerprints identified in the pixel data or temporal stream.</p>
              </div>
            )}
          </div>
        </section>
        
        <div className="pt-4">
          <button 
            onClick={() => window.print()}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold rounded-xl transition-all border border-slate-800 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Generate Forensic PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
