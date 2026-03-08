@echo off
echo Starting Foursquare Church App with Turso Database...
echo.
start cmd /k "npm run server:turso"
timeout /t 3 /nobreak >nul
start cmd /k "npm run dev"
echo.
echo Frontend: http://localhost:3000
echo Backend: http://localhost:3001
echo Database: Turso Cloud
