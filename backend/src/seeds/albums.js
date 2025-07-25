import mongoose from "mongoose";
import { Song } from "../models/song.model.js"
import { Album } from "../models/album.model.js"
import { config } from "dotenv";

config()

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    await Album.deleteMany({})
    await Song.deleteMany({})

    const createdSongs = await Song.insertMany([
      {
        title: "Stay with me",
        artist: "Sarah Mitchell",
        imageUrl: "/cover-images/1.jpg",
        audioUrl: "/songs/1.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 46,
      },
      {
        title: "Stay with 1",
        artist: "Sarah Mitchell",
        imageUrl: "/cover-images/2.jpg",
        audioUrl: "/songs/2.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 44,
      },
      {
        title: "Song 3",
        artist: "Artist 3",
        imageUrl: "/cover-images/3.jpg",
        audioUrl: "/songs/3.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 40,
      },
      {
        title: "Song 4",
        artist: "Artist 4",
        imageUrl: "/cover-images/4.jpg",
        audioUrl: "/songs/4.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 49,
      },
      {
        title: "Song 5",
        artist: "Artist 4",
        imageUrl: "/cover-images/5.jpg",
        audioUrl: "/songs/5.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 56,
      },
      {
        title: "Song 6",
        artist: "Artist 6",
        imageUrl: "/cover-images/6.jpg",
        audioUrl: "/songs/6.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 46,
      },
      {
        title: "Song 7",
        artist: "Artist 6",
        imageUrl: "/cover-images/7 .jpg",
        audioUrl: "/songs/7.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 38,
      }
    ])

    const albums = [
      {
        title: "Album 1",
        artist: "Artist 6",
        imageUrl: "/albums/1.jpg",
        releaseYear: 2024,
        songs: createdSongs.slice(0,4).map((song) => song._id),
      },
      {
        title: "Album 2",
        artist: "Artist 4",
        imageUrl: "/albums/2.jpg",
        releaseYear: 2020,
        songs: createdSongs.slice(4,8).map((song) => song._id),
      },
      {
        title: "Album 3",
        artist: "Artist 2",
        imageUrl: "/albums/3.jpg",
        releaseYear: 2025,
        songs: createdSongs.slice(8,12).map((song) => song._id),
      },
    ]

    const createdAlbums = await Album.insertMany(albums)

    for (let i = 0; i < createdAlbums.length; i++){
      const album = createdAlbums[i]
      const albumSongs = albums[i].songs

      await Song.updateMany({ _id: { $in: albumSongs}}, {albumId: album._id})
    }
    console.log("Database seeded successfully!")
  } catch (error) {
    console.log("Error seeding database:", error)
  } finally {
    mongoose.connection.close()
  }
}

seedDatabase()