import { useContext, useState } from "react"
import { gql, useQuery } from "utils/apolloClient"
// import { useRouter } from "next/router"
import Link from "next/link"

import { Page, Section } from "components/app"
import { Button } from "components/ui"
import { Avatar } from "components/artist"
import cns from "classnames"
import { getArtistsArt, getPrices } from "resources/art"
import { AuthContext } from "pages/_app"
import { isUserArtist } from "resources/auth"
import { getMeArtist } from "resources/artist"

const Art = ({ art }) => {
  const { auth } = useContext(AuthContext)

  const isArtist = isUserArtist()
  const { data: artsData } = getArtistsArt()

  const [currentArt, setCurrentArt] = useState(0)
  const otherArtWork = art?.artist?.arts.filter((otherArt) => otherArt.id !== art.id)

  const anyOrdersOut = art?.orders?.findIndex((order) =>
    ["accepted", "rented", "sold", "returnDue"].includes(order.status)
  )

  console.log("art", art)

  const isMyArt = artsData?.arts?.findIndex(({ id }) => id === art.id) !== -1
  // const { data: artistData } = useQuery(meArtistQuery, { variables: { userId: auth?.me?.id } }) maybe

  let canRentOrBuy = auth.isLoggedIn && !isArtist && anyOrdersOut === -1

  return (
    <Page>
      <Section contentClassName="flex flex-col md:flex-row gap-8 md:gap-20">
        <div className="flex-1">
          {/* TODO: Use next image*/}
          <img
            src={art?.images[currentArt].url}
            alt="art"
            className="h-96 w-full md:h-160 object-cover object-center"
          />
          <div className="flex justify-center mt-6 gap-4">
            {art?.images?.length > 1 &&
              art?.images.map((image, index) => (
                <img
                  key={index}
                  src={image?.url}
                  className={cns(
                    "w-16 h-16 md:w-24 md:h-24 cursor-pointer border-4 p-1 object-cover",
                    currentArt === index ? "border-pink" : "border-transparent"
                  )}
                  onClick={() => setCurrentArt(index)}
                />
              ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold">{art?.title}</h1>
                <h2 className="text-lg font-bold text-pink">By {art?.artist?.fullName}</h2>
              </div>
              {isMyArt && (
                <Button href={`/artist/art/edit/${art.id}`} isLink className="mt-1">
                  Edit
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-1">
              {art?.dimensions && (
                <h4 className="text-sm space-x-2">
                  <span>Dimensions:</span> <span>{art?.dimensions}</span>
                </h4>
              )}
              {art?.materials && <h4 className="text-sm">Materials: {art?.materials}</h4>}
              {art?.style && <h4 className="text-sm">Style: {art?.style}</h4>}
              {art?.subject && <h4 className="text-sm">Subject:{art?.subject}</h4>}
            </div>
            <div className="flex flex-col gap-1">
              {getPrices(art)?.map((price, index) => (
                <h5 className="text-xl mt-2 font-semibold" key={index}>
                  {price}
                </h5>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              className="my-7 self-start px-20 py-2.5 font-semibold"
              href={`/gallery/${art?.artist?.id}/${art?.id}/order?type=rent`}
              isOutline
              disabled={!canRentOrBuy}
            >
              Rent
            </Button>
            <Button
              className="my-7 self-start px-20 py-2.5 font-semibold"
              href={`/gallery/${art?.artist?.id}/${art?.id}/order?type=buy`}
              disabled={!canRentOrBuy}
            >
              Buy
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Description:</h3>
            <p className="text-black text-opacity-60 leading-loose">{art?.description}</p>
          </div>
        </div>
      </Section>
      {/* TODO: Make section padding editable instead of this crap */}
      <Section contentClassName="pt-4 !pt-0">
        <div className="flex gap-4">
          <Avatar image={art?.artist?.avatar} className="w-24 h-24" />
          <div className="flex flex-col justify-center">
            <h3 className="font-semibold">Other Works by</h3>
            <h3 className="text-pink font-semibold text-xl">{art?.artist?.fullName}</h3>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherArtWork?.map((art, index) => (
            <Link key={index} href={`/gallery/${art?.artist?.id}/${art?.id}`}>
              <div className="flex flex-col gap-4 overflow-hidden cursor-pointer h-112">
                <img
                  className="flex-1 overflow-hidden object-cover object-center"
                  src={art?.images?.[0]?.url}
                  alt="art"
                />
                <div className="h-16">
                  <div className="flex gap-4 justify-between">
                    <h4 className="font-semibold uppercase truncate">{art.title}</h4>
                    <div className="flex flex-col items-end gap-1">
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
      arts {
        id
        artist {
          id
        }
      }
    }
  `

  const { data } = await useQuery(query)

  return {
    paths: data.arts
      .filter((art) => art?.artsit?.id)
      .map((art) => ({
        params: {
          art: art.id,
          artist: art.artist.id,
        },
      })),
    fallback: "blocking",
  }
}

export async function getStaticProps({ params }) {
  const query = gql`
    query Query($art: ID!) {
      art(id: $art) {
        id
        title
        description
        pricing {
          type
          price
          priceId
        }
        dimensions
        materials
        style
        subject
        images {
          url
        }
        artist {
          id
          fullName
          bio
          avatar {
            url
          }
          arts {
            id
            title
            description
            pricing {
              type
              price
              priceId
            }
            dimensions
            images {
              url
            }
          }
        }
        orders {
          status
        }
      }
    }
  `

  const variables = { art: params.art }
  const { data } = await useQuery(query, variables)

  return {
    props: data,
    revalidate: 5,
  }
}

export default Art
