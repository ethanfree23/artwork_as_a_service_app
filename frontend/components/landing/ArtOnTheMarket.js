import Link from "next/link"
import { Section } from "components/app"
import { MarketTitle } from "assets/titles"
import { Button, Image } from "components/ui"

const ArtOnTheMarket = ({ artists }) => {
  return (
    <Section className="bg-black text-white">
      <div className="flex flex-col items-center mb-12">
        <h3 className="text-xl font-bold uppercase mb-2">Art on the</h3>
        <MarketTitle className="text-pink" />
      </div>
      <div className="space-y-8">
        <div className="grid gap-10 grid-cols-4">
          {/* TODO: Top 4 artists or more with carousel */}
          {artists?.map((artist, index) => (
            <Link key={index} href={`/gallery/${artist.id}/${artist?.arts[0]?.id}`}>
              <a className="col-span-1 w-full h-96 overflow-hidden flex flex-col gap-2">
                <Image src={artist?.arts[0]?.images[0]?.url} alt="art" className="flex-1 w-full" layout="fill" />
                <div>
                  <h4 className="uppercase font-semibold truncate">{artist?.arts[0]?.title}</h4>
                </div>
              </a>
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <Button href="/gallery">See all art</Button>
        </div>
      </div>
    </Section>
  )
}

export default ArtOnTheMarket
