import { Client, Pool } from "pg"
import { migrate } from "drizzle-orm/node-postgres/migrator"
import * as dotenv from "dotenv"
import fs from "fs"
import { drizzle } from "drizzle-orm/node-postgres"

const localConfig = dotenv.parse(fs.readFileSync("./.env.local", "utf-8"))

async function run() {
  if (!localConfig.DATABASE_URL) throw new Error("DATABASE_URL must be define.")

  const pool = new Pool({
    connectionString: localConfig.DATABASE_URL,
  })

  const db = drizzle(pool, { logger: false })
  console.log("⌛ Running migrations...")
  const start = Date.now()
  await migrate(db, { migrationsFolder: `${__dirname}/migrations` })
  const end = Date.now()

  console.log(`✅ Migration end & took ${end - start}ms`)

  process.exit(0)
}

run().catch((err) => {
  console.error("❌ Migration failed")
  console.error(err)
  process.exit(1)
})
