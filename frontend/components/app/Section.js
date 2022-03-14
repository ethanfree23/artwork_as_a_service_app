import React from "react"
import cns from "classnames"
import { motion } from "framer-motion"
import { useAnimateOnInView, container } from "components/utils/AnimateOnReveal"

const SectionElement = ({ animateOnReveal, threshold, children, ...rest }) => {
  const { ref, controls } = useAnimateOnInView({ threshold })

  return animateOnReveal ? (
    <motion.section ref={ref} variants={container} initial="hidden" animate={controls} {...rest}>
      {children}
    </motion.section>
  ) : (
    <section {...rest}>{children}</section>
  )
}

const Section = ({
  contentSize = "content",
  contentClassName,
  contentProps,
  className,
  backgroundImage,
  backgroundPosition = "bg-center",
  animateOnReveal = false,
  children,
  ...props
}) => {
  return (
    <SectionElement
      animateOnReveal={animateOnReveal}
      className={cns("relative", className, backgroundImage && "bg-cover", backgroundImage && backgroundPosition)}
      style={{
        backgroundImage: backgroundImage && `url(${backgroundImage})`,
      }}
      {...props}
    >
      <div className={cns("py-16 md:py-20", contentSize, contentClassName)} {...contentProps}>
        {children}
      </div>
    </SectionElement>
  )
}

export default Section
