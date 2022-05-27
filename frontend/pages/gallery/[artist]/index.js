import { gql, useQuery } from "utils/apolloClient"
import Link from "next/link"

import { Page, Section } from "components/app"
import { LocationIcon } from "assets/icons"
import { formatPrice, getPrices } from "resources/art"
// import { Video } from "components/artist"

const Artist = ({ artist }) => {
  console.log("artist", artist)
  return (
    <Page>
      <header
        className="relative bg-bottom bg-cover min-h-[740px] md:min-h-[560px]"
        style={{ backgroundImage: "url(/backgrounds/artist-header-bg.svg)" }}
      >
        <div className="content pt-12 pb-24 flex flex-col md:flex-row gap-10">
          {/* TODO: Next Image comp */}
          <img
            src={artist?.avatar?.url}
            alt="profile-picture"
            className="w-48 h-48 md:w-96 md:h-96 object-cover object-center"
          />
          <div className="flex flex-col text-white">
            <h2 className="text-3xl font-semibold">{artist?.fullName}</h2>
            <div className="mt-4 mb-6 md:mt-6 md:mb-6 flex items-center gap-2">
              <LocationIcon className="text-pink" />
              <h4 className="leading-none">{artist?.location}</h4>
            </div>
            <p className="text-lg font-light text-white-500 text-opacity-80 max-w-2xl line-clamp-6" title={artist?.bio}>
              {artist?.bio}
            </p>
          </div>
        </div>
      </header>
      {/* <Section contentClassName="pt-4 pb-4">
        <h2 className="text-2xl font-bold mb-6 uppercase">In The Studio</h2>
        {artist?.video?.thumbnail?.url ? (
          <Video video={artist?.video} className="h-112" />
        ) : (
          <div className="h-112 border border-grey flex items-center justify-center">In the studio video here</div>
        )}
      </Section> */}
      {/* TODO: Make section padding editable instead of this crap */}
      <Section contentClassName="-mt-16">
        <h2 className="text-2xl font-bold mb-6 uppercase">Artwork</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artist?.arts?.map((art, index) => (
            <Link key={index} href={`/gallery/${artist?.id}/${art?.id}`}>
              <div className="flex flex-col gap-4 overflow-hidden cursor-pointer h-112">
                <img
                  className="flex-1 overflow-hidden object-cover object-center"
                  src={art?.images?.[0]?.url}
                  alt="art"
                />
                <div className="md:h-16">
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-between">
                    <h4 className="font-semibold uppercase truncate">{art.title}</h4>
                    <div className="flex flex-col md:items-end gap-1">
                      {getPrices(art)?.map((price, index) => (
                        <h5 className="font-medium whitespace-nowrap" key={index}>
                          {price}
                        </h5>
                      ))}
                    </div>
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

export async function getStaticPaths() {
  const query = gql`
    query Query {
      artists {
        id
      }
    }
  `

  const { data } = await useQuery(query)

  return {
    paths: data.artists.map((artist) => ({
      params: {
        artist: artist.id,
      },
    })),
    fallback: "blocking",
  }
}

export async function getStaticProps({ params }) {
  const query = gql`
    query Query($artist: ID!) {
      artist(id: $artist) {
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
          pricing {
            type
            price
            priceId
            forbid
          }
          dimensions
          images {
            url
          }
        }
      }
    }
  `

  const variables = { artist: params.artist }
  const { data } = await useQuery(query, variables)

  return {
    props: data,
    revalidate: 5,
  }
}

export default Artist
