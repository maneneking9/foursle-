@echo off
echo ========================================
echo   Deploying to Render Production
echo ========================================
echo.
echo Prerequisites:
echo 1. Make sure you have a Render account
echo 2. Create a new Web Service on Render
echo 3. Connect your GitHub repository
echo.
echo Environment Variables to set in Render:
echo - TURSO_DATABASE_URL: (your Turso database URL)
echo - TURSO_AUTH_TOKEN: (your Turso auth token)
echo - CLOUDINARY_CLOUD_NAME: (your Cloudinary cloud name)
echo - CLOUDINARY_API_KEY: (your Cloudinary API key)
echo - CLOUDINARY_API_SECRET: (your Cloudinary API secret)
echo.
echo Build Command: npm install && npm run build
echo Start Command: node --loader tsx server-prod.ts
echo.
echo Alternative: Use render.yaml for automatic deployment
echo.
echo ========================================
echo   Building Application...
echo ========================================
call npm run build
echo.
echo Build complete! 
echo.
echo Now deploy to Render using:
echo   1. Push to GitHub
echo   2. Connect repo to Render
echo   3. Use render.yaml or manual settings
echo.
pause
