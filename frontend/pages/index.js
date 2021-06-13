import { useState } from "react"

import { Page, Section } from "components/app"
import { LoginForm, RegisterForm } from "components/auth"

import { Button } from "components/ui"
import { Header, AboutUs, WhatWeDo, Features } from "components/landing"

import { ArtistsTitle, MarketTitle } from "assets/titles"

export default function Home() {
  const [isRegisterForm, setIsRegisterForm] = useState(true)

  return (
    <>
      <Page>
        <Header />
        <Section contentClassName="pt-4">
          <div className="flex flex-col items-center mb-12">
            <h3 className="text-xl font-bold uppercase mb-2">Meet the</h3>
            <ArtistsTitle className="text-pink" />
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
            <MarketTitle className="text-pink" />
          </div>
          <div className="grid gap-10 grid-cols-5">
            <div className="w-full h-24 bg-grey"></div>
            <div className="w-full h-24 bg-grey"></div>
            <div className="w-full h-24 bg-grey"></div>
            <div className="w-full h-24 bg-grey"></div>
            <div className="w-full h-24 bg-grey"></div>
          </div>
        </Section>
        <AboutUs />
        <WhatWeDo />
        <Features />
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
