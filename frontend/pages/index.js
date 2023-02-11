/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"

import { useQuery, gql } from "utils/apolloClient"
import { Page, Section } from "components/app"

import { Button } from "components/ui"
import { Header, MeetTheArtists, AboutUs, WhatWeDo, Features, ArtOnTheMarket, Podcasts } from "components/landing"
import { RegisterForm, LoginForm, WaitlistForm } from "components/auth"
import { getAuth, getUser } from "resources/auth"

const Home = ({ artists, podcasts }) => {
  const [isRegisterForm, setIsRegisterForm] = useState(true)

  const { isLoggedIn } = getAuth()

  return (
    <Page>
      <Header />
      <MeetTheArtists artists={artists} />
      {/* <Podcasts podcasts={podcasts} /> */}
      <ArtOnTheMarket artists={artists} />
      <AboutUs />
      <WhatWeDo />
      <Features />
      {!isLoggedIn && (
        <Section backgroundImage="/backgrounds/landing-register-bg.png" contentClassName="flex flex-col items-center">
          <div className="bg-white max-w-[500px] px-8 md:px-16 p-12 rounded-xl flex flex-col items-center">
            {isRegisterForm ? (
              <>
                <h3 className="uppercase text-2xl md:text-3xl font-bold">Sign up & find art you love</h3>
                <p className="mt-4 mb-8">We hate spam as much as you do - you’ll only recieve a confirmation.</p>
                <RegisterForm />
                <Button className="mt-2" isLink onClick={() => setIsRegisterForm(false)}>
                  Already registered? Login
                </Button>
              </>
            ) : (
              <>
                <h3 className="uppercase text-2xl md:text-3xl font-bold">Login & find art you love</h3>
                <p className="mt-4 mb-8">We hate spam as much as you do - you’ll only recieve a confirmation.</p>
                <LoginForm />
                <Button className="mt-2" isLink onClick={() => setIsRegisterForm(true)}>
                  Not registered yet? Sign Up
                </Button>
              </>
            )}
          </div>
        </Section>
      )}
    </Page>
  )
}

export async function getStaticProps() {
  const query = gql`
    query Query {
      artists(limit: 4, sort: "created_at:desc") {
        id
        fullName
        location
        avatar {
          url
        }
        video {
          thumbnail {
            url
          }
        }
        arts {
          id
          title
          images {
            url
          }
        }
      }
      podcasts {
        title
        description
        link
        file {
          url
        }
      }
    }
  `

  const { data } = await useQuery(query)

  return {
    props: data,
    revalidate: 5,
  }
}

export default Home
