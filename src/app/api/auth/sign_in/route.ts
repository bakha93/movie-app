import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"
import { COOKIE_NAME } from "@/utils/constants"
import connectDB from "@/utils/connectDB"
import User from "@/models/User"

export async function POST(req: Request) {
  try {
    const { email, password, rememberMe } = await req.json()

    await connectDB()

    const user = await User.findOne({ email })

    // The password must be hashed, the comparison must be done secretly
    if (!user || user.password !== password) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const thirtyDays = 30 * 24 * 60 * 60
    const oneHour = 60 * 60

    const maxAge = rememberMe ? thirtyDays : oneHour

    const secret = process.env.JWT_SECRET || ""

    const token = sign({}, secret, { expiresIn: maxAge })

    cookies().set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge,
      path: "/"
    })

    return NextResponse.json({ message: "Authenticated" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
