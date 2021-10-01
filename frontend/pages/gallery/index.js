import { gql, useQuery } from "utils/apolloClient"

import { Page, Section } from "components/app"
import { FeaturedGallery } from "components/artist"
import { ArtistsTitle } from "assets/titles"

const Gallery = ({ artists }) => {
  return (
    <Page>
      <Section contentClassName="pt-12">
        <div className="flex flex-col items-center mb-16">
          <h3 className="text-xl font-bold uppercase mb-2">Meet the</h3>
          <ArtistsTitle className="text-pink" />
        </div>
        <div className="space-y-20">
          {artists?.map((artist, index) => (
            <FeaturedGallery key={index} artist={artist} />
          ))}
        </div>
      </Section>
    </Page>
  )
}

export async function getStaticProps() {
  const query = gql`
    query Query {
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
          id
          title
          images {
            url
          }
        }
      }
    }
  `

  const { data } = await useQuery(query)

  return {
    props: data,
    revalidate: 5,
  }
}

export default Gallery
