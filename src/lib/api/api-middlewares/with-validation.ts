import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import type { ZodSchema } from "zod"
import { SignedInAuthObject, SignedOutAuthObject } from "@clerk/nextjs/dist/api"

export type NextAuthenticatedApiRequestWithBody<Body> = (
  req: NextApiRequest,
  res: NextApiResponse<any>,
  session: SignedInAuthObject | SignedOutAuthObject,
  body: Body
) => unknown | Promise<unknown>

export function withValidation<T extends ZodSchema>(
  schema: T,
  handler: NextAuthenticatedApiRequestWithBody<z.infer<T>>
) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse,
    session: SignedInAuthObject | SignedOutAuthObject
  ) {
    try {
      return handler(
        req,
        res,
        session,
        await schema.parse(JSON.parse(req.body))
      )
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(422).end()
    }
  }
}
