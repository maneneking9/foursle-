# Vercel Deployment Guide

## Backend Architecture
✅ SQLite Database (stored in Vercel KV or local)
✅ Cloudinary for media storage
✅ Express API routes
✅ Real-time admin updates

## Features
- Dynamic hero slides (admin can change in real-time)
- Event management
- Sermon uploads (video/audio)
- Prayer requests
- Testimonies
- Gallery management
- Announcements

## Deployment Steps

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
vercel --prod
```

### 4. Set Environment Variables in Vercel Dashboard
- CLOUDINARY_CLOUD_NAME=dooejcdcn
- CLOUDINARY_API_KEY=289699272556856
- CLOUDINARY_API_SECRET=RlS9BumbzEr835Qf1c2cMlnq_yg

## Local Development

### 1. Start Backend Server
```bash
npm run server
```

### 2. Start Frontend (in new terminal)
```bash
npm run dev
```

## Admin Access
Navigate to `/admin` to access the admin dashboard.

## API Endpoints

### Hero Slides
- GET /api/hero-slides - Get all active slides
- POST /api/admin/hero-slides - Create new slide
- PUT /api/admin/hero-slides/:id - Update slide
- DELETE /api/admin/hero-slides/:id - Delete slide

### Events
- GET /api/events - Get all events
- POST /api/events - Create event
- POST /api/events/:id/register - Register for event

### Sermons
- GET /api/sermons - Get all sermons
- POST /api/sermons - Upload sermon
- POST /api/sermons/:id/view - Increment views
- POST /api/sermons/:id/like - Like sermon

### Prayer Requests
- GET /api/prayers - Get active prayers
- POST /api/prayers - Create prayer request
- POST /api/prayers/:id/pray - Pray for request

### Gallery
- GET /api/gallery - Get all images
- POST /api/gallery - Upload image

### Upload
- POST /api/upload - Upload any file to Cloudinary

## Database Schema
All data stored in SQLite with tables:
- users
- hero_slides
- events
- event_registrations
- prayer_requests
- sermons
- testimonies
- groups
- announcements
- donations
- gallery_images
- site_settings

## Cloudinary Limits (Free Plan)
- 25 GB storage
- 25 GB bandwidth/month
- Unlimited transformations

## Notes
- All images/videos uploaded to Cloudinary
- Database persists on Vercel
- Admin can update hero slides in real-time
- No Firebase needed
- 100% free hosting
