import { useRouter } from "next/router"
import { gql, useMutation, useQuery } from "@apollo/client"

const AUTH_TOKEN = "authToken"

const meQuery = gql`
  query me {
    me {
      email
      username
      id
    }
  }
`

export const useAuth = () => {
  let hasToken = false

  if (process.browser) {
    hasToken = localStorage.getItem(AUTH_TOKEN)
  }

  const router = useRouter()
  const { data, refetch } = useQuery(meQuery)

  const logOut = () => {
    localStorage.removeItem(AUTH_TOKEN)
    router.push(router.pathname)
  }

  return {
    isLoggedIn: hasToken && data?.me?.email,
    me: data?.me,
    logOut,
    refetch,
  }
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
  // const router = useRouter()
  const { refetch } = useQuery(meQuery)

  const [mutate] = useMutation(RegisterMutation, {
    onCompleted: ({ register }) => {
      localStorage.setItem(AUTH_TOKEN, register.jwt)
      // router.push(router.pathname)
      refetch()
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
    }
  }
`

export const useLogin = () => {
  // const router = useRouter()
  const { refetch } = useQuery(meQuery)

  const [mutate] = useMutation(LoginMutation, {
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.jwt)
      // router.push(router.pathname)
      refetch()
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
