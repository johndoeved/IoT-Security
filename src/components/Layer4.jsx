import React, { useState } from 'react';
import axios from 'axios';
import { Network, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function Layer4({ data, refresh }) {
  const [loading, setLoading] = useState(null);

  const toggleStatus = async (ip, currentStatus) => {
    setLoading(ip);
    const action = currentStatus === 'Trusted' ? 'quarantine' : 'verify';
    await axios.post('http://localhost:5000/api/zerotrust/quarantine', { ip, action });
    await refresh();
    setLoading(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Network className="text-indigo-400 w-8 h-8" />
          Layer 4: Zero Trust Verification Engine
        </h2>
        <p className="text-slate-400">Continuous hardware and behavioral verification.</p>
      </header>

      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Device Fleet Trust Ledger</h3>
        <div className="space-y-4">
          {data.devices.map((dev) => (
            <div key={dev.ip} className={`flex flex-col md:flex-row justify-between items-center p-4 rounded-xl border transition-all ${
              dev.status === 'Trusted' ? 'bg-slate-950 border-slate-800' : 'bg-red-950/20 border-red-900/50'
            }`}>
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                {dev.status === 'Trusted' ? <ShieldCheck className="text-green-400 w-6 h-6" /> : <ShieldAlert className="text-red-500 w-6 h-6 animate-pulse" />}
                <div>
                  <p className="font-mono text-lg text-slate-200">{dev.ip}</p>
                  <p className="text-sm text-slate-500">TPM 2.0 Verified</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Trust Score</p>
                  <p className={`text-2xl font-bold ${dev.score > 50 ? 'text-green-400' : 'text-red-500'}`}>{dev.score}/100</p>
                </div>
                <button
                  onClick={() => toggleStatus(dev.ip, dev.status)}
                  disabled={loading === dev.ip}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50 ${
                    dev.status === 'Trusted' 
                      ? 'bg-slate-800 hover:bg-red-900/50 text-red-400 border border-transparent hover:border-red-900' 
                      : 'bg-green-600 hover:bg-green-500 text-white'
                  }`}
                >
                  {loading === dev.ip ? 'Updating...' : (dev.status === 'Trusted' ? 'Revoke Trust' : 'Re-verify Device')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
