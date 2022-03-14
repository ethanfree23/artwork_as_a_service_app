import React from "react"
import { useFormikContext } from "formik"
import cns from "classnames"

import { Button } from "../ui"

const SavingDots = (props) => {
  return (
    <span className="saving-dots" {...props}>
      <span className="animate-dots1">.</span>
      <span className="animate-dots2">.</span>
      <span className="animate-dots3">.</span>
    </span>
  )
}

const SubmitButton = ({
  label = "Submit",
  labelSubmitting = "Submitting",
  className,
  ignoreDirty = false,
  ...rest
}) => {
  const { isSubmitting, isValid, dirty } = useFormikContext()

  return (
    <Button
      className={cns(
        className,
        (!isValid || (!ignoreDirty && !dirty)) && "bg-gray-lighter border-gray-lighter text-gray hover:bg-gray-dark"
      )}
      disabled={isSubmitting}
      type="submit"
      {...rest}
    >
      {isSubmitting ? (
        <>
          {labelSubmitting} <SavingDots />
        </>
      ) : (
        label
      )}
    </Button>
  )
}

export default SubmitButton
