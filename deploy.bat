@echo off
echo ========================================
echo   Foursquare Church - Deployment
echo ========================================
echo.

echo [1/4] Installing dependencies...
call npm install

echo.
echo [2/4] Building application...
call npm run build

echo.
echo [3/4] Testing build...
if exist dist (
    echo ✓ Build successful!
) else (
    echo ✗ Build failed!
    exit /b 1
)

echo.
echo [4/4] Ready to deploy!
echo.
echo To deploy to Vercel:
echo   1. Run: vercel login
echo   2. Run: vercel --prod
echo.
echo Or push to GitHub and connect to Vercel dashboard
echo.
echo ========================================
echo   Deployment Ready! 🚀
echo ========================================
pause
