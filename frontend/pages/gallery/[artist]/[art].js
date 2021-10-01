import { useState } from "react"
import { gql, useQuery } from "utils/apolloClient"
// import { useRouter } from "next/router"
import Link from "next/link"

import { Page, Section } from "components/app"
import { Button } from "components/ui"
import { Avatar } from "components/artist"
import cns from "classnames"

const Art = ({ art }) => {
  const [currentArt, setCurrentArt] = useState(0)
  const otherArtWork = art?.artist?.arts.filter((otherArt) => otherArt.id !== art.id)

  return (
    <Page>
      <Section contentClassName="flex gap-20">
        <div className="flex-1">
          <img src={art?.images[currentArt].url} alt="art" className="h-160 object-cover object-center" />
          <div className="flex justify-center mt-6 gap-4">
            {art?.images?.length > 1 &&
              art?.images.map((image, index) => (
                <img
                  key={index}
                  src={image?.url}
                  className={cns(
                    "w-24 h-24 cursor-pointer border-4 p-1",
                    currentArt === index ? "border-pink" : "border-transparent"
                  )}
                  onClick={() => setCurrentArt(index)}
                />
              ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">{art?.title}</h1>
            <h2 className="text-lg font-bold text-pink">By {art?.artist?.fullName}</h2>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm space-x-2">
                <span>Dimensions:</span> <span>{art?.dimensions}</span>
              </h4>
              <h4 className="text-sm">Materials: {art?.materials}</h4>
              <h4 className="text-sm">Style: {art?.style}</h4>
              <h4 className="text-sm">Subject:{art?.subject}</h4>
            </div>
            <h3 className="text-2xl mt-2 font-semibold">${art?.price / 100}</h3>
          </div>
          <Button className="my-7 self-start px-20 py-2.5 font-semibold">Buy Now</Button>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Description:</h3>
            <p className="text-black text-opacity-60 leading-loose">{art?.description}</p>
          </div>
        </div>
      </Section>
      <Section contentClassName="pt-4">
        <div className="flex gap-4">
          <Avatar image={art?.artist?.avatar} className="w-24 h-24" />
          <div className="flex flex-col justify-center">
            <h3 className="font-semibold">Other Works by</h3>
            <h3 className="text-pink font-semibold text-xl">{art?.artist?.fullName}</h3>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-8">
          {otherArtWork?.map((art, index) => (
            <Link key={index} href={`/gallery/${art?.artist?.id}/${art?.id}`}>
              <div className="flex flex-col gap-4 overflow-hidden cursor-pointer h-112">
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
        price
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
            price
            dimensions
            images {
              url
            }
          }
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
