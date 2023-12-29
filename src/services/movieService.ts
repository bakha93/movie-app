import apiService from "@/services/apiService"
import { ICreateMovieInfo, IFullMovieInfo } from "@/types"

const movieService = {
  getAllMovies: async () => {
    const { data } = await apiService.get("/movie")

    return data
  },

  getMovieByid: async (movieId: string) => {
    const { data } = await apiService.get(`/movie/${movieId}`)

    return data
  },

  createMovie: async (movieInfo: ICreateMovieInfo) => {
    const { status } = await apiService.post("/movie", movieInfo)

    return status
  },

  updateMovie: async (movieInfo: IFullMovieInfo) => {
    const { status } = await apiService.put(
      `/movie/${movieInfo._id}`,
      movieInfo
    )

    return status
  }
}

export default movieService
