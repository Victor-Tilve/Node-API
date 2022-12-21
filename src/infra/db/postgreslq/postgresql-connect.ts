import { Pool } from 'pg'

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

export const connectToDB = async (): Promise<void> => {
  try {
    await pool.connect()
  } catch (err) {
    console.log(err)
  }
}
