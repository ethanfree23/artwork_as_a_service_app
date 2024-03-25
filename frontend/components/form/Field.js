import cns from "classnames"
import { Field as FormikField, useField, ErrorMessage } from "formik"

const Field = ({ name, ...props }) => {
  const [field, meta] = useField(name)

  return (
    <div className="flex flex-col space-y-2 relative">
      <div className="flex items-center justify-between space-x-4">
        <label className="text-xs font-semibold">{props.label}</label>
        <ErrorMessage name={name} component="span" className={cns("text-red-500 text-xs")} />
      </div>
      <FormikField
        name={name}
        className="w-full border border-grey rounded-sm px-3 py-2 outline-none text-sm"
        {...field}
        {...props}
        // fast={false}
      />
    </div>
  )
}

export default Field
