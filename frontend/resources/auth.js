/* eslint-disable indent */
import { AuthContext } from "pages/_app"
import { useContext, useReducer } from "react"
import { gql, useMutation, useQuery } from "utils/apolloClient"
import { useCreateArtist } from "./artist"

export const AUTH_TOKEN = "authToken"

export const getRole = () => {
  const { auth } = useContext(AuthContext)
  return auth?.me?.role
}

export const getAuth = () => {
  const { auth } = useContext(AuthContext)
  return auth
}

export const getUser = () => {
  const { auth } = useContext(AuthContext)
  return auth?.me
}

export const isUserArtist = () => {
  const role = getRole()
  return role?.id === "3"
}

const meQuery = gql`
  query me {
    me {
      id
      email
      username
      fullName
      stripeId
      agreedToTerms
      role {
        id
        name
      }
    }
  }
`
export const getMe = async () => {
  const { data } = await useQuery(meQuery)
  return data
}

const initialState = {
  isLoggedIn: false,
  me: {},
}

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoggedIn: true,
        me: action.me,
      }
    case "logout":
      localStorage.removeItem(AUTH_TOKEN)
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      }
    default:
      return state
  }
}

export const useAuthStore = () => {
  return useReducer(reducer, initialState)
}

const RegisterMutation = gql`
  mutation UserMutation($registerInput: UsersPermissionsRegisterInput!) {
    register(input: $registerInput) {
      user {
        id
        email
        username
        fullName
        agreedToTerms
        role {
          id
          name
        }
      }
      jwt
    }
  }
`

export const useRegister = () => {
  const { dispatch } = useContext(AuthContext)

  const [createArtist] = useCreateArtist()

  const [mutate] = useMutation(RegisterMutation, {
    onCompleted: ({ register }) => {
      localStorage.setItem(AUTH_TOKEN, register.jwt)
      dispatch({ type: "login", me: { ...register.user } })
      if (register.user.role.id === "3") {
        createArtist({
          variables: {
            bio: "",
            location: "",
            fullName: register.user.fullName,
            users_permissions_user: register.user.id,
          },
        })
      }
    },
  })

  const register = async ({ variables }) => {
    return await mutate({
      variables: {
        registerInput: {
          ...variables,
        },
      },
    })
  }

  return [register]
}

const LoginMutation = gql`
  mutation UserMutation($loginInput: UsersPermissionsLoginInput!) {
    login(input: $loginInput) {
      jwt
      user {
        id
        email
        username
        fullName
        role {
          id
          name
        }
      }
    }
  }
`

export const useLogin = () => {
  const { dispatch } = useContext(AuthContext)

  const [mutate] = useMutation(LoginMutation, {
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.jwt)
      dispatch({ type: "login", me: { ...login.user } })
    },
  })

  const login = async ({ variables }) => {
    return await mutate({
      variables: {
        loginInput: {
          ...variables,
        },
      },
    })
  }

  return [login]
}
