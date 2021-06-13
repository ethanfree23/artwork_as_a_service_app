import cns from "classnames"
import { LandingHeaderIllustration } from "assets/illustrations"

const Header = () => {
  return (
    <header
      className="relative bg-bottom bg-cover"
      style={{ backgroundImage: "url(backgrounds/landing-header-bg.svg)" }}
    >
      <div
        className={cns("max-w-screen-xl box-content mx-auto px-8 pt-12 pb-20 text-center flex flex-col items-center")}
      >
        <h1 as="h1" className="text-4xl text-white font-semibold">
          The Modern Way to Gallery
        </h1>
        <p as="p" className="max-w-xl text-white mt-4 mb-4 font-light">
          An art gallery designed for the modern artrepenuer. Market your art, build your brand, and establish yourself
          as an artist.
        </p>
        <LandingHeaderIllustration className="mt-10 w-full max-w-3xl" />
      </div>
    </header>
  )
}

export default Header
