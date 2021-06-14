import { PlayIcon } from "assets/icons"
import cns from "classnames"

const Video = ({ video, className }) => {
  return (
    <div
      style={{ backgroundImage: `url(${video?.thumbnail?.url})` }}
      className={cns("bg-cover bg-center flex justify-center items-center cursor-pointer", className)}
    >
      <PlayIcon />
    </div>
  )
}

export default Video
