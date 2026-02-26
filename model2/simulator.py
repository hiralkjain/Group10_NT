# simulator.py
import time
import random

def write_log(level, msg):
    ts = time.strftime("%Y-%m-%d %H:%M:%S.000")
    line = f"{ts}  {level} 10000 --- [nio-8080-exec-1] c.n.p.service.MeshDataService  : {msg}\n"
    with open("app.log", "a") as f:
        f.write(line)
        f.flush()

print("🚀 Starting Log Simulator. Press Ctrl+C to stop.")
try:
    while True:
        # Simulate normal traffic
        write_log("INFO", "Normal system heartbeat")
        time.sleep(1) 
        
        # Every 10 seconds, maybe inject an error for testing
        if random.random() > 0.8:
            write_log("ERROR", "Manual Test Error Triggered")
except KeyboardInterrupt:
    print("Stopping simulator...")