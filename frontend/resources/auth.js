import { gql, useMutation, useQuery } from "@apollo/client"

const LoginMutation = gql`
  mutation UserMutation($loginInput: UsersPermissionsLoginInput!) {
    login(input: $loginInput) {
      jwt
    }
  }
`

export const useLogin = ({ variables, onComplete }) => {
  return useMutation(LoginMutation, {
    variables: {
      loginInput: {
        ...variables,
      },
    },
    onCompleted: ({ login }) => {
      localStorage.setItem("authToken", login.jwt)
      onComplete()
    },
  })
}

const meQuery = gql`
  {
    me {
      email
      username
      id
    }
  }
`

export const useAuth = () => {
  const { data } = useQuery(meQuery)

  return {
    isLoggedIn: data?.me?.email,
    me: data?.me,
  }
}
