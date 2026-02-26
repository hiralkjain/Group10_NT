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
    start_datetime: Optional[datetime] = None
    end_datetime: Optional[datetime] = None

from pydantic import BaseModel
from typing import List, Optional

class LogLine(BaseModel):
    timestamp: str
    line: str
    level: str

class Alert(BaseModel):
    message: str
    severity: str
    timestamp: str

class ProjectStats(BaseModel):
    projectId: str
    latestLogs: List[LogLine]
    alerts: List[Alert]

class GraphDataPoint(BaseModel):
    timestamp: str
    errorCount: int
    warnCount: int
    infoCount: int

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    response: str