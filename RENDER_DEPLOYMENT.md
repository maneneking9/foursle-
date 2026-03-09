# Render Deployment Guide

This guide explains how to deploy the Foursquare Church application to Render with full API functionality.

## ✅ Current Status

- **Database**: Turso database initialized with all required tables including branches
- **API Server**: Production server (`server-prod.ts`) with all endpoints
- **Frontend**: Build successful with new admin dashboard
- **Default Branches**: City Light and Word Light branches created

## Quick Deploy to Render

### Option 1: Deploy using render.yaml (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Add production server and advanced admin dashboard"
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

## New Admin Dashboard Features

The admin dashboard now includes:

### 🔧 Left Sidebar Navigation
- Collapsible sidebar with icons
- Smooth animations
- User profile section with logout

### 📊 Dashboard
- Overview statistics (members, events, sermons, prayers)
- Recent events and sermons

### ⛪ Church Branches Management (CRUD)
- Add new branches
- Edit existing branches
- Delete branches
- View branch details (address, pastor, contact, etc.)

### Other Features
- **Hero Slides**: Add, edit, delete slides
- **Events**: Full event management
- **Sermons**: Upload and manage sermons
- **Testimonies**: Approve or delete
- **Groups**: Manage small groups
- **Announcements**: Create and publish
- **Gallery**: Image management
- **Members**: View all registered members
- **Settings**: Church configuration

## Files Created/Modified

1. **server-prod.ts** - Production server with all API endpoints
2. **init-db.ts** - Database initialization with branches table
3. **src/components/AdminDashboard.tsx** - New admin with left sidebar
4. **src/lib/api.ts** - Updated API functions
5. **render.yaml** - Render deployment configuration
6. **src/components/LoginPage.tsx** - Real API login
7. **src/context/AuthContext.tsx** - Real API authentication

## API Endpoints Available

### Auth
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile/:id` - Get user profile
- `PUT /api/auth/profile/:id` - Update profile
- `POST /api/auth/change-password` - Change password

### Branches (NEW!)
- `GET /api/branches` - Get all branches
- `GET /api/branches/:slug` - Get single branch
- `POST /api/branches` - Create branch
- `PUT /api/branches/:id` - Update branch
- `DELETE /api/branches/:id` - Delete branch

### Content
- `GET/POST /api/hero-slides` - Hero slides
- `GET/POST /api/events` - Events
- `GET/POST /api/sermons` - Sermons
- `GET/POST /api/testimonies` - Testimonies
- `GET/POST /api/groups` - Groups
- `GET/POST /api/announcements` - Announcements
- `GET/POST /api/gallery` - Gallery

### Other
- `GET /api/prayers` - Prayer requests
- `GET /api/members` - Members list
- `GET /api/search` - Search
- `POST /api/upload` - File upload

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
