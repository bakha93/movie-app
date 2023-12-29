import { NextResponse } from "next/server"
import connectDB from "@/utils/connectDB"
import Movie from "@/models/Movie"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    await connectDB()

    const existingMovie = await Movie.findById(id)

    if (!existingMovie) {
      return NextResponse.json(
        { message: `The movie with id: ${id} was not found.` },
        { status: 400 }
      )
    }

    return NextResponse.json({ existingMovie }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  try {
    await connectDB()

    const data = await req.json()

    const updatedMovie = await Movie.findByIdAndUpdate(id, data, {
      new: true
    })

    if (!updatedMovie) {
      return NextResponse.json(
        { message: `The movie with id: ${id} was not found.` },
        { status: 400 }
      )
    }

    return NextResponse.json({ updatedMovie }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
