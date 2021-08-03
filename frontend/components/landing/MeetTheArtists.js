import { Section } from "components/app"
import { ArtistsTitle } from "assets/titles"
import Link from "next/link"
import { Video } from "components/artist"
import { Image } from "components/ui"

const MeetTheArtists = ({ artists }) => {
  return (
    <Section contentClassName="pt-4">
      <div className="flex flex-col items-center mb-12">
        <h3 className="text-xl font-bold uppercase mb-2">Meet the</h3>
        <ArtistsTitle className="text-pink" />
      </div>
      <div className="grid gap-10 grid-cols-3 h-96">
        {artists?.map((artist, index) => (
          // <Link key={index} href={`/gallery/${artist.id}`}>
          <div key={index} className="flex">
            <div className="grid grid-cols-2 gap-2 overflow-hidden cursor-pointer w-full">
              <Video className="flex-1" video={artist.video} />
              <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                {artist?.arts?.slice(0, 3)?.map((art, index) => (
                  <div key={index} className="flex-1 overflow-hidden">
                    <Image src={art?.images[0]?.url} alt="art" className="flex-1 h-full w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default MeetTheArtists
