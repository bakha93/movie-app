import { model, models, Schema } from "mongoose"

const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    poster: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const Movie = models.Movie || model("Movie", movieSchema)

export default Movie
