// import { useQuery } from "@apollo/client"
import { Logo } from "assets/logos"
import { Button } from "components/ui"
import Link from "next/link"
import { AuthContext } from "pages/_app"
import { useContext } from "react"
import { useAuth } from "resources/auth"

const Navbar = () => {
  // const { isLoggedIn, me, logOut } = useAuth()

  // console.log("isLoggedIn", isLoggedIn)
  // console.log("me", me)
  const { auth } = useContext(AuthContext)

  console.log("authhhh in navbar", auth)
  console.log("loggedIN", auth.isLoggedIn)

  return (
    <nav className="shadow">
      <div className="content pl-2 pr-2 py-6 flex justify-between items-center">
        <Link href="/">
          <a>
            <Logo className="h-8" />
          </a>
        </Link>
        <div className="flex items-center space-x-12">
          {/* <Button href="/gallery" theme="grey" isLink>
            Artists
          </Button> */}

          {/* <div className="flex items-center space-x-8">
            {auth.isLoggedIn ? "HELLO" : "NOPE"}
            <>
              <Button isLink href={{ pathname: "/auth", query: { form: "login" } }}>
                Login
              </Button>
              <Button href={{ pathname: "/auth", query: { form: "register" } }}>Sign Up</Button>
            </>
          </div> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
