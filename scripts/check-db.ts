import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  try {
    console.log('Checking database tables...')
    const tables: any = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    console.log('Tables found in public schema:', tables.map((t: any) => t.table_name))
    
    if (tables.some((t: any) => t.table_name === 'profiles')) {
      console.log('SUCCESS: "profiles" table exists.')
    } else {
      console.log('FAILURE: "profiles" table NOT found.')
    }
  } catch (error) {
    console.error('Database check failed:', error)
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}

main()
