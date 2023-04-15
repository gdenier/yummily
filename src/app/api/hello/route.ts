import { NextResponse } from "next/server"
import db from "~/lib/db"
import { hellos } from "~/lib/db/schema"
import { transaction } from "~/lib/db/utils"

export async function GET(request: Request) {
  return NextResponse.json({ hellos: await db.select().from(hellos) })
}

export async function POST(request: Request) {
  return NextResponse.json({
    hellos: await transaction(async (db) => {
      return await db
        .insert(hellos)
        .values({
          title: "hello from Next.js",
        })
        .returning()
    }),
  })
}
