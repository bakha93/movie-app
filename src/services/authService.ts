import apiService from "@/services/apiService"
import { ISignInData } from "@/types"

const authService = {
  signIn: async (authData: ISignInData) => {
    const { status } = await apiService.post("/auth/sign_in", authData)

    return status
  },

  getCurrentUser: async () => {
    const { status } = await apiService.get("/auth/current_user")

    return status
  },

  signOut: async () => {
    const { status } = await apiService.post("/auth/sign_out")

    return status
  }
}

export default authService
