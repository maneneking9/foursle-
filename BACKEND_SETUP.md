# Backend Server Setup - IMPORTANT

## The Issue
If you see "Backend API not available" or "Cannot connect to server" errors when trying to login or register, it means the backend server is not running.

## Solution - Start the Backend Server

### Option 1: Quick Start (Recommended)
```bash
start.bat
```
This will start both frontend and backend automatically.

### Option 2: Manual Start
Open a new terminal and run:
```bash
npm run server
```

The backend will start on: http://localhost:3001

### Option 3: Start Backend Only
```bash
npx tsx server.ts
```

## Verify Backend is Running
1. Open browser to: http://localhost:3001/api/hero-slides
2. You should see JSON data (empty array [] is fine)
3. If you see an error page, the backend is NOT running

## Environment Variables
Make sure `.env.local` has:
```
VITE_API_URL=http://localhost:3001
```

## Common Issues

### Port 3001 Already in Use
```bash
npx kill-port 3001
npm run server
```

### Database Not Found
Delete `church.db` file and restart server. It will recreate with default admin user.

### Still Not Working?
1. Check if Node.js is installed: `node --version`
2. Install dependencies: `npm install`
3. Check firewall settings
4. Try restarting your computer

## Default Admin Credentials
- Email: manane@gmail.com
- Password: 2026

## Production Deployment
For production on Vercel, the backend needs to be deployed separately or use serverless functions.
