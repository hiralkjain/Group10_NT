# Logs: Multi-Department Monitoring System

[![FastAPI](https://img.shields.io/badge/FastAPI-0.133.1-brightgreen)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-NoSQL-green)](https://mongodb.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-indigo)](https://tailwindcss.com)

**Logs** is a high-performance log monitoring and incident management dashboard. It provides real-time visibility into system logs, filtered by departmental context (**Infrastructure**, **Business Logic**, and **Security**), and a robust **FastAPI** backend.

## 🎯 Why We Chose This Problem Statement

**Problem 1: Log Monitoring & Alerting System** from the Northern Trust Intern Hackathon 2026 was selected because:

### ✅ **Perfect Skill Alignment**
- **Backend Mastery**: FastAPI + MongoDB for scalable APIs
- **Real-time Processing**: Log ingestion + alert rules 
- **System Design**: Multi-department filtering + correlation IDs
- **UI/UX Excellence**: Tailwind + Recharts dashboard

### 🚀 **Hackathon Requirements Fully Covered**

#### **Core Requirements ✓**
1. **Log Ingestion** → File loader + MongoDB storage
2. **Search/Filter** → Departmental + time/keyword search  
3. **Alert Rules** → Latency spikes, validation failures, 409 conflicts
4. **Alert Output** → UI + API with "Reason" extraction

#### **Stretch Goals ✓**
- **Charts** → Endpoint Analytics, Asset Type Pie
- **Export** → CSV download for filtered logs
- **Tracing** → Correlation ID (assetId/accountId) tracking

#### **Modern Stack**
```
├── FastAPI + Pydantic v2 (Type Safety)
├── React 18 + Tailwind (Production UI)
├── JWT Auth + MongoDB (Scalable Backend)
├── Recharts + Framer Motion (Animations)
└── Multi-department RBAC (Enterprise-grade)
```

## 🚀 Key Features

### 🏢 **Departmental Intelligence**
- **Scoped Access**: Login as Infra/Business/Security personnel
- **Pattern Matching**: Auto-filter by keywords (`"DB Connection"`, `"Asset Creation"`)
- **Actionable Alerts**: Real-time with "Resolve" + audit trail

### 🔐 **Admin Oversight**
- **User Audit Trail**: Live session monitoring
- **Resolution Analytics**: Department efficiency comparison
- **Global Stream**: Master view of all infrastructure logs

### 📊 **Advanced Analytics**
- **Endpoint Performance**: Top endpoints + error rates bar chart
- **Asset Type Heatmap**: Pie chart distribution (Stock/Bond/ETF)
- **Correlation Tracing**: Click assetId=791 for full lifecycle trace

### 🎨 **UI/UX Excellence**
- **True Black OLED Theme**: Zero distractions, maximum readability
- **Responsive Design**: Mobile/tablet/desktop optimized
- **Interactive Charts**: Recharts + smooth Framer Motion animations

## 🛠️ Tech Stack

| Frontend | Backend | Database | Tools |
|----------|---------|----------|-------|
| React 18 (TS) | FastAPI | MongoDB | Tailwind CSS |
| Framer Motion | Pydantic v2 |  | Lucide React |
| Recharts | JWT/Passlib |  | Axios |
| Tailwind CSS | Uvicorn |  |  |

## 📂 Project Structure
```
logs/
├── frontend/ # React + Tailwind
│ ├── src/
│ │ ├── components/ # Sidebar, Charts, Layouts
│ │ ├── context/ # AuthContext, LogContext
│ │ ├── pages/ # Dashboard, UserMgmt, Resolutions
│ │ └── api/ # Axios endpoints
│ ├── tailwind.config.js
│ └── package.json
├── backend/ # FastAPI Server
│ ├── app/
│ │ ├── main.py # FastAPI app entry
│ │ ├── models/ # Pydantic schemas
│ │ ├── routes/ # /api/logs, /api/alerts
│ │ ├── loader.py # Log file ingestion
│ │ └── database.py # Mongo connection
│ ├── requirements.txt
│ └── .env # MONGO_URI, JWT_SECRET
└── README.md
```


## ⚡ Getting Started

### 1. **Prerequisites**
```bash
Node.js v18+          # npm install
Python 3.9+           # venv + pip
MongoDB               # Local or Atlas (MONGO_URI)
```

### 2. **Backend Setup**
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

## 4. **LOG Setup**
```
cd model2
python main.py
```

## Quick Start (Windows)

1. Clone the repository
2. Open the project folder
3. Double click `run_sentinel.bat`
4. Open browser at:
   - Frontend: http://localhost:5173
   - Backend Docs: http://localhost:8000/docs

## 📊 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/logs` | Filtered logs by dept/time/keyword | `JWT` |
| `GET` | `/api/alerts` | Active alerts + reasons | `JWT` |
| `GET` | `/api/analytics/endpoints` | Top endpoints + error rates | `Admin` |
| `POST` | `/api/auth/login` | Department login | `None` |
| `PATCH` | `/api/alerts/{id}/resolve` | Mark alert resolved | `JWT` |
| `GET` | `/api/analytics/asset-types` | Asset type distribution (Pie) | `JWT` |
| `GET` | `/api/analytics/resolutions` | Dept resolution efficiency | `Admin` |
| `POST` | `/api/chat` | AI log analysis assistant | `JWT` |
| `GET` | `/api/search/{query}` | Correlation ID tracing | `JWT` |
| `GET` | `/health` | System health check | `None` |
| `GET` | `/api/admin/users` | Active user sessions | `Admin` |
| `GET` | `/api/admin/stream` | Global log stream | `Admin` |
