@echo off
echo ========================================
echo   Deploying to Vercel Production
echo ========================================
echo.
echo Building application...
call npm run build
echo.
echo Deploying to Vercel...
call vercel --prod
echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Don't forget to set environment variables in Vercel:
echo - TURSO_DATABASE_URL
echo - TURSO_AUTH_TOKEN
echo - CLOUDINARY_CLOUD_NAME
echo - CLOUDINARY_API_KEY
echo - CLOUDINARY_API_SECRET
echo - VITE_API_URL=/api
echo.
pause
