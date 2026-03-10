import { createClient } from '@libsql/client';

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
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
    // Auth routes
    if (route === '/auth/login' && req.method === 'POST') {
      const { email, password } = req.body;
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
        return res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
      }
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (route === '/auth/register' && req.method === 'POST') {
      const { email, password, name } = req.body;
      const existing = await turso.execute({
        sql: 'SELECT id FROM users WHERE email = ?',
        args: [email]
      });
      
      if (existing.rows.length > 0) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
      }
      
      const result = await turso.execute({
        sql: 'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?) RETURNING id',
        args: [email, password, name, 'user']
      });
      
      return res.json({ success: true, userId: result.rows[0].id });
    }

    // Hero slides
    if (route === '/hero-slides' && req.method === 'GET') {
      const result = await turso.execute('SELECT * FROM hero_slides WHERE active = 1 ORDER BY order_index');
      return res.json(result.rows);
    }

    // Events
    if (route === '/events' && req.method === 'GET') {
      const result = await turso.execute('SELECT * FROM events ORDER BY date DESC LIMIT 20');
      return res.json(result.rows);
    }

    // Prayers
    if (route === '/prayers' && req.method === 'GET') {
      const result = await turso.execute("SELECT * FROM prayer_requests WHERE status = 'active' ORDER BY created_at DESC LIMIT 20");
      return res.json(result.rows);
    }

    // Sermons
    if (route === '/sermons' && req.method === 'GET') {
      const result = await turso.execute('SELECT * FROM sermons ORDER BY date DESC LIMIT 20');
      return res.json(result.rows);
    }

    // Testimonies
    if (route === '/testimonies' && req.method === 'GET') {
      const result = await turso.execute('SELECT * FROM testimonies WHERE approved = 1 ORDER BY created_at DESC LIMIT 20');
      return res.json(result.rows);
    }

    // Groups
    if (route === '/groups' && req.method === 'GET') {
      const result = await turso.execute('SELECT * FROM groups');
      return res.json(result.rows);
    }

    // Announcements
    if (route === '/announcements' && req.method === 'GET') {
      const result = await turso.execute('SELECT * FROM announcements ORDER BY created_at DESC LIMIT 10');
      return res.json(result.rows);
    }

    // Gallery
    if (route === '/gallery' && req.method === 'GET') {
      const result = await turso.execute('SELECT * FROM gallery_images ORDER BY created_at DESC LIMIT 50');
      return res.json(result.rows);
    }

    // Church profile
    if (route === '/church-profile' && req.method === 'GET') {
      const result = await turso.execute("SELECT * FROM site_settings WHERE key = 'church_profile'");
      if (result.rows.length > 0) {
        return res.json(JSON.parse(result.rows[0].value as string));
      }
      return res.json({ 
        logo: '/logo.jpg', 
        name: 'Foursquare Church', 
        tagline: 'CityLight Church',
        citylightLogo: '/logo.jpg',
        wordlightLogo: '/logo.jpg'
      });
    }

    // Feedback
    if (route === '/feedback' && req.method === 'POST') {
      const { name, message } = req.body;
      const result = await turso.execute({
        sql: 'INSERT INTO feedback (name, message) VALUES (?, ?) RETURNING id',
        args: [name, message]
      });
      return res.json({ success: true, id: result.rows[0].id });
    }

    if (route === '/feedback' && req.method === 'GET') {
      const result = await turso.execute('SELECT * FROM feedback ORDER BY created_at DESC LIMIT 50');
      return res.json(result.rows);
    }

    // Membership requests
    if (route === '/membership-requests' && req.method === 'POST') {
      const data = req.body;
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
      return res.json({ success: true, id: result.rows[0].id });
    }

    if (route === '/membership-requests' && req.method === 'GET') {
      const result = await turso.execute('SELECT * FROM membership_requests ORDER BY created_at DESC');
      return res.json(result.rows);
    }

    // New Christians
    if (route === '/new-christians' && req.method === 'GET') {
      const result = await turso.execute('SELECT * FROM new_christians ORDER BY date DESC');
      return res.json(result.rows);
    }

    // Finance
    if (route === '/finance/transactions' && req.method === 'GET') {
      const result = await turso.execute('SELECT * FROM transactions ORDER BY date DESC');
      return res.json(result.rows);
    }

    if (route === '/finance/summary' && req.method === 'GET') {
      const result = await turso.execute('SELECT type, SUM(amount) as total FROM transactions GROUP BY type');
      let income = 0, expenses = 0;
      result.rows.forEach((row: any) => {
        if (row.type === 'income') income = row.total;
        if (row.type === 'expense') expenses = row.total;
      });
      return res.json({ income, expenses, balance: income - expenses });
    }

    // Videos
    if (route === '/videos' && req.method === 'GET') {
      const result = await turso.execute('SELECT * FROM videos ORDER BY created_at DESC');
      return res.json(result.rows);
    }

    // Members
    if (route === '/members' && req.method === 'GET') {
      const result = await turso.execute('SELECT * FROM members ORDER BY membership_date DESC');
      return res.json(result.rows);
    }

    // Upload endpoint
    if (route === '/upload' && req.method === 'POST') {
      const { file, folder, resource_type } = req.body;
      if (!file) return res.status(400).json({ error: 'No file provided' });
      
      // Return the base64 as-is for now (will be uploaded to Cloudinary by admin endpoint)
      return res.json({ url: file });
    }

    return res.status(404).json({ error: 'Route not found' });
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
