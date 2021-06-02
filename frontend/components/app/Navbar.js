// import { useQuery } from "@apollo/client"
import { Logo } from "assets/logos"
import { Button } from "components/ui"
import Link from "next/link"
import { useAuth } from "resources/auth"

const Navbar = () => {
  const { isLoggedIn, me, logOut } = useAuth()

  return (
    <nav className="border-b border-grey">
      <div className="max-w-screen-xl mx-auto px-8 py-6 flex justify-between items-center">
        <Link href="/">
          <a>
            <Logo className="h-8" />
          </a>
        </Link>
        <div className="flex space-x-3">
          {isLoggedIn && me !== null ? (
            <>
              <h6>Welcome {me?.username}</h6>
              <button onClick={logOut}>Log out</button>
            </>
          ) : (
            <>
              <Button isLink>Sign In</Button>
              <Button>Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
