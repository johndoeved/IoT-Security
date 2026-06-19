import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import Layer1 from './components/Layer1';
import Layer2 from './components/Layer2';
import Layer3 from './components/Layer3';
import Layer4 from './components/Layer4';
import Layer5 from './components/Layer5';
import Layer6 from './components/Layer6';
import Layer7 from './components/Layer7';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/state');
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-500 font-mono animate-pulse">Initializing Security Framework...</div>;
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'overview': return <Overview data={data} />;
      case 'layer1': return <Layer1 data={data.tinyml} refresh={fetchData} />;
      case 'layer2': return <Layer2 data={data.federated} refresh={fetchData} />;
      case 'layer3': return <Layer3 data={data.adversarial} refresh={fetchData} />;
      case 'layer4': return <Layer4 data={data.zerotrust} refresh={fetchData} />;
      case 'layer5': return <Layer5 data={data.xai} />;
      case 'layer6': return <Layer6 data={data.multivector} />;
      case 'layer7': return <Layer7 data={data.quantum} refresh={fetchData} />;
      default: return <Overview data={data} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans selection:bg-cyan-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/20 to-transparent -z-0 pointer-events-none"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
