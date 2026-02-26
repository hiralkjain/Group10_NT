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


# -------------------- SaaS Project Routes --------------------
# Create project with files
@app.post("/api/project")
async def create_project(name: str, files: List[UploadFile] = File(...)):
    project_id = str(uuid4())
    project_doc = {
        "_id": project_id,
        "name": name,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow(),
        "files": [],
        "logs": [],
        "alerts": []
    }
    projects_collection.insert_one(project_doc)

    for f in files:
        content = await f.read()
        embedding = generate_embedding(content.decode())
        file_doc = {
            "projectId": project_id,
            "filename": f.filename,
            "content": content.decode(),
            "embedding": embedding
        }
        files_collection.insert_one(file_doc)
        project_doc["files"].append(f.filename)

    return {"projectId": project_id}


# List all projects
@app.get("/api/project")
def list_projects():
    projects = projects_collection.find()
    return [{"projectId": p["_id"], "name": p["name"], "createdAt": p["createdAt"]} for p in projects]


# Get project stats (latest logs + alerts)
@app.get("/api/project/{project_id}")
def get_project_stats(project_id: str):
    project = projects_collection.find_one({"_id": project_id})
    if not project:
        return {"error": "Project not found"}
    latest_logs = project.get("logs", [])[-10:]
    alerts = project.get("alerts", [])
    return {"projectId": project_id, "latestLogs": latest_logs, "alerts": alerts}


# Chat with project (RAG placeholder)
@app.post("/api/project/{project_id}/chat")
async def project_chat(project_id: str, req: dict):
    messages = req.get("messages", [])
    last_user_msg = next((m["content"] for m in reversed(messages) if m["role"] == "user"), "")
    # Placeholder: integrate your RAG model here
    response_text = f"Echo: {last_user_msg}"
    return {"response": response_text}


# Graph endpoint (stub)
@app.get("/api/project/{project_id}/graph")
def project_graph(project_id: str):
    # Example graph stub
    graph_data = [
        {"timestamp": datetime.utcnow().isoformat(), "errorCount": 5, "warnCount": 2, "infoCount": 10}
    ]
    return {"projectId": project_id, "graphData": graph_data}