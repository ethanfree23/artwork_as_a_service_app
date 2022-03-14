import { Form, Formik } from "formik"
import * as Yup from "yup"

import { useLogin } from "resources/auth"
import { Button } from "components/ui"
import { Field } from "components/form"
import { useRouter } from "next/router"

const LoginForm = () => {
  const [login] = useLogin()
  // const submit = useSubmit()
  const router = useRouter()

  const initialValues = {
    identifier: "",
    password: "",
  }

  const validate = Yup.object().shape({
    identifier: Yup.string().required("Email required"),
    password: Yup.string().required("Password required"),
  })

  const onSubmit = (values, formikBag) => {
    // submit({ submitFn: login, values, formikBag, onSuccess })
    // TODO: Check role and direct to route depending
    login({ variables: values }).then((res) => {
      console.log("res", res)
      console.log("res?.data?.login?.user?.role?.id", res?.data?.login?.user?.role?.id)
      console.log("res?.data?.login?.user?.role?.id", res?.data?.login?.user?.role?.id === "3")

      if (res?.data?.login?.user?.role?.id === "3") {
        router.push("/artist/dashboard")
      } else {
        router.push("/gallery")
      }
    })
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validate} onSubmit={onSubmit}>
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
    </Formik>
  )
}

export default LoginForm
