from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional


class Log(BaseModel):
    timestamp: datetime
    level: str
    pid: int
    thread: str
    logger: str
    message: str


class LogFilterRequest(BaseModel):
    levels: Optional[List[str]] = None
    logger_contains: Optional[str] = None
    message_keyword: Optional[str] = None
    regex: Optional[str] = None
    from_time: Optional[datetime] = None
    to_time: Optional[datetime] = None
    last_minutes: Optional[int] = None
    start_datetime: Optional[datetime] = None
    end_datetime: Optional[datetime] = None