// import { useQuery } from "@apollo/client"
import { Logo } from "assets/logos"
import { Button } from "components/ui"
import Link from "next/link"
import { useAuth } from "resources/auth"

const Navbar = () => {
  const { isLoggedIn, me, logOut } = useAuth()

  return (
    <nav className="shadow">
      <div className="content pl-2 pr-2 py-6 flex justify-between items-center">
        <Link href="/">
          <a>
            <Logo className="h-8" />
          </a>
        </Link>
        {/* <div className="flex items-center space-x-12">
          <Button href="/gallery" theme="grey" isLink>
            Artists
          </Button>
          <div className="flex items-center space-x-6">
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
        </div> */}
      </div>
    </nav>
  )
}

export default Navbar
