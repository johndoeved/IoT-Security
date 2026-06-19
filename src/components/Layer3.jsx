import React, { useState } from 'react';
import axios from 'axios';
import { AlertTriangle, Shield, ShieldOff } from 'lucide-react';

export default function Layer3({ data, refresh }) {
  const [loading, setLoading] = useState(false);

  const toggleDefense = async () => {
    setLoading(true);
    await axios.post('http://localhost:5000/api/adversarial/toggle');
    await refresh();
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <AlertTriangle className="text-rose-400 w-8 h-8" />
            Layer 3: Adversarial Robustness
          </h2>
          <p className="text-slate-400">Defenses against FGSM and PGD manipulation attacks.</p>
        </div>
        <button 
          onClick={toggleDefense}
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all shadow-lg disabled:opacity-50 text-white ${
            data.defenses_active ? 'bg-red-600 hover:bg-red-500 shadow-red-500/20' : 'bg-green-600 hover:bg-green-500 shadow-green-500/20'
          }`}
        >
          {data.defenses_active ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
          {loading ? 'Switching...' : (data.defenses_active ? 'Disable Defenses' : 'Enable Defenses')}
        </button>
      </header>

      <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 text-center mb-8 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-1 ${data.defenses_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <p className="text-lg text-slate-400 mb-2">Current Attack Success Rate (White-box)</p>
        <p className={`text-7xl font-black ${data.defenses_active ? 'text-green-400' : 'text-red-500'}`}>
          {data.attack_success_rate}%
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 text-left max-w-lg mx-auto">
          <div className="bg-slate-950 p-4 rounded-xl">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Baseline Vulnerability</p>
            <p className="text-xl font-bold text-slate-300">{data.baseline_vulnerability}%</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Status</p>
            <p className="text-xl font-bold text-slate-300">
              {data.defenses_active ? 'Feature Squeezing ON' : 'Vulnerable'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
