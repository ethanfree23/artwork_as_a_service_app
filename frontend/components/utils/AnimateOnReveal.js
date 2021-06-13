import React from "react"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

const AnimateOnReveal = ({ className, children, as = "div", ...rest }) => {
  const [passRef, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  }

  const Element = motion(as)

  return (
    <Element
      ref={passRef}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
      {...rest}
    >
      {children}
    </Element>
  )
}

export default AnimateOnReveal
