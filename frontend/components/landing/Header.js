import { LandingHeaderIllustration } from "assets/illustrations"
import cns from "classnames"

const Header = () => {
  return (
    <header
      className="relative bg-bottom bg-cover"
      style={{ backgroundImage: "url(backgrounds/landing-header-bg.svg)" }}
    >
      {/* <object type="image/svg+xml" data="backgrounds/landing-header-bg.svg" className="absolute w-full -z-10"></object> */}
      <div
        className={cns("max-w-screen-xl box-content mx-auto px-8 pt-12 pb-20 text-center flex flex-col items-center")}
      >
        <h1 className="text-4xl text-white font-semibold">The Modern Way to Gallery</h1>
        <p className="max-w-xl text-white mt-4 mb-4 font-light">
          An art gallery designed for the modern artrepenuer. Market your art, build your brand, and establish yourself
          as an artist.
        </p>
        <LandingHeaderIllustration className="mt-10 w-full max-w-3xl" />
      </div>
    </header>
  )
}

export default Header
