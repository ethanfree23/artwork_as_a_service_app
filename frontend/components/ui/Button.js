import Link from "next/link"
import cns from "classnames"

const THEMES = {
  pink: {
    button: "bg-pink text-white hover:bg-pink-600",
    link: "text-pink hover:text-pink-600",
  },
}

const Button = ({ theme = "pink", isLink = false, href = null, children, className, ...props }) => {
  const classNames = isLink ? THEMES?.[theme]?.link : THEMES?.[theme]?.button
  return href ? (
    <Link href={href} className={cns("", classNames, "outline-none focus:outline-none")}>
      <a>{children}</a>
    </Link>
  ) : (
    <button
      className={cns(
        "px-5 py-2 rounded-full text-sm font-semibold outline-none focus:outline-none",
        classNames,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
