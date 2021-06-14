import { gql, useQuery } from "@apollo/client"
import { Page, Section } from "components/app"

const Art = () => {
  const { data: artistsData } = useQuery(artistsQuery)
  const { data: artData } = useQuery(artQuery)

  return (
    <Page>
      <Section>
        <h1>Artists</h1>
        <ul>
          {artistsData?.artists?.map((artist, index) => (
            <li key={index}>
              {/* {artist?.fullName}
              {artist.avatar.url} */}
              <img src={artist.avatar.url} />
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <h1>Art</h1>
        <ul>
          {artData?.arts?.map((art, index) => (
            <li key={index}>
              {art?.title} - Quantity: {art?.quantity} - By: {art?.artist?.fullName}
            </li>
          ))}
        </ul>
      </Section>
    </Page>
  )
}

export default Art

const artistsQuery = gql`
  {
    artists {
      fullName
      avatar {
        url
      }
    }
  }
`

const artQuery = gql`
  {
    arts {
      title
      quantity
      description
      artist {
        fullName
      }
    }
  }
`
