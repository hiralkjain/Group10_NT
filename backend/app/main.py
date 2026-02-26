from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.aggregation import aggregate_by_level, aggregate_by_service
from app.auth_routes import router as auth_router
from app.filters import apply_filters
from app.loader import load_logs
from app.storage import logs_storage
from app.models import LogFilterRequest
from app.chatbot import ask_chatbot

# SaaS project imports
from app.database import projects_collection, files_collection
from app.utils.embeddings import generate_embedding

# Your FastAPI app
app = FastAPI(title="Log Monitoring + SaaS Project System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)


@app.on_event("startup")
def startup_event():
    load_logs("logs/application.log")


# -------------------- Root --------------------
@app.get("/")
def root():
    return {"message": "System Running"}


# -------------------- Log Monitoring Routes --------------------
@app.post("/logs/filter")
def filter_logs(filter_req: LogFilterRequest):
    filtered = apply_filters(logs_storage, filter_req)
    return {
        "total_logs": len(logs_storage),
        "matched_logs": len(filtered),
        "level_distribution": aggregate_by_level(filtered),
        "service_distribution": aggregate_by_service(filtered),
        "results": filtered
    }


@app.get("/logs/count")
def get_log_count():
    return {"count": len(logs_storage)}


@app.post("/chat")
def chat(req: dict):  # Using your existing ChatRequest model if preferred
    question = req.get("question")
    answer = ask_chatbot(question)
    return {"answer": answer}

