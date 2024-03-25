import cns from "classnames"
import { SuccessIcon, WarningIcon } from "assets/icons"

const STATUSES = (status, myStatus) => {
  if (status === "pending") {
    return {
      label: "Pending",
      icon: WarningIcon,
      className: "text-yellow",
      title: myStatus === "acceptance" ? "Awaiting you to accept" : "",
    }
  } else if (status === "accepted") {
    return {
      label: "Accepted",
      icon: WarningIcon,
      className: "text-yellow",
      title: myStatus !== null ? "Awaiting you to mark as delivered" : "Awaiting buyer to mark as delivered",
    }
  } else if (status === "sold") {
    return {
      label: "Sold",
      icon: SuccessIcon,
      className: "text-green",
    }
  } else if (status === "rented") {
    return {
      label: "Rented",
      icon: SuccessIcon,
      className: "text-green",
    }
  } else if (status === "returnDue") {
    return {
      label: "Return Due",
      icon: WarningIcon,
      className: "text-yellow",
      title: myStatus !== null ? "Awaiting you to mark as picked up" : "Awaiting buyer to mark as picked up",
    }
  } else if (status === "completed") {
    return {
      label: "Completed",
      icon: SuccessIcon,
      className: "text-green",
    }
  } else if (status === "cancelled") {
    return {
      label: "Cancelled",
      icon: WarningIcon,
      className: "text-red",
    }
  } else if (status === "rejected") {
    return {
      label: "Rejected",
      icon: WarningIcon,
      className: "text-red",
    }
  } else {
    return {
      label: "",
      icon: SuccessIcon,
      className: "",
    }
  }
}

const OrderStatus = ({ status, myStatus, withIcon = false, className }) => {
  const { label, icon: Icon, className: statusClassName, title } = STATUSES(status, myStatus)

  return (
    <div className={cns("flex items-center space-x-1.5", className, statusClassName)} title={title}>
      {withIcon && <Icon className="w-4 h-4" />}
      <div className="font-bold">{label}</div>
    </div>
  )
}

export default OrderStatus
