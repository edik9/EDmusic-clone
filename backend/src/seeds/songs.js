import mongoose from "mongoose"
import { Song } from "../models/song.model.js"
import { config } from "dotenv"

config()

const songs = [
  {
    title: "Stay with me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46,
  },
  {
    title: "Stay with 1",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/2.jpg",
    audioUrl: "/songs/2.mp3",
    duration: 44,
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    imageUrl: "/cover-images/3.jpg",
    audioUrl: "/songs/3.mp3",
    duration: 40,
  },
  {
    title: "Song 4",
    artist: "Artist 4",
    imageUrl: "/cover-images/4.jpg",
    audioUrl: "/songs/4.mp3",
    duration: 49,
  },
  {
    title: "Song 5",
    artist: "Artist 5",
    imageUrl: "/cover-images/5.jpg",
    audioUrl: "/songs/5.mp3",
    duration: 56,
  },
  {
    title: "Song 6",
    artist: "Artist 6",
    imageUrl: "/cover-images/6.jpg",
    audioUrl: "/songs/6.mp3",
    duration: 46,
  },
  {
    title: "Song 7",
    artist: "Artist 7",
    imageUrl: "/cover-images/7 .jpg",
    audioUrl: "/songs/7.mp3",
    duration: 38,
  }
]

const seedSons = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    await Song.deleteMany({})

    await Song.insertMany(songs)

    console.log("Songs seeded successfully")
  } catch (error) {
    console.error("Error seeding songs:", error)
  } finally {
    mongoose.connection.close()
  } 
}

seedSons()