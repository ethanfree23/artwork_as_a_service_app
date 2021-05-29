import { gql, useQuery } from "@apollo/client"
import { useAuth } from "resources/auth"

const podcastsQuery = gql`
  {
    podcasts {
      title
    }
  }
`

const Podcasts = () => {
  const { data, loading, ...rest } = useQuery(podcastsQuery)
  const { data: meData } = useAuth()

  return (
    <div>
      <h6>Checkout as {meData?.me?.email}</h6>
      {/* <ul>
        {data?.Podcast.map((v) => {
          return <li key={v.title}>{v.title}</li>;
        })}
      </ul> */}
    </div>
  )
}

export default Podcasts
