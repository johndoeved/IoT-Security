import React from 'react';
import { Activity, Cpu, Share2, AlertTriangle } from 'lucide-react';

export default function Overview({ data }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Global Security Posture</h2>
        <p className="text-slate-400">Real-time health of the 7-layer defense architecture.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Core Metrics */}
        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="text-green-400" />
            <h3 className="text-lg font-semibold text-white">Detection Accuracy</h3>
          </div>
          <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">{data.status.accuracy}%</p>
          <p className="text-sm text-slate-400 mt-2">Latency: {data.status.latency}ms</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all">
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Edge AI (TinyML)</h3>
          </div>
          <p className="text-3xl font-bold text-white">{data.tinyml.active_devices}</p>
          <p className="text-sm text-slate-400 mt-2">Active Microcontrollers</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all">
          <div className="flex items-center gap-3 mb-2">
            <Share2 className="text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Federated Round</h3>
          </div>
          <p className="text-3xl font-bold text-white">#{data.federated.training_round}</p>
          <p className="text-sm text-slate-400 mt-2">{data.federated.devices_participating} devices syncing</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 hover:border-rose-500/50 transition-all">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-rose-400" />
            <h3 className="text-lg font-semibold text-white">Adv. Robustness</h3>
          </div>
          <p className="text-3xl font-bold text-white">{data.adversarial.attack_success_rate}%</p>
          <p className="text-sm text-slate-400 mt-2">Current Attack Success Rate</p>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 mt-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
          <Activity className="text-cyan-400 w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-4">Interactive Layers Ready</h3>
        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
          Navigate through the sidebar to inspect individual layers. You can trigger live simulations, test quantum exchanges, and quarantine zero-trust devices in real-time.
        </p>
      </div>
    </div>
  );
}
