import { gql, useMutation } from "@apollo/client"

const WaitlistMutation = gql`
  mutation Mutation($createWaitlistInput: createWaitlistInput) {
    createWaitlist(input: $createWaitlistInput) {
      waitlist {
        name
        email
      }
    }
  }
`

export const useWaitlistRegister = () => {
  const [mutate] = useMutation(WaitlistMutation)

  const wiatlistRegister = async ({ variables }) => {
    return await mutate({
      variables: {
        createWaitlistInput: {
          data: {
            ...variables,
          },
        },
      },
    })
  }

  return [wiatlistRegister]
}
