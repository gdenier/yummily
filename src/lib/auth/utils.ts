import { currentUser } from "@clerk/nextjs/app-beta"
import { NextResponse } from "next/server"

export async function requestUser() {
  const user = await currentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  return user
}
