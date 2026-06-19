import React, { useState } from 'react';
import axios from 'axios';
import { Lock, Fingerprint, Zap } from 'lucide-react';

export default function Layer7({ data, refresh }) {
  const [loading, setLoading] = useState(false);
  const [latestExchange, setLatestExchange] = useState(null);

  const simulateExchange = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/quantum/exchange');
      setLatestExchange(res.data);
      await refresh();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Lock className="text-amber-400 w-8 h-8" />
            Layer 7: Post-Quantum Cryptography
          </h2>
          <p className="text-slate-400">NIST-approved algorithms protecting against quantum adversaries.</p>
        </div>
        <button 
          onClick={simulateExchange}
          disabled={loading}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 interactive-glow"
        >
          <Zap className="w-4 h-4" />
          {loading ? 'Exchanging...' : 'Test Key Exchange'}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 interactive-glow">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-amber-400" />
            <h3 className="text-lg font-bold text-white">Key Encapsulation</h3>
          </div>
          <p className="text-xl font-mono text-slate-300">{data.encryption}</p>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 interactive-glow">
          <div className="flex items-center gap-3 mb-4">
            <Fingerprint className="text-amber-400" />
            <h3 className="text-lg font-bold text-white">Digital Signatures</h3>
          </div>
          <p className="text-xl font-mono text-slate-300">{data.signatures}</p>
        </div>
      </div>

      {latestExchange && (
        <div className="bg-slate-900/80 rounded-2xl border border-amber-500/30 p-6 mb-8 animate-in fade-in slide-in-from-top-4 interactive-glow">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="text-amber-400" />
            Kyber-768 Handshake Output
          </h3>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-sm space-y-4 interactive-glow">
            <div>
              <p className="text-slate-500 mb-1">Public Key (Sample):</p>
              <p className="text-amber-400 break-all">{latestExchange.public_key}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Encapsulated Ciphertext (Sample):</p>
              <p className="text-emerald-400 break-all">{latestExchange.ciphertext}</p>
            </div>
            <p className="text-slate-300 mt-2">Status: <span className="text-green-400 font-bold">SUCCESS</span></p>
          </div>
        </div>
      )}

      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 interactive-glow">
        <h3 className="text-xl font-bold text-white mb-4">Recent Kyber Exchanges</h3>
        <div className="space-y-3">
          {data.recent_exchanges?.map((ex) => (
            <div key={ex.id} className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800 interactive-glow">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="font-mono text-sm text-slate-300">{new Date(ex.time).toLocaleTimeString()}</span>
                <span className="font-bold text-white">{ex.algorithm}</span>
              </div>
              <div className="text-slate-400 text-sm">
                Latency: <span className="text-amber-400 font-bold">{ex.latency_ms}ms</span>
              </div>
            </div>
          ))}
          {(!data.recent_exchanges || data.recent_exchanges.length === 0) && (
            <p className="text-slate-500 italic">No recent exchanges. Click "Test Key Exchange" to simulate.</p>
          )}
        </div>
      </div>
    </div>
  );
}
