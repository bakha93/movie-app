import { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { IFullMovieInfo } from "@/types"
import s from "./MovieCard.module.css"

const MovieCard: FC<IFullMovieInfo> = ({ _id, title, year, poster }) => {
  return (
    <Link href={`movie/edit/${_id}`}>
      <div className={s.card}>
        <Image
          className={s.poster}
          src={poster}
          alt={title}
          width={266}
          height={400}
          priority
        />

        <div className={s.description}>
          <span className={s.title}>{title}</span>
          <span className={s.year}>{year}</span>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
