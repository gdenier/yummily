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

export type CreateRecipeResponse = Recipe
const POST: NextAuthenticatedApiRequest = withValidation(
  createRecipeSchema,
  async (_, res, session, body) => {
    const newRecipe = await db.recipe.create({
      data: {
        title: body.title,
        bakingTime: body.bakingTime,
        persons: body.persons,
        preparationTime: body.preparationTime,
        restTime: body.restTime,
        category: body.category,
        userId: session.userId,
        ingredients: {
          createMany: {
            data: body.ingredients,
          },
        },
        steps: {
          createMany: {
            data: body.steps,
          },
        },
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
