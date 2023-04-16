import { SignedInAuthObject } from "@clerk/nextjs/dist/api"
import { getAuth } from "@clerk/nextjs/server"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import {
  NextAuthenticatedApiRequest,
  withAuthentication,
} from "~/lib/api/api-middlewares/with-authentication"
import { withMethods } from "~/lib/api/api-middlewares/with-methods"
import { withValidation } from "~/lib/api/api-middlewares/with-validation"
import db from "~/lib/db"
import { hellos } from "~/lib/db/schema"
import { transaction } from "~/lib/db/utils"

const GET: NextAuthenticatedApiRequest = async (req, res, session) => {
  const data = await db.select().from(hellos)
  data.push({
    id: "test",
    title: "Hello " + session.userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return res.json(data)
}

const postCreateHello = z.object({
  title: z.string(),
})
const POST: NextAuthenticatedApiRequest = withValidation(
  postCreateHello,
  async (_, res, __, body) => {
    const newData = await transaction(async (db) => {
      return await db.insert(hellos).values(body).returning()
    })
    return res.json(newData)
  }
)

export default withMethods(
  ["GET", "POST"],
  withAuthentication(async (req, res, session) => {
    switch (req.method) {
      case "GET":
        return await GET(req, res, session)
      case "POST":
        return POST(req, res, session)
    }
  })
)
