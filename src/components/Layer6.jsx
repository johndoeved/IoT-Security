import React, { useState } from 'react';
import axios from 'axios';
import { Activity, Radio, HardDrive, FileTerminal, Search } from 'lucide-react';

export default function Layer6({ data }) {
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const runScan = async () => {
    setLoading(true);
    setScanResult(null);
    try {
      const res = await axios.post('/api/multivector/scan');
      setScanResult(res.data);
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
            <Activity className="text-cyan-400 w-8 h-8" />
            Layer 6: Multi-Vector Anomaly Detector
          </h2>
          <p className="text-slate-400">Beyond network traffic: analyzing behavior and firmware integrity.</p>
        </div>
        <button 
          onClick={runScan}
          disabled={loading}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 interactive-glow"
        >
          <Search className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Scanning System...' : 'Run Deep Integrity Scan'}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 text-center interactive-glow">
          <Radio className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <p className="text-4xl font-bold text-white mb-2">{data.network_anomalies}</p>
          <p className="text-sm text-slate-400">Network Anomalies</p>
        </div>
        
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 text-center interactive-glow">
          <HardDrive className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <p className="text-4xl font-bold text-white mb-2">{data.behavioral_anomalies}</p>
          <p className="text-sm text-slate-400">Behavioral Traces (CPU/Mem)</p>
        </div>

        <div className="bg-slate-900/50 p-8 rounded-2xl border border-rose-900/50 text-center interactive-glow">
          <FileTerminal className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <p className="text-4xl font-bold text-white mb-2">{data.firmware_mismatches}</p>
          <p className="text-sm text-rose-200">Firmware Hash Mismatches</p>
        </div>
      </div>

      {scanResult && (
        <div className="bg-slate-900/80 rounded-2xl border border-cyan-500/30 p-6 animate-in fade-in slide-in-from-top-4 interactive-glow">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Search className="text-cyan-400" />
            Deep Scan Results
          </h3>
          <div className="space-y-3 font-mono text-sm">
            <p className="text-slate-300">Files Scanned: <span className="text-cyan-400 font-bold">{scanResult.files_scanned}</span></p>
            <p className="text-slate-300">Rootkits Found: <span className="text-green-400 font-bold">{scanResult.rootkit_found ? 'YES' : 'NONE'}</span></p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mt-4 interactive-glow">
              <p className="text-slate-500 mb-1">Expected Firmware Hash (SHA-256):</p>
              <p className="text-slate-300 break-all">{scanResult.firmware_hash_expected}</p>
              <p className="text-slate-500 mb-1 mt-3">Calculated Hash:</p>
              <p className="text-green-400 break-all font-bold">{scanResult.firmware_hash_actual} (MATCH)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
