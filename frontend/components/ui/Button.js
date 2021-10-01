import Link from "next/link"
import cns from "classnames"

const THEMES = {
  pink: {
    button: "bg-pink text-white hover:bg-pink-600",
    link: "text-pink hover:text-pink-600",
  },
  grey: {
    button: "",
    link: "text-black text-opacity-60 hover:text-opacity-80",
  },
}

const Wrapper = ({ href, children }) => (href ? <Link href={href}>{children}</Link> : <>{children}</>)

const Button = ({ theme = "pink", isLink = false, href = null, children, className, ...props }) => {
  const classNames = isLink ? THEMES?.[theme]?.link : THEMES?.[theme]?.button

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
          "px-5 py-2 rounded-lg text-sm font-normal outline-none focus:outline-none",
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
