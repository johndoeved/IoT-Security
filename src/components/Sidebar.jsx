import React from 'react';
import { 
  ShieldCheck, Activity, Cpu, Share2, 
  AlertTriangle, Network, Eye, Lock, Sun
} from 'lucide-react';

const tabs = [
  { id: 'overview', name: 'System Overview', icon: ShieldCheck },
  { id: 'layer1', name: 'L1: Edge AI (TinyML)', icon: Cpu },
  { id: 'layer2', name: 'L2: Federated Learning', icon: Share2 },
  { id: 'layer3', name: 'L3: Adv. Robustness', icon: AlertTriangle },
  { id: 'layer4', name: 'L4: Zero Trust', icon: Network },
  { id: 'layer5', name: 'L5: Explainable AI', icon: Eye },
  { id: 'layer6', name: 'L6: Multi-Vector', icon: Activity },
  { id: 'layer7', name: 'L7: PQ Cryptography', icon: Lock },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-4 shadow-xl shadow-cyan-900/10 z-20 relative">
      <div className="flex items-center gap-3 mb-10 mt-2 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 interactive-glow">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
          IoT Security
        </h1>
      </div>

      <nav className="flex flex-col gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 interactive-glow ${
                isActive 
                  ? 'bg-blue-500/10 text-cyan-400 border border-cyan-500/30 shadow-inner' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span className="font-medium text-sm">{tab.name}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800 space-y-4">
        <button 
          onClick={() => document.body.classList.toggle('light-mode')}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl border border-slate-700/50 text-slate-300 transition-colors interactive-glow"
        >
          <Sun className="w-4 h-4" />
          <span className="text-sm font-medium">Toggle Theme</span>
        </button>

        <div className="px-4 py-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs font-semibold text-slate-300">System Live</span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">Uptime: 99.99%</p>
        </div>
      </div>
    </div>
  );
}
