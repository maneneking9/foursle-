import { createClient } from '@libsql/client';

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || "libsql://database-aero-anchor-vercel-icfg-vpe4oceodpjzojyz3srl4xrd.aws-us-east-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzI5ODg3MzEsImlkIjoiMDE5Y2NlNWQtMGQwMS03ODc5LWI2Y2YtZDM2NjVhNmNjN2U2IiwicmlkIjoiZDM1NjhiZDUtNzFlMy00YzgxLWJkNGItNjRjNGQyZGMxOTBmIn0.EO5dPKY74985JBpl8bsOJl50Riy66qYf9kpu1eBIoTuVM9iEhMmKmsqZ2bpXMXYl-JMKe3QVXHU7ZSL9DUy9DA",
});

async function initDatabase() {
  console.log('Initializing Turso database...');
  
  // Users table
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    )
  `);
  console.log('✓ Users table created');

  // Hero slides table
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS hero_slides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_url TEXT,
      title TEXT,
      subtitle TEXT,
      order_index INTEGER DEFAULT 0,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✓ Hero slides table created');

  // Events table
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      date DATETIME,
      location TEXT,
      image_url TEXT,
      attendees INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✓ Events table created');

  // Prayer requests table
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS prayer_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      user_id INTEGER,
      prayers INTEGER DEFAULT 0,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✓ Prayer requests table created');

  // Sermons table
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS sermons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      video_url TEXT,
      audio_url TEXT,
      speaker TEXT,
      date DATETIME,
      scripture TEXT,
      views INTEGER DEFAULT 0,
      likes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✓ Sermons table created');

  // Testimonies table
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS testimonies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      user_id INTEGER,
      approved INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✓ Testimonies table created');

  // Groups table
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      meeting_time TEXT,
      location TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✓ Groups table created');

  // Announcements table
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✓ Announcements table created');

  // Gallery table
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS gallery_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      image_url TEXT NOT NULL,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✓ Gallery images table created');

  // Site settings table
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✓ Site settings table created');

  // Feedback table
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✓ Feedback table created');

  // Membership requests table
  await turso.execute(`
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
  `);
  console.log('✓ Membership requests table created');

  // Branches table
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS branches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      address TEXT,
      phone TEXT,
      email TEXT,
      pastor TEXT,
      description TEXT,
      mission TEXT,
      history TEXT,
      image_url TEXT,
      services TEXT,
      ministries TEXT,
      worshippers TEXT,
      socials TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✓ Branches table created');

  // Create default admin user if not exists
  const existingAdmin = await turso.execute({
    sql: 'SELECT id FROM users WHERE email = ?',
    args: ['manane@gmail.com']
  });
  
  if (existingAdmin.rows.length === 0) {
    await turso.execute({
      sql: 'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
      args: ['manane@gmail.com', '2026', 'Admin User', 'admin']
    });
    console.log('✓ Default admin user created (email: manane@gmail.com, password: 2026)');
  }

  // Insert default branches if none exist
  const existingBranches = await turso.execute('SELECT id FROM branches');
  if (existingBranches.rows.length === 0) {
    await turso.execute({
      sql: `INSERT INTO branches (name, slug, address, phone, email, pastor, description, mission, history, image_url, services, ministries, worshippers, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: ['Foursquare City Light', 'citylight', 'Kigali, Kimironko, Rwanda', '+250 788 123 456', 'citylight@foursquare.rw', 'Rev. Roger Brubeck', 'Our main campus in Kimironko, Kigali, serving as a beacon of hope and faith for the community.', 'To illuminate every corner of our city with the love and truth of Jesus Christ through active service and passionate worship.', 'Founded in 2005, City Light began as a small prayer group in Kimironko and has grown into a thriving community of believers.', '/images/branch/Screenshot 2026-03-07 154024.png', JSON.stringify(['Sunday: 8:00 AM, 10:00 AM, 5:00 PM', 'Wednesday: 7:00 PM', 'Friday: 6:30 PM']), JSON.stringify(['Children Ministry', 'Youth Ministry', 'Women Fellowship', "Men's Group"]), '2,500+', 1]
    });
    await turso.execute({
      sql: `INSERT INTO branches (name, slug, address, phone, email, pastor, description, mission, history, image_url, services, ministries, worshippers, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: ['Word Light Branch', 'wordlight', 'Kigali, Kabuga, Rwanda', '+250 788 987 654', 'wordlight@foursquare.rw', 'Pastor Sarah Uwase', 'A center for biblical excellence and spiritual growth in Kabuga, focusing on the transformative power of God\'s Word.', 'To build a foundation of faith through deep study of God\'s Word and empower believers to live out their calling.', 'Established in 2010 in Kabuga, Word Light was born from a vision to create a center for theological education and spiritual formation.', '/images/branch/Screenshot 2026-03-07 153508.png', JSON.stringify(['Sunday: 9:30 AM', 'Thursday: 6:30 PM']), JSON.stringify(['Bible Study Groups', 'Theological Training', 'Prayer Ministry', 'Evangelism Team']), '1,200+', 1]
    });
    console.log('✓ Default branches created');
  }

  // Videos table
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      video_url TEXT NOT NULL,
      video_type TEXT DEFAULT 'youtube',
      thumbnail_url TEXT,
      category TEXT,
      duration TEXT,
      views INTEGER DEFAULT 0,
      likes INTEGER DEFAULT 0,
      is_featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✓ Videos table created');

  // Add video_type column if not exists (for existing databases)
  try {
    await turso.execute('ALTER TABLE videos ADD COLUMN video_type TEXT DEFAULT \'youtube\'');
  } catch (e) {
    // Column already exists
  }

  // Volunteer requests table
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS volunteer_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      ministry TEXT NOT NULL,
      availability TEXT,
      why_volunteer TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✓ Volunteer requests table created');

  // Flyers table
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS flyers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT NOT NULL,
      category TEXT,
      event_date TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✓ Flyers table created');

  console.log('\n✅ Database initialization complete!');
}

initDatabase().catch(console.error);
