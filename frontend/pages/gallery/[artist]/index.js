import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import Link from "next/link"

import { Page, Section } from "components/app"
import { LocationIcon } from "assets/icons"
import { Video } from "components/artist"

const Artist = () => {
  const router = useRouter()
  const { artist: artistId } = router.query

  const { loading, error, data } = useQuery(artistsQuery, { variables: { artistId } })

  const artist = data?.artist

  return (
    <Page>
      <header
        className="relative bg-bottom bg-cover"
        style={{ backgroundImage: "url(/backgrounds/artist-header-bg.svg)" }}
      >
        <div className="content pt-12 pb-24 flex gap-10">
          <img src={artist?.avatar?.url} alt="profile-picture" className="w-96 h-96 object-cover object-center" />
          <div className="flex flex-col text-white">
            <h2 className="text-3xl font-semibold">{artist?.fullName}</h2>
            <div className="mt-6 mb-9 flex items-center gap-2">
              <LocationIcon className="text-pink" />
              <h4 className="leading-none">{artist?.location}</h4>
            </div>
            <p className="text-lg font-light text-white-500 text-opacity-80 max-w-2xl">{artist?.bio}</p>
          </div>
        </div>
      </header>
      <Section contentClassName="pt-4 pb-4">
        <h2 className="text-2xl font-bold mb-6 uppercase">In The Studio</h2>
        <Video video={artist?.video} className="h-112" />
      </Section>
      <Section contentClassName="pt-12">
        <h2 className="text-2xl font-bold mb-6 uppercase">Artwork</h2>
        <div className="grid grid-cols-3 gap-8 h-112">
          {artist?.arts?.map((art, index) => (
            <Link key={index} href={`/gallery/${artist?.id}/${art?.id}`}>
              <div className="flex flex-col gap-4 overflow-hidden cursor-pointer">
                <img className="flex-1 overflow-hidden object-cover object-center" src={art?.images[0].url} alt="art" />
                <div className="h-16">
                  <div className="flex gap-4 justify-between">
                    <h4 className="font-semibold uppercase truncate">{art.title}</h4>
                    <h5 className="font-semibold">${art?.price / 100}</h5>
                  </div>
                  <h5>{art.dimensions}</h5>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </Page>
  )
}

export default Artist

const artistsQuery = gql`
  query Query($artistId: ID!) {
    artist(id: $artistId) {
      id
      fullName
      avatar {
        url
      }
      bio
      location
      video {
        thumbnail {
          url
        }
      }
      arts {
        id
        title
        price
        dimensions
        images {
          url
        }
      }
    }
  }
`
