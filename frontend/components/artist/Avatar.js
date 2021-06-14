import cns from "classnames"

const Avatar = ({ image, className }) => {
  return (
    <img
      src={image?.url}
      alt="avatar"
      className={cns("w-14 h-14 object-cover object-center rounded-full", className)}
    ></img>
  )
}

export default Avatar
