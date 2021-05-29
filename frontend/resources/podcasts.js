import { gql, useMutation, useQuery } from "@apollo/client"

const FeedQuery = gql`
  {
    podcasts {
      title
    }
  }
`

export const usePodcasts = () => {}
