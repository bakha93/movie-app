"use client"

import { FC } from "react"
import { useAuth } from "@/contexts/AuthProvider"
import { Loader } from "@/components/ui"
import { SignInForm } from "@/components/auth"
import { Movies } from "@/components/movies"

const HomeView: FC = () => {
  const { isLoading, isLoggedIn } = useAuth()

  return (
    <>
      {isLoading && <Loader />}

      {isLoggedIn && <Movies />}

      {!isLoading && !isLoggedIn && <SignInForm />}
    </>
  )
}

export default HomeView
