// import { useQuery } from "@apollo/client"
import Link from "next/link"
import { useQuery } from "@apollo/client"
import { Logo } from "assets/logos"
import { Button } from "components/ui"
import { AuthContext } from "pages/_app"
import { useContext } from "react"
import { meArtistQuery } from "resources/artist"

import { useState } from "react"
// import { Button } from "components/shared"

import cns from "classnames"

import { motion } from "framer-motion"
import { useRouter } from "next/router"

const menu = {
  open: {
    clipPath: "ellipse(200% 150% at 100% 0%)",
    transition: {
      type: "spring",
      stiffness: 40,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: "ellipse(50% 25% at 120% -30%)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
}

const menuItems = {
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const menuItem = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: { delay: 0.25 },
  },
}

const Path = (props) => (
  <motion.path
    fill="currentColor"
    stroke="currentColor"
    // stroke-width="1"
    // stroke="hsl(0, 0%, 18%)"
    // strokeLinecap="round"
    transition={{ duration: 0.4 }}
    {...props}
  />
)

const Navbar = () => {
  const { auth, dispatch } = useContext(AuthContext)

  const isArtist = auth?.me?.role?.id === "3" //TODO: Put on context or with hook below

  // TODO: getArtist(auth?.me?.id)
  // TODO: Hook to get artist ID
  const { data: artistData } = useQuery(meArtistQuery, { variables: { userId: auth?.me?.id } })

  const artist = artistData?.user?.artist
  const artistId = artist?.id

  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [hidden, setHidden] = useState(false)

  const variants = {
    visible: { y: 0 },
    hidden: { y: -88 },
  }

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
      document.documentElement.classList.remove("prevent-scroll")
    } else {
      setIsMenuOpen(true)
      document.documentElement.classList.add("prevent-scroll")
    }
  }

  return (
    <>
      <nav className="shadow z-20 hidden lg:block">
        <div className="content pl-2 pr-2 h-[88px] flex justify-between items-center">
          <Link href="/">
            <a>
              <Logo className="h-8" />
            </a>
          </Link>
          <div className="flex items-center space-x-12">
            {!isArtist && (
              <Button href="/gallery" theme="grey" isLink>
                Artists
              </Button>
            )}

            {isArtist && (
              <Button href={`/artist/dashboard`} theme="grey" isLink>
                Dashboard
              </Button>
            )}
            {isArtist && (
              <Button href={`/gallery/${artistId}`} theme="grey" isLink>
                My Shop
              </Button>
            )}
            {auth.isLoggedIn && (
              <Button href="/orders" theme="grey" isLink>
                My Orders
              </Button>
            )}
            {isArtist && (
              <Button href="/artist/profile" theme="grey" isLink>
                My Profile
              </Button>
            )}
            {
              <div className="flex items-center space-x-8">
                {auth.isLoggedIn ? (
                  <Button isLink onClick={() => dispatch({ type: "logout" })}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button isLink href={{ pathname: "/auth", query: { form: "login" } }}>
                      Login
                    </Button>
                    <Button href={{ pathname: "/auth", query: { form: "register" } }}>Sign Up</Button>
                  </>
                )}
              </div>
            }
          </div>
        </div>
      </nav>
      <motion.nav
        className={cns(
          "px-6 py-5 md:py-6 flex items-center justify-between lg:hidden sticky top-0 z-50 w-full transition-colors duration-500 bg-white"
        )}
        variants={variants}
        animate={hidden ? "hidden" : "visible"}
        transition={{ ease: "easeInOut", duration: 0.4 }}
      >
        {/* <button
          aria-label="Home"
          className="h-12 w-52 flex justify-start"
          onClick={() => {
            isMenuOpen && toggleMenu()
            router.push("/")
          }}
        >
          <img src="/temp-logo.png" className="cursor-pointer h-11 w-auto" alt="Galway Skin Clinic Logo" />
        </button> */}
        <Link href="/">
          <a>
            <Logo className="h-8" />
          </a>
        </Link>
        <button
          className="hamburger visible lg:hidden focus:outline-none -mr-0.5 text-black"
          onClick={toggleMenu}
          aria-label="Toggle Navigation"
        >
          <svg width="26" height="26" viewBox="0 -2 23 23">
            <Path
              strokeWidth={2}
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                closed: { d: "M 2 2.5 L 20 2.5" },
                open: { d: "M 3 16.5 L 17 2.5" },
              }}
            />
            <Path
              strokeWidth={2}
              animate={isMenuOpen ? "open" : "closed"}
              d="M 2 9.423 L 20 9.423"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.2 }}
            />
            <Path
              strokeWidth={2}
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                closed: { d: "M 2 16.346 L 20 16.346" },
                open: { d: "M 3 2.5 L 17 16.346" },
              }}
            />
          </svg>
        </button>
        <motion.div
          className={cns(
            "absolute left-0 z-40 visible w-full overflow-auto lg:hidden px-6 bg-white",
            isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          )}
          style={{ height: "calc((var(--vh, 1vh) * 100) - 72px )", top: 72 }}
          initial={false}
          animate={isMenuOpen ? "open" : "closed"}
          variants={menu}
        >
          <motion.ul className="mt-4 pb-12 space-y-9 flex flex-col list-none list-outside ml-0" variants={menuItems}>
            {!isArtist && (
              <motion.li className="flex-1 flex items-end" variants={menuItem} onClick={toggleMenu}>
                <Button href="/gallery" theme="grey" isLink>
                  Artists
                </Button>
              </motion.li>
            )}
            {isArtist && (
              <motion.li className="flex-1 flex items-end" variants={menuItem} onClick={toggleMenu}>
                <Button href={`/artist/dashboard`} theme="grey" isLink>
                  Dashboard
                </Button>
              </motion.li>
            )}
            {isArtist && (
              <motion.li className="flex-1 flex items-end" variants={menuItem} onClick={toggleMenu}>
                <Button href={`/gallery/${artistId}`} theme="grey" isLink>
                  My Shop
                </Button>
              </motion.li>
            )}
            {auth.isLoggedIn && (
              <motion.li className="flex-1 flex items-end" variants={menuItem} onClick={toggleMenu}>
                <Button href="/orders" theme="grey" isLink>
                  My Orders
                </Button>
              </motion.li>
            )}
            {isArtist && (
              <motion.li className="flex-1 flex items-end" variants={menuItem} onClick={toggleMenu}>
                <Button href="/artist/profile" theme="grey" isLink>
                  My Profile
                </Button>
              </motion.li>
            )}
            <motion.li className="flex-1 flex items-end" variants={menuItem} onClick={toggleMenu}>
              {
                <div className="flex items-center space-x-8">
                  {auth.isLoggedIn ? (
                    <Button isLink onClick={() => dispatch({ type: "logout" })}>
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Button isLink href={{ pathname: "/auth", query: { form: "login" } }}>
                        Login
                      </Button>
                      <Button href={{ pathname: "/auth", query: { form: "register" } }}>Sign Up</Button>
                    </>
                  )}
                </div>
              }
            </motion.li>
          </motion.ul>
        </motion.div>
      </motion.nav>
    </>
  )
}

export default Navbar
