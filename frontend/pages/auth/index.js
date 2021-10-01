import { CharacterOneIllustration } from "assets/illustrations"
import { LogoFill } from "assets/logos"
import { Page, Section } from "components/app"
import { LoginForm, RegisterForm } from "components/auth"
import { useRouter } from "next/router"

const Auth = () => {
  const router = useRouter()
  const { form } = router.query

  return (
    <Page className="relative flex-1 flex flex-col">
      {/* bg-cover bg-no-repeat */}
      <div
        style={{
          backgroundImage: "url(/backgrounds/auth-bg.svg)",
          backgroundPosition: "100% 50%",
          zIndex: -1,
        }}
        className="absolute top-0 bottom-0 left-0 h-full w-[80%]"
      ></div>
      <Section className="self-stretch flex-1 flex" contentClassName="flex-1 self-stretch flex w-full items-center">
        <div className="flex-1 self-stretch flex flex-col justify-start space-y-7 ml-12">
          <LogoFill className="max-w-[240px] text-white" />
          <h1 className="text-4xl text-white font-semibold max-w-[340px] leading-normal">The Modern Way to Gallery</h1>
          <CharacterOneIllustration className="w-full max-w-[360px]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex-1 max-w-[440px] bg-white shadow-lg pt-6 pb-10 px-12 rounded-lg flex flex-col items-center space-y-8">
            {form === "login" ? (
              <>
                <h3 className="text-2xl font-bold">Login</h3>
                <LoginForm />
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold">Sign up</h3>
                <RegisterForm />
              </>
            )}
          </div>
        </div>
      </Section>
    </Page>
  )
}

export default Auth
