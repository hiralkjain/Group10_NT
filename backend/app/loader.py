from app.parser import parse_log_line
from app.storage import logs_storage

SEVERITY_MAP = {
    "INFO": 1,
    "WARN": 2,
    "ERROR": 3
}

def enrich_log(log: dict):
    message = log["message"]
    return {
        "timestamp": log["timestamp"].isoformat(),
        "level": log["level"],
        "service": log["service"],
        "message": message,
        "severity_score": SEVERITY_MAP.get(log["level"], 0),
        "error_flag": log["level"] == "ERROR",
        "message_length": len(message),
        "keywords": message.lower().split()
    }

def load_logs(file_path: str):
    logs_storage.clear()
    with open(file_path, "r") as file:
        for line in file:
            parsed = parse_log_line(line.strip())
            if parsed:
                enriched = enrich_log(parsed)
                logs_storage.append(enriched)