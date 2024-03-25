import { useContext, useState } from "react"
import { useRouter } from "next/router"
import { useMutation } from "@apollo/client"
import { gql, useQuery } from "utils/apolloClient"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import cns from "classnames"

import { useStripe, useElements, Elements, CardElement } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { Page, Section } from "components/app"
import { Button } from "components/ui"

import { CreateOrder } from "resources/order"
import { AuthContext } from "pages/_app"
import { Field, SubmitButton } from "components/form"
import { formatPrice, getRentalPrice, getPurchasePrice } from "resources/art"
import { useCreateAttachPaymentMethod } from "resources/payments"

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#070707",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#b3b8c2",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}

const CardField = () => {
  return (
    <div className="Field rounded-sm border border-grey p-3 outline-none flex flex-col space-y-3">
      {/* <div className="label text-sm text-grey-600">Card Details</div> */}
      <div className="input-wrapper">
        <div className="text-input">
          <CardElement hidePostalCode options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>
    </div>
  )
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STIPE_PUBLISHABLE_KEY)

const OrderForm = ({ art, type }) => {
  const [currentArt, setCurrentArt] = useState(0)

  const router = useRouter()

  const { auth } = useContext(AuthContext)

  const stripe = useStripe()
  const elements = useElements()

  // const [createOrder] = useCreateOrder()
  const [createOrder, { loading: isSubmitting }] = useMutation(CreateOrder, {
    onCompleted: () => router.push("/orders"),
  })

  const initialValues = {
    address: {
      address1: "",
      address2: "",
      city: "Austin",
      state: "Texas",
    },
  }

  const validate = Yup.object().shape({
    // address1: Yup.string().required("required"),
    // address2: Yup.string().required("required"),
    // city: Yup.string().required("required"),
    // state: Yup.string().required("required"),
  })

  // console.log("art", art)

  const { mutate: createAttachPaymentMethod } = useCreateAttachPaymentMethod()

  // console.log("auth?.me", auth?.me)

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    // submit({ submitFn: login, values, formikBag, onSuccess })
    // TODO: Check role and direct to route depending
    // login({ variables: values }).then(() => router.push("/artist/dashboard"))

    const price = type === "buy" ? getPurchasePrice(art) : getRentalPrice(art)
    const processOrder = () =>
      createOrder({
        variables: {
          input: {
            data: {
              art: art.id,
              buyer: auth?.me?.id,
              artist: art?.artist?.users_permissions_user?.id,
              status: "pending",
              awaitingArtist: "acceptance",
              price: price,
              type: type,
              ...values,
            },
          },
        },
        // onCompleted: () =>  setSubmitting(false),
      })

    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    })

    createAttachPaymentMethod({
      values: { ...paymentMethod },
      onSuccess: () => {
        setSubmitting(true)
        processOrder()
      },
    })
  }

  return (
    <Page>
      <Section contentClassName="flex flex-col md:flex-row gap-8 md:gap-20">
        <div className="flex-1">
          <img
            src={art?.images[currentArt].url}
            alt="art"
            className="h-96 w-full md:h-160 object-cover object-center"
          />
          <div className="flex justify-center mt-6 gap-4">
            {art?.images?.length > 1 &&
              art?.images.map((image, index) => (
                <img
                  key={index}
                  src={image?.url}
                  className={cns(
                    "w-24 h-24 cursor-pointer border-4 p-1 object-cover",
                    currentArt === index ? "border-pink" : "border-transparent"
                  )}
                  onClick={() => setCurrentArt(index)}
                />
              ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">{art?.title}</h1>
            <h2 className="text-lg font-bold text-pink">By {art?.artist?.fullName}</h2>
            <div>
              <h3 className="font-semibold mb-4">Drop Off Information</h3>
              <Formik initialValues={initialValues} validationSchema={validate} onSubmit={onSubmit}>
                {({ values }) => {
                  return (
                    <Form className="flex flex-col space-y-8 self-stretch">
                      <div className="space-y-4 flex flex-col">
                        <Field name="address.address1" placeholder="Address Line 1" label="Address Line 1" />
                        <Field name="address.address2" placeholder="Address Line 2" label="Address Line 1" />
                        <Field name="address.city" placeholder="City" label="City" disabled />
                        <Field name="address.state" placeholder="State" label="State" disabled />
                        <Field name="address.zip" placeholder="12345" label="Zipcode" />
                        <Field
                          as="textarea"
                          name="comments.buyer"
                          placeholder="I will be available 9-5 weekdays at the address above"
                          label="Comments (The artist will also be given your email to clarify anything further)"
                          rows="5"
                        />
                      </div>
                      {type === "rent" && (
                        <div>
                          <h3 className="font-semibold mb-4">Rental Information</h3>
                          <Field
                            type="number"
                            name="months"
                            placeholder="6"
                            label="Length of rental (Months)"
                            min={1}
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold mb-4">Payment</h3>
                        <CardField />
                      </div>
                      {/* TODO: Add form status, submit button */}
                      <div className="flex justify-stretch">
                        <SubmitButton
                          className="w-full"
                          label={
                            type === "buy"
                              ? `Pay $${formatPrice(getPurchasePrice(art))}`
                              : `Pay $${formatPrice(getRentalPrice(art))} for ${values.months || 0} months`
                          }
                          labelSubmitting="Paying"
                        />
                        {/* <Button type="submit" className="px-12 w-full font-semibold">
                          {isSubmitting
                            ? "Paying..."
                            : type === "buy"
                            ? `Pay $${formatPrice(getPurchasePrice(art))}`
                            : `Pay $${formatPrice(getRentalPrice(art))} for ${values.months || 0} months`}
                        </Button> */}
                      </div>
                    </Form>
                  )
                }}
              </Formik>
            </div>
          </div>
        </div>
      </Section>
    </Page>
  )
}

const Order = ({ art }) => {
  const router = useRouter()

  const { type } = router.query

  return (
    <Elements stripe={stripePromise}>
      <OrderForm art={art} type={type} />
    </Elements>
  )
}

export async function getStaticPaths() {
  const query = gql`
    query Query {
      arts {
        id
        artist {
          id
        }
      }
    }
  `

  const { data } = await useQuery(query)

  return {
    paths: data.arts
      .filter((art) => art?.artsit?.id)
      .map((art) => ({
        params: {
          art: art.id,
          artist: art.artist.id,
        },
      })),
    fallback: "blocking",
  }
}

export async function getStaticProps({ params }) {
  const query = gql`
    query Query($art: ID!) {
      art(id: $art) {
        id
        title
        description
        pricing {
          type
          price
        }
        dimensions
        materials
        style
        subject
        images {
          url
        }
        artist {
          id
          users_permissions_user {
            id
          }
          fullName
          bio
          avatar {
            url
          }
          arts {
            id
            title
            description
            price
            dimensions
            images {
              url
            }
          }
        }
      }
    }
  `

  const variables = { art: params.art }
  const { data } = await useQuery(query, variables)

  return {
    props: data,
    revalidate: 5,
  }
}

export default Order
