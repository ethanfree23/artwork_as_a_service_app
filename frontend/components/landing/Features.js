import { Section } from "components/app"
import { FeaturesTitle } from "assets/titles"
import { PalettePolygonIcon, GalleryPolygonIcon, MoneyPolygonIcon } from "assets/icons"

const FEATURES = [
  {
    icon: PalettePolygonIcon,
    title: "Micro-Entrepreneurs",
    description: "Our platform provides you with the tools that will help you make a living from what you love.",
  },
  {
    icon: MoneyPolygonIcon,
    title: "Monthly Income",
    description:
      "Subscriptions to your art are paid monthly. Collectors can have the option to pay in monthly increments.",
  },
  {
    icon: GalleryPolygonIcon,
    title: "Hosting Gallery",
    description: "We provide you with a personalized gallery and profile, it's just as easy as logging in.",
  },
]

const Feature = ({ feature: { icon: Icon, title, description } }) => (
  <div className="flex flex-col items-center text-center">
    <Icon />
    <h4 className="mt-4 mb-2 font-bold text-lg">{title}</h4>
    <p>{description}</p>
  </div>
)

const Features = () => {
  return (
    <Section
      className="bg-top bg-cover pt-24"
      contentClassName="text-white flex flex-col items-center space-y-12"
      backgroundImage="backgrounds/landing-features-bg.svg"
    >
      <FeaturesTitle />
      <div className="grid grid-cols-3 gap-20">
        {FEATURES.map((feature, index) => (
          <Feature key={index} feature={feature} />
        ))}
      </div>
    </Section>
  )
}

export default Features
