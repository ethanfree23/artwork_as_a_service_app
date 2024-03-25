import { Button } from "components/ui"
import { Avatar, Video } from "components/artist"
import Link from "next/link"

const FeaturedGallery = ({ artist }) => {
  return (
    <div>
      <div className="flex gap-4 flex-wrap justify-between items-center">
        <div className="flex items-center gap-4">
          <Avatar image={artist.avatar} />
          <div className="flex flex-col">
            <h4 className="font-bold">{artist.fullName}</h4>
            <h5 className="text-sm">{artist.location}</h5>
          </div>
        </div>
        <div className="flex">
          <Button href={`/gallery/${artist.id}`}>View Shop</Button>
        </div>
      </div>
      {/* <div className="mt-5 h-112 grid gap-4 grid-cols-8"> */}
      <div className="mt-5 h-112 grid gap-4 grid-cols-3 md:grid-cols-9">
        {/* <Video className="col-span-2" video={artist.video} /> */}
        <Link href={`/gallery/${artist?.id}/${artist.arts[0]?.id}`}>
          <a className="col-span-3 overflow-hidden">
            <img src={artist.arts[0]?.images?.[0]?.url} alt="art" className="object-cover w-full h-full" />
          </a>
        </Link>
        <Link href={`/gallery/${artist?.id}/${artist.arts[1]?.id}`}>
          <a className="col-span-3 overflow-hidden">
            <img src={artist.arts[1]?.images[0].url} alt="art" className="object-cover w-full h-full" />
          </a>
        </Link>
        <Link href={`/gallery/${artist?.id}/${artist.arts[2]?.id}`}>
          <a className="col-span-3 overflow-hidden">
            <img src={artist.arts[2]?.images?.[0]?.url} alt="art" className="object-cover w-full h-full" />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default FeaturedGallery
