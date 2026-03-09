@echo off
echo Starting Foursquare Church Application...
echo.

REM Start backend server in new window
start "Backend Server" cmd /k "npm run server"

REM Wait 3 seconds for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in current window
echo Starting frontend...
npm run dev
