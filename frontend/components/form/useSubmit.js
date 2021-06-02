export function useSubmit() {
  const onSubmit = ({ values, submitFn, formikBag: { setStatus, setSubmitting, resetForm } }) => {
    setStatus({})
    setSubmitting(true)

    const onSuccess = () => {
      setSubmitting(false)
      resetForm()
    }

    const onError = (err) => {
      console.log("ERROR", err)
      //   const error = get(err, "response.data", "")
      //   const deepError = get(err, "response.data.message[0].messages[0].message", "")
      //   // TODO: Could also map backend validation to fields here and setErrors here
      //   if (!isEmpty(deepError)) {
      //     setStatus({ message: deepError })
      //   } else if (!isEmpty(error)) {
      //     setStatus({ message: `${error?.message} - ${error?.statusCode}` })
      //   }
      setSubmitting(false)
    }

    submitFn({ variables: values })
      .then((res) => onSuccess(res))
      .catch((err) => onError(err))
  }

  return onSubmit
}
