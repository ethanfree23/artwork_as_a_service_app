import moment from "moment"

import { isUserArtist } from "resources/auth"
import { useUpdateOrderStatus } from "resources/order"

import { Button, Image } from "components/ui"
import { formatPrice } from "resources/art"
import { OrderInstructions, OrderStatus } from "."

const getOrderSituation = ({ status, awaitingArtist, awaitingBuyer, updateOrderStatus }) => {
  if (status === "pending") {
    if (awaitingArtist === "acceptance") {
      return {
        artist: {
          buttons: [
            {
              label: "Accept Order",
              onClick: () => updateOrderStatus(),
            },
            {
              label: "Reject Order",
              onClick: () => updateOrderStatus("reject"),
            },
          ],
        },
        buyer: {
          buttons: [
            {
              label: "Cancel",
              onClick: () => updateOrderStatus("cancel"),
            },
          ],
        },
      }
    }
  } else if (status === "accepted") {
    return {
      artist: {
        buttons: [
          {
            label: "Mark As Delivered",
            onClick: () => updateOrderStatus(),
            disabled: awaitingArtist === null,
          },
        ],
      },
      buyer: {
        buttons: [
          {
            label: "Mark As Received",
            onClick: () => updateOrderStatus(),
            disabled: awaitingBuyer === null,
          },
        ],
      },
    }
  } else if (status === "rented") {
    return {
      artist: {
        buttons: [
          {
            label: "Mark As Returned",
            disabled: true,
          },
        ],
      },
      buyer: {
        buttons: [
          {
            label: "Mark As Returned",
            disabled: true,
          },
        ],
      },
    }
  } else if (status === "returnDue") {
    return {
      artist: {
        buttons: [
          {
            label: "Mark As Returned",
            disabled: awaitingArtist === null,
            onClick: () => updateOrderStatus(),
          },
        ],
      },
      buyer: {
        buttons: [
          {
            label: "Mark As Returned",
            disabled: awaitingBuyer === null,
            onClick: () => updateOrderStatus(),
          },
        ],
      },
    }
  } else if (status === "completed") {
    return {
      artist: {
        buttons: [],
      },
      buyer: {
        buttons: [],
      },
    }
  }
}

const OrderDetails = ({
  order: {
    status: orderStatus,
    awaitingArtist,
    awaitingBuyer,
    art,
    id,
    months,
    buyer,
    artist,
    address,
    comments,
    price,
    startDate,
    endDate,
    type,
  },
}) => {
  const isArtist = isUserArtist()
  const otherUser = isArtist ? buyer : artist

  const { mutate: updateOrderStatus, isLoading } = useUpdateOrderStatus(id)

  const situations = getOrderSituation({ status: orderStatus, awaitingArtist, awaitingBuyer, updateOrderStatus })
  const situation = isArtist ? situations?.artist : situations?.buyer

  return (
    <div className="relative space-y-6 lg:space-y-0">
      <div className="lg:absolute top-0 right-0 flex flex-col lg:items-end lg:text-right space-y-1 z-10">
        <div>
          <span className="font-semibold">Status:</span>
          <OrderStatus status={orderStatus} className="text-lg" />
        </div>
        <OrderInstructions status={orderStatus} awaitingArtist={awaitingArtist} awaitingBuyer={awaitingBuyer} />
      </div>
      <div className="flex flex-col space-y-5">
        <div className="text-2xl font-semibold">{art.title}</div>
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 relative">
          <div className="flex-3 lg:flex-2 space-y-6">
            <Image src={art.images[0].url} className="h-[300px] lg:h-[520px]" />
            <div className="space-y-2">
              <div className="text-lg">
                <span className="font-semibold text-pink">$ {formatPrice(price)} </span>{" "}
                {type === "rent" && `for ${months} months`}
              </div>
              <div>
                <span className="font-semibold">{type === "rent" ? "Start" : "Sale"} Date:</span>{" "}
                {startDate && moment(startDate).format("ll")}{" "}
              </div>
              {type === "rent" && (
                <div>
                  <span className="font-semibold">Return Date:</span> {endDate && moment(endDate).format("ll")}{" "}
                </div>
              )}
            </div>
          </div>
          <div className="flex-3 flex flex-col space-y-8 divide-y ">
            <div className="">
              <h2 className="text-2xl font-semibold">{isArtist ? "Buyers Info:" : "Artists Info:"}</h2>
              <div className="mt-2 mb-5 space-y-1">
                <h3 className="text-lg">{otherUser?.fullName}</h3>
                <a className="text-lg" href={`mailto:${otherUser?.email}`}>
                  {otherUser?.email}
                </a>
              </div>
              <Button isOutline size="md" href={`mailto:${otherUser?.email}`}>
                Message {isArtist ? "Buyers" : "Artists"}
              </Button>
            </div>
            <div className="pt-8">
              <h2 className="text-2xl font-semibold">Drop Off To:</h2>
              <div className="mt-2 mb-10 space-y-4 text-lg divide-y divide-grey-400 w-3/4">
                <div className="space-y-1">
                  <div>{address.address1}</div>
                  <div>{address.address2}</div>
                  <div>
                    {address.city}, {address.state}, {address.zip}
                  </div>
                </div>
                {comments?.buyer && (
                  <div className="text-base mt-4 pt-4">
                    <span className="font-semibold">Comments: </span>
                    {comments.buyer}
                  </div>
                )}
              </div>
              <div className="flex-1 flex space-x-4 items-end">
                {situation?.buttons.map(({ label, onClick, disabled }, index) => (
                  <Button
                    key={index}
                    size="lg"
                    isOutline={index > 0 || label === "Cancel"}
                    onClick={(evt) => {
                      evt.preventDefault()
                      onClick()
                    }}
                    disabled={disabled}
                    className={disabled && "cursor-not-allowed"}
                  >
                    {isLoading ? "Updating" : label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
