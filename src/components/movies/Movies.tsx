import { FC, useEffect, useState } from "react"
import movieService from "@/services/movieService"
import { Loader } from "@/components/ui"
import { EmptyState, MovieList } from "@/components/movies"

const Movies: FC = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true)

      try {
        const { movieList } = await movieService.getAllMovies()

        setMovies(movieList)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    getMovies()
  }, [])

  return (
    <>
      {!isLoading ? (
        <>
          {movies.length > 0 ? <MovieList movies={movies} /> : <EmptyState />}
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Movies
