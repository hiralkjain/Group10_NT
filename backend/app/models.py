from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
class Log(BaseModel):
    timestamp: str
    level: str
    service: str
    message: str
    severity_score: int
    error_flag: bool
    message_length: int
    keywords: List[str]


class LogFilterRequest(BaseModel):
    levels: Optional[List[str]] = None
    logger_contains: Optional[str] = None
    message_keyword: Optional[str] = None
    regex: Optional[str] = None
    from_time: Optional[datetime] = None
    to_time: Optional[datetime] = None
    last_minutes: Optional[int] = None