import { Section } from "components/app"
import { AnimatedItem } from "components/utils"

import { ArtistsIcon, CollectorsIcon } from "assets/icons"
import { AboutUsTitle } from "assets/titles"

const AboutUs = () => {
  return (
    <Section
      className="bg-cover"
      backgroundPosition="bg-bottom"
      contentClassName="text-white flex flex-col items-center text-center pb-48"
      backgroundImage="backgrounds/landing-about-bg.svg"
      animateOnReveal
    >
      <AnimatedItem>
        <AboutUsTitle />
      </AnimatedItem>
      <AnimatedItem>
        <p className="max-w-lg mt-8 font-semibold">
          “Our mission is to bring art to everyone, not hide it away in a gallery. We revolutionize how art is pucharsed
          by connecting artists with collectors.”
        </p>
      </AnimatedItem>
      <div className="flex justify-around flex-col md:flex-row gap-20 max-w-xl mt-16 md:mt-10">
        <AnimatedItem className="flex-1 flex flex-col items-center">
          <ArtistsIcon />
          <h3 className="text-lg font-bold uppercase mt-3 mb-2">Artists</h3>
          <p className="text-sm px-6 md:px-0">
            Use our technology to magnify your exposure to collectors and increase your sales.
          </p>
        </AnimatedItem>
        <AnimatedItem className="flex-1 flex flex-col items-center">
          <CollectorsIcon />
          <h3 className="text-lg font-bold uppercase mt-3 mb-2">Collectors</h3>
          <p className="text-sm  px-6 md:px-0">
            Your home becomes a gallery, providing new experiences year round from your favorite artists.
          </p>
        </AnimatedItem>
      </div>
    </Section>
  )
}

export default AboutUs
