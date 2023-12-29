import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { COOKIE_NAME } from "@/utils/constants"

export async function GET() {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { value } = token

  const secret = process.env.JWT_SECRET || ""

  try {
    verify(value, secret)

    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    )
  }
}
