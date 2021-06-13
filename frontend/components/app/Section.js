import React from "react"
import cns from "classnames"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

const Section = ({
  contentClassName,
  contentProps,
  className,
  backgroundImage,
  animateOnReveal = false,
  children,
  ...props
}) => {
  const [passRef, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const Element = animateOnReveal ? motion.section : "section"

  const animatedProps = animateOnReveal
    ? { ref: passRef, variants: container, initial: "hidden", animate: inView ? "show" : "hidden" }
    : {}

  return (
    <Element
      className={cns("relative", className)}
      style={{
        backgroundImage: backgroundImage && `url(${backgroundImage})`,
        backgroundPosition: backgroundImage && "bg-cover bg-center",
      }}
      {...animatedProps}
      {...props}
    >
      <div className={cns("max-w-screen-xl box-content mx-auto px-8 py-20", contentClassName)} {...contentProps}>
        {children}
      </div>
    </Element>
  )
}

export default Section
