import React, { useState } from 'react';
import axios from 'axios';
import { Share2, ServerCrash, RefreshCw } from 'lucide-react';

export default function Layer2({ data, refresh }) {
  const [loading, setLoading] = useState(false);

  const handleTrain = async () => {
    setLoading(true);
    await axios.post('http://localhost:5000/api/federated/train');
    await refresh();
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Share2 className="text-purple-400 w-8 h-8" />
            Layer 2: Federated Learning Coordinator
          </h2>
          <p className="text-slate-400">Privacy-preserving distributed training with Byzantine fault tolerance.</p>
        </div>
        <button 
          onClick={handleTrain}
          disabled={loading}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Aggregating...' : 'Trigger Training Round'}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">Current Global Round</p>
            <p className="text-4xl font-bold text-purple-400">#{data.training_round}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400 mb-1">Participating Devices</p>
            <p className="text-2xl font-bold text-white">{data.devices_participating}</p>
          </div>
        </div>
        
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-rose-900/50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-400 mb-1">
              <ServerCrash className="w-4 h-4" />
              <p className="text-sm">Byzantine-Fault Drops</p>
            </div>
            <p className="text-4xl font-bold text-white">{data.byzantine_drops}</p>
          </div>
          <div className="text-right max-w-[50%]">
            <p className="text-xs text-slate-400 leading-relaxed">Updates deviating &gt;2 std-dev from mean are dropped to prevent poisoning.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
