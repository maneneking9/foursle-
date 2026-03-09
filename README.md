# Foursquare Church - Full Stack App

## 🚀 Features
- ✅ **Dynamic Hero Slides** (Admin Controlled - Real-time Updates)
- ✅ **Admin Authentication** (Secure Login System)
- ✅ **Event Management** (Create, Track, Register)
- ✅ **Sermon Uploads** (Video/Audio with Cloudinary)
- ✅ **Prayer Requests** (Community Prayer Wall)
- ✅ **Testimonies** (Approval System)
- ✅ **Gallery Management** (Image Upload & Organization)
- ✅ **Live Announcements** (Real-time Updates)
- ✅ **Cloudinary Media Storage** (25GB Free)
- ✅ **SQLite Database** (Persistent Data)
- ✅ **Admin Dashboard** (Full Content Management)

## 🔐 Admin Credentials
**Email:** manane@gmail.com  
**Password:** 2026

## 🛠️ Tech Stack
- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Express.js + SQLite
- **Media Storage**: Cloudinary
- **Deployment**: Vercel
- **Animation**: Framer Motion
- **Auth**: Custom JWT-less Session

## 📦 Installation

```bash
npm install
```

## 🏃 Running Locally

### ⚠️ IMPORTANT: Backend Server Required
**You MUST run the backend server for login/register to work!**

If you see "Backend API not available" error:
1. Open a terminal
2. Run: `npm run server`
3. Backend starts on http://localhost:3001

### Quick Start (Windows)
```bash
start.bat
```
This starts both frontend and backend automatically.

### Manual Start
**Terminal 1 - Backend (REQUIRED):**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## 🌐 Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Admin Dashboard**: http://localhost:3000/admin
- **Admin Login**: Click "Admin" button in navbar (after logging in)

## 🎯 How to Use Admin Dashboard

1. **Login**: 
   - Use credentials: manane@gmail.com / 2026
   - Login modal appears when accessing /admin
   
2. **Manage Hero Slides**:
   - Upload new images (stored in Cloudinary)
   - Set title, subtitle, and order
   - Delete existing slides
   - Changes appear immediately on homepage

3. **Create Events**:
   - Add event details with images
   - Set date, time, location
   - Track registrations automatically

4. **Upload Sermons**:
   - Upload video/audio files
   - Add speaker, scripture, description
   - Track views and likes

5. **Manage Gallery**:
   - Upload church photos
   - Organize by category
   - All images stored in Cloudinary

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - User registration

### Hero Slides (Dynamic Homepage)
- `GET /api/hero-slides` - Get all active slides
- `POST /api/admin/hero-slides` - Create slide (admin only)
- `PUT /api/admin/hero-slides/:id` - Update slide
- `DELETE /api/admin/hero-slides/:id` - Delete slide

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event
- `POST /api/events/:id/register` - Register for event

### Sermons
- `GET /api/sermons` - Get all sermons
- `POST /api/sermons` - Upload sermon
- `POST /api/sermons/:id/view` - Increment views
- `POST /api/sermons/:id/like` - Like sermon

### Prayer Requests
- `GET /api/prayers` - Get active prayers
- `POST /api/prayers` - Create prayer request
- `POST /api/prayers/:id/pray` - Pray for request

### More Endpoints
- Testimonies: `/api/testimonies`
- Groups: `/api/groups`
- Announcements: `/api/announcements`
- Gallery: `/api/gallery`
- Upload: `/api/upload`

## 🚀 Deployment to Vercel

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login
```bash
vercel login
```

### 3. Deploy
```bash
vercel --prod
```

### 4. Set Environment Variables in Vercel Dashboard
- `CLOUDINARY_CLOUD_NAME=dooejcdcn`
- `CLOUDINARY_API_KEY=289699272556856`
- `CLOUDINARY_API_SECRET=RlS9BumbzEr835Qf1c2cMlnq_yg`

## 📊 Database Schema
SQLite database with tables:
- **users** - Admin and user accounts
- **hero_slides** - Dynamic homepage images (admin controlled)
- **events** - Church events with registration tracking
- **event_registrations** - Event attendee records
- **prayer_requests** - Community prayer wall
- **sermons** - Video/audio sermons with analytics
- **testimonies** - User testimonies (approval required)
- **groups** - Small groups and ministries
- **announcements** - Church announcements
- **donations** - Donation tracking
- **gallery_images** - Photo gallery
- **site_settings** - Dynamic site configuration

## 🎨 Cloudinary Configuration
Already configured with your credentials:
- **Cloud Name**: dooejcdcn
- **API Key**: 289699272556856
- **Free Plan**: 25GB storage + 25GB bandwidth/month
- **Features**: Automatic optimization, transformations, CDN

## 🔒 Security Features
- Admin authentication required for management
- Password-protected admin routes
- SQL injection prevention
- File upload validation
- Size limits enforced (10MB images, 50MB videos)
- CORS protection

## 📱 Dynamic Features

### Real-time Hero Slides
- Admin uploads images via dashboard
- Changes reflect immediately on homepage
- No code deployment needed
- Reorder slides with order_index
- Enable/disable slides

### Event Management
- Create events with rich details
- Upload event images to Cloudinary
- Track registrations in real-time
- Automatic attendee counting

### Sermon Library
- Upload video/audio to Cloudinary
- Automatic transcoding and optimization
- View and like tracking
- Search and filter functionality

### Prayer Wall
- Community prayer requests
- Track prayer count
- Real-time updates

## 🐛 Troubleshooting

### Port Already in Use
```bash
npx kill-port 3000
npx kill-port 3001
```

### Database Issues
Delete `church.db` file and restart server to recreate with admin user.

### Cloudinary Upload Fails
Check credentials in `.env.production` and Vercel dashboard.

### Admin Login Not Working
Ensure database is initialized with default admin user (manane@gmail.com / 2026).

## 📝 Environment Variables

### Development (.env.local)
```
VITE_API_URL=http://localhost:3001
```

### Production (.env.production)
```
VITE_API_URL=https://foursquarechurchs.vercel.app
CLOUDINARY_CLOUD_NAME=dooejcdcn
CLOUDINARY_API_KEY=289699272556856
CLOUDINARY_API_SECRET=RlS9BumbzEr835Qf1c2cMlnq_yg
```

## 🎯 Quick Start Guide

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Application**
   ```bash
   start.bat
   ```

3. **Access Frontend**
   - Visit http://localhost:3000
   - Browse the church website

4. **Login as Admin**
   - Click "Admin" in navbar or go to /admin
   - Email: manane@gmail.com
   - Password: 2026

5. **Manage Content**
   - Upload hero slides
   - Create events
   - Upload sermons
   - Manage gallery

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## 📞 Support
For issues, check:
- DEPLOYMENT.md for deployment guide
- API documentation above
- Vercel logs for production errors
- Database schema for data structure

## 🎉 Live Site
https://foursquarechurchs.vercel.app

## 💡 Pro Tips
- Hero slides update instantly - no deployment needed
- Use Cloudinary dashboard to manage media
- Check SQLite database for all stored data
- Admin can manage everything from /admin dashboard
- All uploads are optimized automatically by Cloudinary
