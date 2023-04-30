import {
  NextAuthenticatedApiRequest,
  withAuthentication,
} from "~/lib/api/api-middlewares/with-authentication"
import { withMethods } from "~/lib/api/api-middlewares/with-methods"
import db from "~/lib/db"
import { Recipe } from "@prisma/client"
import { withValidation } from "~/lib/api/api-middlewares/with-validation"
import { createRecipeSchema } from "~/app/(app)/recipes/create/components/CreateRecipeForm"

export type GetManyRecipeResponse = Recipe[]
const GET: NextAuthenticatedApiRequest = async (req, res, session) => {
  const data = await db.recipe.findMany()

  return res.json(data)
}

const POST: NextAuthenticatedApiRequest = withValidation(
  createRecipeSchema,
  async (_, res, session, body) => {
    const newRecipe = await db.recipe.create({
      data: {
        title: body.title,
        userId: session.userId,
      },
    })

    return res.json(newRecipe)
  }
)

export default withMethods(
  ["GET", "POST"],
  withAuthentication(async (req, res, session) => {
    switch (req.method) {
      case "GET":
        return await GET(req, res, session)
      case "POST":
        return await POST(req, res, session)
    }
  })
)
