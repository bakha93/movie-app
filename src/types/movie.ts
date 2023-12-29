export interface ICreateMovieInfo {
  title: string
  year: number
  poster: string
}

export interface IFullMovieInfo extends ICreateMovieInfo {
  _id: string
  createdAt: Date
  updatedAt: Date
}
