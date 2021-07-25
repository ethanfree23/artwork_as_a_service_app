import cns from "classnames"
import Image from "next/image"

const CustomImage = ({ src, alt, className, bg }) => {
  return (
    <div className={cns("relative", className)}>
      {src && <Image src={src} alt={alt} layout="fill" objectFit="cover" className="object-center" />}
    </div>
  )
}

export default CustomImage
