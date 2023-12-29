import { FC, useMemo, useState } from "react"
import { MarginContainer, Pagination } from "@/components/ui"
import { Header, MovieCard } from "@/components/movies/movieList"
import { IFullMovieInfo } from "@/types"
import s from "./MovieList.module.css"

interface IMovieList {
  movies: IFullMovieInfo[]
}

const PAGE_SIZE = 8

const MovieList: FC<IMovieList> = ({ movies }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(movies.length / PAGE_SIZE)

  const currentMovies = useMemo(() => {
    const indexOfLastMovie = currentPage * PAGE_SIZE
    const indexOfFirstMovie = indexOfLastMovie - PAGE_SIZE

    return movies.slice(indexOfFirstMovie, indexOfLastMovie)
  }, [currentPage, movies])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)

    if (page !== currentPage) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <MarginContainer>
      <Header />

      <div className={s.list}>
        {currentMovies.map((movieInfo) => (
          <MovieCard key={movieInfo._id} {...movieInfo} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </MarginContainer>
  )
}

export default MovieList
