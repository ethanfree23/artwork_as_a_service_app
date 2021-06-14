import { gql, useQuery } from "@apollo/client"

import { Page, Section } from "components/app"
import { FeaturedGallery } from "components/artist"
import { ArtistsTitle } from "assets/titles"

const Gallery = () => {
  const { data: artistsData } = useQuery(artistsQuery)
  return (
    <Page>
      <Section contentClassName="pt-12">
        <div className="flex flex-col items-center mb-16">
          <h3 className="text-xl font-bold uppercase mb-2">Meet the</h3>
          <ArtistsTitle className="text-pink" />
        </div>
        {artistsData?.artists?.map((artist, index) => (
          <FeaturedGallery key={index} artist={artist} />
        ))}
      </Section>
    </Page>
  )
}

export default Gallery

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
