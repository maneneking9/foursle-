# Quick Admin Guide

## 🔐 Login to Admin Dashboard

1. **Click the purple "Admin" button** in the top-right corner of the website
2. **Enter credentials:**
   - Email: `manane@gmail.com`
   - Password: `2026`
3. Click "Sign In"

## 📋 Admin Dashboard Tabs

### 1. Hero Slides
- **Purpose:** Manage homepage slideshow images
- **Actions:**
  - Upload new slide with title, subtitle, and order
  - Delete existing slides
  - Changes appear immediately on homepage

### 2. Events
- **Purpose:** Create and manage church events
- **Actions:**
  - Add event with title, description, date, location, image
  - Edit existing events
  - Delete events
  - Track registrations automatically

### 3. Sermons
- **Purpose:** Upload and manage sermon videos/audio
- **Actions:**
  - Upload sermon with title, speaker, scripture, date
  - Add video or audio file
  - Track views and likes
  - Delete sermons

### 4. Testimonies
- **Purpose:** Approve or reject user testimonies
- **Actions:**
  - View pending testimonies
  - Approve testimonies (makes them public)
  - Delete inappropriate testimonies

### 5. Groups
- **Purpose:** Manage small groups and ministries
- **Actions:**
  - Create new group with name, description, leader, schedule
  - Upload group image
  - Edit or delete groups

### 6. Announcements
- **Purpose:** Post church announcements
- **Actions:**
  - Create announcement with title and content
  - Set priority (normal or high)
  - Delete old announcements

### 7. Gallery
- **Purpose:** Manage photo gallery
- **Actions:**
  - Upload church photos
  - Add title and category
  - Delete images

### 8. Branch Images
- **Purpose:** Update branch photos
- **Actions:**
  - Upload image for specific branch
  - Use exact branch names:
    - "Foursquare City Light"
    - "Word Light Branch"
  - Add description
  - Delete old images

### 9. Dynamic Images
- **Purpose:** Update images for different sections
- **Actions:**
  - Select section (hero, about, services, etc.)
  - Upload image with title and description
  - Set display order
  - Delete images

## 🎯 Common Tasks

### Update Homepage Slideshow
1. Go to "Hero Slides" tab
2. Fill in title, subtitle, order number
3. Upload image (recommended: 1920x1080px)
4. Click "Create Slide"
5. Refresh homepage to see changes

### Add New Event
1. Go to "Events" tab
2. Fill in event details
3. Select date and time
4. Upload event image (optional)
5. Click "Create Event"

### Upload Sermon
1. Go to "Sermons" tab
2. Fill in sermon details
3. Upload video file (max 50MB)
4. Click "Upload Sermon"
5. Video will be processed by Cloudinary

### Change Branch Images
1. Go to "Branch Images" tab
2. Enter branch name exactly as shown
3. Upload new image
4. Add description
5. Click "Add Branch Image"
6. Old image will be replaced automatically

## 💡 Tips

- **Image Sizes:**
  - Hero Slides: 1920x1080px (landscape)
  - Events: 800x600px
  - Gallery: 1200x800px
  - Branch Images: 1200x800px

- **Video Upload:**
  - Max size: 50MB
  - Formats: MP4, MOV, AVI
  - Cloudinary will optimize automatically

- **Best Practices:**
  - Use high-quality images
  - Keep titles concise
  - Add descriptions for accessibility
  - Delete old content regularly

## 🔄 Real-Time Updates

All changes you make in the admin dashboard appear **immediately** on the website:
- No need to refresh
- No deployment required
- Changes are live instantly

## 🆘 Need Help?

**Can't login?**
- Check credentials are correct
- Clear browser cache
- Try incognito mode

**Upload failed?**
- Check file size (images: 10MB, videos: 50MB)
- Verify internet connection
- Try different file format

**Changes not showing?**
- Hard refresh page (Ctrl+F5)
- Check if item is active/approved
- Verify database connection

## 🎉 You're All Set!

You now have full control over:
- ✅ Homepage content
- ✅ Events and sermons
- ✅ Gallery and images
- ✅ Announcements
- ✅ Branch information
- ✅ User testimonies

Everything is stored safely in the database and Cloudinary!
