/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react"
import { useRouter } from "next/router"

import { getOrder, getOrders } from "resources/order"
import { AuthContext } from "pages/_app"

import { Page, Section } from "components/app"
import { OrderDetails } from "components/order"

const Order = () => {
  const router = useRouter()
  const { order: orderId } = router.query

  // const { data, loading } = getOrder(orderId)
  const { data, loading } = getOrders(orderId)
  return (
    <Page>
      <Section>{data && <OrderDetails order={data} />}</Section>
    </Page>
  )
}

export default Order
