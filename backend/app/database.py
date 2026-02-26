import os

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DB = os.getenv("MONGODB_DB", "log_monitoring")

if not MONGODB_URI:
    raise ValueError("MONGODB_URI is not set")

client = MongoClient(MONGODB_URI)
db = client[MONGODB_DB]

users_collection = db["users"]

