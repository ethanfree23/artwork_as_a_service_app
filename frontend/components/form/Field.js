import { Field as FormikField, useField } from "formik"

const Field = ({ name, ...props }) => {
  const [field, meta] = useField(name)

  return (
    <FormikField
      name={name}
      className="w-full border border-grey rounded-lg px-3 py-2 outline-none text-base"
      {...props}
      {...field}
    />
  )
}

export default Field
