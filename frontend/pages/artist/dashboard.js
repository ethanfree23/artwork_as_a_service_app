/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion"

import { getOrders } from "resources/order"
import { getArtistsArt } from "resources/art"
import { useCreateOnboardingLink, useGetAccount } from "resources/payments"

import { Page, Section } from "components/app"
import { OrderTable } from "components/order"
import { Button } from "components/ui"

import { EarningsIcon, GraphIcon, PaintingIcon } from "assets/icons"
import { withAuth } from "components/auth"

function PercentagePieChart({ value, color = "#188BF4", children }) {
  let trueValue = value
  if (value === 0) {
    trueValue = 100
  }
  return (
    <div className="relative">
      <motion.svg className="transform rotate-90" viewBox="-2.5 -2.5 45 45" fill="none" width="140" height="140">
        <motion.path
          d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
          stroke="#E9E9F7"
          strokeWidth="2"
          strokeDasharray="0 1"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0, stroke: "#E9E9F7" }}
          animate={{
            opacity: 1,
            pathLength: trueValue / 100,
            stroke: value > 0 ? color : "#E9E9F7",
          }}
          transition={{
            default: { duration: 1, ease: "easeInOut" },
            stroke: { duration: 1, ease: "easeInOut" },
          }}
        />
      </motion.svg>
      <div className="absolute top-0 flex flex-col items-center justify-center w-full h-full">{children}</div>
    </div>
  )
}

const Dashboard = () => {
  const { data: orders } = getOrders()

  const { data: artsData } = getArtistsArt()

  const arts = artsData?.arts
  const totalArts = parseInt(arts?.length)

  const totalRented = orders?.filter((order) => order.status === "rented").length
  const totalSold = orders?.filter((order) => order.status === "sold").length

  const totalOnTheMarket = totalArts - totalRented
  const onDisplay = (totalRented / totalArts) * 100 || 0
  const percentageOnDisplay = onDisplay.toFixed()

  const { data: account, isLoading } = useGetAccount()
  const { mutate: createOnboardingLink } = useCreateOnboardingLink()

  const onSetUpPayments = () => {
    const onSuccess = (data) => {
      if (window) {
        window.document.location.href = data.url
      }
    }
    createOnboardingLink({ onSuccess })
  }

  return (
    <Page className="bg-purple">
      <Section contentClassName="md:py-12">
        <h1 className="font-bold text-3xl text-center">My Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <div className="bg-white shadow-sm py-4 px-6 rounded-lg flex flex-col-reverse md:flex-row space-y-12 space-y-reverse md:space-y-0 md:space-x-4">
            <div className="flex-3 flex flex-col">
              <h2 className="text-xl font-semibold">Place a piece on the market</h2>
              <p className="mt-3 mb-5">Increase your monthly income by renting or selling your art</p>
              {!isLoading && (
                <div className="flex-1 flex items-center space-x-4">
                  <Button href="/artist/art/create" disabled={!account?.charges_enabled}>
                    + Add a new piece
                  </Button>
                  {!account?.charges_enabled && (
                    <Button onClick={onSetUpPayments} isLink>
                      Set up payments
                    </Button>
                  )}
                </div>
              )}
            </div>
            <div className="flex justify-center md:justify-end flex-1">
              <PaintingIcon className="h-40" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <div className="bg-white shadow-sm p-4 rounded-lg flex space-x-4 items-center h-full">
                <EarningsIcon className="w-12 h-12" />
                <div className="space-y-1">
                  <h3 className="text-xs">Total Earnings</h3>
                  {/* <h4 className="text-base font-semibold tracking-widest">$7,421.45</h4> */}
                  <h4 className="text-base font-semibold tracking-widest">Coming Soon</h4>
                </div>
              </div>
              <div className="bg-white shadow-sm p-4 rounded-lg flex space-x-4 items-center h-full">
                <GraphIcon className="w-12 h-12" />
                <div className="space-y-1">
                  <h3 className="text-xs">Current Monthly Income</h3>
                  {/* <h4 className="text-base font-semibold tracking-widest">$1,121.75</h4> */}
                  <h4 className="text-base font-semibold tracking-widest">Coming Soon</h4>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm p-4 rounded-lg flex flex-col justify-center items-center space-y-3">
              <h3 className="font-semibold">Art on display</h3>
              {onDisplay >= 0 && (
                <PercentagePieChart value={onDisplay} className="text-blue">
                  <div className="text-xl font-semibold text-blue">{percentageOnDisplay}%</div>
                  <div className="text-[10px] font-semibold">{totalOnTheMarket} On The Market</div>
                  <div className="mt-1 text-[10px] font-semibold">{totalRented} Rented</div>
                  <div className="mt-1 text-[10px] font-semibold">{totalSold} Sold</div>
                  {/* <div className="text-[10px] font-semibold">{totalArts} Total</div> */}
                </PercentagePieChart>
              )}
            </div>
          </div>
        </div>
        <small className="flex justify-end mt-4 mb-12">*Income paid out daily, held for 7 days from purchase</small>
        {orders?.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Orders</h2>
            <div className="bg-white shadow-sm pt-6 pb-12 px-4 rounded-lg">
              <OrderTable orders={orders} />
            </div>
          </div>
        )}
      </Section>
      <Section></Section>
    </Page>
  )
}

export default withAuth(Dashboard, { roles: ["artist"] })
