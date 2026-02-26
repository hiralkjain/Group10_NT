# # import pandas as pd
# # import re
# # import numpy as np
# # import uvicorn
# # import os
# # from fastapi import FastAPI
# # from fastapi.middleware.cors import CORSMiddleware
# # from datetime import datetime, timedelta
# # from sklearn.ensemble import IsolationForest

# # app = FastAPI(title="Sentinel Log Monitor")

# # # Enable CORS for your React Frontend
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # class LogManager:
# #     def __init__(self, file_path="app.log"):
# #         self.file_path = file_path
# #         self.df = pd.DataFrame()
# #         self.model = IsolationForest(contamination=0.03, random_state=42)
# #         self.is_trained = False
# #         self._last_position = 0  # Track where we stopped reading the file
        
# #         # Initial load
# #         self.update_data()

# #     def parse_log_line(self, line):
# #         pattern = r'(?P<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3})\s+(?P<level>\w+)\s+\d+\s+---\s+\[.*?\]\s+(?P<service>[\w\.]+)\s+:\s+(?P<message>.*)'
# #         match = re.search(pattern, line)
# #         return match.groupdict() if match else None

# #     def update_data(self):
# #         """Reads only NEW lines from the log file to prevent hanging."""
# #         if not os.path.exists(self.file_path):
# #             return

# #         new_logs = []
# #         try:
# #             with open(self.file_path, "r") as f:
# #                 f.seek(self._last_position)
# #                 for line in f:
# #                     parsed = self.parse_log_line(line)
# #                     if parsed:
# #                         new_logs.append(parsed)
# #                 self._last_position = f.tell() # Save current position

# #             if new_logs:
# #                 new_df = pd.DataFrame(new_logs)
# #                 new_df['timestamp'] = pd.to_datetime(new_df['timestamp'])
# #                 # Append new data to historical data
# #                 self.df = pd.concat([self.df, new_df], ignore_index=True).tail(1000)
                
# #                 # Only retrain if we have enough new data to justify it
# #                 if not self.is_trained and len(self.df) > 20:
# #                     self._train_ml_model()
# #         except Exception as e:
# #             print(f"❌ Ingestion Error: {e}")

# #     def _train_ml_model(self):
# #         features = self.df.resample('50s', on='timestamp').agg({
# #             'message': 'count',
# #             'level': lambda x: (x == 'ERROR').sum()
# #         }).rename(columns={'message': 'vol', 'level': 'err'}).fillna(0)
        
# #         if len(features) > 2:
# #             self.model.fit(features[['vol', 'err']])
# #             self.is_trained = True
# #             print("🧠 ML Model Retrained.")

# # log_store = LogManager("app.log")

# # @app.get("/raw-logs")
# # def get_raw_logs():
# #     """Forces a refresh and returns the latest logs as a list."""
# #     # Update the data from the file before returning
# #     log_store.update_data()
    
# #     if log_store.df.empty:
# #         return [] # Return empty list, not a 404 or null
        
# #     # Send only the last 50 entries to keep it fast
# #     return log_store.df.tail(50).to_dict(orient="records")
# # @app.get("/alerts")
# # def get_alerts():
# #     log_store.update_data()
    
# #     if log_store.df.empty:
# #         return [{"status": "Healthy", "why": "Waiting for first logs..."}]

# #     recent_window = log_store.df[log_store.df['timestamp'] >= (datetime.now() - timedelta(seconds=30))]
# #     vol = len(recent_window)
# #     err = len(recent_window[recent_window['level'] == 'ERROR'])
    
# #     alerts = []
# #     # Static Rule
# #     if err > 5:
# #         alerts.append({
# #             "type": "CRITICAL_ERROR_THRESHOLD",
# #             "timestamp": datetime.now().isoformat(),
# #             "why": f"Detected {err} errors in the last 30s.",
# #             "status": "Anomaly"
# #         })

# #     # ML Anomaly
# #     if log_store.is_trained and vol > 0:
# #         pred = log_store.model.predict(np.array([[vol, err]]))[0]
# #         if pred == -1:
# #             alerts.append({
# #                 "type": "BEHAVIORAL_ANOMALY",
# #                 "timestamp": datetime.now().isoformat(),
# #                 "why": "Unusual activity pattern detected by ML.",
# #                 "status": "Anomaly"
# #             })
            
# #     return alerts if alerts else [{"status": "Healthy", "why": "System behavior is normal.", "type": "HEALTHY"}]

# # if __name__ == "__main__":
# #     uvicorn.run(app, host="127.0.0.1", port=8001)

# import pandas as pd
# import re
# import numpy as np
# import uvicorn
# import os
# import time
# import random
# import threading
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from datetime import datetime, timedelta
# from sklearn.ensemble import IsolationForest

