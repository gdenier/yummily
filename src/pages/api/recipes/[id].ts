import {
  NextAuthenticatedApiRequest,
  withAuthentication,
} from "~/lib/api/api-middlewares/with-authentication"
import { withMethods } from "~/lib/api/api-middlewares/with-methods"
import db from "~/lib/db"
import { Recipe } from "@prisma/client"

export type GetRecipeResponse = Recipe
const GET: NextAuthenticatedApiRequest = async (req, res, session) => {
  const data = await db.recipe.findUniqueOrThrow({
    where: { id: req.query.id as string },
  })

  return res.json(data)
}

export default withMethods(
  ["GET"],
  withAuthentication(async (req, res, session) => {
    switch (req.method) {
      case "GET":
        return await GET(req, res, session)
    }
  })
)
