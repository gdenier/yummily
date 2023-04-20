import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import { env } from "./env"

console.log(env.DATABASE_URL)
const pool = new Pool({
  connectionString: env.DATABASE_URL,
})

const db = drizzle(pool, { logger: env.DEV })

export default db
