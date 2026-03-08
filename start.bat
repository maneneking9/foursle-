@echo off
echo Installing dependencies...
call npm install

echo.
echo Starting backend server...
start cmd /k "npm run server"

timeout /t 3 /nobreak >nul

echo.
echo Starting frontend...
start cmd /k "npm run dev"

echo.
echo ========================================
echo App is starting!
echo Frontend: http://localhost:3000
echo Backend: http://localhost:3001
echo Admin: http://localhost:3000/admin
echo ========================================
