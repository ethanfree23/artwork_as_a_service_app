/* eslint-disable react/display-name */
import { useMemo } from "react"
import { useRouter } from "next/router"
import moment from "moment"

import { Image, Table } from "components/ui"
import { formatPrice } from "resources/art"
import { OrderStatus } from "."

const ORDER_COLUMNS = [
  {
    id: "order-table",
    columns: [
      {
        Header: "Title",
        accessor: "art.title",
        Cell: ({ value, row }) => {
          return (
            <div className="flex items-center space-x-3">
              <Image src={row.original.art.images[0].url} className="w-10 h-10 rounded-full overflow-hidden" />
              <div className="font-semibold text-base">{value}</div>
            </div>
          )
        },
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value, row }) => `$ ${formatPrice(value)} ${row.original.type === "rent" ? "/mo" : ""}`,
      },
      {
        Header: "Order Date",
        accessor: "created_at",
        Cell: ({ value }) => {
          return value ? <div>{moment(value).format("ll")}</div> : "-"
        },
      },
      {
        Header: "Delivery Date",
        accessor: "startDate",
        Cell: ({ value }) => {
          return value ? <div>{moment(value).format("ll")}</div> : "-"
        },
      },
      {
        Header: "Return Date",
        accessor: "endDate",
        Cell: ({ value }) => {
          const isFuture = moment(value).diff(moment()) > 0
          const daysRemaining = moment(value).toNow(true)

          return (
            <div className="flex flex-col">
              {value ? (
                <>
                  {moment(value).format("ll")} {isFuture && <small>{daysRemaining} remaining</small>}
                </>
              ) : (
                "-"
              )}
            </div>
          )
        },
      },
      // {
      //   id: "time-remaining",
      //   Header: "Time Remaining",
      //   accessor: "endDate",
      //   Cell: ({ value }) => {
      //     const isFuture = moment(value).diff(moment()) > 0
      //     const daysRemaining = moment(value).toNow(true)
      //     return isFuture && <div>{daysRemaining} remaining</div>
      //   },
      //   // Cell: "12th June, 2022 (40 days left)",
      // },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value, row }) => {
          return (
            <div className="capitalize">
              <OrderStatus status={value} myStatus={row.original.awaitingArtist} withIcon />
            </div>
          )
        },
      },
    ],
  },
]

const OrderTable = ({ orders }) => {
  const columns = useMemo(() => ORDER_COLUMNS, [])
  const data = useMemo(() => orders, [])
  console.log("dataaaa", data)

  const router = useRouter()

  console.log("MY ODRDERS", orders)
  return <Table columns={columns} data={data} onRowClick={(row) => router.push(`/orders/${row.id}`)} />
}

export default OrderTable
