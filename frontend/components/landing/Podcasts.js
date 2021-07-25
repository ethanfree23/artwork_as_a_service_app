import { useContext, useState } from "react"
import { gql, useQuery } from "@apollo/client"
import { Section } from "components/app"
import { ArtistsTitle, MarketTitle } from "assets/titles"
import { Image } from "components/ui"
import ReactPlayer from "react-player"
import { AudioPlayerContext } from "pages/_app"

const Podcasts = () => {
  const [currentAudio, setCurrentAudio] = useState(null)
  const { loading, error, data } = useQuery(podcastsQuery)
  const { audio, dispatch } = useContext(AudioPlayerContext)

  return (
    <Section className="bg-black text-white">
      <div className="flex flex-col items-center mb-12">
        <h3 className="text-xl font-bold uppercase mb-2">Podcasts with</h3>
        <ArtistsTitle className="text-pink" />
      </div>
      <div className="grid gap-10 grid-cols-2">
        {data?.podcasts?.map((podcast, index) => (
          <div
            key={index}
            onClick={() => {
              const audio = { url: podcast.link }
              dispatch({ type: "play", ...audio })
            }}
          >
            <h2 className="text-xl">{podcast.title}</h2>
            <p>{podcast.description}</p>
          </div>
        ))}
        {/* <ReactPlayer url={currentAudio} autoplay playing={true} /> */}
      </div>
    </Section>
  )
}

export default Podcasts

const podcastsQuery = gql`
  query Query {
    podcasts {
      title
      description
      link
      file {
        url
      }
    }
  }
`
