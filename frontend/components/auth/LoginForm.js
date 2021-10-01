import { Form, Formik } from "formik"
import * as Yup from "yup"

import { useLogin } from "resources/auth"
import { Button } from "components/ui"
import { Field, useSubmit } from "components/form"
import { useRouter } from "next/router"
import { useState } from "react"

const LoginForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // const onCompleteHere = () => setIsLoggedIn(true)
  const [login] = useLogin()

  const initialValues = {
    identifier: "",
    password: "",
  }

  const validate = Yup.object().shape({
    identifier: Yup.string().required("Email required"),
    password: Yup.string().required("Password required"),
  })

  const submit = useSubmit()
  const router = useRouter()

  const onSubmit = (values, formikBag) => {
    const onSuccess = () => {
      router.push("/gallery")
    }

    submit({ submitFn: login, values, formikBag, onSuccess })
  }

  // console.log("isLoggedInnnn", isLoggedIn)
  return (
    <Formik initialValues={initialValues} validationSchema={validate} onSubmit={onSubmit}>
      {({ status }) => {
        return (
          <Form className="flex flex-col space-y-8 self-stretch">
            <div className="space-y-4 flex flex-col">
              <Field name="identifier" type="email" placeholder="email@domain.com" label="Email" autoComplete="on" />
              <Field name="password" type="password" placeholder="password" label="Password" />
            </div>
            {/* TODO: Add form status, submit button */}
            <div className="flex justify-center">
              <Button type="submit" className="px-12 w-full">
                Login
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default LoginForm
