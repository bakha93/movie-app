"use client"

import { FC, FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import movieService from "@/services/movieService"
import { routes } from "@/utils/constants"
import { DownloadIcon } from "@/components/icons"
import {
  Button,
  Heading,
  InputField,
  Loader,
  MarginContainer
} from "@/components/ui"
import { IFullMovieInfo, IInputData } from "@/types"
import s from "./Form.module.css"

interface IEditForm {
  movieId: string
}

const initialState = {
  title: "",
  year: "",
  poster: "/poster.png"
}

const EditForm: FC<IEditForm> = ({ movieId }) => {
  const [inputData, setInputData] = useState(initialState)
  const [movie, setMovie] = useState<IFullMovieInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const getMovie = async () => {
      setIsLoading(true)

      try {
        const { existingMovie } = await movieService.getMovieByid(movieId)

        const { title, year, poster } = existingMovie

        setInputData({ title, year, poster })
        setMovie(existingMovie)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    getMovie()
  }, [movieId])

  const handleChange = ({ name, value }: IInputData) => {
    setInputData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleCancel = (e: FormEvent) => {
    e.preventDefault()

    router.back()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const { title, year, poster } = inputData

    if (!title || !year || !poster) return

    if (movie) {
      try {
        const responseStatus = await movieService.updateMovie({
          ...movie,
          title,
          year: Number(year),
          poster
        })

        if (responseStatus >= 200 && responseStatus < 300) {
          router.push(routes.HOME_ROUTE)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return !isLoading ? (
    <MarginContainer>
      <Heading level={2} align="left">
        Edit
      </Heading>

      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.dropzone}>
          <DownloadIcon />
          <span>Drop an image here</span>
        </div>

        <div className={s.inputContainer}>
          <div className={s.inputFields}>
            <InputField
              name="title"
              placeholder="Title"
              value={inputData.title}
              onInputChange={handleChange}
            />
            <InputField
              type="number"
              name="year"
              placeholder="Publishing year"
              value={inputData.year}
              onInputChange={handleChange}
            />
          </div>

          <div className={s.inputButtons}>
            <Button
              width="100%"
              color="transparent"
              border="1px solid #fff"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" width="100%">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </MarginContainer>
  ) : (
    <Loader />
  )
}

export default EditForm
