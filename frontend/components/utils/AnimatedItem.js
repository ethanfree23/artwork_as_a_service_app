import { motion } from "framer-motion"

const AnimatedItem = ({ children, as = "div", ...rest }) => {
  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const Element = motion(as)

  return (
    <Element variants={item} {...rest}>
      {children}
    </Element>
  )
}

export default AnimatedItem
