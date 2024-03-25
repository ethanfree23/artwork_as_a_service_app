import Link from "next/link"
import cns from "classnames"

const THEMES = {
  pink: {
    button: "bg-pink text-white hover:bg-pink-600",
    buttonOutline: "border border-pink text-pink hover:bg-pink-600 hover:text-white",
    link: "text-pink hover:text-pink-600",
  },
  grey: {
    button: "",
    link: "text-black text-opacity-60 hover:text-opacity-80",
  },
}

const Wrapper = ({ href, children }) => (href ? <Link href={href}>{children}</Link> : <>{children}</>)

const Button = ({
  theme = "pink",
  isLink = false,
  isOutline = false,
  size = "md",
  href = null,
  children,
  className,
  ...props
}) => {
  const classNames = isLink
    ? THEMES?.[theme]?.link
    : isOutline
    ? THEMES?.[theme]?.buttonOutline
    : THEMES?.[theme]?.button

  let LinkElement = href ? "a" : "button"

  return isLink ? (
    // eslint-disable-next-line react/no-children-prop
    <Wrapper href={href}>
      <LinkElement
        className={cns("", classNames, className, "cursor-pointer outline-none focus:outline-none")}
        {...props}
      >
        {children}
      </LinkElement>
    </Wrapper>
  ) : (
    <Wrapper href={href}>
      <button
        className={cns(
          "px-5 py-2.5 rounded-lg outline-none focus:outline-none disabled:opacity-50",
          size === "md" && "text-sm font-semibold",
          size === "lg" && "text-base font-semibold",
          classNames,
          className
        )}
        {...props}
      >
        {children}
      </button>
    </Wrapper>
  )
}

export default Button
