import { pool } from '../config/db';

export const USER = async (
  id: number,
  number: number,
  email: string,
  name: string
) => {
  const query = `
    INSERT INTO users (id,number,email, name)
    VALUES ($1, $2, $3, $4)
    RETURNING id, number, email, name
  `;

  const { rows } = await pool.query(query, [id, number, email, name]);
  return rows[0];
};
