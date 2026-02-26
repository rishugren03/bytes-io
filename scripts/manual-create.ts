import { Pool } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function main() {
  try {
    console.log('Attempting manual table creation...')
    await pool.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY,
        updated_at TIMESTAMPTZ,
        username TEXT UNIQUE,
        full_name TEXT,
        avatar_url TEXT,
        website TEXT,
        github_username TEXT,
        leetcode_username TEXT,
        tech_stack TEXT[],
        power_score INT DEFAULT 0,
        bio TEXT
      );

      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT now(),
        owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        repo_url TEXT,
        demo_url TEXT,
        stars INT DEFAULT 0,
        tags TEXT[],
        status TEXT DEFAULT 'planning'
      );
    `)
    console.log('SUCCESS: Tables created manually.')
    
    const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
    console.log('Current tables:', res.rows.map(r => r.table_name))
  } catch (error) {
    console.error('Manual creation failed:', error)
  } finally {
    await pool.end()
  }
}

main()
