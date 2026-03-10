import { createClient } from '@libsql/client';
import { v2 as cloudinary } from 'cloudinary';

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || "libsql://database-aero-anchor-vercel-icfg-vpe4oceodpjzojyz3srl4xrd.aws-us-east-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMxMjY1MzksImlkIjoiMDE5Y2NlNWQtMGQwMS03ODc5LWI2Y2YtZDM2NjVhNmNjN2U2IiwicmlkIjoiZDM1NjhiZDUtNzFlMy00YzgxLWJkNGItNjRjNGQyZGMxOTBmIn0.fzoAvS1xGeswNHoUNrvf92uZIbgO9rVrjVrd_GhJfVkJZ28DXCcrc1B4anWpd-q6N4Z-E-Cm6DnKXllfqQx9Dw",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'root',
  api_key: process.env.CLOUDINARY_API_KEY || '289699272556856',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'RlS9BumbzEr835Qf1c2cMlnq_yg',
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
      let imageUrl = image;

      if (image && image.startsWith('data:')) {
        const result = await cloudinary.uploader.upload(image, { folder: 'events' });
        imageUrl = result.secure_url;
      }

      const result = await turso.execute({
        sql: 'INSERT INTO events (title, description, date, location, image_url) VALUES (?, ?, ?, ?, ?) RETURNING id',
        args: [title, description, date, location, imageUrl]
      });

      return res.json({ id: result.rows[0].id, image_url: imageUrl });
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
      let imageUrl = image;

      if (image && image.startsWith('data:')) {
        const result = await cloudinary.uploader.upload(image, { folder: 'gallery' });
        imageUrl = result.secure_url;
      }

      const dbResult = await turso.execute({
        sql: 'INSERT INTO gallery_images (title, image_url, category) VALUES (?, ?, ?) RETURNING id',
        args: [title, imageUrl, category]
      });

      return res.json({ id: dbResult.rows[0].id, image_url: imageUrl });
    }

    if (route.startsWith('/gallery/') && req.method === 'PUT') {
      const id = route.split('/')[2];
      const { title, image, category } = req.body;
      let imageUrl = image;

      if (image && image.startsWith('data:')) {
        const result = await cloudinary.uploader.upload(image, { folder: 'gallery' });
        imageUrl = result.secure_url;
      }

      await turso.execute({
        sql: 'UPDATE gallery_images SET title = ?, image_url = COALESCE(?, image_url), category = ? WHERE id = ?',
        args: [title, imageUrl || null, category, id]
      });
      return res.json({ success: true });
    }

    if (route.startsWith('/gallery/') && req.method === 'DELETE') {
      const id = route.split('/')[2];
      await turso.execute({
        sql: 'DELETE FROM gallery_images WHERE id = ?',
        args: [id]
      });
      return res.json({ success: true });
    }

    // Sermons Delete
    if (route.startsWith('/sermons/') && req.method === 'DELETE') {
      const id = route.split('/')[2];
      await turso.execute({
        sql: 'DELETE FROM sermons WHERE id = ?',
        args: [id]
      });
      return res.json({ success: true });
    }

    // New Christians
    if (route === '/newchristians' && req.method === 'POST') {
      const { name, email, phone, date, notes } = req.body;
      const result = await turso.execute({
        sql: 'INSERT INTO new_christians (name, email, phone, date, notes) VALUES (?, ?, ?, ?, ?) RETURNING id',
        args: [name, email, phone, date, notes]
      });
      return res.json({ id: result.rows[0].id });
    }

    if (route.startsWith('/newchristians/') && req.method === 'DELETE') {
      const id = route.split('/')[2];
      await turso.execute({
        sql: 'DELETE FROM new_christians WHERE id = ?',
        args: [id]
      });
      return res.json({ success: true });
    }

    // Finance Transactions
    if (route === '/transactions' && req.method === 'POST') {
      const { type, category, amount, description, date, payment_method } = req.body;
      const result = await turso.execute({
        sql: 'INSERT INTO transactions (type, category, amount, description, date, payment_method) VALUES (?, ?, ?, ?, ?, ?) RETURNING id',
        args: [type, category, amount, description, date, payment_method || 'cash']
      });
      return res.json({ id: result.rows[0].id });
    }

    if (route.startsWith('/transactions/') && req.method === 'DELETE') {
      const id = route.split('/')[2];
      await turso.execute({
        sql: 'DELETE FROM transactions WHERE id = ?',
        args: [id]
      });
      return res.json({ success: true });
    }

    // Videos
    if (route === '/videos' && req.method === 'POST') {
      const { title, description, video, thumbnail, category } = req.body;
      let videoUrl = video;
      let thumbnailUrl = thumbnail;

      if (video && video.startsWith('data:')) {
        const result = await cloudinary.uploader.upload(video, { folder: 'videos', resource_type: 'video' });
        videoUrl = result.secure_url;
      }

      if (thumbnail && thumbnail.startsWith('data:')) {
        const result = await cloudinary.uploader.upload(thumbnail, { folder: 'videos' });
        thumbnailUrl = result.secure_url;
      }

      const result = await turso.execute({
        sql: 'INSERT INTO videos (title, description, video_url, thumbnail_url, category) VALUES (?, ?, ?, ?, ?) RETURNING id',
        args: [title, description, videoUrl, thumbnailUrl, category]
      });
      return res.json({ id: result.rows[0].id, video_url: videoUrl, thumbnail_url: thumbnailUrl });
    }

    if (route.startsWith('/videos/') && req.method === 'DELETE') {
      const id = route.split('/')[2];
      await turso.execute({
        sql: 'DELETE FROM videos WHERE id = ?',
        args: [id]
      });
      return res.json({ success: true });
    }

    // Members
    if (route === '/members' && req.method === 'POST') {
      const { name, email, phone, dob, gender, marital_status, occupation, address, membership_date, notes, photo } = req.body;
      let photoUrl = photo;

      if (photo && photo.startsWith('data:')) {
        const result = await cloudinary.uploader.upload(photo, { folder: 'members' });
        photoUrl = result.secure_url;
      }

      const result = await turso.execute({
        sql: 'INSERT INTO members (name, email, phone, dob, gender, marital_status, occupation, address, membership_date, notes, photo_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id',
        args: [name, email, phone, dob, gender, marital_status, occupation, address, membership_date, notes, photoUrl]
      });
      return res.json({ id: result.rows[0].id, photo_url: photoUrl });
    }

    if (route.startsWith('/members/') && req.method === 'DELETE') {
      const id = route.split('/')[2];
      await turso.execute({
        sql: 'DELETE FROM members WHERE id = ?',
        args: [id]
      });
      return res.json({ success: true });
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
