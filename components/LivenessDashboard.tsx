
import React, { useState, useEffect } from 'react';
import { VerificationStatus } from '../types';
import { Activity, Terminal, ExternalLink, RefreshCw } from 'lucide-react';

interface Props {
  status: VerificationStatus;
  reset: () => void;
}

const LivenessDashboard: React.FC<Props> = ({ status, reset }) => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 10));

    if (status === VerificationStatus.COLLECTING_DATA) {
      addLog('> [SYS] Awaiting identity handshake...');
    } else if (status === VerificationStatus.IDLE) {
      addLog('> [SYS] Identity received. Biometric pipeline ready.');
    } else if (status === VerificationStatus.SCANNING) {
      addLog('> [SYS] Initializing MFPL Visual Challenge Engine');
      addLog('> [CV] FaceMesh loading landmarks: 478 count');
    } else if (status === VerificationStatus.PROCESSING) {
      addLog('> [AI] Gemini Multimodal Analysis: active');
      addLog('> [AI] Evaluating texture depth & sentiment');
    } else if (status === VerificationStatus.SUCCESS) {
      addLog('> [WEB3] Verification confirmed. Minting SBT...');
      addLog('> [TX] Hash generated via 0x92f3...e21c');
    } else if (status === VerificationStatus.FAILED) {
      addLog('> [WARN] Anomaly detected: Synthetic rigid motion');
      addLog('> [ERR] Access Denied: Biometric mismatch');
    }
  }, [status]);

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Real-time Metrics */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Neural Feed</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-emerald-500 mono">LIVE</span>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-xs text-zinc-500 mono">Jitter</span>
            <span className="text-sm font-bold text-blue-400 mono">0.042ms</span>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[15%]" />
          </div>

          <div className="flex justify-between items-end">
            <span className="text-xs text-zinc-500 mono">Depth Confidence</span>
            <span className="text-sm font-bold text-purple-400 mono">98.2%</span>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 w-[98%]" />
          </div>

          <div className="flex justify-between items-end">
            <span className="text-xs text-zinc-500 mono">Network Latency</span>
            <span className="text-sm font-bold text-zinc-400 mono">12ms</span>
          </div>
        </div>
      </div>

      {/* Console Logs */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden min-h-[250px]">
        <div className="px-4 py-3 border-b border-zinc-800 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-zinc-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">System Logs</h3>
        </div>
        <div className="p-4 flex-1 mono text-[11px] space-y-1.5 overflow-y-auto bg-black/40">
          {logs.length > 0 ? logs.map((log, i) => (
            <div key={i} className={`${log.includes('[ERR]') ? 'text-red-400' : log.includes('[SUCCESS]') ? 'text-emerald-400' : 'text-zinc-500'}`}>
              {log}
            </div>
          )) : (
            <div className="text-zinc-700 italic">Waiting for initialization...</div>
          )}
        </div>
      </div>

      {/* Control Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={reset}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-bold transition-all border border-zinc-700"
        >
          <RefreshCw className="w-4 h-4" /> Reset Portal
        </button>
        <button className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 rounded-xl text-xs font-bold transition-all border border-blue-500/30">
          <ExternalLink className="w-4 h-4" /> Explorer
        </button>
      </div>
    </div>
  );
};

export default LivenessDashboard;
