import React from 'react';
import { Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Layer5({ data }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Eye className="text-teal-400 w-8 h-8" />
          Layer 5: Explainable AI (XAI)
        </h2>
        <p className="text-slate-400">Plain-language operator summaries driven by SHAP value vectors.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-4">Operator Alert Summary</h3>
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex-1 flex items-center">
            <p className="text-lg text-slate-300 leading-relaxed">
              <span className="text-teal-400 font-bold">"</span>
              {data.explanation}
              <span className="text-teal-400 font-bold">"</span>
            </p>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-4">Feature Contribution (SHAP)</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.shap_values} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="feature" type="category" stroke="#94a3b8" width={100} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }} />
                <Bar dataKey="value" fill="#2dd4bf" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
