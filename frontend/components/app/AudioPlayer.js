import { AudioPlayerContext } from "pages/_app"
import React, { useContext } from "react"
import ReactPlayer from "react-player"

const AudioPlayer = () => {
  const { audio, dispatch } = useContext(AudioPlayerContext)

  return (
    audio.url && (
      // <div className="fixed bottom-0 w-full bg-pink-700 text-white">
      //   {audio.url}
      <ReactPlayer url={audio.url} autoPlay playing={audio.isPlaying} className="hidden" />
      // </div>
    )
  )
}

export default AudioPlayer
