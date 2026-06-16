import React, { useState, useCallback, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import AnalysisResult from './components/AnalysisResult';
import Documentation from './components/Documentation';
import SafetyEthics from './components/SafetyEthics';
import { DetectionResult, ScanHistoryItem } from './types';
import { analyzeMedia } from './services/geminiService';

type AppView = 'lab' | 'docs' | 'ethics';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('lab');
  const [loading, setLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [isConfigMissing, setIsConfigMissing] = useState(false);

  useEffect(() => {
    if (!process.env.API_KEY || process.env.API_KEY === "undefined" || process.env.API_KEY === "") {
      setIsConfigMissing(true);
    }
    
    const savedHistory = localStorage.getItem('aura_history');
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aura_history', JSON.stringify(history));
  }, [history]);

  const handleReset = useCallback(() => {
    setCurrentFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setActiveView('lab');
  }, []);

  const onFileSelect = async (file: File) => {
    if (isConfigMissing) return;

    setLoading(true);
    setError(null);
    setCurrentFile(file);
    
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const analysis = await analyzeMedia(base64, file.type);
      const detectionResult: DetectionResult = {
        isAI: analysis.is_ai_generated,
        confidence: analysis.confidence_score,
        reasoning: analysis.reasoning_summary,
        artifacts: analysis.detected_artifacts.map(a => ({
          type: a.label, description: a.description, severity: a.severity as any
        })),
        metadata: { mimeType: file.type, fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB` }
      };

      setResult(detectionResult);
      
      setHistory(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        fileName: file.name,
        previewUrl: url,
        result: detectionResult
      }, ...prev].slice(0, 10));
    } catch (err: any) {
      setError(err.message || "Forensic analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'docs': return <Documentation />;
      case 'ethics': return <SafetyEthics />;
      case 'lab':
      default:
        return (
          <div className="space-y-12 py-10">
            {!result && !loading && (
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                  Defend Reality with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Neural Verification</span>
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
                  Professional-grade forensic tool to detect AI-generated images and videos using advanced neural analysis.
                </p>
              </div>
            )}

            {!result && !loading ? (
              <FileUploader 
                onFileSelect={onFileSelect} 
                isLoading={loading} 
              />
            ) : loading ? (
               <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
                  <div className="w-24 h-24 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Extracting Fingerprints...</h2>
                  <p className="text-slate-500 animate-pulse">Analyzing neural textures and latent patterns</p>
               </div>
            ) : result && previewUrl ? (
              <AnalysisResult result={result} mediaUrl={previewUrl} onReset={handleReset} />
            ) : null}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header 
        onViewChange={(v) => setActiveView(v as AppView)} 
        activeView={activeView} 
      />
      <main className="flex-1 container mx-auto px-6 py-12 max-w-7xl">
        {renderActiveView()}
        {error && <div className="max-w-xl mx-auto mt-8 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400">{error}</div>}
      </main>
      <Analytics />
    </div>
  );
};

export default App;
