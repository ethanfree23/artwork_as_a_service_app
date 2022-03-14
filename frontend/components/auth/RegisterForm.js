import { useRouter } from "next/router"
import { Form, Formik, Field as FormikField, ErrorMessage } from "formik"
import * as Yup from "yup"
import { omit } from "lodash"
import { v4 as uuidv4 } from "uuid"

import { useRegister } from "resources/auth"
import { Button } from "components/ui"
import { Field, SubmitButton, useSubmit } from "components/form"

const RegisterForm = () => {
  const router = useRouter()

  const [register] = useRegister()
  const submit = useSubmit()

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    isArtist: true,
    agreedToTerms: false,
  }

  const validate = Yup.object().shape({
    fullName: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Please confirm your password"),
    agreedToTerms: Yup.bool().oneOf([true], "Must accept"),
  })

  const onSubmit = (values, formikBag) => {
    let valuesSubmit = {
      ...values,
      username: uuidv4(),
      role: values.isArtist ? 3 : 4,
    }

    const onSuccess = () => {
      values.isArtist ? router.push("/artist/profile") : router.push("/gallery")
    }

    valuesSubmit = omit(valuesSubmit, ["confirmPassword", "isArtist"])
    submit({ submitFn: register, values: valuesSubmit, formikBag, onSuccess })
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validate} onSubmit={onSubmit}>
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
          <div className="flex items-center justify-between space-x-1">
            <label className="space-x-3 font-semibold text-sm flex items-center cursor-pointer select-none">
              <FormikField type="checkbox" name="agreedToTerms" />
              <span>
                I accept the{" "}
                <a
                  href="https://ik.imagekit.io/FreemanArtCompany/freeman-art/Website_Terms_of_Use_e49e7515ce_NWDDKrB0Yu.pdf"
                  className="underline text-blue"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of use
                </a>
              </span>
            </label>
            <ErrorMessage name="agreedToTerms" component="span" className="text-red-500 text-xs font-normal" />
          </div>
        </div>
        {/* TODO: Add form status, submit button */}
        <div className="flex justify-center">
          <SubmitButton label="Sign up" labelSubmitting="Signing up" />
          {/* <Button type="submit" className="px-12 w-full">
            Sign Up
          </Button> */}
        </div>
      </Form>
    </Formik>
  )
}

export default RegisterForm
