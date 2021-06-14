import { gql, useQuery } from "@apollo/client"
import { Section } from "components/app"
import { ArtistsTitle } from "assets/titles"
import Link from "next/link"
import { Video } from "components/artist"

const MeetTheArtists = () => {
  const { data } = useQuery(artistsQuery)

  const topArtists = data?.artists.slice(0, 3)

  return (
    <Section contentClassName="pt-4">
      <div className="flex flex-col items-center mb-12">
        <h3 className="text-xl font-bold uppercase mb-2">Meet the</h3>
        <ArtistsTitle className="text-pink" />
      </div>
      <div className="grid gap-10 grid-cols-3 h-96">
        {topArtists?.map((artist, index) => (
          <Link key={index} href={`/gallery/${artist.id}`}>
            <div className="grid grid-cols-2 gap-2 overflow-hidden cursor-pointer">
              <Video className="flex-1" video={artist.video} />
              <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                {artist?.arts?.slice(0, 3)?.map((art, index) => (
                  <div key={index} className="flex-1 overflow-hidden">
                    <img
                      src={art?.images[0]?.url}
                      alt="art"
                      className="flex-1 h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  )
}

export default MeetTheArtists

const artistsQuery = gql`
  {
    artists {
      id
      fullName
      location
      avatar {
        url
      }
      video {
        thumbnail {
          url
        }
      }
      arts {
        title
        images {
          url
        }
      }
    }
  }
`
