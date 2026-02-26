import pandas as pd
import re
import numpy as np
import uvicorn
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from sklearn.ensemble import IsolationForest

app = FastAPI(title="Sentinel Log Monitor")

# Enable CORS for your React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class LogManager:
    def __init__(self, file_path="app.log"):
        self.file_path = file_path
        self.df = pd.DataFrame()
        self.model = IsolationForest(contamination=0.03, random_state=42)
        self.is_trained = False
        self._last_position = 0  # Track where we stopped reading the file
        
        # Initial load
        self.update_data()

    def parse_log_line(self, line):
        pattern = r'(?P<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3})\s+(?P<level>\w+)\s+\d+\s+---\s+\[.*?\]\s+(?P<service>[\w\.]+)\s+:\s+(?P<message>.*)'
        match = re.search(pattern, line)
        return match.groupdict() if match else None

    def update_data(self):
        """Reads only NEW lines from the log file to prevent hanging."""
        if not os.path.exists(self.file_path):
            return

        new_logs = []
        try:
            with open(self.file_path, "r") as f:
                f.seek(self._last_position)
                for line in f:
                    parsed = self.parse_log_line(line)
                    if parsed:
                        new_logs.append(parsed)
                self._last_position = f.tell() # Save current position

            if new_logs:
                new_df = pd.DataFrame(new_logs)
                new_df['timestamp'] = pd.to_datetime(new_df['timestamp'])
                # Append new data to historical data
                self.df = pd.concat([self.df, new_df], ignore_index=True).tail(1000)
                
                # Only retrain if we have enough new data to justify it
                if not self.is_trained and len(self.df) > 20:
                    self._train_ml_model()
        except Exception as e:
            print(f"❌ Ingestion Error: {e}")

    def _train_ml_model(self):
        features = self.df.resample('10s', on='timestamp').agg({
            'message': 'count',
            'level': lambda x: (x == 'ERROR').sum()
        }).rename(columns={'message': 'vol', 'level': 'err'}).fillna(0)
        
        if len(features) > 2:
            self.model.fit(features[['vol', 'err']])
            self.is_trained = True
            print("🧠 ML Model Retrained.")

log_store = LogManager("app.log")

@app.get("/alerts")
def get_alerts():
    log_store.update_data()
    
    if log_store.df.empty:
        return [{"status": "Healthy", "why": "Waiting for first logs..."}]

    recent_window = log_store.df[log_store.df['timestamp'] >= (datetime.now() - timedelta(seconds=30))]
    vol = len(recent_window)
    err = len(recent_window[recent_window['level'] == 'ERROR'])
    
    alerts = []
    # Static Rule
    if err > 5:
        alerts.append({
            "type": "CRITICAL_ERROR_THRESHOLD",
            "timestamp": datetime.now().isoformat(),
            "why": f"Detected {err} errors in the last 30s.",
            "status": "Anomaly"
        })

    # ML Anomaly
    if log_store.is_trained and vol > 0:
        pred = log_store.model.predict(np.array([[vol, err]]))[0]
        if pred == -1:
            alerts.append({
                "type": "BEHAVIORAL_ANOMALY",
                "timestamp": datetime.now().isoformat(),
                "why": "Unusual activity pattern detected by ML.",
                "status": "Anomaly"
            })
            
    return alerts if alerts else [{"status": "Healthy", "why": "System behavior is normal.", "type": "HEALTHY"}]

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)