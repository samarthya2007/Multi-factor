
import React, { useState } from 'react';
import { UserIdentity } from '../types';
import { User, Wallet, ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  onSubmit: (data: UserIdentity) => void;
}

const IdentityForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserIdentity>({
    fullName: '',
    walletAddress: '',
  });

  const isValidWallet = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr);
  const canSubmit = formData.fullName.length > 2 && isValidWallet(formData.walletAddress);

  const generateDemoWallet = () => {
    const chars = '0123456789abcdef';
    let addr = '0x';
    for (let i = 0; i < 40; i++) {
      addr += chars[Math.floor(Math.random() * chars.length)];
    }
    setFormData(prev => ({ ...prev, walletAddress: addr }));
  };

  return (
    <div className="z-10 w-full max-w-sm px-6 space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-white uppercase italic">Identity Handshake</h2>
        <p className="text-zinc-500 text-xs mono uppercase tracking-widest">Protocol initialization required</p>
      </div>

      <div className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-blue-500 transition-colors">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="FULL LEGAL NAME"
            className="w-full bg-black border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-sm mono focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-zinc-700 uppercase"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-blue-500 transition-colors">
              <Wallet className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="EVM WALLET (0x...)"
              className={`w-full bg-black border rounded-xl py-4 pl-12 pr-4 text-sm mono focus:outline-none transition-all placeholder:text-zinc-700 ${
                formData.walletAddress && !isValidWallet(formData.walletAddress) 
                ? 'border-red-500/50 focus:border-red-500' 
                : 'border-zinc-800 focus:border-blue-500/50'
              }`}
              value={formData.walletAddress}
              onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
            />
          </div>
          
          <button 
            type="button"
            onClick={generateDemoWallet}
            className="w-full flex items-center justify-center gap-2 text-[10px] text-zinc-500 hover:text-blue-400 mono uppercase tracking-widest py-2 px-4 rounded-lg border border-dashed border-zinc-800 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
          >
            <Sparkles className="w-3 h-3" /> No wallet? Generate Demo ID
          </button>
        </div>
      </div>

      <button
        onClick={() => onSubmit(formData)}
        disabled={!canSubmit}
        className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group ${
          canSubmit 
          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40' 
          : 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800'
        }`}
      >
        PROCEED TO BIOMETRICS
        <ArrowRight className={`w-4 h-4 transition-transform ${canSubmit ? 'group-hover:translate-x-1' : ''}`} />
      </button>

      <div className="text-[10px] text-zinc-600 text-center mono uppercase leading-relaxed">
        Personal data is processed via ZK-proof.<br/>Nothing is stored on central servers.
      </div>
    </div>
  );
};

export default IdentityForm;
