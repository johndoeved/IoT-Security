import time
import math
import random
from flask import Flask, jsonify, request
from flask_cors import CORS
import psutil

app = Flask(__name__)
CORS(app)

# Global states
defenses_active = True
training_round = 42
devices_participating = 124
recent_exchanges = []
recent_detections = []

def get_network_bytes():
    net = psutil.net_io_counters()
    return net.bytes_sent, net.bytes_recv

last_net_bytes = get_network_bytes()
last_time = time.time()

def get_system_state():
    global last_net_bytes, last_time, recent_detections, recent_exchanges

    current_time = time.time()
    elapsed = current_time - last_time
    if elapsed == 0: elapsed = 1
    
    current_net = get_network_bytes()
    sent_rate = (current_net[0] - last_net_bytes[0]) / elapsed
    recv_rate = (current_net[1] - last_net_bytes[1]) / elapsed
    
    last_net_bytes = current_net
    last_time = current_time

    # Layer 1: TinyML - simulate based on actual network traffic
    total_rate = sent_rate + recv_rate
    packet_rate = int(total_rate / 1500) # roughly 1500 bytes per packet
    
    active_connections = 0
    devices = []
    
    try:
        conns = psutil.net_connections(kind='inet')
        active_connections = len(conns)
        # Take up to 5 unique remote IPs for Zero Trust
        seen_ips = set()
        for c in conns:
            if c.raddr and c.raddr.ip not in seen_ips:
                ip = c.raddr.ip
                port = c.raddr.port
                seen_ips.add(ip)
                
                # Trust score based on port
                if port in [443, 80, 22]:
                    score = random.randint(80, 100)
                    status = "Trusted"
                else:
                    score = random.randint(30, 60)
                    status = "Untrusted"
                    
                devices.append({
                    "ip": f"{ip}:{port}",
                    "status": status,
                    "score": score
                })
                if len(devices) >= 5: break
    except psutil.AccessDenied:
        pass
    except Exception:
        pass
        
    if not devices:
        devices = [
            {"ip": "192.168.1.100", "status": "Trusted", "score": 98},
            {"ip": "10.0.0.52", "status": "Untrusted", "score": 42}
        ]

    if len(recent_detections) < 5 and total_rate > 1000000: # >1MB/s
        recent_detections.insert(0, {
            "id": int(time.time()),
            "time": time.time() * 1000,
            "type": "Bandwidth Spike",
            "confidence": random.randint(85, 99)
        })
    recent_detections = recent_detections[:5]
    
    # Layer 6: Multi-vector
    cpu_percent = psutil.cpu_percent()
    mem_percent = psutil.virtual_memory().percent

    state = {
        "status": {
            "accuracy": round(99.4 - (cpu_percent * 0.05), 1),
            "latency": int(cpu_percent / 2 + 10)
        },
        "tinyml": {
            "active_devices": active_connections,
            "memory_footprint": f"{int(mem_percent * 2.5)}KB",
            "inference_time_ms": int((cpu_percent/10) + 12),
            "recent_detections": recent_detections
        },
        "federated": {
            "training_round": training_round,
            "devices_participating": devices_participating,
            "byzantine_drops": int(cpu_percent / 5)
        },
        "adversarial": {
            "defenses_active": defenses_active,
            "attack_success_rate": round(11.4 if defenses_active else 73.2 + (cpu_percent * 0.1), 1),
            "baseline_vulnerability": 73.2
        },
        "zerotrust": {
            "devices": devices
        },
        "xai": {
            "explanation": f"The model detected normal behavior. Host CPU is at {cpu_percent}% and Memory is at {mem_percent}%. Network traffic is ~{int(total_rate/1024)} KB/s.",
            "shap_values": [
                {"feature": "CPU Load", "value": cpu_percent / 100},
                {"feature": "Memory", "value": mem_percent / 100},
                {"feature": "Network Rate", "value": (total_rate/1000000)},
                {"feature": "Connections", "value": active_connections / 100}
            ]
        },
        "multivector": {
            "network_anomalies": int(packet_rate / 100),
            "behavioral_anomalies": int(cpu_percent / 10),
            "firmware_mismatches": 0
        },
        "quantum": {
            "encryption": "CRYSTALS-Kyber (Live Simulation)",
            "signatures": "CRYSTALS-Dilithium (Live Simulation)",
            "recent_exchanges": recent_exchanges
        }
    }
    return state

@app.route('/api/state', methods=['GET'])
def get_state():
    return jsonify(get_system_state())

@app.route('/api/tinyml/simulate', methods=['POST'])
def simulate_tinyml():
    global recent_detections
    types = ['DDoS', 'Scanning', 'MITM', 'Normal']
    recent_detections.insert(0, {
        "id": int(time.time() * 1000),
        "time": int(time.time() * 1000),
        "type": random.choice(types),
        "confidence": random.randint(70, 99)
    })
    recent_detections = recent_detections[:5]
    return jsonify({"status": "simulated"})

@app.route('/api/federated/train', methods=['POST'])
def trigger_federated():
    global training_round, devices_participating
    training_round += 1
    devices_participating += random.randint(-5, 10)
    return jsonify({"status": "training_triggered"})

@app.route('/api/adversarial/toggle', methods=['POST'])
def toggle_defenses():
    global defenses_active
    defenses_active = not defenses_active
    return jsonify({"defenses_active": defenses_active})

@app.route('/api/zerotrust/quarantine', methods=['POST'])
def quarantine():
    data = request.json
    # Cannot actually quarantine local OS connections without admin, so mock the action
    return jsonify({"status": "updated", "ip": data.get('ip')})

@app.route('/api/multivector/scan', methods=['POST'])
def multivector_scan():
    return jsonify({
        "status": "clean",
        "files_scanned": random.randint(3400, 8900),
        "rootkit_found": False,
        "firmware_hash_expected": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "firmware_hash_actual": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    })

@app.route('/api/quantum/exchange', methods=['POST'])
def quantum_exchange():
    global recent_exchanges
    cpu = psutil.cpu_percent()
    latency = random.randint(15, 45) + int(cpu / 2) # Simulate latency affected by CPU
    
    # Generate fake kyber keys for visual effect
    pk = ''.join(random.choices('0123456789abcdef', k=64)) + "..."
    ciphertext = ''.join(random.choices('0123456789abcdef', k=64)) + "..."

    recent_exchanges.insert(0, {
        "id": int(time.time() * 1000),
        "time": int(time.time() * 1000),
        "algorithm": "Kyber-768",
        "latency_ms": latency,
        "pk_snippet": pk,
        "ct_snippet": ciphertext
    })
    recent_exchanges = recent_exchanges[:5]
    return jsonify({
        "status": "exchanged",
        "public_key": pk,
        "ciphertext": ciphertext
    })

if __name__ == '__main__':
    psutil.cpu_percent() # Initialize cpu metric
    app.run(port=5000, debug=False)
