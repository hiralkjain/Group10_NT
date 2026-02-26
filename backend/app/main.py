from fastapi import FastAPI
from app.loader import load_logs
from app.storage import logs_storage
from app.models import LogFilterRequest
from app.filters import apply_filters
from app.aggregation import aggregate_by_level, aggregate_by_service
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Log Monitoring System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    load_logs("logs/application.log")


@app.get("/")
def root():
    return {"message": "Log Monitoring System Running"}


from fastapi import FastAPI
from app.loader import load_logs
from app.storage import logs_storage
from app.models import LogFilterRequest
from app.filters import apply_filters
from app.aggregation import aggregate_by_level, aggregate_by_service
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Log Monitoring System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    load_logs("logs/application.log")


@app.get("/")
def root():
    return {"message": "Log Monitoring System Running"}


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