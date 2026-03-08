# 🏛️ Foursquare Church - Complete Full Stack Application

## 🎯 Overview
A complete, dynamic church management system with admin dashboard, member registration, and content management. **100% deployment-ready!**

## ✨ Key Features

### 🌐 **Public Website**
- Dynamic Hero Slides (admin controlled)
- Live Stream Integration
- Church Services & Events
- Sermon Library (video/audio)
- Photo Gallery
- Branch Locations
- About/History/Values
- Bible Study Resources
- Multilingual Support (EN, FR, KIN, KIS, ES)

### 👥 **Member Management**
- Individual Registration
- Family Registration (with multiple members)
- Rwanda Location Tracking (Province/District/Sector)
- Member Dashboard with News Feed
- Event Registration
- Prayer Requests

### 🔐 **Authentication System**
- Admin Login (manane@gmail.com / 2026)
- User Registration & Login
- Role-Based Access Control
- Protected Routes

### 📊 **Admin Dashboard** (`/admin`)
- **Hero Slides** - Upload/manage homepage slides
- **Events** - Create and track church events
- **Sermons** - Upload video/audio sermons
- **Testimonies** - Approve/manage testimonies
- **Groups** - Manage small groups
- **Announcements** - Post church announcements
- **Gallery** - Upload and organize photos
- **Branch Images** - Manage branch-specific images
- **Dynamic Images** - Universal image management for any section
- **Members** - View registered church members

### 📱 **User Dashboard** (`/dashboard`)
- Latest Announcements Feed
- Recent Sermons
- Upcoming Events Calendar
- Quick Actions (Live Stream, Bible Study)
- Personalized Welcome

## 🛠️ Tech Stack

### Frontend
- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **Lucide React** (icons)

### Backend
- **Express.js** (API server)
- **SQLite** (database)
- **Better-SQLite3** (database driver)

### Cloud Services
- **Cloudinary** (media storage - 25GB free)
- **Vercel** (hosting)

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development servers
npm run dev      # Frontend (port 3000)
npm run server   # Backend (port 3001)

# Or use the batch file
start.bat
```

## 🗄️ Database Schema

### Tables
- `users` - Admin and user accounts
- `hero_slides` - Dynamic homepage slides
- `events` - Church events
- `sermons` - Video/audio sermons
- `prayer_requests` - Community prayers
- `testimonies` - User testimonies
- `groups` - Small groups
- `announcements` - Church announcements
- `gallery_images` - Photo gallery
- `branch_images` - Branch-specific images
- `dynamic_images` - Universal image system
- `church_members` - Registered members
- `family_members` - Family relationships

## 🚀 Deployment

### Quick Deploy
```bash
# Run deployment script
deploy.bat

# Or manually
npm run build
vercel --prod
```

### Environment Variables
Set in Vercel Dashboard:
```
CLOUDINARY_CLOUD_NAME=dooejcdcn
CLOUDINARY_API_KEY=289699272556856
CLOUDINARY_API_SECRET=RlS9BumbzEr835Qf1c2cMlnq_yg
```

## 🔑 Default Credentials

**Admin Account:**
- Email: `manane@gmail.com`
- Password: `2026`
- Access: Full admin dashboard

## 📍 Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Home Page | Public |
| `/login` | Login Page | Public |
| `/register` | User Registration | Public |
| `/join` | Church Member Registration | Public |
| `/admin` | Admin Dashboard | Admin Only |
| `/dashboard` | User Dashboard | Logged In |

## 🎨 Dynamic Content

### Everything is Dynamic!
- ✅ Hero slides - Upload via admin
- ✅ Events - Create/edit/delete
- ✅ Sermons - Upload videos/audio
- ✅ Gallery - Add/remove photos
- ✅ Branches - Manage branch images
- ✅ Announcements - Post updates
- ✅ All images stored in Cloudinary
- ✅ No hardcoded content

### Admin Can Change:
- Homepage slides
- Event details and images
- Sermon videos
- Gallery photos
- Branch images
- Any section images
- Announcements
- Testimonies approval

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Content Management
- `GET/POST/PUT/DELETE /api/hero-slides`
- `GET/POST/PUT/DELETE /api/events`
- `GET/POST/PUT/DELETE /api/sermons`
- `GET/POST/PUT/DELETE /api/testimonies`
- `GET/POST/PUT/DELETE /api/groups`
- `GET/POST/PUT/DELETE /api/announcements`
- `GET/POST/PUT/DELETE /api/gallery`
- `GET/POST/DELETE /api/branch-images`
- `GET/POST/DELETE /api/dynamic-images`

### Member Management
- `POST /api/members/register` - Register member/family
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member details
- `GET /api/members/location/:location` - Filter by location

### File Upload
- `POST /api/upload` - Upload to Cloudinary

## 🎯 Usage Guide

### For Admins:
1. Login at `/login` with admin credentials
2. Access admin dashboard at `/admin`
3. Manage all content through tabs
4. Upload images (auto-stored in Cloudinary)
5. Changes reflect immediately on website

### For Users:
1. Register at `/register` or `/join`
2. Login at `/login`
3. Access dashboard at `/dashboard`
4. View announcements, sermons, events
5. Participate in church activities

### For Members:
1. Go to `/join`
2. Choose Individual or Family registration
3. Fill in details + Rwanda location
4. Add family members if applicable
5. Submit and get confirmation

## 🔒 Security Features

- ✅ Role-based access control
- ✅ Protected admin routes
- ✅ Password authentication
- ✅ SQL injection prevention
- ✅ File upload validation
- ✅ CORS protection
- ✅ Session management

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet optimized
- ✅ Desktop enhanced
- ✅ Touch-friendly UI
- ✅ Fast loading

## 🌍 Multilingual Support

Languages:
- English (EN)
- Kinyarwanda (KIN)
- French (FR)
- Kiswahili (KIS)
- Español (ES)

## 🎨 Cloudinary Integration

- **Storage**: 25GB free
- **Bandwidth**: 25GB/month
- **Features**: Auto-optimization, transformations, CDN
- **Folders**: hero, events, sermons, gallery, branches, dynamic

## 📊 Database Features

- Auto-initialization with admin user
- Relationship tracking (families)
- Location-based queries
- Status management
- Timestamp tracking

## 🔄 Continuous Updates

### To Update Content:
1. Login as admin
2. Navigate to section
3. Upload/Edit/Delete
4. Changes are instant

### To Update Code:
```bash
git add .
git commit -m "Update"
git push
vercel --prod
```

## 🎉 Production Ready

✅ All features complete
✅ Fully dynamic content
✅ Database configured
✅ Cloudinary integrated
✅ Authentication working
✅ Admin dashboard functional
✅ User dashboard ready
✅ Member registration active
✅ Responsive design
✅ Deployment configured

## 📞 Support

For issues:
- Check `DEPLOYMENT_COMPLETE.md`
- Verify environment variables
- Check Cloudinary credentials
- Ensure database exists

## 🌐 Live Demo

**Production URL**: https://foursquarechurchs.vercel.app

**Test Accounts:**
- Admin: manane@gmail.com / 2026

---

**Built with ❤️ for Foursquare Church**

**Status: ✅ PRODUCTION READY - DEPLOY NOW!**
