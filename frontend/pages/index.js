/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"

import { useQuery, gql } from "utils/apolloClient"
import { Page, Section } from "components/app"

import { Button } from "components/ui"
import { Header, MeetTheArtists, AboutUs, WhatWeDo, Features, ArtOnTheMarket, Podcasts } from "components/landing"
import { RegisterForm, LoginForm, WaitlistForm } from "components/auth"

const Home = ({ artists, podcasts }) => {
  const [isRegisterForm, setIsRegisterForm] = useState(true)

  return (
    <Page>
      <Header />
      <MeetTheArtists artists={artists} />
      <Podcasts podcasts={podcasts} />
      {/* <ArtOnTheMarket artists={artists} /> */}
      <AboutUs />
      <WhatWeDo />
      <Features />
      {/* <Section backgroundImage="/backgrounds/landing-register-bg.png" contentClassName="flex flex-col items-center">
        <div className="bg-white p-12 rounded-xl max-w-md flex flex-col items-center">
          <h3 className="uppercase text-3xl font-bold">Join the waitlist</h3>
          <p className="mt-4 mb-8">
            Join the waitlist to become an artist or a buyer and we'll let you know when we're ready.
          </p>
          <WaitlistForm />
        
        </div>
      </Section> */}
    </Page>
  )
}

// {/* {isRegisterForm ? (
//   <>
//     <h3 className="uppercase text-3xl font-bold">Sign up & find art you love</h3>
//     <p className="mt-4 mb-8">We hate spam as much as you do - you’ll only recieve a confirmation.</p>
//     <RegisterForm />
//     <Button className="mt-2" isLink onClick={() => setIsRegisterForm(false)}>
//       Already registered? Login
//     </Button>
//   </>
// ) : (
//   <>
//     <h3 className="uppercase text-3xl font-bold">Login & find art you love</h3>
//     <p className="mt-4 mb-8">We hate spam as much as you do - you’ll only recieve a confirmation.</p>
//     <LoginForm />
//     <Button className="mt-2" isLink onClick={() => setIsRegisterForm(true)}>
//       Not registered yet? Sign Up
//     </Button>
//   </>
// )} */}

export async function getStaticProps() {
  const query = gql`
    query Query {
      artists(limit: 4) {
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
