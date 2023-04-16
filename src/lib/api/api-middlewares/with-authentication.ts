import { SignedInAuthObject, SignedOutAuthObject } from "@clerk/nextjs/dist/api"
import { getAuth } from "@clerk/nextjs/server"
import type { NextApiRequest, NextApiResponse } from "next"

export type NextAuthenticatedApiRequest = (
  req: NextApiRequest,
  res: NextApiResponse<any>,
  session: SignedInAuthObject | SignedOutAuthObject
) => unknown | Promise<unknown>

export function withAuthentication(handler: NextAuthenticatedApiRequest) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const session = getAuth(req)

    if (!session) {
      return res.status(403).end()
    }

    return handler(req, res, session)
  }
}
