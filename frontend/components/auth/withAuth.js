/* eslint-disable react/display-name */
import { useRouter } from "next/router"
import { AUTH_TOKEN, getMe } from "resources/auth"

const withAuth = (WrappedComponent, options) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const router = useRouter()

      let token = localStorage.getItem(AUTH_TOKEN)
      // TODO: useReactQuery
      if (token !== null) {
        getMe()
          .then((res) => {
            const roleName = res?.me?.role?.name?.toLowerCase()
            if (options?.roles?.length > 0 && !options?.roles.includes(roleName)) {
              router.replace("/")
              return <div className="h-screen"></div>
            }
          })
          .catch(() => {
            router.replace("/")
            return <div className="h-screen"></div>
          })
      } else {
        router.replace("/")
        return <div className="h-screen"></div>
      }

      return <WrappedComponent {...props} />
    }

    return null
  }
}

export default withAuth
