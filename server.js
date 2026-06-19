import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// In-Memory State
let state = {
  status: {
    status: 'active',
    latency: 162,
    accuracy: 98.6,
    precision: 97.4,
    recall: 98.1,
    f1_score: 97.7,
  },
  tinyml: {
    active_devices: 124,
    memory_footprint: '256 KB',
    inference_time_ms: 14,
    recent_detections: [
      { id: 1, type: 'Scanning', confidence: 92, time: new Date(Date.now() - 5000) },
      { id: 2, type: 'DoS', confidence: 97, time: new Date(Date.now() - 15000) },
    ]
  },
  federated: {
    training_round: 142,
    devices_participating: 110,
    byzantine_drops: 3,
    learning_rate: 0.001
  },
  adversarial: {
    defenses_active: true,
    attack_success_rate: 11.4,
    baseline_vulnerability: 73.0,
  },
  zerotrust: {
    devices: [
      { ip: '192.168.1.45', score: 98, status: 'Trusted' },
      { ip: '192.168.1.46', score: 85, status: 'Trusted' },
      { ip: '192.168.1.47', score: 32, status: 'Quarantined' }
    ]
  },
  xai: {
    explanation: "Device 192.168.1.47 was flagged because its packet rate jumped 840% above baseline, SYN packets without matching ACK responses make up 91% of recent traffic, and traffic to port 80 is running 200 times above normal levels.",
    shap_values: [
      { feature: 'Packet Rate', value: 0.45 },
      { feature: 'SYN/ACK Ratio', value: 0.25 },
      { feature: 'Port 80 Traffic', value: 0.17 },
      { feature: 'Payload Entropy', value: 0.13 }
    ]
  },
  multivector: {
    network_anomalies: 45,
    behavioral_anomalies: 12,
    firmware_mismatches: 2
  },
  quantum: {
    encryption: 'CRYSTALS-Kyber (FIPS 203)',
    signatures: 'CRYSTALS-Dilithium (FIPS 204)',
    hybrid_fallback: 'Active for < 64KB devices',
    recent_exchanges: []
  }
};

// --- GET Endpoints ---
app.get('/api/state', (req, res) => {
  res.json(state);
});

// --- POST Interactive Endpoints ---

// Layer 1: Simulate Traffic
app.post('/api/tinyml/simulate', (req, res) => {
  const types = ['DDoS', 'Scanning', 'MITM', 'Normal'];
  const newDet = {
    id: Date.now(),
    type: types[Math.floor(Math.random() * types.length)],
    confidence: Math.floor(Math.random() * 15) + 85,
    time: new Date()
  };
  state.tinyml.recent_detections.unshift(newDet);
  if (state.tinyml.recent_detections.length > 10) state.tinyml.recent_detections.pop();
  res.json(state.tinyml);
});

// Layer 2: Trigger Training Round
app.post('/api/federated/train', (req, res) => {
  state.federated.training_round += 1;
  state.federated.byzantine_drops += Math.floor(Math.random() * 2);
  res.json(state.federated);
});

// Layer 3: Toggle Defenses
app.post('/api/adversarial/toggle', (req, res) => {
  state.adversarial.defenses_active = !state.adversarial.defenses_active;
  state.adversarial.attack_success_rate = state.adversarial.defenses_active ? 11.4 : 73.0;
  res.json(state.adversarial);
});

// Layer 4: Change Trust Score / Quarantine
app.post('/api/zerotrust/quarantine', (req, res) => {
  const { ip, action } = req.body;
  const dev = state.zerotrust.devices.find(d => d.ip === ip);
  if (dev) {
    if (action === 'quarantine') {
      dev.status = 'Quarantined';
      dev.score = Math.floor(Math.random() * 30) + 10;
    } else {
      dev.status = 'Trusted';
      dev.score = Math.floor(Math.random() * 20) + 80;
    }
  }
  res.json(state.zerotrust);
});

// Layer 7: Simulate Quantum Key Exchange
app.post('/api/quantum/exchange', (req, res) => {
  const latency = Math.floor(Math.random() * 10) + 15; // 15-25ms
  const newExchange = {
    id: Date.now(),
    algorithm: 'Kyber512',
    status: 'Success',
    latency_ms: latency,
    time: new Date()
  };
  state.quantum.recent_exchanges.unshift(newExchange);
  if (state.quantum.recent_exchanges.length > 5) state.quantum.recent_exchanges.pop();
  res.json(state.quantum);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Interactive IoT Security Backend running on port ${PORT}`);
});
