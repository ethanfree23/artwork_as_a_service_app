import { useQuery, useMutation } from "react-query"
import { protectedRequest } from "utils/api"

const getAccount = async () => {
  const { data } = await protectedRequest("GET", "payments/account")
  return data
}

const createOnboardingLink = async () => {
  const { data } = await protectedRequest("POST", "payments/onboarding-link")
  return data
}

const createAttachPaymentMethod = async ({ values }) => {
  const { data } = await protectedRequest("POST", "payments/create-attach-payment-method", { ...values })
  return data
}

export const useGetAccount = () => {
  return useQuery(["payments", "account"], getAccount)
}

export const useCreateOnboardingLink = () => {
  return useMutation(() => createOnboardingLink(), {
    onSuccess: (data, { onSuccess }) => {
      onSuccess(data)
    },
    throwOnError: true,
  })
}

export const useCreateAttachPaymentMethod = () => {
  return useMutation(({ values }) => createAttachPaymentMethod({ values }), {
    onSuccess: (data, { onSuccess }) => {
      console.log("now do the thing")
      onSuccess(data)
    },
    throwOnError: true,
  })
}
