import { useQuery } from "@apollo/client"
import { gql, useMutation } from "utils/apolloClient"
import { getUser } from "./auth"

const roundIfNeeded = (num) => {
  return Math.round(num * 1e2) / 1e2
}

export const getRentalPrice = (art) => {
  const rentalPrice = art?.pricing?.find((price) => price.type === "rent")
  return rentalPrice?.price
}

export const getPurchasePrice = (art) => {
  const rentalPrice = art?.pricing?.find((price) => price.type === "buy")
  return rentalPrice?.price
}

export const formatPrice = (price) => {
  return `${roundIfNeeded(price / 100)}`
}

export const getPrices = (art) => {
  let prices = []

  const rentalPrice = art?.pricing?.find((price) => price.type === "rent")
  const purchasePrice = art?.pricing?.find((price) => price.type === "buy")

  if (purchasePrice && !purchasePrice.forbid) {
    prices.push(`Buy: $${roundIfNeeded(purchasePrice.price / 100)}`)
  }

  if (rentalPrice && !rentalPrice.forbid) {
    prices.push(`Rent: $${roundIfNeeded(rentalPrice.price / 100)} / mo`)
  }

  return prices
}

const artsQuery = gql`
  query Arts($where: JSON) {
    arts(where: $where) {
      id
      title
      artist {
        users_permissions_user {
          id
        }
      }
      orders {
        status
      }
    }
  }
`

export const getArtistsArt = (id) => {
  const user = getUser()
  const artistId = id ? id : user?.id
  const variables = {
    where: {
      artist: {
        users_permissions_user: {
          id: artistId,
        },
      },
    },
  }

  return useQuery(artsQuery, { variables, fetchPolicy: "network-only" })
}

const CreateArtMutation = gql`
  mutation CreateArtMutation($createArtInput: createArtInput) {
    createArt(input: $createArtInput) {
      art {
        title
        description
        quantity
        pricing {
          type
          price
          forbid
        }
        dimensions
        materials
        subject
        style
        artist {
          id
        }
        images {
          id
          url
          created_at
          updated_at
          name
          hash
          mime
          size
          provider
        }
      }
    }
  }
`

export const useCreateArt = () => {
  const [mutate] = useMutation(CreateArtMutation)

  const createArt = async ({ variables }) => {
    return await mutate({
      variables: {
        createArtInput: {
          data: {
            ...variables,
          },
        },
      },
    })
  }

  return [createArt]
}

const UpdateArtMutation = gql`
  mutation UpdateArtMutation($updateArtInput: updateArtInput) {
    updateArt(input: $updateArtInput) {
      art {
        title
        description
        quantity
        pricing {
          type
          price
          forbid
        }
        dimensions
        materials
        subject
        style
        artist {
          id
        }
        images {
          id
          url
          created_at
          updated_at
          name
          hash
          mime
          size
          provider
        }
      }
    }
  }
`

export const useUpdateArt = (id) => {
  const [mutate] = useMutation(UpdateArtMutation)

  const updateArt = async ({ variables }) => {
    return await mutate({
      variables: {
        updateArtInput: {
          data: {
            ...variables,
          },
          where: {
            id: id,
          },
        },
      },
    })
  }

  return [updateArt]
}
