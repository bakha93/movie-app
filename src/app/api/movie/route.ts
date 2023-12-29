import { NextResponse } from "next/server"
import connectDB from "@/utils/connectDB"
import Movie from "@/models/Movie"

export async function GET() {
  try {
    await connectDB()

    const movieList = await Movie.find()

    return NextResponse.json({ movieList }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()

    const data = await req.json()

    const newMovie = await Movie.create(data)

    return NextResponse.json({ newMovie }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
