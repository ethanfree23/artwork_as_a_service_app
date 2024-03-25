import { CheckIcon, QuestionIcon, SuccessIcon } from "assets/icons"
import cns from "classnames"
import { isUserArtist } from "resources/auth"

const STATUS_INSTRUCTIONS = ({ status, awaitingArtist, awaitingBuyer }) => {
  if (status === "pending") {
    return {
      artist: [
        {
          label: "Awaiting your acceptance",
          sublabel: "You must accept within 3 days or the order will be cancelled and the buyer will be refunded",
          completed: false,
        },
      ],
      buyer: [
        {
          label: "Artist has accepted",
          sublabel: "The artist is required to accept within 3 days of your order or you will be refunded",
          completed: false,
        },
      ],
    }
  } else if (status === "accepted" || status === "rented" || status === "sold") {
    return {
      artist: [
        {
          label: "Marked as delivered by you",
          sublabel:
            "You are required to mark this as delivered within 3 days of the buyer marking it as received or it will be done automatically",
          completed: !awaitingArtist,
        },
        {
          label: "Marked as received by your buyer",
          sublabel:
            "The buyer is required to mark this as received within 3 days of the you marking it as delivered or it will be done automatically",
          completed: !awaitingBuyer,
        },
      ],
      buyer: [
        {
          label: "Marked as received by you",
          sublabel:
            "You are required to mark this as delivered within 3 days of the artist marking it as received or it will be done automatically",
          completed: !awaitingArtist,
        },
        {
          label: "Marked as delivered by the artist",
          sublabel:
            "The artist is required to mark this as delivered within 3 days of you marking it as received or it will be done automatically",
          completed: !awaitingBuyer,
        },
      ],
    }
  } else if (status === "returnDue") {
    return {
      artist: [
        {
          label: "Marked as returned up by you",
          sublabel:
            "You must must mark this as delivered within 3 days of the buyer marking it as received or it will be done automatically",
          completed: !awaitingArtist,
        },
        {
          label: "Marked as returned by your buyer",
          sublabel:
            "The buyer must must mark this as delivered within 3 days of the buyer marking it as received or it will be done automatically",
          completed: !awaitingBuyer,
        },
      ],
      buyer: [
        {
          label: "Marked as returned by you",
          sublabel:
            "You must must mark this as delivered within 3 days of the buyer marking it as received or it will be done automatically",
          completed: !awaitingArtist,
        },
        {
          label: "Marked as returned by the artist",
          sublabel:
            "The artist must must mark this as delivered within 3 days of the buyer marking it as received or it will be done automatically",
          completed: !awaitingBuyer,
        },
      ],
    }
  }
}

const OrderInstructions = ({ status, awaitingArtist, awaitingBuyer }) => {
  const instructions = STATUS_INSTRUCTIONS({ status, awaitingArtist, awaitingBuyer })
  const isArtist = isUserArtist()
  const myInstructions = instructions?.[isArtist ? "artist" : "buyer"]

  return (
    <div className={cns("text-[13px] space-y-0.5 text-grey-600/75")}>
      {myInstructions?.map((instruction, index) => (
        <div key={index} className="flex items-center lg:justify-end space-x-2">
          <div className="flex items-center space-x-1.5">
            <CheckIcon className={cns("w-3 h-3", instruction?.completed ? "text-green" : "text-grey")} />
            <span className={instruction?.completed && "text-green"}>{instruction.label}</span>
          </div>
          <div title={instruction?.sublabel} className="cursor-pointer">
            <QuestionIcon className="w-3.5 h-3.5 text-grey" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderInstructions
