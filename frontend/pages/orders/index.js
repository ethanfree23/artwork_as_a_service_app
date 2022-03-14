import Link from "next/link"
import { dehydrate, QueryClient, useQuery } from "react-query"

import { getOrders, getOrdersQuery } from "resources/order"

import { Page, Section } from "components/app"
import { OrderDetails } from "components/order"

const Orders = () => {
  const { data } = getOrders()
  const orders = data
  const hasOrders = orders?.length > 0

  return (
    <Page>
      <Section>
        <h1 className="text-center font-bold text-3xl mb-12">My Orders</h1>
        <div className="space-y-8">
          {hasOrders
            ? orders.map((order, index) => (
                <div key={index} className="bg-white border border-grey-400 p-6 relative cursor-pointer">
                  <Link key={index} href={`orders/${order.id}`}>
                    <a>
                      <OrderDetails order={order} />
                    </a>
                  </Link>
                </div>
              ))
            : "No orders"}
        </div>
      </Section>
    </Page>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery("orderss", getOrdersQuery)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Orders
