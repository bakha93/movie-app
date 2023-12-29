"use client"

import { FC, createContext, useContext, useEffect, useState } from "react"
import authService from "@/services/authService"
import { IChildren, ISignInData } from "@/types"

interface IAuthContext {
  isLoading: boolean
  isLoggedIn: boolean
  signIn: (authData: ISignInData) => void
  signOut: () => void
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider: FC<IChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true)

      try {
        const responseStatus = await authService.getCurrentUser()

        if (responseStatus >= 200 && responseStatus < 300) {
          setIsLoggedIn(true)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  const signIn = async (authData: ISignInData) => {
    setIsLoading(true)

    try {
      const responseStatus = await authService.signIn(authData)

      if (responseStatus >= 200 && responseStatus < 300) {
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)

    try {
      const responseStatus = await authService.signOut()

      if (responseStatus >= 200 && responseStatus < 300) {
        setIsLoggedIn(false)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ isLoading, isLoggedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
