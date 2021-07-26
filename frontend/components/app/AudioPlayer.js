import { PauseIcon, PlayIcon } from "assets/icons"
import { AudioPlayerContext } from "pages/_app"
import React, { useContext } from "react"
import ReactPlayer from "react-player"

const AudioPlayer = () => {
  const { audio, dispatch } = useContext(AudioPlayerContext)

  console.log("audio", audio)
  return (
    audio.url && (
      <div className="fixed bottom-0 w-full bg-pink-700 text-white">
        <div className="content flex items-center py-6">
          {/* <div className="flex-1 flex"> */}
          <div className="flex space-x-3" style={{ minWidth: 300 }}>
            <h4 className="text-base font-bold">
              Podcast: <span>{audio.title}</span>
            </h4>
          </div>
          <div className="flex-1 flex justify-center">
            <button
              className="border-2 border-white rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center focus:outline-none"
              onClick={() => {
                // const audio = { url: podcast.link, title: podcast.title }
                audio.isPlaying ? dispatch({ type: "pause" }) : dispatch({ type: "play", ...audio })
              }}
            >
              {audio.isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 ml-1" />}
            </button>
          </div>
          <ReactPlayer url={audio.url} autoPlay playing={audio.isPlaying} className="hidden" />
          <div className="flex" style={{ minWidth: 300, justifyContent: "flex-end" }}>
            <button onClick={() => dispatch({ type: "close" })}>X</button>
          </div>
        </div>
      </div>
    )
  )
}

export default AudioPlayer
