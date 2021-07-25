import { useContext } from "react"
import { Section } from "components/app"
import { ArtistsTitle } from "assets/titles"
import { AudioPlayerContext } from "pages/_app"
import { PauseIcon, PlayIcon } from "assets/icons"

const Podcasts = ({ podcasts }) => {
  const { audio, dispatch } = useContext(AudioPlayerContext)

  return (
    <Section className="bg-black text-white">
      <div className="flex flex-col items-center mb-12">
        <h3 className="text-xl font-bold uppercase mb-2">Podcasts with</h3>
        <ArtistsTitle className="text-pink" />
      </div>
      <div className="grid gap-10 grid-cols-2">
        {podcasts?.map((podcast, index) => {
          const isPlaying = audio.url === podcast.link && audio.isPlaying
          return (
            <div
              key={index}
              className="border-2 border-pink rounded-lg py-6 px-8 flex items-center space-x-8"
              title={podcast.description}
              onClick={() => {
                const audio = { url: podcast.link }
                isPlaying ? dispatch({ type: "pause" }) : dispatch({ type: "play", ...audio })
              }}
            >
              <button className="border-2 border-pink rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center focus:outline-none">
                {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 ml-1" />}
              </button>
              <div className="space-y-2">
                <h2 className="text-xl font-bold">{podcast.title}</h2>
                <p className="line-clamp-2">{podcast.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

// export default Videos

export default Podcasts

// const podcastsQuery = gql`
//   query Query {
//     podcasts {
//       title
//       description
//       link
//       file {
//         url
//       }
//     }
//   }
// `
