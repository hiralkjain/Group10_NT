from fastapi import APIRouter, HTTPException, status

from app.auth_utils import create_access_token, hash_password, verify_password
from app.database import users_collection
from app.models import Token, UserCreate, UserLogin

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserCreate):
    existing = users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    hashed = hash_password(user.password)
    users_collection.insert_one({"email": user.email, "hashed_password": hashed})

    return {"message": "User registered successfully"}


@router.post("/login", response_model=Token)
def login(credentials: UserLogin):
    user_doc = users_collection.find_one({"email": credentials.email})
    if not user_doc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    if not verify_password(credentials.password, user_doc["hashed_password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    access_token = create_access_token(data={"sub": credentials.email})
    return Token(access_token=access_token)

