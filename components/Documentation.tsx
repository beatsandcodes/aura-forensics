
import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-12">
        <header className="space-y-4">
          <h2 className="text-3xl font-extrabold text-white">Technical Documentation</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            AuraForensics utilizes advanced multimodal Large Language Models (LLMs) to perform deep semantic and visual analysis of media assets.
          </p>
        </header>

        <section className="grid gap-8">
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <h3 className="text-xl font-bold text-indigo-400 mb-4">Detection Methodology</h3>
            <div className="space-y-4 text-slate-300">
              <p>
                Unlike traditional hash-based detection, our neural engine looks for "generative signatures"—microscopic errors in how AI models represent reality.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
                <li><strong className="text-slate-200">Latent Space Artifacts:</strong> Identifying repeated patterns in texture that occur when a model "hallucinates" high-frequency details.</li>
                <li><strong className="text-slate-200">Semantic Inconsistency:</strong> Detecting objects that make sense visually but not contextually (e.g., a hand with six fingers).</li>
                <li><strong className="text-slate-200">Temporal Flickering:</strong> In video, we analyze frame-to-frame consistency to find flickering in backgrounds or "ghosting" around moving subjects.</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2">Image Analysis</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Scans for diffusion noise patterns, lighting mismatches, and GAN-specific blurring in complex regions like eyes, hair, and distant landscapes.
              </p>
            </div>
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2">Video Analysis</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Evaluates motion vectors and temporal coherence. Identifies frame-interpolation artifacts common in high-end video generators.
              </p>
            </div>
          </div>

          <div className="p-6 bg-indigo-900/10 border border-indigo-500/20 rounded-2xl">
            <h3 className="text-lg font-bold text-indigo-300 mb-2">How to interpret results?</h3>
            <p className="text-sm text-slate-300 mb-4">
              The "Confidence Score" represents the neural network's certainty based on detected artifacts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="block text-xs font-bold text-slate-500 uppercase mb-1">0% - 30%</span>
                <span className="text-xs text-emerald-400">Low Probability AI</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="block text-xs font-bold text-slate-500 uppercase mb-1">31% - 70%</span>
                <span className="text-xs text-orange-400">Potential Manipulation</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="block text-xs font-bold text-slate-500 uppercase mb-1">71% - 100%</span>
                <span className="text-xs text-red-400">High Probability AI</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
