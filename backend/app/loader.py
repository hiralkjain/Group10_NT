from app.parser import parse_log_line
from app.storage import logs_storage


def load_logs(file_path: str):
    with open(file_path, "r") as file:
        for line in file:
            parsed = parse_log_line(line.strip())
            if parsed:
                logs_storage.append(parsed)