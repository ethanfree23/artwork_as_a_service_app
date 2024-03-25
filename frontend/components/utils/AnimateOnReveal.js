import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { motion, useAnimation } from "framer-motion"

export const useAnimateOnInView = ({ threshold = 0.2 }) => {
  const controls = useAnimation()
  const { ref, inView } = useInView({ threshold, triggerOnce: true })

  useEffect(() => {
    if (inView) {
      controls.start("show")
    }
    if (!inView) {
      controls.start("hidden")
    }
  }, [controls, inView])

  return { ref, controls }
}

export const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
}

const AnimateOnReveal = ({ className, children, ...rest }) => {
  const { ref, controls } = useAnimateOnInView({})

  return (
    <motion.div ref={ref} variants={container} initial="hidden" animate={controls} className={className} {...rest}>
      {children}
    </motion.div>
  )
}

export default AnimateOnReveal
