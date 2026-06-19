import React, { useState } from 'react';
import axios from 'axios';
import { Cpu, Zap } from 'lucide-react';

export default function Layer1({ data, refresh }) {
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    setLoading(true);
    await axios.post('http://localhost:5000/api/tinyml/simulate');
    await refresh();
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Cpu className="text-blue-400 w-8 h-8" />
            Layer 1: Edge AI (TinyML)
          </h2>
          <p className="text-slate-400">Post-training quantized models running on constrained 256KB hardware.</p>
        </div>
        <button 
          onClick={handleSimulate}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
        >
          <Zap className="w-4 h-4" />
          {loading ? 'Simulating...' : 'Simulate Traffic'}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400 mb-1">Active Microcontrollers</p>
          <p className="text-3xl font-bold text-white">{data.active_devices}</p>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400 mb-1">Model Footprint</p>
          <p className="text-3xl font-bold text-white">{data.memory_footprint}</p>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400 mb-1">Inference Latency</p>
          <p className="text-3xl font-bold text-white">{data.inference_time_ms} ms</p>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Live Packet Stream Detections</h3>
        <div className="space-y-3">
          {data.recent_detections.map((det) => (
            <div key={det.id} className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${det.type === 'Normal' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
                <span className="font-mono text-sm text-slate-300">{new Date(det.time).toLocaleTimeString()}</span>
                <span className="font-bold text-white">{det.type}</span>
              </div>
              <div className="text-slate-400 text-sm">
                Confidence: <span className="text-cyan-400 font-bold">{det.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
