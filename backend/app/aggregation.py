from collections import Counter


def aggregate_by_level(logs):
    return dict(Counter(log["level"] for log in logs))


def aggregate_by_service(logs):
    return dict(Counter(log["service"] for log in logs))