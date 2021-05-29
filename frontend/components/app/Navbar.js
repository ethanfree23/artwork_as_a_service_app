// import { useQuery } from "@apollo/client"
import { useAuth } from "resources/auth"

const Navbar = () => {
  const { isLoggedIn, me } = useAuth()
  // const a = "a"

  return (
    <div className="bg-red-500 flex justify-between">
      <h1>NAVBAR</h1>
      {isLoggedIn ? <h6>Welcome {me?.username}</h6> : <button>Log IN</button>}
    </div>
  )
}

export default Navbar
