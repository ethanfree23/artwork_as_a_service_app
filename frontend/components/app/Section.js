import React from "react"
import cns from "classnames"

const Section = ({ contentClassName, contentProps, className, backgroundImage, children, ...props }) => {
  return (
    <section
      className={cns("relative", className)}
      style={{
        backgroundImage: backgroundImage && `url(${backgroundImage})`,
        backgroundPosition: backgroundImage && "center",
      }}
      {...props}
    >
      <div className={cns("max-w-screen-xl box-content mx-auto px-8 py-20", contentClassName)} {...contentProps}>
        {children}
      </div>
    </section>
  )
}

export default Section
