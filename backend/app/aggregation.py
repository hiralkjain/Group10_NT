from collections import Counter


def aggregate_by_level(logs):
    return dict(Counter(log["level"] for log in logs))


def aggregate_by_logger(logs):
    return dict(Counter(log["logger"] for log in logs))