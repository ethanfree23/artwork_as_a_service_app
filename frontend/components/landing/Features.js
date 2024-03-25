import { Section } from "components/app"
import { AnimatedItem } from "components/utils"

import { FeaturesTitle } from "assets/titles"
import { PalettePolygonIcon, GalleryPolygonIcon, MoneyPolygonIcon } from "assets/icons"

const FEATURES = [
  {
    icon: PalettePolygonIcon,
    title: "Fresh Fine Art",
    description: "Experience more art and keep what you love.",
  },
  {
    icon: MoneyPolygonIcon,
    title: "Monthly Cycles",
    description: "Keeps prices reasonable for collectors, earns more money for artists. Win win.",
  },
  {
    icon: GalleryPolygonIcon,
    title: "Hosting Gallery",
    description: "We provide you with a personalized gallery and profile, it's just as easy as logging in.",
  },
]

const featureItem = {
  hidden: { opacity: 0, y: 200 },
  show: { opacity: 1, y: 0 },
}

const Feature = ({ feature: { icon: Icon, title, description } }) => (
  <AnimatedItem
    className="flex flex-col items-center text-center"
    variants={featureItem}
    transition={{
      type: "spring",
      damping: 10,
      mass: 0.75,
      stiffness: 100,
    }}
  >
    <Icon />
    <h4 className="mt-4 mb-2 font-bold text-lg">{title}</h4>
    <p>{description}</p>
  </AnimatedItem>
)

const Features = () => {
  return (
    <Section
      animateOnReveal
      className="bg-top bg-cover pt-48 lg:pt-24"
      contentClassName="text-white flex flex-col items-center space-y-12"
      backgroundImage="backgrounds/landing-features-bg.svg"
    >
      <FeaturesTitle />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        {FEATURES.map((feature, index) => (
          <Feature key={index} feature={feature} />
        ))}
      </div>
    </Section>
  )
}

export default Features
