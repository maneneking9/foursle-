# Render Deployment Guide

This guide explains how to deploy the Foursquare Church application to Render with full API functionality.

## Current Status

✅ **Database**: Turso database initialized with all required tables
✅ **API Server**: Production server (`server-prod.ts`) created
✅ **Frontend**: Build successful

## Quick Deploy to Render

### Option 1: Deploy using render.yaml (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Add production server and Render config"
   git push origin main
   ```

2. **Connect to Render**
   - Go to https://dashboard.render.com
   - Create a new "Web Service"
   - Connect your GitHub repository
   - Use the following settings:
     - Build Command: `npm install && npm run build`
     - Start Command: `node --loader tsx server-prod.ts`

3. **Set Environment Variables** in Render dashboard:
   - `TURSO_DATABASE_URL` = (your Turso database URL)
   - `TURSO_AUTH_TOKEN` = (your Turso auth token)
   - `CLOUDINARY_CLOUD_NAME` = (your Cloudinary cloud name)
   - `CLOUDINARY_API_KEY` = (your Cloudinary API key)
   - `CLOUDINARY_API_SECRET` = (your Cloudinary API secret)

### Option 2: Manual Deploy

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder and `server-prod.ts` to Render

## Default Login Credentials

After deployment, use these credentials to login:
- **Email**: manane@gmail.com
- **Password**: 2026

## New User Registration

Users can register at `/register` - the registration is now connected to the real API.

## Files Modified

1. **src/components/LoginPage.tsx** - Now uses real API for authentication
2. **src/context/AuthContext.tsx** - Now uses real API for login
3. **src/lib/api.ts** - Fixed API URL path
4. **server-prod.ts** - New production server with all API endpoints
5. **render.yaml** - Render deployment configuration
6. **init-db.ts** - Database initialization script (already run)

## API Endpoints Available

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile/:id` - Get user profile
- `PUT /api/auth/profile/:id` - Update user profile
- `POST /api/auth/change-password` - Change password

- `GET /api/hero-slides` - Get hero slides
- `GET /api/events` - Get events
- `GET /api/prayers` - Get prayer requests
- `GET /api/sermons` - Get sermons
- `GET /api/testimonies` - Get testimonies
- `GET /api/groups` - Get groups
- `GET /api/announcements` - Get announcements
- `GET /api/gallery` - Get gallery images
- `GET /api/church-profile` - Get church profile
- `GET /api/feedback` - Get feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/membership-requests` - Get membership requests
- `POST /api/membership-requests` - Submit membership request
- `GET /api/search` - Search content
- `POST /api/upload` - Upload files

## Troubleshooting

### If login doesn't work:
1. Check Render logs for errors
2. Verify environment variables are set correctly
3. Ensure Turso database is accessible

### If you see "Cannot connect to server":
- Check that the server is running on the correct port
- Verify CORS settings allow your domain

## Local Development

To test locally with the production server:
```bash
# Start the production server (serves both API and frontend)
npm run server:prod

# Or use the Turso server
npm run server:turso
```

Then open http://localhost:10000 (or port 3001 for API only)
