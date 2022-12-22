import { Pool } from 'pg'

/* Creating a new pool of connections to the database. */
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

/**
 * It connects to the database
 */
export const connectToDB = async (): Promise<void> => {
  try {
    await pool.connect()
  } catch (err) {
    console.log(err)
  }
}
