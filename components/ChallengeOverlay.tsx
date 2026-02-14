
import React from 'react';
import { Challenge } from '../types';

interface Props {
  challenge: Challenge;
  index: number;
  total: number;
  progress: number;
}

const ChallengeOverlay: React.FC<Props> = ({ challenge, index, total, progress }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-end p-8 pointer-events-none z-20">
      <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 rounded-2xl p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mono">Challenge {index} of {total}</span>
            <h3 className="text-lg font-semibold text-white">{challenge.description}</h3>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-zinc-800 flex items-center justify-center">
            <span className="text-xs font-bold text-zinc-400">{index}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[10px] text-zinc-500 text-center uppercase tracking-widest mono animate-pulse">
          Analyzing facial micro-tremors & intent...
        </p>
      </div>
    </div>
  );
};

export default ChallengeOverlay;
