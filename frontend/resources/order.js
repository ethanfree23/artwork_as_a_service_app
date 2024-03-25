import { useMutation, useQuery } from "@apollo/client"
import { gql } from "utils/apolloClient"
import { getUser, isUserArtist } from "./auth"

import { useQuery as useReactQuery, useMutation as useReactMutation, useQueryClient } from "react-query"
import { protectedRequest } from "utils/api"

const orderQuery = gql`
  query Order($orderId: ID!) {
    order(id: $orderId) {
      id
      status
      awaitingBuyer
      awaitingArtist
      price
      months
      startDate
      endDate
      created_at
      buyer {
        id
        email
        fullName
      }
      artist {
        id
        email
        fullName
      }
      art {
        title
        images {
          url
        }
      }
      address {
        address1
        address2
        city
        state
        zip
      }
      comments {
        buyer
        artist
      }
    }
  }
`

// const ordersQuery = gql`
//   query Orders($where: JSON, $sort: String) {
//     orders(where: $where, sort: $sort) {
//       id
//       status
//       awaitingBuyer
//       awaitingArtist
//       price
//       months
//       startDate
//       endDate
//       created_at
//       buyer {
//         id
//         email
//         fullName
//       }
//       artist {
//         id
//         email
//         fullName
//       }
//       art {
//         title
//         images {
//           url
//         }
//       }
//       address {
//         address1
//         address2
//         city
//         state
//         zip
//       }
//       comments {
//         buyer
//         artist
//       }
//     }
//   }
// `

export const getOrdersQuery = async (id) => {
  const { data } = id ? await protectedRequest("GET", `orders/${id}`) : await protectedRequest("GET", "orders/")
  return Array.isArray(data) ? data.reverse() : data
}

export const getOrder = (id) => {
  return useQuery(orderQuery, { variables: { orderId: id }, fetchPolicy: "network-only" })
}

export const getOrders = (id) => {
  return useReactQuery(id ? ["orders", id] : "orders", () => getOrdersQuery(id))
}

// return useQuery(id ? ['projects', id] : 'projects', () => getProjects(id))
// const isArtist = isUserArtist()
// const user = getUser()
// const variables = isArtist
//   ? { where: { artist: { id: user?.id } }, sort: "id:desc" }
//   : { where: { buyer: { id: user?.id } }, sort: "id:desc" }

// return useQuery(ordersQuery, { ...options, variables, fetchPolicy: "network-only" })

export const CreateOrder = gql`
  mutation Mutation($input: createOrderInput) {
    createOrder(input: $input) {
      order {
        status
        # address1
        # address2
      }
    }
  }
`

export const useCreateOrder = () => {
  const [mutate] = useMutation(CreateOrder)

  const createOrder = async ({ variables, ...options }) => {
    return await mutate({
      variables: {
        input: {
          data: {
            ...variables,
          },
        },
        ...options,
      },
    })
  }

  return [createOrder]
}

const updateOrderMutation = gql`
  mutation UpdateOrder($input: updateOrderInput) {
    updateOrder(input: $input) {
      order {
        id
      }
    }
  }
`

export const useUpdateOrder = () => {
  const [mutate, ...rest] = useMutation(updateOrderMutation)
  const updateOrder = async ({ variables, onCompleted }, ...rest) => {
    return await mutate({
      variables: {
        input: {
          ...variables,
        },
      },
      onCompleted: onCompleted && onCompleted(),
      refetchQueries: ["Order"],
    })
  }

  return [updateOrder, ...rest]
}

const updateOrderStatus = async (id) => {
  const { data } = await protectedRequest("PUT", `orders/${id}/next-step`)
  return data
}

const cancelOrder = async (id) => {
  const { data } = await protectedRequest("PUT", `orders/${id}/cancel`)
  return data
}

const rejectOrder = async (id) => {
  const { data } = await protectedRequest("PUT", `orders/${id}/reject`)
  return data
}

// export const useUpdateOrderStatus = () => {
export const useUpdateOrderStatus = (id) => {
  const queryClient = useQueryClient()

  const ACTIONS = {
    update: updateOrderStatus,
    reject: rejectOrder,
    cancel: cancelOrder,
  }
  // return useReactMutation(({ id }) => updateOrderStatus(id), {
  // return useReactMutation(() => updateOrderStatus(id), {
  return useReactMutation((action = "update") => ACTIONS[action](id), {
    onSuccess: (data, { ...rest }) => {
      queryClient.invalidateQueries("orders")
      rest.onSuccess && rest.onSuccess(data)
    },
    onError: (error, { onError }) => {
      onError(error)
    },
    throwOnError: true,
  })
}
