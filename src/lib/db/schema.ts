import { InferModel, sql } from "drizzle-orm"
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { AnyPgColumnBuilder } from "drizzle-orm/pg-core/columns/common"

const entityFields = {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}

export interface Hello extends InferModel<typeof hellos> {}
export const hellos = pgTable("hellos", {
  ...entityFields,
  title: varchar("title", { length: 120 }).notNull(),
})
