from pydantic import BaseModel, EmailStr
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


class UserBase(BaseModel):
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserLogin(UserBase):
    password: str


class UserInDB(UserBase):
    id: str
    hashed_password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    email: Optional[EmailStr] = None