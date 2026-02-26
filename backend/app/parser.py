import re
from datetime import datetime

log_pattern = re.compile(
    r'^(?P<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d+)\s+'
    r'(?P<level>\w+)\s+'
    r'(?P<pid>\d+)\s+---\s+\[(?P<thread>[^\]]+)\]\s+'
    r'(?P<logger>[^\s]+)\s+:\s+(?P<message>.*)'
)


def parse_log_line(line: str):
    match = log_pattern.match(line)
    if not match:
        return None

    data = match.groupdict()

    return {
        "timestamp": datetime.strptime(
            data["timestamp"], "%Y-%m-%d %H:%M:%S.%f"
        ),
        "level": data["level"],
        "pid": int(data["pid"]),
        "thread": data["thread"],
        "logger": data["logger"],
        "message": data["message"],
    }