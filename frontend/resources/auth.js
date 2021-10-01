/* eslint-disable indent */
import { AuthContext } from "pages/_app"
import { useContext, useReducer } from "react"
import { gql, useMutation, useQuery } from "utils/apolloClient"

export const AUTH_TOKEN = "authToken"

const meQuery = gql`
  query me {
    me {
      id
      email
      username
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
        email
        username
      }
      jwt
    }
  }
`

export const useRegister = () => {
  const { dispath } = useContext(AuthContext)
  const [mutate] = useMutation(RegisterMutation, {
    onCompleted: ({ register }) => {
      localStorage.setItem(AUTH_TOKEN, register.jwt)
      dispath({ type: "login", me: { ...register.user } })
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
        email
        id
      }
    }
  }
`

export const useLogin = () => {
  const { dispath } = useContext(AuthContext)

  const [mutate] = useMutation(LoginMutation, {
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.jwt)
      dispath({ type: "login", me: { ...login.user } })
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

// export const useAuth = () => {
//   let hasToken = false

//   if (process.browser) {
//     hasToken = localStorage.getItem(AUTH_TOKEN)
//   }

//   const router = useRouter()
//   const { data, refetch } = useQuery(meQuery)

//   const logOut = () => {
//     localStorage.removeItem(AUTH_TOKEN)
//     router.push(router.pathname)
//   }

//   return {
//     isLoggedIn: hasToken && data?.me?.email,
//     me: data?.me,
//     logOut,
//     refetch,
//   }
// }
