from fastapi import APIRouter, UploadFile, File
from typing import List
from uuid import uuid4
from datetime import datetime
from .database import projects_collection, files_collection
from .models import ProjectStats, GraphDataPoint, ChatRequest, ChatResponse
from .utils.embeddings import generate_embedding

router = APIRouter(prefix="/api/project", tags=["Project"])

# 1. Create project with files
@router.post("/")
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


# 2. Get project stats
@router.get("/{project_id}")
def get_project_stats(project_id: str):
    project = projects_collection.find_one({"_id": project_id})
    if not project:
        return {"error": "Project not found"}

    latest_logs = project.get("logs", [])[-10:]
    alerts = project.get("alerts", [])

    return ProjectStats(
        projectId=project_id,
        latestLogs=latest_logs,
        alerts=alerts
    )


# 3. Get graph data
@router.get("/{project_id}/graph")
def get_project_graph(project_id: str):
    # Example: count log levels per hour (stub)
    graph_data = [
        {"timestamp": datetime.utcnow().isoformat(), "errorCount": 5, "warnCount": 2, "infoCount": 10}
    ]
    return {"projectId": project_id, "graphData": graph_data}


# 4. Chat with project
@router.post("/{project_id}/chat")
def chat_project(project_id: str, request: ChatRequest):
    # Placeholder: you would implement RAG search + HF model here
    last_user_msg = [m['content'] for m in request.messages if m.role == "user"][-1]
    response_text = f"Echo: {last_user_msg}"  # Temporary
    return ChatResponse(response=response_text)


# 5. List projects
@router.get("/")
def list_projects():
    projects = projects_collection.find()
    return [{"projectId": p["_id"], "name": p["name"], "createdAt": p["createdAt"]} for p in projects]