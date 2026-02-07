import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'message_queue',
  max: 10, // connection pool size
  idleTimeoutMillis: 30000, // close idle connections
});
