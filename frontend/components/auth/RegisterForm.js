import { Form, Formik } from "formik"
import * as Yup from "yup"
import { omit } from "lodash"
// import { v4 as uuidv4 } from 'uuid'

import { useSubmit } from "components/form/useSubmit"
import { useRegister } from "resources/auth"
import { Button } from "components/ui"
import { Field } from "components/form"

const RegisterForm = () => {
  const [register] = useRegister()

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  const validate = Yup.object().shape({
    username: Yup.string().required("Name required"),
    email: Yup.string().required("Email required"),
    password: Yup.string().required("Password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Please confirm your password"),
  })

  const submit = useSubmit()

  const onSubmit = (values, formikBag) => {
    let valuesSubmit = {
      ...values,
      // username: uuidv4(),
    }

    valuesSubmit = omit(valuesSubmit, "confirmPassword")
    submit({ submitFn: register, values: valuesSubmit, formikBag })
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validate} onSubmit={onSubmit}>
      {({ status }) => {
        return (
          <Form className="flex flex-col space-y-8 self-stretch">
            <div className="space-y-4 flex flex-col">
              <Field name="username" placeholder="Full Name" label="Full Name" />
              <Field name="email" type="email" placeholder="email@domain.com" label="Email" autoComplete="on" />
              <Field name="password" type="password" placeholder="password" label="Password" />
              <Field name="confirmPassword" type="password" placeholder="confirm password" label="Confirm Password" />
            </div>
            {/* TODO: Add form status, submit button */}
            <div className="flex justify-center">
              <Button type="submit" className="px-12">
                Sign Up
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RegisterForm
