
import React, { useState, useCallback } from 'react';
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

  const handleReset = useCallback(() => {
    setCurrentFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setActiveView('lab');
  }, []);

  const handleViewChange = (view: AppView) => {
    setActiveView(view);
  };

  const processMediaData = async (base64: string, mimeType: string, fileName: string, url: string) => {
    try {
      const analysis = await analyzeMedia(base64, mimeType);

      const detectionResult: DetectionResult = {
        isAI: analysis.is_ai_generated,
        confidence: analysis.confidence_score,
        reasoning: analysis.reasoning_summary,
        artifacts: analysis.detected_artifacts.map(a => ({
          type: a.label,
          description: a.description,
          severity: a.severity as 'low' | 'medium' | 'high'
        })),
        metadata: {
          mimeType: mimeType,
          fileSize: mimeType.startsWith('image') ? 'Captured Screen' : 'Video Stream'
        }
      };

      setResult(detectionResult);
      setActiveView('lab'); // Always switch back to lab when result is ready
      
      const newHistoryItem: ScanHistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        fileName: fileName,
        previewUrl: url,
        result: detectionResult
      };
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 5));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during forensic analysis.");
    } finally {
      setLoading(false);
    }
  };

  const handleScreenCapture = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' } as any,
        audio: false
      });

      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not initialize canvas context");
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      stream.getTracks().forEach(track => track.stop());

      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const base64 = dataUrl.split(',')[1];
      const previewUrl = dataUrl;
      
      setPreviewUrl(previewUrl);
      await processMediaData(base64, 'image/jpeg', `Screen Capture ${new Date().toLocaleTimeString()}`, previewUrl);
      
    } catch (err: any) {
      console.error(err);
      if (err.name === 'NotAllowedError') {
        setError("Screen capture permission denied.");
      } else {
        setError(err.message || "Failed to capture screen.");
      }
      setLoading(false);
    }
  };

  const onFileSelect = async (file: File) => {
    setLoading(true);
    setError(null);
    setCurrentFile(file);
    
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const res = reader.result as string;
          resolve(res.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      await processMediaData(base64, file.type, file.name, url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to process file.");
      setLoading(false);
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'docs':
        return <Documentation />;
      case 'ethics':
        return <SafetyEthics />;
      case 'lab':
      default:
        return (
          <>
            {!result && !loading ? (
              <div className="space-y-12 py-10">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                    Defend Reality with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Neural Verification</span>
                  </h2>
                  <p className="text-lg text-slate-400">
                    AuraForensics uses military-grade AI models to dissect digital media, identifying synthetic fingerprints and deepfake artifacts with precision.
                  </p>
                </div>

                <FileUploader 
                  onFileSelect={onFileSelect} 
                  onScreenCapture={handleScreenCapture}
                  isLoading={loading} 
                />

                {history.length > 0 && (
                  <div className="mt-20 space-y-6">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Recent Lab Scans
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {history.map(item => (
                        <div 
                          key={item.id} 
                          className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all cursor-pointer group"
                          onClick={() => {
                            setResult(item.result);
                            setPreviewUrl(item.previewUrl);
                          }}
                        >
                          <div className="h-32 bg-black flex items-center justify-center overflow-hidden">
                            {item.result.metadata.mimeType.startsWith('video') ? (
                              <video src={item.previewUrl} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" />
                            ) : (
                              <img src={item.previewUrl} alt="History" className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>
                          <div className="p-4 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-slate-300 truncate w-32">{item.fileName}</p>
                              <p className="text-[10px] text-slate-500 mono">{new Date(item.timestamp).toLocaleTimeString()}</p>
                            </div>
                            <div className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${item.result.isAI ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                              {item.result.isAI ? 'Synthetic' : 'Authentic'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : loading ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
                 <div className="relative">
                    <div className="w-24 h-24 border-4 border-indigo-500/20 rounded-full"></div>
                    <div className="absolute top-0 w-24 h-24 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 20a10.003 10.003 0 006.239-2.139l.054.09m-3.272-12.27l-.054.09A10.003 10.003 0 0012 4c-1.397 0-2.716.286-3.911.801m1.94 2.199A3 3 0 0012 13c1.397 0 2.716-.286 3.911-.801m-1.94-2.199a3 3 0 11-4.743-3.615" />
                       </svg>
                    </div>
                 </div>
                 <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Extracting Fingerprints...</h2>
                    <p className="text-slate-400 max-w-sm">Comparing latent space patterns and edge diffusion characteristics against known generator signatures.</p>
                 </div>
              </div>
            ) : result && previewUrl ? (
              <div className="py-6">
                <AnalysisResult result={result} mediaUrl={previewUrl} onReset={handleReset} />
              </div>
            ) : null}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header onViewChange={handleViewChange} activeView={activeView} />

      <main className="flex-1 container mx-auto px-6 py-12 max-w-7xl">
        {renderActiveView()}

        {error && (
          <div className="max-w-xl mx-auto mt-8 p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-start gap-4 animate-in fade-in zoom-in-95">
            <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-bold text-red-400">Analysis Error</h4>
              <p className="text-sm text-red-300/80">{error}</p>
              <button 
                onClick={handleReset}
                className="mt-2 text-xs font-bold text-red-400 hover:text-red-300 underline"
              >
                Try Another File
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-900 py-8 px-6 bg-slate-950">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 AuraForensics. Advanced Synthetic Content Detection Platform.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-slate-500 text-xs">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              API Status: Operational
            </span>
            <div className="flex gap-4 text-slate-500">
               <button onClick={() => handleViewChange('docs')} className="text-xs hover:text-white transition-colors">Documentation</button>
               <button onClick={() => handleViewChange('ethics')} className="text-xs hover:text-white transition-colors">Ethics</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
