@echo off
title Sentinel System Launcher
echo ====================================================
echo   SENTINEL: INSTALLING DEPENDENCIES & STARTING
echo ====================================================

:: 1. Setup Frontend
echo [1/3] Preparing Frontend...
cd frontend
call npm install
start "Sentinel Frontend" cmd /k "npm run dev"
cd ..

:: 2. Setup Backend
echo [2/3] Preparing Backend...
cd backend
:: Check if venv exists, if not, create and install
if not exist venv (
    python -m venv venv
    call venv\Scripts\activate
    pip install -r requirements.txt
) else (
    call venv\Scripts\activate
)
start "Sentinel API" cmd /k "venv\Scripts\activate && uvicorn main:app --reload --port 8000"
cd ..

:: 3. Setup Model2 (Simulator & ML)
echo [3/3] Preparing Model/Simulator...
cd model2
if not exist venv (
    python -m venv venv
    call venv\Scripts\activate
    pip install -r requirements.txt
) else (
    call venv\Scripts\activate
)
start "Sentinel Model" cmd /k "venv\Scripts\activate && python main.py"
cd ..

echo ====================================================
echo   SUCCESS: All services are launching in new windows.
echo ====================================================
pause