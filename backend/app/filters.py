from datetime import datetime, timedelta
import re
from warnings import filters
from app.models import LogFilterRequest


def apply_filters(logs, filter_req: LogFilterRequest):
    result = logs

    # Filter by levels
    if filter_req.levels:
        result = [
            log for log in result
            if log["level"] in filter_req.levels
        ]

    # Filter by service name
    if filter_req.logger_contains:
        result = [
            log for log in result
            if filter_req.service_contains.lower()
            in log["service"].lower()
        ]

    # Keyword search
    if filter_req.message_keyword:
        result = [
            log for log in result
            if filter_req.message_keyword.lower()
            in log["message"].lower()
        ]

    # Regex search
    if filter_req.regex:
        pattern = re.compile(filter_req.regex, re.IGNORECASE)
        result = [
            log for log in result
            if pattern.search(log["message"])
        ]

    # Time range (IMPORTANT: timestamp is now string → convert)
    if filter_req.from_time and filter_req.to_time:
        result = [
            log for log in result
            if filter_req.from_time <= datetime.fromisoformat(log["timestamp"]) <= filter_req.to_time
        ]

    # Last X minutes
    if filter_req.last_minutes:
        cutoff = datetime.utcnow() - timedelta(
            minutes=filter_req.last_minutes
        )
        result = [
            log for log in result
            if datetime.fromisoformat(log["timestamp"]) >= cutoff
        ]

    if filter_req.start_datetime:
      result = [
        log for log in result
        if datetime.fromisoformat(log["timestamp"]) >= filter_req.start_datetime
    ]

    if filter_req.end_datetime:
      result = [
        log for log in result
        if datetime.fromisoformat(log["timestamp"]) <= filter_req.end_datetime
    ]

        
    return result