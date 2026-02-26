from app.filters import apply_filters
from app.models import LogFilterRequest

def test_filter_by_level():
    logs = [
        {"level": "ERROR", "timestamp": None, "logger": "", "message": ""},
        {"level": "INFO", "timestamp": None, "logger": "", "message": ""},
    ]

    filter_req = LogFilterRequest(levels=["ERROR"])
    result = apply_filters(logs, filter_req)

    assert len(result) == 1
    assert result[0]["level"] == "ERROR"