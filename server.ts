import express from 'express';
import db from './src/lib/db';
import cloudinary from './src/lib/cloudinary';

const app = express();
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?').get(email, password);
  if (user) {
    // Update last login
    db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').run(user.id);
    res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  try {
    // Check if email exists
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    const stmt = db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)');
    const info = stmt.run(email, password, name, 'user');
    res.json({ success: true, userId: info.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Registration failed' });
  }
});

// Get user profile
app.get('/api/auth/profile/:id', (req, res) => {
  const user = db.prepare('SELECT id, email, name, role, created_at, last_login FROM users WHERE id = ?').get(req.params.id);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

// Update user profile
app.put('/api/auth/profile/:id', (req, res) => {
  const { name, email } = req.body;
  try {
    db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?').run(name, email, req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Update failed' });
  }
});

// Change password
app.post('/api/auth/change-password', (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE id = ? AND password = ?').get(userId, oldPassword);
  if (user) {
    db.prepare('UPDATE users SET password = ? WHERE id = ?').run(newPassword, userId);
    res.json({ success: true, message: 'Password changed successfully' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid current password' });
  }
});

// Hero Slides
app.get('/api/hero-slides', (req, res) => {
  const slides = db.prepare('SELECT * FROM hero_slides WHERE active = 1 ORDER BY order_index').all();
  res.json(slides);
});

app.post('/api/admin/hero-slides', async (req, res) => {
  const { title, subtitle, image, order_index } = req.body;
  const result = await cloudinary.uploader.upload(image, { folder: 'hero' });
  const stmt = db.prepare('INSERT INTO hero_slides (image_url, title, subtitle, order_index) VALUES (?, ?, ?, ?)');
  const info = stmt.run(result.secure_url, title, subtitle, order_index || 0);
  res.json({ id: info.lastInsertRowid, image_url: result.secure_url });
});

app.put('/api/admin/hero-slides/:id', (req, res) => {
  const { title, subtitle, active } = req.body;
  db.prepare('UPDATE hero_slides SET title = ?, subtitle = ?, active = ? WHERE id = ?')
    .run(title, subtitle, active, req.params.id);
  res.json({ success: true });
});

app.delete('/api/admin/hero-slides/:id', (req, res) => {
  db.prepare('DELETE FROM hero_slides WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Events
app.get('/api/events', (req, res) => {
  const events = db.prepare('SELECT * FROM events ORDER BY date DESC LIMIT 20').all();
  res.json(events);
});

app.post('/api/events', async (req, res) => {
  const { title, description, date, location, image } = req.body;
  let image_url = null;
  if (image) {
    const result = await cloudinary.uploader.upload(image, { folder: 'events' });
    image_url = result.secure_url;
  }
  const stmt = db.prepare('INSERT INTO events (title, description, date, location, image_url) VALUES (?, ?, ?, ?, ?)');
  const info = stmt.run(title, description, date, location, image_url);
  res.json({ id: info.lastInsertRowid });
});

app.put('/api/events/:id', async (req, res) => {
  const { title, description, date, location, image } = req.body;
  let image_url = null;
  if (image && image.startsWith('data:')) {
    const result = await cloudinary.uploader.upload(image, { folder: 'events' });
    image_url = result.secure_url;
    db.prepare('UPDATE events SET title = ?, description = ?, date = ?, location = ?, image_url = ? WHERE id = ?')
      .run(title, description, date, location, image_url, req.params.id);
  } else {
    db.prepare('UPDATE events SET title = ?, description = ?, date = ?, location = ? WHERE id = ?')
      .run(title, description, date, location, req.params.id);
  }
  res.json({ success: true });
});

app.delete('/api/events/:id', (req, res) => {
  db.prepare('DELETE FROM events WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.post('/api/events/:id/register', (req, res) => {
  const { user_id } = req.body;
  db.prepare('INSERT INTO event_registrations (event_id, user_id) VALUES (?, ?)').run(req.params.id, user_id);
  db.prepare('UPDATE events SET attendees = attendees + 1 WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Prayer Requests
app.get('/api/prayers', (req, res) => {
  const prayers = db.prepare('SELECT * FROM prayer_requests WHERE status = ? ORDER BY created_at DESC LIMIT 20')
    .all('active');
  res.json(prayers);
});

app.post('/api/prayers', (req, res) => {
  const { title, description, user_id } = req.body;
  const stmt = db.prepare('INSERT INTO prayer_requests (title, description, user_id) VALUES (?, ?, ?)');
  const info = stmt.run(title, description, user_id || null);
  res.json({ id: info.lastInsertRowid });
});

app.post('/api/prayers/:id/pray', (req, res) => {
  db.prepare('UPDATE prayer_requests SET prayers = prayers + 1 WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Sermons
app.get('/api/sermons', (req, res) => {
  const sermons = db.prepare('SELECT * FROM sermons ORDER BY date DESC LIMIT 20').all();
  res.json(sermons);
});

app.post('/api/sermons', async (req, res) => {
  const { title, description, video, audio, speaker, date, scripture } = req.body;
  let video_url = null, audio_url = null;
  if (video) {
    const result = await cloudinary.uploader.upload(video, { folder: 'sermons', resource_type: 'video' });
    video_url = result.secure_url;
  }
  if (audio) {
    const result = await cloudinary.uploader.upload(audio, { folder: 'sermons', resource_type: 'video' });
    audio_url = result.secure_url;
  }
  const stmt = db.prepare('INSERT INTO sermons (title, description, video_url, audio_url, speaker, date, scripture) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const info = stmt.run(title, description, video_url, audio_url, speaker, date, scripture);
  res.json({ id: info.lastInsertRowid });
});

app.put('/api/sermons/:id', async (req, res) => {
  const { title, description, video, audio, speaker, date, scripture } = req.body;
  let video_url = null, audio_url = null;
  if (video && video.startsWith('data:')) {
    const result = await cloudinary.uploader.upload(video, { folder: 'sermons', resource_type: 'video' });
    video_url = result.secure_url;
  }
  if (audio && audio.startsWith('data:')) {
    const result = await cloudinary.uploader.upload(audio, { folder: 'sermons', resource_type: 'video' });
    audio_url = result.secure_url;
  }
  if (video_url || audio_url) {
    db.prepare('UPDATE sermons SET title = ?, description = ?, video_url = COALESCE(?, video_url), audio_url = COALESCE(?, audio_url), speaker = ?, date = ?, scripture = ? WHERE id = ?')
      .run(title, description, video_url, audio_url, speaker, date, scripture, req.params.id);
  } else {
    db.prepare('UPDATE sermons SET title = ?, description = ?, speaker = ?, date = ?, scripture = ? WHERE id = ?')
      .run(title, description, speaker, date, scripture, req.params.id);
  }
  res.json({ success: true });
});

app.delete('/api/sermons/:id', (req, res) => {
  db.prepare('DELETE FROM sermons WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.post('/api/sermons/:id/view', (req, res) => {
  db.prepare('UPDATE sermons SET views = views + 1 WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.post('/api/sermons/:id/like', (req, res) => {
  db.prepare('UPDATE sermons SET likes = likes + 1 WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Testimonies
app.get('/api/testimonies', (req, res) => {
  const testimonies = db.prepare('SELECT * FROM testimonies WHERE approved = 1 ORDER BY created_at DESC LIMIT 20').all();
  res.json(testimonies);
});

app.get('/api/admin/testimonies', (req, res) => {
  const testimonies = db.prepare('SELECT * FROM testimonies ORDER BY created_at DESC').all();
  res.json(testimonies);
});

app.post('/api/testimonies', (req, res) => {
  const { title, content, user_id } = req.body;
  const stmt = db.prepare('INSERT INTO testimonies (title, content, user_id) VALUES (?, ?, ?)');
  const info = stmt.run(title, content, user_id || null);
  res.json({ id: info.lastInsertRowid });
});

app.put('/api/admin/testimonies/:id/approve', (req, res) => {
  db.prepare('UPDATE testimonies SET approved = 1 WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.delete('/api/testimonies/:id', (req, res) => {
  db.prepare('DELETE FROM testimonies WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Groups
app.get('/api/groups', (req, res) => {
  const groups = db.prepare('SELECT * FROM groups').all();
  res.json(groups);
});

app.post('/api/groups', async (req, res) => {
  const { name, description, leader, schedule, image } = req.body;
  let image_url = null;
  if (image) {
    const result = await cloudinary.uploader.upload(image, { folder: 'groups' });
    image_url = result.secure_url;
  }
  const stmt = db.prepare('INSERT INTO groups (name, description, leader, schedule, image_url) VALUES (?, ?, ?, ?, ?)');
  const info = stmt.run(name, description, leader, schedule, image_url);
  res.json({ id: info.lastInsertRowid });
});

app.put('/api/groups/:id', async (req, res) => {
  const { name, description, leader, schedule, image } = req.body;
  let image_url = null;
  if (image && image.startsWith('data:')) {
    const result = await cloudinary.uploader.upload(image, { folder: 'groups' });
    image_url = result.secure_url;
    db.prepare('UPDATE groups SET name = ?, description = ?, leader = ?, schedule = ?, image_url = ? WHERE id = ?')
      .run(name, description, leader, schedule, image_url, req.params.id);
  } else {
    db.prepare('UPDATE groups SET name = ?, description = ?, leader = ?, schedule = ? WHERE id = ?')
      .run(name, description, leader, schedule, req.params.id);
  }
  res.json({ success: true });
});

app.delete('/api/groups/:id', (req, res) => {
  db.prepare('DELETE FROM groups WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Announcements
app.get('/api/announcements', (req, res) => {
  const announcements = db.prepare('SELECT * FROM announcements ORDER BY created_at DESC LIMIT 10').all();
  res.json(announcements);
});

app.post('/api/announcements', (req, res) => {
  const { title, content, priority } = req.body;
  const stmt = db.prepare('INSERT INTO announcements (title, content, priority) VALUES (?, ?, ?)');
  const info = stmt.run(title, content, priority || 'normal');
  res.json({ id: info.lastInsertRowid });
});

app.put('/api/announcements/:id', (req, res) => {
  const { title, content, priority } = req.body;
  db.prepare('UPDATE announcements SET title = ?, content = ?, priority = ? WHERE id = ?')
    .run(title, content, priority, req.params.id);
  res.json({ success: true });
});

app.delete('/api/announcements/:id', (req, res) => {
  db.prepare('DELETE FROM announcements WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Gallery
app.get('/api/gallery', (req, res) => {
  const images = db.prepare('SELECT * FROM gallery_images ORDER BY created_at DESC LIMIT 50').all();
  res.json(images);
});

app.post('/api/gallery', async (req, res) => {
  const { title, image, category } = req.body;
  const result = await cloudinary.uploader.upload(image, { folder: 'gallery' });
  const stmt = db.prepare('INSERT INTO gallery_images (title, image_url, category) VALUES (?, ?, ?)');
  const info = stmt.run(title, result.secure_url, category);
  res.json({ id: info.lastInsertRowid, image_url: result.secure_url });
});

app.put('/api/gallery/:id', async (req, res) => {
  const { title, category, image } = req.body;
  if (image && image.startsWith('data:')) {
    const result = await cloudinary.uploader.upload(image, { folder: 'gallery' });
    db.prepare('UPDATE gallery_images SET title = ?, category = ?, image_url = ? WHERE id = ?')
      .run(title, category, result.secure_url, req.params.id);
  } else {
    db.prepare('UPDATE gallery_images SET title = ?, category = ? WHERE id = ?')
      .run(title, category, req.params.id);
  }
  res.json({ success: true });
});

app.delete('/api/gallery/:id', (req, res) => {
  db.prepare('DELETE FROM gallery_images WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Upload endpoint
app.post('/api/upload', async (req, res) => {
  const { file, folder, resource_type } = req.body;
  const result = await cloudinary.uploader.upload(file, { 
    folder: folder || 'uploads',
    resource_type: resource_type || 'auto'
  });
  res.json({ url: result.secure_url });
});

// Branch Images
app.get('/api/branch-images', (req, res) => {
  const images = db.prepare('SELECT * FROM branch_images ORDER BY created_at DESC').all();
  res.json(images);
});

app.post('/api/branch-images', async (req, res) => {
  const { branch_name, image, description } = req.body;
  const result = await cloudinary.uploader.upload(image, { folder: 'branches' });
  const stmt = db.prepare('INSERT INTO branch_images (branch_name, image_url, description) VALUES (?, ?, ?)');
  const info = stmt.run(branch_name, result.secure_url, description);
  res.json({ id: info.lastInsertRowid, image_url: result.secure_url });
});

app.delete('/api/branch-images/:id', (req, res) => {
  db.prepare('DELETE FROM branch_images WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Dynamic Images
app.get('/api/dynamic-images', (req, res) => {
  const { section } = req.query;
  let images;
  if (section) {
    images = db.prepare('SELECT * FROM dynamic_images WHERE section = ? AND active = 1 ORDER BY order_index').all(section);
  } else {
    images = db.prepare('SELECT * FROM dynamic_images WHERE active = 1 ORDER BY section, order_index').all();
  }
  res.json(images);
});

app.post('/api/dynamic-images', async (req, res) => {
  const { section, image, title, description, order_index } = req.body;
  const result = await cloudinary.uploader.upload(image, { folder: section || 'dynamic' });
  const stmt = db.prepare('INSERT INTO dynamic_images (section, image_url, title, description, order_index) VALUES (?, ?, ?, ?, ?)');
  const info = stmt.run(section, result.secure_url, title, description, order_index || 0);
  res.json({ id: info.lastInsertRowid, image_url: result.secure_url });
});

app.delete('/api/dynamic-images/:id', (req, res) => {
  db.prepare('DELETE FROM dynamic_images WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Search endpoint
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.json({ results: [] });
  }
  const query = `%${q}%`;
  const results = {
    events: db.prepare('SELECT * FROM events WHERE title LIKE ? OR description LIKE ? LIMIT 5').all(query, query),
    sermons: db.prepare('SELECT * FROM sermons WHERE title LIKE ? OR speaker LIKE ? OR scripture LIKE ? LIMIT 5').all(query, query, query),
    groups: db.prepare('SELECT * FROM groups WHERE name LIKE ? OR description LIKE ? LIMIT 5').all(query, query),
    testimonies: db.prepare('SELECT * FROM testimonies WHERE title LIKE ? OR content LIKE ? AND approved = 1 LIMIT 5').all(query, query),
    announcements: db.prepare('SELECT * FROM announcements WHERE title LIKE ? OR content LIKE ? LIMIT 5').all(query, query),
    members: db.prepare('SELECT * FROM church_members WHERE full_name LIKE ? OR location LIKE ? AND status = ? LIMIT 5').all(query, query, 'active')
  };
  res.json(results);
});

// Church Member Registration
app.post('/api/members/register', (req, res) => {
  const { full_name, email, phone, location, district, sector, date_of_birth, gender, marital_status, occupation, is_family_head, family_members } = req.body;
  
  try {
    const stmt = db.prepare('INSERT INTO church_members (full_name, email, phone, location, district, sector, date_of_birth, gender, marital_status, occupation, is_family_head) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    const info = stmt.run(full_name, email, phone, location, district, sector, date_of_birth, gender, marital_status, occupation, is_family_head ? 1 : 0);
    const memberId = info.lastInsertRowid;

    // If family head, add family members
    if (is_family_head && family_members && family_members.length > 0) {
      const familyStmt = db.prepare('INSERT INTO church_members (full_name, phone, location, district, sector, date_of_birth, gender, relationship, family_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
      const linkStmt = db.prepare('INSERT INTO family_members (family_id, member_id, relationship) VALUES (?, ?, ?)');
      
      family_members.forEach((member: any) => {
        const memberInfo = familyStmt.run(member.full_name, member.phone, location, district, sector, member.date_of_birth, member.gender, member.relationship, memberId);
        linkStmt.run(memberId, memberInfo.lastInsertRowid, member.relationship);
      });
    }

    res.json({ success: true, memberId });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.get('/api/members', (req, res) => {
  const members = db.prepare('SELECT * FROM church_members WHERE status = ? ORDER BY created_at DESC').all('active');
  res.json(members);
});

app.get('/api/members/:id', (req, res) => {
  const member = db.prepare('SELECT * FROM church_members WHERE id = ?').get(req.params.id);
  if (member) {
    const familyMembers = db.prepare(`
      SELECT cm.* FROM church_members cm
      JOIN family_members fm ON cm.id = fm.member_id
      WHERE fm.family_id = ?
    `).all(req.params.id);
    res.json({ ...member, family_members: familyMembers });
  } else {
    res.status(404).json({ message: 'Member not found' });
  }
});

app.get('/api/members/location/:location', (req, res) => {
  const members = db.prepare('SELECT * FROM church_members WHERE location = ? AND status = ?').all(req.params.location, 'active');
  res.json(members);
});

// Church Profile Settings
app.get('/api/church-profile', (req, res) => {
  const profile = db.prepare('SELECT * FROM site_settings WHERE key = ?').get('church_profile');
  if (profile) {
    res.json(JSON.parse(profile.value));
  } else {
    res.json({ 
      logo: '/logo.jpg', 
      name: 'Foursquare Church', 
      tagline: 'CityLight Church',
      citylightLogo: '/logo.jpg',
      wordlightLogo: '/logo.jpg'
    });
  }
});

app.put('/api/church-profile', async (req, res) => {
  const { citylightLogo, wordlightLogo, name, tagline } = req.body;
  let citylightUrl = citylightLogo;
  let wordlightUrl = wordlightLogo;
  
  if (citylightLogo && citylightLogo.startsWith('data:')) {
    const result = await cloudinary.uploader.upload(citylightLogo, { folder: 'church-profile' });
    citylightUrl = result.secure_url;
  }
  
  if (wordlightLogo && wordlightLogo.startsWith('data:')) {
    const result = await cloudinary.uploader.upload(wordlightLogo, { folder: 'church-profile' });
    wordlightUrl = result.secure_url;
  }
  
  const profileData = JSON.stringify({ citylightLogo: citylightUrl, wordlightLogo: wordlightUrl, name, tagline });
  const existing = db.prepare('SELECT * FROM site_settings WHERE key = ?').get('church_profile');
  
  if (existing) {
    db.prepare('UPDATE site_settings SET value = ? WHERE key = ?').run(profileData, 'church_profile');
  } else {
    db.prepare('INSERT INTO site_settings (key, value) VALUES (?, ?)').run('church_profile', profileData);
  }
  
  res.json({ success: true, citylightLogo: citylightUrl, wordlightLogo: wordlightUrl });
});

// Feedback
app.post('/api/feedback', (req, res) => {
  const { name, message } = req.body;
  try {
    db.prepare(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();
    
    const stmt = db.prepare('INSERT INTO feedback (name, message) VALUES (?, ?)');
    const info = stmt.run(name, message);
    res.json({ success: true, id: info.lastInsertRowid });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.get('/api/feedback', (req, res) => {
  try {
    const feedback = db.prepare('SELECT * FROM feedback ORDER BY created_at DESC LIMIT 50').all();
    res.json(feedback);
  } catch {
    res.json([]);
  }
});

// Membership Requests
app.post('/api/membership-requests', (req, res) => {
  const data = req.body;
  try {
    db.prepare(`
      CREATE TABLE IF NOT EXISTS membership_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        gender TEXT,
        date_of_birth TEXT,
        marital_status TEXT,
        nationality TEXT,
        id_number TEXT,
        phone_number TEXT NOT NULL,
        email TEXT NOT NULL,
        home_address TEXT,
        emergency_contact TEXT,
        salvation_date TEXT,
        baptism_water_date TEXT,
        baptism_holy_spirit_date TEXT,
        ministry TEXT,
        cell TEXT,
        spouse_name TEXT,
        number_of_children TEXT,
        household_member TEXT,
        family_role TEXT,
        membership_start_date TEXT,
        attendance_frequency TEXT,
        accepted_jesus TEXT,
        reason TEXT,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();
    
    const stmt = db.prepare(`
      INSERT INTO membership_requests (
        full_name, gender, date_of_birth, marital_status, nationality, id_number,
        phone_number, email, home_address, emergency_contact, salvation_date,
        baptism_water_date, baptism_holy_spirit_date, ministry, cell, spouse_name,
        number_of_children, household_member, family_role, membership_start_date,
        attendance_frequency, accepted_jesus, reason
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      data.fullName, data.gender, data.dateOfBirth, data.maritalStatus, data.nationality,
      data.idNumber, data.phoneNumber, data.email, data.homeAddress, data.emergencyContact,
      data.salvationDate, data.baptismWaterDate, data.baptismHolySpiritDate, data.ministry,
      data.cell, data.spouseName, data.numberOfChildren, data.householdMember, data.familyRole,
      data.membershipStartDate, data.attendanceFrequency, data.acceptedJesus, data.reason
    );
    res.json({ success: true, id: info.lastInsertRowid });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.get('/api/membership-requests', (req, res) => {
  try {
    const requests = db.prepare('SELECT * FROM membership_requests ORDER BY created_at DESC').all();
    res.json(requests);
  } catch {
    res.json([]);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