# app = FastAPI(title="Sentinel Log Monitor")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class LogManager:
#     def __init__(self, file_path="app.log"):
#         self.file_path = file_path
#         self.df = pd.DataFrame()
#         # Define feature names explicitly
#         self.features_list = ['vol', 'err']
#         self.model = IsolationForest(contamination=0.03, random_state=42)
#         self.is_trained = False
#         self._last_position = 0
#         self.update_data()

#     def parse_log_line(self, line):
#         pattern = r'(?P<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3})\s+(?P<level>\w+)\s+\d+\s+---\s+\[.*?\]\s+(?P<service>[\w\.]+)\s+:\s+(?P<message>.*)'
#         match = re.search(pattern, line)
#         return match.groupdict() if match else None

#     def update_data(self):
#         if not os.path.exists(self.file_path):
#             return
#         new_logs = []
#         try:
#             with open(self.file_path, "r") as f:
#                 f.seek(self._last_position)
#                 for line in f:
#                     parsed = self.parse_log_line(line)
#                     if parsed:
#                         new_logs.append(parsed)
#                 self._last_position = f.tell()

#             if new_logs:
#                 new_df = pd.DataFrame(new_logs)
#                 new_df['timestamp'] = pd.to_datetime(new_df['timestamp'])
#                 self.df = pd.concat([self.df, new_df], ignore_index=True).tail(1000)
                
#                 # Check for enough data points (windows) to train
#                 if len(self.df) > 20:
#                     self._train_ml_model()
#         except Exception as e:
#             print(f"❌ Ingestion Error: {e}")

#     def _train_ml_model(self):
#         # Create 50s buckets for ML stability with slower logs
#         resampled = self.df.resample('50s', on='timestamp').agg({
#             'message': 'count',
#             'level': lambda x: (x == 'ERROR').sum()
#         }).rename(columns={'message': 'vol', 'level': 'err'}).fillna(0)
        
#         if len(resampled) > 2:
#             self.model.fit(resampled[self.features_list])
#             self.is_trained = True
#             print("🧠 ML Model trained with feature names.")

# log_store = LogManager("app.log")

# # --- BACKGROUND SIMULATOR ---
# def run_background_simulator(file_path="app.log"):
#     """Writes a log every 5 seconds."""
#     print(f"🚀 Simulator active: Writing to {file_path}")
    
#     def write_log(level, message):
#         timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
#         log_line = f"{timestamp}  {level} 10000 --- [nio-8080-exec-1] c.n.p.service.MeshDataService  : {message}\n"
#         with open(file_path, "a") as f:
#             f.write(log_line)

#     while True:
#         level = "INFO" if random.random() > 0.15 else "ERROR"
#         msg = "System normal" if level == "INFO" else "Automated test incident detected"
#         write_log(level, msg)
#         time.sleep(5)

# # --- ROUTES ---
# @app.get("/raw-logs")
# def get_raw_logs():
#     log_store.update_data()
#     return log_store.df.tail(50).to_dict(orient="records")

# @app.get("/alerts")
# def get_alerts():
#     log_store.update_data()
#     if log_store.df.empty:
#         return [{"status": "Healthy", "why": "Initializing system..."}]

#     recent = log_store.df[log_store.df['timestamp'] >= (datetime.now() - timedelta(seconds=60))]
#     vol, err = len(recent), len(recent[recent['level'] == 'ERROR'])
    
#     alerts = []
#     if err > 5:
#         alerts.append({"type": "CRITICAL_THRESHOLD", "timestamp": datetime.now().isoformat(), "why": f"{err} errors/min"})

#     if log_store.is_trained and vol > 0:
#         # FIX: Pass a DataFrame with feature names to stop the UserWarning
#         current_features = pd.DataFrame([[vol, err]], columns=log_store.features_list)
#         pred = log_store.model.predict(current_features)[0]
#         if pred == -1:
#             alerts.append({"type": "ML_ANOMALY", "timestamp": datetime.now().isoformat(), "why": "Unusual log pattern"})
            
#     return alerts if alerts else [{"status": "Healthy", "why": "Normal behavior", "type": "HEALTHY"}]

# if __name__ == "__main__":
#     # Start simulator thread
#     threading.Thread(target=run_background_simulator, daemon=True).start()
#     uvicorn.run(app, host="127.0.0.1", port=8002)


import pandas as pd
import re
import numpy as np
import uvicorn
import os
import time
import random
import threading
import json  # Added for alert file serialization
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from sklearn.ensemble import IsolationForest

