import { Section } from "components/app"
import { AnimateOnReveal, AnimatedItem } from "components/utils"

import { ConnectIcon, FinanceIcon, LikesIcon, PartnerIcon, RotateIcon, SellIcon } from "assets/icons"

const WHAT_WE_DO = [
  {
    icon: LikesIcon,
    title: "Earn through likes.",
    description: "Every like earned through your content, you earn money.",
  },
  {
    icon: PartnerIcon,
    title: "The business partner you need.",
    description: "You focus on the art and lifestyle, we handle the boring business stuff.",
  },
  {
    icon: ConnectIcon,
    title: "Connect with your peers.",
    description: "Establish ethos, form partnerships, get connected through the form.",
  },
  {
    icon: RotateIcon,
    title: "Rotate your art.",
    description: "Why limit your sales to purchases? How about rotating galleries?",
  },
  {
    icon: FinanceIcon,
    title: "Finance your art, keep the interests.",
    description: "Artists have the option to finance their art. You choose the rate, term length, safety deposit.",
  },
  {
    icon: SellIcon,
    title: "Sell art, keep the money.",
    description: "Finally! A gallery that gives you exposure at only 5% commission.",
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
        What we do
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
