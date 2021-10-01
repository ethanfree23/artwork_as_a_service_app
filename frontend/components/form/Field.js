import { Field as FormikField, useField } from "formik"

const Field = ({ name, ...props }) => {
  const [field, meta] = useField(name)

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-xs font-semibold">{props.label}</label>
      <FormikField
        name={name}
        className="w-full border border-grey rounded px-3 py-2 outline-none text-sm"
        {...props}
        {...field}
      />
    </div>
  )
}

export default Field
