import express from 'express';
import turso from './src/lib/turso';
import cloudinary from './src/lib/cloudinary';

const app = express();
app.use(express.json({ limit: '50mb' }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Auth
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await turso.execute({
    sql: 'SELECT * FROM users WHERE email = ? AND password = ?',
    args: [email, password]
  });
  if (result.rows.length > 0) {
    const user = result.rows[0];
    res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const result = await turso.execute({
      sql: 'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      args: [email, password, name]
    });
    res.json({ success: true, userId: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Email already exists' });
  }
});

// Hero Slides
app.get('/api/hero-slides', async (req, res) => {
  const result = await turso.execute('SELECT * FROM hero_slides WHERE active = 1 ORDER BY order_index');
  res.json(result.rows);
});

app.post('/api/admin/hero-slides', async (req, res) => {
  const { title, subtitle, image, order_index } = req.body;
  const cloudResult = await cloudinary.uploader.upload(image, { folder: 'hero' });
  const result = await turso.execute({
    sql: 'INSERT INTO hero_slides (image_url, title, subtitle, order_index) VALUES (?, ?, ?, ?)',
    args: [cloudResult.secure_url, title, subtitle, order_index || 0]
  });
  res.json({ id: result.lastInsertRowid, image_url: cloudResult.secure_url });
});

app.put('/api/admin/hero-slides/:id', async (req, res) => {
  const { title, subtitle, active } = req.body;
  await turso.execute({
    sql: 'UPDATE hero_slides SET title = ?, subtitle = ?, active = ? WHERE id = ?',
    args: [title, subtitle, active, req.params.id]
  });
  res.json({ success: true });
});

app.delete('/api/admin/hero-slides/:id', async (req, res) => {
  await turso.execute({
    sql: 'DELETE FROM hero_slides WHERE id = ?',
    args: [req.params.id]
  });
  res.json({ success: true });
});

// Events
app.get('/api/events', async (req, res) => {
  const result = await turso.execute('SELECT * FROM events ORDER BY date DESC LIMIT 20');
  res.json(result.rows);
});

app.post('/api/events', async (req, res) => {
  const { title, description, date, location, image } = req.body;
  let image_url = null;
  if (image) {
    const cloudResult = await cloudinary.uploader.upload(image, { folder: 'events' });
    image_url = cloudResult.secure_url;
  }
  const result = await turso.execute({
    sql: 'INSERT INTO events (title, description, date, location, image_url) VALUES (?, ?, ?, ?, ?)',
    args: [title, description, date, location, image_url]
  });
  res.json({ id: result.lastInsertRowid });
});

app.post('/api/events/:id/register', async (req, res) => {
  const { user_id } = req.body;
  await turso.execute({
    sql: 'INSERT INTO event_registrations (event_id, user_id) VALUES (?, ?)',
    args: [req.params.id, user_id]
  });
  await turso.execute({
    sql: 'UPDATE events SET attendees = attendees + 1 WHERE id = ?',
    args: [req.params.id]
  });
  res.json({ success: true });
});

// Prayer Requests
app.get('/api/prayers', async (req, res) => {
  const result = await turso.execute({
    sql: 'SELECT * FROM prayer_requests WHERE status = ? ORDER BY created_at DESC LIMIT 20',
    args: ['active']
  });
  res.json(result.rows);
});

app.post('/api/prayers', async (req, res) => {
  const { title, description, user_id } = req.body;
  const result = await turso.execute({
    sql: 'INSERT INTO prayer_requests (title, description, user_id) VALUES (?, ?, ?)',
    args: [title, description, user_id || null]
  });
  res.json({ id: result.lastInsertRowid });
});

app.post('/api/prayers/:id/pray', async (req, res) => {
  await turso.execute({
    sql: 'UPDATE prayer_requests SET prayers = prayers + 1 WHERE id = ?',
    args: [req.params.id]
  });
  res.json({ success: true });
});

// Sermons
app.get('/api/sermons', async (req, res) => {
  const result = await turso.execute('SELECT * FROM sermons ORDER BY date DESC LIMIT 20');
  res.json(result.rows);
});

app.post('/api/sermons', async (req, res) => {
  const { title, description, video, audio, speaker, date, scripture } = req.body;
  let video_url = null, audio_url = null;
  if (video) {
    const cloudResult = await cloudinary.uploader.upload(video, { folder: 'sermons', resource_type: 'video' });
    video_url = cloudResult.secure_url;
  }
  if (audio) {
    const cloudResult = await cloudinary.uploader.upload(audio, { folder: 'sermons', resource_type: 'video' });
    audio_url = cloudResult.secure_url;
  }
  const result = await turso.execute({
    sql: 'INSERT INTO sermons (title, description, video_url, audio_url, speaker, date, scripture) VALUES (?, ?, ?, ?, ?, ?, ?)',
    args: [title, description, video_url, audio_url, speaker, date, scripture]
  });
  res.json({ id: result.lastInsertRowid });
});

app.post('/api/sermons/:id/view', async (req, res) => {
  await turso.execute({
    sql: 'UPDATE sermons SET views = views + 1 WHERE id = ?',
    args: [req.params.id]
  });
  res.json({ success: true });
});

app.post('/api/sermons/:id/like', async (req, res) => {
  await turso.execute({
    sql: 'UPDATE sermons SET likes = likes + 1 WHERE id = ?',
    args: [req.params.id]
  });
  res.json({ success: true });
});

// Testimonies
app.get('/api/testimonies', async (req, res) => {
  const result = await turso.execute('SELECT * FROM testimonies WHERE approved = 1 ORDER BY created_at DESC LIMIT 20');
  res.json(result.rows);
});

app.post('/api/testimonies', async (req, res) => {
  const { title, content, user_id } = req.body;
  const result = await turso.execute({
    sql: 'INSERT INTO testimonies (title, content, user_id) VALUES (?, ?, ?)',
    args: [title, content, user_id || null]
  });
  res.json({ id: result.lastInsertRowid });
});

// Gallery
app.get('/api/gallery', async (req, res) => {
  const result = await turso.execute('SELECT * FROM gallery_images ORDER BY created_at DESC LIMIT 50');
  res.json(result.rows);
});

app.post('/api/gallery', async (req, res) => {
  const { title, image, category } = req.body;
  const cloudResult = await cloudinary.uploader.upload(image, { folder: 'gallery' });
  const result = await turso.execute({
    sql: 'INSERT INTO gallery_images (title, image_url, category) VALUES (?, ?, ?)',
    args: [title, cloudResult.secure_url, category]
  });
  res.json({ id: result.lastInsertRowid, image_url: cloudResult.secure_url });
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT} with Turso database`));

export default app;
