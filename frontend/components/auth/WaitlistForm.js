import { Form, Formik } from "formik"
import * as Yup from "yup"
// import { omit } from "lodash"
// import { v4 as uuidv4 } from 'uuid'

import { useWaitlistRegister } from "resources/waitlist"
import { Button } from "components/ui"
import { Field, useSubmit } from "components/form"

const WaitlistForm = () => {
  const [wiatlistRegister] = useWaitlistRegister()

  const initialValues = {
    name: "",
    email: "",
  }

  const validate = Yup.object().shape({
    name: Yup.string().required("Name required"),
    email: Yup.string().required("Email required"),
  })

  const submit = useSubmit()

  const onSubmit = (values, formikBag) => {
    //TODO: Do something onsuccess
    submit({ submitFn: wiatlistRegister, values, formikBag })
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validate} onSubmit={onSubmit}>
      {({ status }) => {
        return (
          <Form className="flex flex-col space-y-8 self-stretch">
            <div className="space-y-4 flex flex-col">
              <Field name="name" placeholder="Full Name" label="Full Name" />
              <Field name="email" type="email" placeholder="email@domain.com" label="Email" autoComplete="on" />
            </div>
            {/* TODO: Add form status, submit button */}
            <div className="flex justify-center">
              <Button type="submit" className="px-12">
                Join Waitlist
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default WaitlistForm
