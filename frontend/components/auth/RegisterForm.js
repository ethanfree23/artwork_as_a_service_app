import { Form, Formik, Field as FormikField } from "formik"
import * as Yup from "yup"
import { omit } from "lodash"
import { v4 as uuidv4 } from "uuid"

import { useRegister } from "resources/auth"
import { Button } from "components/ui"
import { Field, useSubmit } from "components/form"
import { useRouter } from "next/router"

const RegisterForm = () => {
  const [register] = useRegister()

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  const validate = Yup.object().shape({
    fullName: Yup.string().required("Name required"),
    email: Yup.string().required("Email required"),
    password: Yup.string().required("Password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Please confirm your password"),
  })

  const submit = useSubmit()
  const router = useRouter()

  const onSubmit = (values, formikBag) => {
    let valuesSubmit = {
      ...values,
      username: uuidv4(),
      role: values.isArtist ? 3 : 4,
    }

    const onSuccess = () => {
      router.push("/gallery")
    }

    valuesSubmit = omit(valuesSubmit, ["confirmPassword", "isArtist"])
    submit({ submitFn: register, values: valuesSubmit, formikBag, onSuccess })
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validate} onSubmit={onSubmit}>
      {({ status }) => {
        return (
          <Form className="flex flex-col space-y-8 self-stretch">
            <div className="space-y-5 flex flex-col">
              <Field name="fullName" placeholder="Full Name" label="Full Name" />
              <Field name="email" type="email" placeholder="email@domain.com" label="Email" autoComplete="on" />
              <Field name="password" type="password" placeholder="password" label="Password" />
              <Field name="confirmPassword" type="password" placeholder="confirm password" label="Confirm Password" />
              <label className="space-x-3 font-semibold text-sm flex items-center cursor-pointer select-none">
                <FormikField type="checkbox" name="isArtist" />
                <span>I want to sell art</span>
              </label>
            </div>
            {/* TODO: Add form status, submit button */}
            <div className="flex justify-center">
              <Button type="submit" className="px-12 w-full">
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
