import { createClient } from '@libsql/client';
import { v2 as cloudinary } from 'cloudinary';

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path } = req.query;
  const route = `/${path.join('/')}`;

  try {
    // Hero Slides Admin
    if (route === '/hero-slides' && req.method === 'POST') {
      const { title, subtitle, image, order_index } = req.body;
      let imageUrl = image;
      
      if (image && image.startsWith('data:')) {
        const result = await cloudinary.uploader.upload(image, { folder: 'hero' });
        imageUrl = result.secure_url;
      }
      
      const result = await turso.execute({
        sql: 'INSERT INTO hero_slides (image_url, title, subtitle, order_index) VALUES (?, ?, ?, ?) RETURNING id',
        args: [imageUrl, title, subtitle, order_index || 0]
      });
      
      return res.json({ id: result.rows[0].id, image_url: imageUrl });
    }

    if (route.startsWith('/hero-slides/') && req.method === 'DELETE') {
      const id = route.split('/')[2];
      await turso.execute({
        sql: 'DELETE FROM hero_slides WHERE id = ?',
        args: [id]
      });
      return res.json({ success: true });
    }

    // Events Admin
    if (route === '/events' && req.method === 'POST') {
      const { title, description, date, location, image } = req.body;
      let imageUrl = null;
      
      if (image && image.startsWith('data:')) {
        const result = await cloudinary.uploader.upload(image, { folder: 'events' });
        imageUrl = result.secure_url;
      }
      
      const result = await turso.execute({
        sql: 'INSERT INTO events (title, description, date, location, image_url) VALUES (?, ?, ?, ?, ?) RETURNING id',
        args: [title, description, date, location, imageUrl]
      });
      
      return res.json({ id: result.rows[0].id });
    }

    if (route.startsWith('/events/') && req.method === 'DELETE') {
      const id = route.split('/')[2];
      await turso.execute({
        sql: 'DELETE FROM events WHERE id = ?',
        args: [id]
      });
      return res.json({ success: true });
    }

    // Sermons Admin
    if (route === '/sermons' && req.method === 'POST') {
      const { title, description, video, audio, speaker, date, scripture } = req.body;
      let videoUrl = null, audioUrl = null;
      
      if (video && video.startsWith('data:')) {
        const result = await cloudinary.uploader.upload(video, { folder: 'sermons', resource_type: 'video' });
        videoUrl = result.secure_url;
      }
      
      if (audio && audio.startsWith('data:')) {
        const result = await cloudinary.uploader.upload(audio, { folder: 'sermons', resource_type: 'video' });
        audioUrl = result.secure_url;
      }
      
      const result = await turso.execute({
        sql: 'INSERT INTO sermons (title, description, video_url, audio_url, speaker, date, scripture) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id',
        args: [title, description, videoUrl, audioUrl, speaker, date, scripture]
      });
      
      return res.json({ id: result.rows[0].id });
    }

    // Gallery Admin
    if (route === '/gallery' && req.method === 'POST') {
      const { title, image, category } = req.body;
      
      if (image && image.startsWith('data:')) {
        const result = await cloudinary.uploader.upload(image, { folder: 'gallery' });
        const dbResult = await turso.execute({
          sql: 'INSERT INTO gallery_images (title, image_url, category) VALUES (?, ?, ?) RETURNING id',
          args: [title, result.secure_url, category]
        });
        
        return res.json({ id: dbResult.rows[0].id, image_url: result.secure_url });
      }
    }

    // Church Profile Update
    if (route === '/church-profile' && req.method === 'PUT') {
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
      
      const profileData = JSON.stringify({ 
        citylightLogo: citylightUrl, 
        wordlightLogo: wordlightUrl, 
        name, 
        tagline 
      });
      const existing = await turso.execute({
        sql: "SELECT * FROM site_settings WHERE key = 'church_profile'",
        args: []
      });
      
      if (existing.rows.length > 0) {
        await turso.execute({
          sql: "UPDATE site_settings SET value = ? WHERE key = 'church_profile'",
          args: [profileData]
        });
      } else {
        await turso.execute({
          sql: "INSERT INTO site_settings (key, value) VALUES ('church_profile', ?)",
          args: [profileData]
        });
      }
      
      return res.json({ success: true, citylightLogo: citylightUrl, wordlightLogo: wordlightUrl });
    }

    return res.status(404).json({ error: 'Route not found' });
  } catch (error: any) {
    console.error('Admin API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
