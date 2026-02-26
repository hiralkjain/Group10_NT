from datetime import datetime, timedelta
import re
from app.models import LogFilterRequest


def apply_filters(logs, filter_req: LogFilterRequest):
    result = logs

    # Filter by levels
    if filter_req.levels:
        result = [
            log for log in result
            if log["level"] in filter_req.levels
        ]

    # Filter by logger name
    if filter_req.logger_contains:
        result = [
            log for log in result
            if filter_req.logger_contains.lower()
            in log["logger"].lower()
        ]

    # Keyword search
    if filter_req.message_keyword:
        result = [
            log for log in result
            if filter_req.message_keyword.lower()
            in log["message"].lower()
        ]



    return result