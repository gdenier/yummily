import { type PostgresJsDatabase } from "drizzle-orm/postgres-js"
import db from "."
import { sql } from "drizzle-orm"

/**
 * Run a transaction
 *
 * @example
 * await transaction(async (db) => {
 *   const query1 = await db.insert(...)
 *   const query2 = await db.insert(...)
 * })
 */
export async function transaction<T>(
  run: (db: PostgresJsDatabase) => Promise<T>
) {
  try {
    await db.execute(sql`BEGIN`)
    const result = await run(db)
    await db.execute(sql`COMMIT`)

    return result
  } catch (err) {
    await db.execute(sql`ROLLBACK`)
    throw err
  }
}
