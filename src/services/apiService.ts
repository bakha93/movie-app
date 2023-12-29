import axios from "axios"

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT
})

const apiService = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete
}

export default apiService
