
import React, { useState, useEffect, useCallback } from 'react';
import { VerificationStatus } from './types';
import WebcamScanner from './components/WebcamScanner';
import LivenessDashboard from './components/LivenessDashboard';
import TechnicalBlueprint from './components/TechnicalBlueprint';
import { ShieldCheck, Lock, Fingerprint, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.IDLE);
  const [activeView, setActiveView] = useState<'vault' | 'blueprint'>('vault');

  const handleVerificationComplete = (success: boolean) => {
    setStatus(success ? VerificationStatus.SUCCESS : VerificationStatus.FAILED);
  };

  const resetVerification = () => {
    setStatus(VerificationStatus.IDLE);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-blue-500/30">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold tracking-tighter uppercase italic">The Vault</span>
            <div className="ml-4 px-2 py-0.5 rounded border border-blue-500/30 bg-blue-500/10 text-[10px] mono text-blue-400">
              MFPL v2.4-SECURE
            </div>
          </div>
          
          <nav className="flex gap-1 bg-zinc-900 p-1 rounded-lg">
            <button 
              onClick={() => setActiveView('vault')}
              className={`px-4 py-1.5 rounded-md text-sm transition-all ${activeView === 'vault' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              Access Portal
            </button>
            <button 
              onClick={() => setActiveView('blueprint')}
              className={`px-4 py-1.5 rounded-md text-sm transition-all ${activeView === 'blueprint' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              Architecture
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {activeView === 'vault' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Scanner */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden min-h-[500px]">
                  <WebcamScanner 
                    status={status} 
                    setStatus={setStatus}
                    onComplete={handleVerificationComplete} 
                  />
                </div>
              </div>

              {/* Status Indicators */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold">Protocol</p>
                    <p className="text-sm font-semibold">Zero-Knowledge</p>
                  </div>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold">Biometric</p>
                    <p className="text-sm font-semibold">FaceMesh v3</p>
                  </div>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold">Liveness</p>
                    <p className="text-sm font-semibold">Active MFPL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Intelligence Feed */}
            <div className="lg:col-span-5 space-y-6">
              <LivenessDashboard status={status} reset={resetVerification} />
            </div>
          </div>
        ) : (
          <TechnicalBlueprint />
        )}
      </main>

      <footer className="border-t border-zinc-800 py-6 mt-12 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-xs mono">
          <p>© 2024 THE VAULT SECURITY SYSTEMS • PROTOCOL 0x7E1</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-400 transition-colors">Documentation</a>
            <a href="#" className="hover:text-blue-400 transition-colors">API References</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Incident Report</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
