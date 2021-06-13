import { Section } from "components/app"
import { ArtistsIcon, CollectorsIcon } from "assets/icons"
import { AboutUsTitle } from "assets/titles"

const AboutUs = () => {
  return (
    <Section
      className="bg-bottom bg-cover"
      contentClassName="text-white flex flex-col items-center text-center pb-48"
      backgroundImage="backgrounds/landing-about-bg.svg"
    >
      <AboutUsTitle />
      <p className="max-w-lg mt-8 font-semibold">
        “Our mission is to bring art to everyone, not hide it away in a gallery. We revolutionize how art is pucharsed
        by connecting artists with collectors.”
      </p>
      <div className="flex justify-around gap-20 max-w-xl mt-10">
        <div className="flex-1 flex flex-col items-center">
          <ArtistsIcon />
          <h3 className="text-lg font-bold uppercase mt-3 mb-2">Artists</h3>
          <p className="text-sm">Use our technology to magnify your exposure to collectors and increase your sales.</p>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <CollectorsIcon />
          <h3 className="text-lg font-bold uppercase mt-3 mb-2">Collectors</h3>
          <p className="text-sm">
            Your home becomes a gallery, providing new experiences year round from your favorite artists.
          </p>
        </div>
      </div>
    </Section>
  )
}

export default AboutUs
