import cns from "classnames"
import { CharacterOneIllustration, LandingHeaderIllustration } from "assets/illustrations"

const Header = () => {
  return (
    <header
      className="relative bg-bottom bg-cover"
      style={{ backgroundImage: "url(/backgrounds/landing-header-bg.svg)" }}
    >
      <div className={cns("content px-8 pt-12 pb-20 text-center flex flex-col items-center")}>
        <h1 as="h1" className="text-4xl text-white font-semibold">
          The Modern Way to Gallery
        </h1>
        <p as="p" className="max-w-xl text-white mt-4 mb-4 font-light">
          An art gallery designed for the modern artists. Market your art, build your brand, and establish yourself on
          your own terms.
        </p>
        <LandingHeaderIllustration className="hidden md:flex mt-10 w-full max-w-3xl" />
        <CharacterOneIllustration className="flex md:hidden pt-4 pb-16 w-3/4 max-w-[360px]" />
      </div>
    </header>
  )
}

export default Header
