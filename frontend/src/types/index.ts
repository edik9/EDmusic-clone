export interface Song {
  _id: string
  title: string
  artist: string
  albumId: string
  imageUrl: string
  audioUrl: string
  duration: string
  createdAt: string
  updatedAt: string
}

export interface Album {
  _id: string
  title: string
  artist: string
  imageUrl: string
  releaseYear: number
  songs: Song[]
}