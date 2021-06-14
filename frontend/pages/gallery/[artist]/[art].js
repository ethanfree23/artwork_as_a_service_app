import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import Link from "next/link"

import { Page, Section } from "components/app"
import { Button } from "components/ui"
import { Avatar } from "components/artist"

const Art = () => {
  const router = useRouter()
  const { art: artId } = router.query

  const { loading, error, data } = useQuery(artQuery, { variables: { artId } })

  const art = data?.art

  const otherArtWork = art?.artist?.arts.filter((otherArt) => otherArt.id !== art.id)

  return (
    <Page>
      <Section contentClassName="flex gap-20">
        <div className="flex-1">
          <img src={art?.images[0].url} alt="art" className="h-160 object-cover object-center" />
          <div className="flex justify-center mt-6 gap-4">
            {art?.images?.length > 1 &&
              art?.images.slice(1).map((image, index) => <img key={index} src={image?.url} className="w-16 h-16" />)}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">{art?.title}</h1>
            <h2 className="text-lg font-bold text-pink">By {art?.artist?.fullName}</h2>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm">Dimensions: {art?.dimensions}</h4>
              <h4 className="text-sm">Materials:</h4>
              <h4 className="text-sm">Style: {art?.dimensions}</h4>
              <h4 className="text-sm">Subject:</h4>
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
        <div className="mt-12 grid grid-cols-3 gap-8 h-112">
          {otherArtWork?.map((art, index) => (
            <Link key={index} href={`/gallery/${art?.artist?.id}/${art?.id}`}>
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

export default Art

const artQuery = gql`
  query Query($artId: ID!) {
    art(id: $artId) {
      id
      title
      description
      price
      dimensions
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
