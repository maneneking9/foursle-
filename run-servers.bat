@echo off
echo ========================================
echo   Foursquare Church - Starting Servers
echo ========================================
echo.
echo Starting Backend Server (Port 3001)...
echo Starting Frontend Server (Port 3000)...
echo.
echo Press Ctrl+C to stop all servers
echo ========================================
echo.

start "Backend Server" cmd /k "npm run server"
timeout /t 3 /nobreak >nul
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo   Servers Started Successfully!
echo ========================================
echo   Backend:  http://localhost:3001
echo   Frontend: http://localhost:3000
echo ========================================
