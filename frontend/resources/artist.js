import { gql, useMutation, useQuery } from "utils/apolloClient"

export const meArtistQuery = gql`
  query Artist($userId: ID!) {
    user(id: $userId) {
      artist {
        id
        fullName
        bio
        location
        avatar {
          url
        }
        users_permissions_user {
          id
        }
      }
    }
  }
`

// export const meArtistQuery = gql`
//   query MeArtist($artistId: ID!) {
//     artist(id: $artistId) {
//       fullName
//       bio
//       location
//       id
//     }
//   }
// `

// export const getMeArtist = async () => {
//   const { data } = await useQuery(meArtistQuery)
//   return data
// }

const CreateArtistMutation = gql`
  mutation CreateArtistMutation($createArtistInput: createArtistInput) {
    createArtist(input: $createArtistInput) {
      artist {
        bio
        location
        fullName
      }
    }
  }
`

export const useCreateArtist = () => {
  const [mutate] = useMutation(CreateArtistMutation)

  const createArtist = async ({ variables }) => {
    console.log("variables", variables)
    return await mutate({
      variables: {
        createArtistInput: {
          data: {
            ...variables,
          },
        },
      },
    })
  }

  return [createArtist]
}

const UpdateArtistMutation = gql`
  mutation UpdateArtistMutation($updateArtistInput: updateArtistInput) {
    updateArtist(input: $updateArtistInput) {
      artist {
        bio
        location
        fullName
      }
    }
  }
`

export const useUpdateArtist = () => {
  const [mutate] = useMutation(UpdateArtistMutation)

  const updateArtist = async ({ variables }) => {
    return await mutate({
      variables: {
        updateArtistInput: {
          data: {
            ...variables.data,
          },
          where: {
            ...variables.where,
          },
        },
      },
    })
  }

  return [updateArtist]
}
