"use client"

import { FC, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import movieService from "@/services/movieService"
import { routes } from "@/utils/constants"
import { DownloadIcon } from "@/components/icons"
import { Button, Heading, InputField, MarginContainer } from "@/components/ui"
import { IInputData } from "@/types"
import s from "./Form.module.css"

const initialState = {
  title: "",
  year: "",
  poster: "/poster.png"
}

const CreateForm: FC = () => {
  const [inputData, setInputData] = useState(initialState)

  const { title, year, poster } = inputData

  const router = useRouter()

  const handleChange = ({ name, value }: IInputData) => {
    setInputData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleCancel = (e: FormEvent) => {
    e.preventDefault()

    router.back()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!title || !year || !poster) return

    try {
      const responseStatus = await movieService.createMovie({
        ...inputData,
        year: Number(year)
      })

      if (responseStatus >= 200 && responseStatus < 300) {
        router.push(routes.HOME_ROUTE)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <MarginContainer>
      <Heading level={2} align="left">
        Create a new movie
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
              value={title}
              onInputChange={handleChange}
            />
            <InputField
              type="number"
              name="year"
              placeholder="Publishing year"
              value={year}
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
  )
}

export default CreateForm
