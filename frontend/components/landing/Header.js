import { LandingHeaderIllustration } from "assets/illustrations"
import cns from "classnames"

const Header = () => {
  return (
    <header className="relative">
      <object type="image/svg+xml" data="backgrounds/landing-header-bg.svg" className="absolute w-full -z-10"></object>
      <div className={cns("max-w-screen-xl box-content mx-auto px-8 py-20 text-center flex flex-col items-center")}>
        <h1 className="text-4xl text-white font-semibold">The Modern Way to Gallery</h1>
        <p className="max-w-xl text-white mt-4 mb-4 font-light">
          An art gallery designed for the modern artrepenuer. Market your art, build your brand, and establish yourself
          as an artist.
        </p>
        <LandingHeaderIllustration width={600} height={240} />
      </div>
    </header>
  )
}

export default Header
