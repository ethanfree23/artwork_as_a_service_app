import { gql, useQuery } from "utils/apolloClient"
import { Page, Section } from "components/app"

const Art = ({ artists, arts }) => {
  return (
    <Page>
      <Section>
        <h1>Artists</h1>
        <ul>
          {artists?.map((artist, index) => (
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
          {arts?.map((art, index) => (
            <li key={index}>
              {art?.title} - Quantity: {art?.quantity} - By: {art?.artist?.fullName}
            </li>
          ))}
        </ul>
      </Section>
    </Page>
  )
}

export async function getStaticProps() {
  const query = gql`
    query Query {
      artists {
        fullName
        avatar {
          url
        }
      }
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

  const { data } = await useQuery(query)

  return {
    props: data,
    revalidate: 5,
  }
}

export default Art

// const artistsQuery = gql`
//   {
//     artists {
//       fullName
//       avatar {
//         url
//       }
//     }
//   }
// `

// const artQuery = gql`
//   {
//     arts {
//       title
//       quantity
//       description
//       artist {
//         fullName
//       }
//     }
//   }
// `
