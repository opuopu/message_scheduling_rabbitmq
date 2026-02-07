import { pool } from './db';

export const connectDB = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ PostgreSQL connected');
  } catch (error) {
    console.error('❌ PostgreSQL connection failed', error);
    process.exit(1);
  }
};
