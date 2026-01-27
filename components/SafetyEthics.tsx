
import React from 'react';

const SafetyEthics: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-12">
        <header className="space-y-4">
          <h2 className="text-3xl font-extrabold text-white">Safety & Ethical Guidelines</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Digital truth is increasingly fragile. AuraForensics is built on a foundation of transparency and responsible disclosure.
          </p>
        </header>

        <section className="space-y-8">
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">The AI Arms Race</h3>
            <p className="text-slate-300 mt-4 leading-relaxed">
              Detection is not a permanent solution. As generative models improve, detection becomes harder. AuraForensics is a diagnostic tool, not a final arbiter of truth. We encourage users to use detection results as one of several signals in their investigative process.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex gap-4 p-6 bg-red-900/10 border border-red-500/20 rounded-2xl">
              <div className="flex-shrink-0 w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white">Limitations of Detection</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  No detection tool is 100% accurate. False positives (real content labeled as AI) and false negatives (AI content labeled as real) are possible. Heavy compression or artistic filters can often trigger false detection.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-indigo-900/10 border border-indigo-500/20 rounded-2xl">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.432c2.735 0 5.23-.915 7.218-2.454C20.806 17.312 21.667 15.222 21.667 13c0-4.787-3.88-8.667-8.667-8.667S4.333 8.213 4.333 13c0 2.222.861 4.312 2.449 5.978A11.93 11.93 0 0012 21.432z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white">Responsible Usage</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Avoid using this tool to harass or de-legitimize digital artists. Many real artists use AI-assisted tools for specific parts of their workflow. Respect privacy: do not analyze media that was obtained without consent or that violates individuals' privacy rights.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-4">
            <h4 className="text-lg font-bold text-white">Our Mission</h4>
            <p className="text-slate-400 italic max-w-2xl mx-auto">
              "To empower global citizens with the tools necessary to navigate an era of synthetic media, fostering digital literacy and protecting the integrity of our shared reality."
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SafetyEthics;
