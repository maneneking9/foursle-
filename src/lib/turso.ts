import { createClient } from '@libsql/client';

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || 'libsql://database-aero-anchor-vercel-icfg-vpe4oceodpjzojyz3srl4xrd.aws-us-east-1.turso.io',
  authToken: process.env.TURSO_AUTH_TOKEN || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzI5ODg3MzEsImlkIjoiMDE5Y2NlNWQtMGQwMS03ODc5LWI2Y2YtZDM2NjVhNmNjN2U2IiwicmlkIjoiZDM1NjhiZDUtNzFlMy00YzgxLWJkNGItNjRjNGQyZGMxOTBmIn0.EO5dPKY74985JBpl8bsOJl50Riy66qYf9kpu1eBIoTuVM9iEhMmKmsqZ2bpXMXYl-JMKe3QVXHU7ZSL9DUy9DA'
});

export default turso;
