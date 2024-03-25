import React from "react"
import { motion } from "framer-motion"

// const MotionComponent = motion(as) - Not working
const ELEMENTS = {
  div: motion.div,
  button: motion.button,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  p: motion.p,
}

const defaultVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
}

const AnimatedItem = ({ variants = defaultVariants, as = "div", children, ...rest }) => {
  const MotionComponent = ELEMENTS[as]

  return (
    <MotionComponent variants={variants} transition={{ duration: 0.5, ease: "easeOut" }} {...rest}>
      {children}
    </MotionComponent>
  )
}

export default AnimatedItem