app = FastAPI(title="Sentinel Log Monitor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class LogManager:
    def __init__(self, file_path="app.log", alert_file="alerts.log"):
        self.file_path = file_path
        self.alert_file = alert_file  # Storage for chart history
        self.df = pd.DataFrame()
        self.features_list = ['vol', 'err']
        self.model = IsolationForest(contamination=0.03, random_state=42)
        self.is_trained = False
        self._last_position = 0
        
        # Initialize storage and seeds
        self._init_alert_storage()
        self.update_data()

    def _init_alert_storage(self):
        """Creates alerts.log with seed data if file is missing or empty."""
        if not os.path.exists(self.alert_file) or os.stat(self.alert_file).st_size == 0:
            print(f"📄 Initializing {self.alert_file} with seed data...")
            seed_data = [
                {"type": "ML_ANOMALY", "timestamp": (datetime.now() - timedelta(days=2)).isoformat(), "why": "Historical baseline anomaly", "status": "Anomaly"},
                {"type": "CRITICAL_THRESHOLD", "timestamp": (datetime.now() - timedelta(days=1)).isoformat(), "why": "Historical baseline threshold", "status": "Anomaly"},
                {"type": "ML_ANOMALY", "timestamp": (datetime.now() - timedelta(hours=12)).isoformat(), "why": "Recent baseline pattern", "status": "Anomaly"}
            ]
            with open(self.alert_file, "w") as f:
                for entry in seed_data:
                    f.write(json.dumps(entry) + "\n")

    def save_alert_to_file(self, alert_data):
        """Appends a new alert to the physical log file."""
        with open(self.alert_file, "a") as f:
            f.write(json.dumps(alert_data) + "\n")

    def get_all_stored_alerts(self):
        """Reads the entire history from alerts.log."""
        alerts = []
        if os.path.exists(self.alert_file):
            with open(self.alert_file, "r") as f:
                for line in f:
                    try:
                        alerts.append(json.loads(line))
                    except: continue
        return alerts

    def parse_log_line(self, line):
        pattern = r'(?P<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3})\s+(?P<level>\w+)\s+\d+\s+---\s+\[.*?\]\s+(?P<service>[\w\.]+)\s+:\s+(?P<message>.*)'
        match = re.search(pattern, line)
        return match.groupdict() if match else None

    def update_data(self):
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
                self._last_position = f.tell()

            if new_logs:
                new_df = pd.DataFrame(new_logs)
                new_df['timestamp'] = pd.to_datetime(new_df['timestamp'])
                self.df = pd.concat([self.df, new_df], ignore_index=True).tail(1000)
                
                if len(self.df) > 20:
                    self._train_ml_model()
        except Exception as e:
            print(f"❌ Ingestion Error: {e}")

    def _train_ml_model(self):
        resampled = self.df.resample('50s', on='timestamp').agg({
            'message': 'count',
            'level': lambda x: (x == 'ERROR').sum()
        }).rename(columns={'message': 'vol', 'level': 'err'}).fillna(0)
        
        if len(resampled) > 2:
            self.model.fit(resampled[self.features_list])
            self.is_trained = True
            print("🧠 ML Model trained with feature names.")

log_store = LogManager("app.log")

def run_background_simulator(file_path="app.log"):
    print(f"🚀 Simulator active: Writing to {file_path}")
    def write_log(level, message):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
        log_line = f"{timestamp}  {level} 10000 --- [nio-8080-exec-1] c.n.p.service.MeshDataService  : {message}\n"
        with open(file_path, "a") as f:
            f.write(log_line)

    while True:
        level = "INFO" if random.random() > 0.15 else "ERROR"
        msg = "System normal" if level == "INFO" else "Automated test incident detected"
        write_log(level, msg)
        time.sleep(5)

@app.get("/raw-logs")
def get_raw_logs():
    log_store.update_data()
    return log_store.df.tail(50).to_dict(orient="records")

@app.get("/alerts")
def get_alerts():
    log_store.update_data()
    
    # Always pull historical alerts first for the chart/dashboard
    history = log_store.get_all_stored_alerts()

    if log_store.df.empty:
        return history if history else [{"status": "Healthy", "why": "Initializing system..."}]

    recent = log_store.df[log_store.df['timestamp'] >= (datetime.now() - timedelta(seconds=60))]
    vol, err = len(recent), len(recent[recent['level'] == 'ERROR'])
    
    current_live_alerts = []
    
    if err > 5:
        alert = {
            "type": "CRITICAL_THRESHOLD", 
            "timestamp": datetime.now().isoformat(), 
            "why": f"{err} errors/min",
            "status": "Anomaly"
        }
        current_live_alerts.append(alert)
        log_store.save_alert_to_file(alert)

    if log_store.is_trained and vol > 0:
        current_features = pd.DataFrame([[vol, err]], columns=log_store.features_list)
        pred = log_store.model.predict(current_features)[0]
        if pred == -1:
            alert = {
                "type": "ML_ANOMALY", 
                "timestamp": datetime.now().isoformat(), 
                "why": "Unusual log pattern",
                "status": "Anomaly"
            }
            current_live_alerts.append(alert)
            log_store.save_alert_to_file(alert)
            
    # Combine history (for the chart) with new live alerts (for the popup)
    # The frontend will receive the full history so the chart always stays populated
    return history + current_live_alerts if (history or current_live_alerts) else [{"status": "Healthy", "why": "Normal behavior", "type": "HEALTHY"}]

if __name__ == "__main__":
    threading.Thread(target=run_background_simulator, daemon=True).start()
    uvicorn.run(app, host="127.0.0.1", port=8002)