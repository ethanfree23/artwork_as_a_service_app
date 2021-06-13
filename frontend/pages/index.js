import { useState } from "react"

import { Page, Section } from "components/app"
import { LoginForm, RegisterForm } from "components/auth"
import { Header } from "components/landing"
import { Button } from "components/ui"

import { Artists, Market, About, Features } from "assets/titles"

export default function Home() {
  const [isRegisterForm, setIsRegisterForm] = useState(true)

  return (
    <>
      <Page>
        <Header />
        <Section>
          <div className="flex flex-col items-center mb-12">
            <h3 className="text-xl font-bold uppercase mb-2">Meet the</h3>
            <Artists className="text-pink" />
          </div>
          <div className="grid gap-10 grid-cols-3">
            <div className="w-full h-24 bg-grey"></div>
            <div className="w-full h-24 bg-grey"></div>
            <div className="w-full h-24 bg-grey"></div>
          </div>
        </Section>
        <Section className="bg-black text-white">
          <div className="flex flex-col items-center mb-12">
            <h3 className="text-xl font-bold uppercase mb-2">Art on the</h3>
            <Market className="text-pink" />
          </div>
          <div className="grid gap-10 grid-cols-5">
            <div className="w-full h-24 bg-grey"></div>
            <div className="w-full h-24 bg-grey"></div>
            <div className="w-full h-24 bg-grey"></div>
            <div className="w-full h-24 bg-grey"></div>
            <div className="w-full h-24 bg-grey"></div>
          </div>
        </Section>
        <Section
          className="bg-bottom bg-cover"
          contentClassName="text-white flex flex-col items-center text-center pb-48"
          backgroundImage="backgrounds/landing-about-bg.svg"
        >
          <About />
          <p className="max-w-lg mt-8 font-semibold">
            “Our mission is to bring art to everyone, not hide it away in a gallery. We revolutionize how art is
            pucharsed by connecting artists with collectors.”
          </p>
          <div className="flex justify-around gap-12 max-w-xl mt-14">
            <div className="flex flex-col">
              ICON
              <h3 className="text-lg font-bold uppercase mt-1 mb-2">Artists</h3>
              <p className="text-sm">
                Use our technology to magnify your exposure to collectors and increase your sales.
              </p>
            </div>
            <div className="flex flex-col">
              ICON
              <h3 className="text-lg font-bold uppercase mt-1 mb-2">Collectors</h3>
              <p className="text-sm">
                Use our technology to magnify your exposure to collectors and increase your sales.
              </p>
            </div>
          </div>
        </Section>
        <Section>
          <h2 className="text-4xl uppercase font-bold text-center">What we do</h2>
        </Section>
        <Section
          className="bg-top bg-cover pt-24"
          contentClassName="text-white flex flex-col items-center"
          backgroundImage="backgrounds/landing-features-bg.svg"
        >
          <Features />
        </Section>
        <Section backgroundImage={"/backgrounds/landing-register-bg.png"} contentClassName="flex flex-col items-center">
          <div className="bg-white p-12 rounded-xl max-w-md flex flex-col items-center">
            {isRegisterForm ? (
              <>
                <h3 className="uppercase text-3xl font-bold">Sign up & find art you love</h3>
                <p className="mt-4 mb-8">We hate spam as much as you do - you’ll only recieve a confirmation.</p>
                <RegisterForm />
                <Button className="mt-2" isLink onClick={() => setIsRegisterForm(false)}>
                  Already registered? Login
                </Button>
              </>
            ) : (
              <>
                <h3 className="uppercase text-3xl font-bold">Login & find art you love</h3>
                <p className="mt-4 mb-8">We hate spam as much as you do - you’ll only recieve a confirmation.</p>
                <LoginForm />
                <Button className="mt-2" isLink onClick={() => setIsRegisterForm(true)}>
                  Not registered yet? Sign Up
                </Button>
              </>
            )}
          </div>
        </Section>
      </Page>
    </>
  )
}
