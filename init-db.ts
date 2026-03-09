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

  console.log('\n✅ Database initialization complete!');
}

initDatabase().catch(console.error);
