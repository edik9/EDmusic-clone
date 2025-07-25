import { useMusicStore } from "@/strores/useMusicStore"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Play, Clock } from "lucide-react"

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
} 
const AlbumPage = () => {
  const {albumId} = useParams()
  const { fetchAlbumById, currentAlbum, isLoading} = useMusicStore()

  useEffect(() => {
    if(albumId) fetchAlbumById(albumId)
  }, [fetchAlbumById, albumId])

  if(isLoading) return null

  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        <div className="relative min-h-full">
          <div 
            className="rounded-md absolute inset-0 bg-gradient-to-b from-[#5038a0]/80
             via-zinc-900/80 to-zinc-900 pointer-events-none"
            aria-hidden="true"  
          />

          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img src={currentAlbum?.imageUrl} alt={currentAlbum?.title} 
                className="w-[240px] h-[240px] shadow-xl rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Альбом</p>
                <h1 className="text-7xl font-bold my-4">{currentAlbum?.title}</h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">{currentAlbum?.artist}</span>
                  <span>{currentAlbum?.songs.length} песен</span>
                  <span>{currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-4 flex items-center gap-6">
              <Button 
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all cursor-pointer"  
              >
                <Play className="h-7 w-7 text-black" />
              </Button>
            </div>

            <div className="bg-black/20 backdrop-blur-sm">
              <div
                className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
                text-zinc-400 border-b border-white/5"
                >
                  <div>#</div>
                  <div>Название</div>
                  <div>Дата релиза</div>
                  <div>
                    <Clock className="h-4 w-4" />
                  </div>
              </div>

              <div className="px-6 ">
                <div className="space-y-2 py-4">
                  {currentAlbum?.songs.map((song, index) => (
                    <div 
                      key={song._id}
                      className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                    text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                    `}
                    >
                      <div className="flex item-center justify-center">
                        <span className="group-hover:hidden">{index + 1}</span>
                        <Play className="h-4 w-4 hidden group-hover:block" />
                      </div>

                      <div className="flex items-center gap-3">
                        <img src={song.imageUrl} alt={song.title} className="size-10"/>

                        <div>
                          <div className={`font-medium text-white`}>{song.title}</div>
                          <div>{song.artist}</div>
                        </div>
                      </div>

                        <div className="flex items-center">{song.createdAt.split("T")[0]}</div>
                        <div className="flex items-center">{formatDuration(+song.duration)}</div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default AlbumPage
