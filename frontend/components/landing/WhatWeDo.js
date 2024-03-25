import { Section } from "components/app"
import { AnimatedItem } from "components/utils"

import { ConnectIcon, FinanceIcon, LikesIcon, PartnerIcon, RotateIcon, SellIcon, GrowIcon } from "assets/icons"

const WHAT_WE_DO = [
  {
    icon: LikesIcon,
    title: "Local artists and spaces.",
    description: "Every piece you have rented out means monthly income you can count on.",
  },
  {
    icon: PartnerIcon,
    title: "Free to use!",
    description: "Keep track of sales and easily manage inventory.",
  },
  {
    icon: RotateIcon,
    title: "Plan exhbitions.",
    description: "Why limit your sales to purchases? How about renting your art?",
  },
  {
    icon: ConnectIcon,
    title: "Make sales.",
    description: "Go direct to the source without having a middleman. Get to know artists directly.",
  },
  // {
  //   icon: FinanceIcon,
  //   title: "Finance your art, keep the interests.",
  //   description: "Artists have the option to finance their art. You choose the rate, term length, safety deposit.",
  // },
  {
    icon: SellIcon,
    title: "Sell art, keep the money.",
    description: "Finally! A gallery that gives you exposure at only 20% commission.",
  },
  {
    icon: GrowIcon,
    title: "Grow your brand.",
    description: "With exposure in so many ways and places, you are able to grow your brand directly.",
  },
]

const WhatWeDoItem = ({ item: { icon: Icon, title, description } }) => (
  <AnimatedItem className="flex gap-8">
    <div className="w-16 lg:w-auto">
      <Icon className="text-blue" />
    </div>
    <div className="flex-1 flex flex-col">
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-grey-600">{description}</p>
    </div>
  </AnimatedItem>
)

const WhatWeDo = () => {
  return (
    <Section animateOnReveal>
      {/* <AnimatedItem> */}
      <AnimatedItem as="h2" className="text-4xl uppercase font-bold text-center">
        How it works
      </AnimatedItem>
      {/* </AnimatedItem> */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-16 px-4 lg:px-0">
        {WHAT_WE_DO.map((item, index) => (
          <WhatWeDoItem key={index} item={item} />
        ))}
      </div>
    </Section>
  )
}

export default WhatWeDo
