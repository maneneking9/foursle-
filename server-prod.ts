import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@libsql/client';
import cloudinary from './src/lib/cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '50mb' }));

// Turso database connection
const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || "libsql://database-aero-anchor-vercel-icfg-vpe4oceodpjzojyz3srl4xrd.aws-us-east-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzI5ODg3MzEsImlkIjoiMDE5Y2NlNWQtMGQwMS03ODc5LWI2Y2YtZDM2NjVhNmNjN2U2IiwicmlkIjoiZDM1NjhiZDUtNzFlMy00YzgxLWJkNGItNjRjNGQyZGMxOTBmIn0.EO5dPKY74985JBpl8bsOJl50Riy66qYf9kpu1eBIoTuVM9iEhMmKmsqZ2bpXMXYl-JMKe3QVXHU7ZSL9DUy9DA",
});

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// ==================== AUTH ROUTES ====================

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await turso.execute({
      sql: 'SELECT * FROM users WHERE email = ? AND password = ?',
      args: [email, password]
    });
    if (result.rows.length > 0) {
      const user = result.rows[0];
      await turso.execute({
        sql: 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
        args: [user.id]
      });
      res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Register
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existing = await turso.execute({
      sql: 'SELECT id FROM users WHERE email = ?',
      args: [email]
    });
    
    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    
    const result = await turso.execute({
      sql: 'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
      args: [email, password, name, 'user']
    });
    
    res.json({ success: true, userId: result.lastInsertRowid });
  } catch (error: any) {
    console.error('Register error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get user profile
app.get('/api/auth/profile/:id', async (req, res) => {
  try {
    const result = await turso.execute({
      sql: 'SELECT id, email, name, role, created_at, last_login FROM users WHERE id = ?',
      args: [parseInt(req.params.id)]
    });
    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user profile
app.put('/api/auth/profile/:id', async (req, res) => {
  const { name, email } = req.body;
  try {
    await turso.execute({
      sql: 'UPDATE users SET name = ?, email = ? WHERE id = ?',
      args: [name, email, parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Change password
app.post('/api/auth/change-password', async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  try {
    const result = await turso.execute({
      sql: 'SELECT * FROM users WHERE id = ? AND password = ?',
      args: [userId, oldPassword]
    });
    if (result.rows.length > 0) {
      await turso.execute({
        sql: 'UPDATE users SET password = ? WHERE id = ?',
        args: [newPassword, userId]
      });
      res.json({ success: true, message: 'Password changed successfully' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid current password' });
    }
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ==================== PUBLIC DATA ROUTES ====================

// Hero Slides
app.get('/api/hero-slides', async (req, res) => {
  try {
    const result = await turso.execute('SELECT * FROM hero_slides WHERE active = 1 ORDER BY order_index');
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

// Events
app.get('/api/events', async (req, res) => {
  try {
    const result = await turso.execute('SELECT * FROM events ORDER BY date DESC LIMIT 20');
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

// Prayers
app.get('/api/prayers', async (req, res) => {
  try {
    const result = await turso.execute("SELECT * FROM prayer_requests WHERE status = 'active' ORDER BY created_at DESC LIMIT 20");
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

app.post('/api/prayers', async (req, res) => {
  const { title, description, user_id } = req.body;
  try {
    const result = await turso.execute({
      sql: 'INSERT INTO prayer_requests (title, description, user_id) VALUES (?, ?, ?)',
      args: [title, description, user_id || null]
    });
    res.json({ id: result.lastInsertRowid });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.post('/api/prayers/:id/pray', async (req, res) => {
  try {
    await turso.execute({
      sql: 'UPDATE prayer_requests SET prayers = prayers + 1 WHERE id = ?',
      args: [parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch {
    res.json({ success: false });
  }
});

// Sermons
app.get('/api/sermons', async (req, res) => {
  try {
    const result = await turso.execute('SELECT * FROM sermons ORDER BY date DESC LIMIT 20');
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

app.post('/api/sermons/:id/view', async (req, res) => {
  try {
    await turso.execute({
      sql: 'UPDATE sermons SET views = views + 1 WHERE id = ?',
      args: [parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch {
    res.json({ success: false });
  }
});

app.post('/api/sermons/:id/like', async (req, res) => {
  try {
    await turso.execute({
      sql: 'UPDATE sermons SET likes = likes + 1 WHERE id = ?',
      args: [parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch {
    res.json({ success: false });
  }
});

// Testimonies
app.get('/api/testimonies', async (req, res) => {
  try {
    const result = await turso.execute('SELECT * FROM testimonies WHERE approved = 1 ORDER BY created_at DESC LIMIT 20');
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

app.post('/api/testimonies', async (req, res) => {
  const { title, content, user_id } = req.body;
  try {
    const result = await turso.execute({
      sql: 'INSERT INTO testimonies (title, content, user_id) VALUES (?, ?, ?)',
      args: [title, content, user_id || null]
    });
    res.json({ id: result.lastInsertRowid });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Groups
app.get('/api/groups', async (req, res) => {
  try {
    const result = await turso.execute('SELECT * FROM groups');
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

// Announcements
app.get('/api/announcements', async (req, res) => {
  try {
    const result = await turso.execute('SELECT * FROM announcements ORDER BY created_at DESC LIMIT 10');
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

// Gallery
app.get('/api/gallery', async (req, res) => {
  try {
    const result = await turso.execute('SELECT * FROM gallery_images ORDER BY created_at DESC LIMIT 50');
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

// Church Profile
app.get('/api/church-profile', async (req, res) => {
  try {
    const result = await turso.execute("SELECT * FROM site_settings WHERE key = 'church_profile'");
    if (result.rows.length > 0) {
      return res.json(JSON.parse(result.rows[0].value as string));
    }
  } catch {
    // Fall through to default
  }
  res.json({ 
    logo: '/logo.jpg', 
    name: 'Foursquare Church', 
    tagline: 'CityLight Church' 
  });
});

// Feedback
app.get('/api/feedback', async (req, res) => {
  try {
    const result = await turso.execute('SELECT * FROM feedback ORDER BY created_at DESC LIMIT 50');
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

app.post('/api/feedback', async (req, res) => {
  const { name, message } = req.body;
  try {
    const result = await turso.execute({
      sql: 'INSERT INTO feedback (name, message) VALUES (?, ?)',
      args: [name, message]
    });
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Membership Requests
app.get('/api/membership-requests', async (req, res) => {
  try {
    const result = await turso.execute('SELECT * FROM membership_requests ORDER BY created_at DESC');
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

app.post('/api/membership-requests', async (req, res) => {
  const data = req.body;
  try {
    const result = await turso.execute({
      sql: `INSERT INTO membership_requests (
        full_name, gender, date_of_birth, marital_status, nationality, id_number,
        phone_number, email, home_address, emergency_contact, salvation_date,
        baptism_water_date, baptism_holy_spirit_date, ministry, cell, spouse_name,
        number_of_children, household_member, family_role, membership_start_date,
        attendance_frequency, accepted_jesus, reason, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending') RETURNING id`,
      args: [
        data.fullName, data.gender, data.dateOfBirth, data.maritalStatus, data.nationality,
        data.idNumber, data.phoneNumber, data.email, data.homeAddress, data.emergencyContact,
        data.salvationDate, data.baptismWaterDate, data.baptismHolySpiritDate, data.ministry,
        data.cell, data.spouseName, data.numberOfChildren, data.householdMember, data.familyRole,
        data.membershipStartDate, data.attendanceFrequency, data.acceptedJesus, data.reason
      ]
    });
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Volunteer Requests
app.get('/api/volunteer-requests', async (req, res) => {
  try {
    const result = await turso.execute('SELECT * FROM volunteer_requests ORDER BY created_at DESC');
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

app.post('/api/volunteer-requests', async (req, res) => {
  const data = req.body;
  try {
    const result = await turso.execute({
      sql: `INSERT INTO volunteer_requests (
        full_name, email, phone, address, ministry, availability, why_volunteer, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending') RETURNING id`,
      args: [
        data.fullName, data.email, data.phone, data.address, 
        data.ministry, data.availability, data.why
      ]
    });
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.patch('/api/volunteer-requests/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await turso.execute({
      sql: 'UPDATE volunteer_requests SET status = ? WHERE id = ?',
      args: [status, id]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.delete('/api/volunteer-requests/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await turso.execute({
      sql: 'DELETE FROM volunteer_requests WHERE id = ?',
      args: [id]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Members
app.get('/api/members', async (req, res) => {
  try {
    const result = await turso.execute('SELECT * FROM users WHERE role = ? ORDER BY created_at DESC', ['user']);
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

// Branches - Get all branches
app.get('/api/branches', async (req, res) => {
  try {
    const result = await turso.execute('SELECT * FROM branches WHERE is_active = 1 ORDER BY name');
    const branches = result.rows.map((row: any) => ({
      ...row,
      services: row.services ? JSON.parse(row.services) : [],
      ministries: row.ministries ? JSON.parse(row.ministries) : [],
      socials: row.socials ? JSON.parse(row.socials) : {}
    }));
    res.json(branches);
  } catch {
    res.json([]);
  }
});

// Branches - Get single branch
app.get('/api/branches/:slug', async (req, res) => {
  try {
    const result = await turso.execute({
      sql: 'SELECT * FROM branches WHERE slug = ?',
      args: [req.params.slug]
    });
    if (result.rows.length > 0) {
      const branch = result.rows[0];
      res.json({
        ...branch,
        services: branch.services ? JSON.parse(branch.services) : [],
        ministries: branch.ministries ? JSON.parse(branch.ministries) : [],
        socials: branch.socials ? JSON.parse(branch.socials) : {}
      });
    } else {
      res.status(404).json({ message: 'Branch not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Branches - Create
app.post('/api/branches', async (req, res) => {
  const { name, slug, address, phone, email, pastor, description, mission, history, image_url, services, ministries, worshippers } = req.body;
  try {
    const result = await turso.execute({
      sql: `INSERT INTO branches (name, slug, address, phone, email, pastor, description, mission, history, image_url, services, ministries, worshippers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [name, slug, address, phone, email, pastor, description, mission, history, image_url, JSON.stringify(services || []), JSON.stringify(ministries || []), worshippers]
    });
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Branches - Update
app.put('/api/branches/:id', async (req, res) => {
  const { name, slug, address, phone, email, pastor, description, mission, history, image_url, services, ministries, worshippers, is_active } = req.body;
  try {
    await turso.execute({
      sql: `UPDATE branches SET name = ?, slug = ?, address = ?, phone = ?, email = ?, pastor = ?, description = ?, mission = ?, history = ?, image_url = ?, services = ?, ministries = ?, worshippers = ?, is_active = ? WHERE id = ?`,
      args: [name, slug, address, phone, email, pastor, description, mission, history, image_url, JSON.stringify(services || []), JSON.stringify(ministries || []), worshippers, is_active, parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Branches - Delete
app.delete('/api/branches/:id', async (req, res) => {
  try {
    await turso.execute({
      sql: 'DELETE FROM branches WHERE id = ?',
      args: [parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update Hero Slide
app.put('/api/admin/hero-slides/:id', async (req, res) => {
  const { title, subtitle, active } = req.body;
  try {
    await turso.execute({
      sql: 'UPDATE hero_slides SET title = ?, subtitle = ?, active = ? WHERE id = ?',
      args: [title, subtitle, active, parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete Hero Slide
app.delete('/api/admin/hero-slides/:id', async (req, res) => {
  try {
    await turso.execute({
      sql: 'DELETE FROM hero_slides WHERE id = ?',
      args: [parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update Event
app.put('/api/events/:id', async (req, res) => {
  const { title, description, date, location, image_url } = req.body;
  try {
    await turso.execute({
      sql: 'UPDATE events SET title = ?, description = ?, date = ?, location = ?, image_url = ? WHERE id = ?',
      args: [title, description, date, location, image_url, parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete Event
app.delete('/api/events/:id', async (req, res) => {
  try {
    await turso.execute({
      sql: 'DELETE FROM events WHERE id = ?',
      args: [parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete Sermon
app.delete('/api/sermons/:id', async (req, res) => {
  try {
    await turso.execute({
      sql: 'DELETE FROM sermons WHERE id = ?',
      args: [parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Approve Testimony
app.put('/api/admin/testimonies/:id/approve', async (req, res) => {
  try {
    await turso.execute({
      sql: 'UPDATE testimonies SET approved = 1 WHERE id = ?',
      args: [parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete Testimony
app.delete('/api/testimonies/:id', async (req, res) => {
  try {
    await turso.execute({
      sql: 'DELETE FROM testimonies WHERE id = ?',
      args: [parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete Group
app.delete('/api/groups/:id', async (req, res) => {
  try {
    await turso.execute({
      sql: 'DELETE FROM groups WHERE id = ?',
      args: [parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Create Announcement
app.post('/api/announcements', async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await turso.execute({
      sql: 'INSERT INTO announcements (title, content) VALUES (?, ?)',
      args: [title, content]
    });
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update Announcement
app.put('/api/announcements/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    await turso.execute({
      sql: 'UPDATE announcements SET title = ?, content = ? WHERE id = ?',
      args: [title, content, parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete Announcement
app.delete('/api/announcements/:id', async (req, res) => {
  try {
    await turso.execute({
      sql: 'DELETE FROM announcements WHERE id = ?',
      args: [parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Create Gallery Image
app.post('/api/gallery', async (req, res) => {
  const { title, image_url, category } = req.body;
  try {
    const result = await turso.execute({
      sql: 'INSERT INTO gallery_images (title, image_url, category) VALUES (?, ?, ?)',
      args: [title, image_url, category]
    });
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update Gallery Image
app.put('/api/gallery/:id', async (req, res) => {
  const { title, image_url, category } = req.body;
  try {
    await turso.execute({
      sql: 'UPDATE gallery_images SET title = ?, image_url = ?, category = ? WHERE id = ?',
      args: [title, image_url, category, parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete Gallery Image
app.delete('/api/gallery/:id', async (req, res) => {
  try {
    await turso.execute({
      sql: 'DELETE FROM gallery_images WHERE id = ?',
      args: [parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Videos - Get all
app.get('/api/videos', async (req, res) => {
  try {
    const result = await turso.execute('SELECT * FROM videos ORDER BY created_at DESC LIMIT 50');
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

// Videos - Create
app.post('/api/videos', async (req, res) => {
  const { title, description, video_url, thumbnail_url, category, duration } = req.body;
  try {
    const result = await turso.execute({
      sql: 'INSERT INTO videos (title, description, video_url, thumbnail_url, category, duration) VALUES (?, ?, ?, ?, ?, ?)',
      args: [title, description, video_url, thumbnail_url, category, duration]
    });
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Videos - Update
app.put('/api/videos/:id', async (req, res) => {
  const { title, description, video_url, thumbnail_url, category, duration, is_featured } = req.body;
  try {
    await turso.execute({
      sql: 'UPDATE videos SET title = ?, description = ?, video_url = ?, thumbnail_url = ?, category = ?, duration = ?, is_featured = ? WHERE id = ?',
      args: [title, description, video_url, thumbnail_url, category, duration, is_featured, parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Videos - Delete
app.delete('/api/videos/:id', async (req, res) => {
  try {
    await turso.execute({
      sql: 'DELETE FROM videos WHERE id = ?',
      args: [parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Flyers - Get all
app.get('/api/flyers', async (req, res) => {
  try {
    const result = await turso.execute('SELECT * FROM flyers WHERE is_active = 1 ORDER BY event_date DESC LIMIT 50');
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

// Flyers - Create
app.post('/api/flyers', async (req, res) => {
  const { title, description, image_url, category, event_date } = req.body;
  try {
    const result = await turso.execute({
      sql: 'INSERT INTO flyers (title, description, image_url, category, event_date) VALUES (?, ?, ?, ?, ?)',
      args: [title, description, image_url, category, event_date]
    });
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Flyers - Update
app.put('/api/flyers/:id', async (req, res) => {
  const { title, description, image_url, category, event_date, is_active } = req.body;
  try {
    await turso.execute({
      sql: 'UPDATE flyers SET title = ?, description = ?, image_url = ?, category = ?, event_date = ?, is_active = ? WHERE id = ?',
      args: [title, description, image_url, category, event_date, is_active, parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Flyers - Delete
app.delete('/api/flyers/:id', async (req, res) => {
  try {
    await turso.execute({
      sql: 'DELETE FROM flyers WHERE id = ?',
      args: [parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Search
app.get('/api/search', async (req, res) => {
  const query = req.query.q || '';
  try {
    const events = await turso.execute({
      sql: "SELECT * FROM events WHERE title LIKE ? OR description LIKE ? LIMIT 5",
      args: [`%${query}%`, `%${query}%`]
    });
    const sermons = await turso.execute({
      sql: "SELECT * FROM sermons WHERE title LIKE ? OR description LIKE ? LIMIT 5",
      args: [`%${query}%`, `%${query}%`]
    });
    const groups = await turso.execute({
      sql: "SELECT * FROM groups WHERE name LIKE ? OR description LIKE ? LIMIT 5",
      args: [`%${query}%`, `%${query}%`]
    });
    const announcements = await turso.execute({
      sql: "SELECT * FROM announcements WHERE title LIKE ? OR content LIKE ? LIMIT 5",
      args: [`%${query}%`, `%${query}%`]
    });
    res.json({
      events: events.rows,
      sermons: sermons.rows,
      groups: groups.rows,
      announcements: announcements.rows,
      testimonies: [],
      members: []
    });
  } catch {
    res.json({ events: [], sermons: [], groups: [], testimonies: [], announcements: [], members: [] });
  }
});

// Upload
app.post('/api/upload', async (req, res) => {
  const { file, folder, resource_type } = req.body;
  try {
    const result = await cloudinary.uploader.upload(file, { 
      folder: folder || 'uploads',
      resource_type: resource_type || 'auto'
    });
    res.json({ url: result.secure_url });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Serve static files from dist folder (React frontend)
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`   Frontend: http://localhost:${PORT}`);
  console.log(`   API: http://localhost:${PORT}/api`);
});

export default app;
