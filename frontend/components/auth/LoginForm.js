import { Form, Formik } from "formik"
import * as Yup from "yup"
import { omit } from "lodash"
// import { v4 as uuidv4 } from 'uuid'

import { useSubmit } from "components/form/useSubmit"
import { useLogin, useRegister } from "resources/auth"
import { Button } from "components/ui"
import { Field } from "components/form"

const LoginForm = () => {
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

  const onSubmit = (values, formikBag) => {
    submit({ submitFn: login, values, formikBag })
  }

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
              <Button type="submit" className="px-12">
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
