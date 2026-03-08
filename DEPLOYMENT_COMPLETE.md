# 🚀 Complete Deployment Guide - Foursquare Church App

## ✅ Pre-Deployment Checklist

### 1. **Environment Variables**
Create `.env.production` file:
```env
VITE_API_URL=https://your-backend-url.vercel.app
CLOUDINARY_CLOUD_NAME=dooejcdcn
CLOUDINARY_API_KEY=289699272556856
CLOUDINARY_API_SECRET=RlS9BumbzEr835Qf1c2cMlnq_yg
```

### 2. **Database Setup**
The app uses SQLite with these tables:
- ✅ users (admin: manane@gmail.com / 2026)
- ✅ hero_slides (dynamic homepage)
- ✅ events (church events)
- ✅ sermons (video/audio)
- ✅ prayer_requests
- ✅ testimonies
- ✅ groups
- ✅ announcements
- ✅ gallery_images
- ✅ branch_images
- ✅ dynamic_images
- ✅ church_members (member registration)
- ✅ family_members (family tracking)

## 🌐 Deployment Steps

### **Option 1: Vercel (Recommended)**

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy
```bash
vercel --prod
```

#### Step 4: Set Environment Variables in Vercel Dashboard
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - `CLOUDINARY_CLOUD_NAME` = dooejcdcn
   - `CLOUDINARY_API_KEY` = 289699272556856
   - `CLOUDINARY_API_SECRET` = RlS9BumbzEr835Qf1c2cMlnq_yg

### **Option 2: Manual Deployment**

#### Build the App
```bash
npm run build
```

#### Deploy Backend
```bash
node server.ts
```

## 📱 App Features (All Dynamic)

### **Public Pages**
- ✅ Home Page (/)
- ✅ Hero Slides (dynamic from database)
- ✅ Live Stream
- ✅ Services
- ✅ Sermons (dynamic)
- ✅ Events (dynamic)
- ✅ Gallery (dynamic)
- ✅ Branches (dynamic images)
- ✅ About/History/Values

### **Authentication**
- ✅ Login Page (/login)
  - Admin: manane@gmail.com / 2026 → /admin
  - Users: redirect to /dashboard
- ✅ Register Page (/register)
- ✅ Member Registration (/join)
  - Individual or Family
  - Rwanda location tracking

### **Admin Dashboard (/admin)**
- ✅ Hero Slides Management
- ✅ Events Management
- ✅ Sermons Upload (video/audio)
- ✅ Testimonies Approval
- ✅ Groups Management
- ✅ Announcements
- ✅ Gallery Management
- ✅ Branch Images Management
- ✅ Dynamic Images (all sections)
- ✅ View Church Members

### **User Dashboard (/dashboard)**
- ✅ Latest Announcements Feed
- ✅ Recent Sermons
- ✅ Upcoming Events
- ✅ Quick Actions
- ✅ Personalized Welcome

## 🔧 Dynamic Content Management

### **All Images Are Dynamic:**
1. **Hero Slides** - Upload via admin, stored in Cloudinary
2. **Event Images** - Each event can have custom image
3. **Sermon Videos** - Uploaded to Cloudinary
4. **Gallery** - All photos managed via admin
5. **Branch Images** - Dedicated section for branches
6. **Dynamic Images** - Any section can have custom images

### **Content Management:**
- All content stored in SQLite database
- Images stored in Cloudinary (25GB free)
- No hardcoded content
- Admin can change everything without code deployment

## 🗄️ Database Initialization

The database auto-creates with:
```sql
-- Default Admin User
INSERT INTO users (email, password, name, role) 
VALUES ('manane@gmail.com', '2026', 'Admin Manager', 'admin');
```

## 🔐 Security Features

- ✅ Role-based access control
- ✅ Admin-only routes protected
- ✅ Password authentication
- ✅ SQL injection prevention
- ✅ File upload validation
- ✅ CORS protection

## 📊 API Endpoints

### Authentication
- POST /api/auth/login
- POST /api/auth/register

### Content Management
- GET/POST/PUT/DELETE /api/hero-slides
- GET/POST/PUT/DELETE /api/events
- GET/POST/PUT/DELETE /api/sermons
- GET/POST/PUT/DELETE /api/testimonies
- GET/POST/PUT/DELETE /api/groups
- GET/POST/PUT/DELETE /api/announcements
- GET/POST/PUT/DELETE /api/gallery
- GET/POST/DELETE /api/branch-images
- GET/POST/DELETE /api/dynamic-images

### Member Management
- POST /api/members/register
- GET /api/members
- GET /api/members/:id
- GET /api/members/location/:location

### File Upload
- POST /api/upload (Cloudinary)

## 🌍 Routes

| Route | Description | Access |
|-------|-------------|--------|
| / | Home Page | Public |
| /login | Login Page | Public |
| /register | User Registration | Public |
| /join | Church Member Registration | Public |
| /admin | Admin Dashboard | Admin Only |
| /dashboard | User Dashboard | Logged In Users |

## 🎯 Post-Deployment Tasks

1. **Test Admin Login**
   - Go to /login
   - Use: manane@gmail.com / 2026
   - Should redirect to /admin

2. **Upload Initial Content**
   - Add hero slides
   - Create events
   - Upload sermons
   - Add gallery images
   - Add branch images

3. **Test Member Registration**
   - Go to /join
   - Register individual or family
   - Check database for entries

4. **Test User Registration**
   - Go to /register
   - Create user account
   - Login and check /dashboard

## 🔄 Continuous Updates

### To Update Content:
1. Login as admin
2. Navigate to relevant section
3. Upload/Edit/Delete content
4. Changes reflect immediately (no deployment needed)

### To Update Code:
```bash
git add .
git commit -m "Update message"
git push
vercel --prod
```

## 📞 Support & Maintenance

### Common Issues:

**Issue: Images not loading**
- Check Cloudinary credentials
- Verify upload limits (25GB free)

**Issue: Database not found**
- Ensure church.db exists
- Check file permissions

**Issue: Admin can't login**
- Verify database has admin user
- Check credentials: manane@gmail.com / 2026

## 🎉 Success Metrics

After deployment, you should have:
- ✅ Fully functional church website
- ✅ Admin can manage all content
- ✅ Users can register and login
- ✅ Members can join church
- ✅ All images stored in cloud
- ✅ Dynamic content everywhere
- ✅ Mobile responsive
- ✅ Fast loading times

## 🚀 Live URLs

- **Production**: https://foursquarechurchs.vercel.app
- **Admin**: https://foursquarechurchs.vercel.app/admin
- **Join**: https://foursquarechurchs.vercel.app/join

---

**Ready for Production! 🎊**

All features are complete, dynamic, and deployment-ready!
