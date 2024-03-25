import { gql, useQuery } from "@apollo/client"
import { Section } from "components/app"
import { ArtistsTitle } from "assets/titles"
import Link from "next/link"
import { Video } from "components/artist"
import { Button, Image } from "components/ui"

const MeetTheArtists = ({ artists }) => {
  // const { loading, error, data } = useQuery(artistsQuery)

  return (
    <Section contentClassName="pt-4">
      <div className="flex flex-col items-center mb-12">
        <h3 className="text-xl font-bold uppercase mb-2">Meet the</h3>
        <ArtistsTitle className="text-pink" />
      </div>
      <div className="grid gap-10 grid-cols-1 lg:grid-cols-3 h-[64rem] md:h-[100rem] lg:h-96">
        {artists.slice(0, 3)?.map((artist, index) => (
          <Link key={index} href={`/gallery/${artist.id}`}>
            <div key={index} className="flex">
              <div className="grid grid-cols-2 gap-2 overflow-hidden cursor-pointer w-full">
                {/* <Video className="flex-1" video={artist.video} /> */}
                <Image className="flex-1" src={artist?.arts?.[0]?.images[0]?.url} />
                <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                  {artist?.arts?.slice(1, 4)?.map((art, index) => (
                    <div key={index} className="flex-1 overflow-hidden">
                      <Image src={art?.images[0]?.url} alt="art" className="flex-1 h-full w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  )
}

export default MeetTheArtists

// const artistsQuery = gql`
//   query Query {
//     artists(limit: 3) {
//       id
//       fullName
//       location
//       avatar {
//         url
//       }
//       video {
//         thumbnail {
//           url
//         }
//       }
//       arts {
//         title
//         images {
//           url
//         }
//       }
//     }
//   }
// `
