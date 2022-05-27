/* eslint-disable react/no-unescaped-entities */
import { Page, Section } from "components/app"
import { AuthContext } from "pages/_app"
import { useContext, useState } from "react"
import { meArtistQuery } from "resources/artist"
import { omit } from "lodash"

import { Form, Formik, Field as FormikField, ErrorMessage } from "formik"
import * as Yup from "yup"

import { Button } from "components/ui"
import { Field, SubmitButton, useSubmit } from "components/form"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import { useCreateArt } from "resources/art"
import axios from "axios"
import { API } from "utils/api"
import { PaintingEmptyIcon, PlusIcon } from "assets/icons"
import cns from "classnames"

const Create = () => {
  // const [files, setFiles] = useState([])

  const [images, setImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const { auth } = useContext(AuthContext)
  console.log("auth", auth)

  //TODO: Maybe include this with getMe
  const { data: artistData } = useQuery(meArtistQuery, { variables: { userId: auth?.me?.id } })
  console.log("artistData", artistData)
  const artist = artistData?.user?.artist
  const artistId = artist?.id

  const initialValues = {
    title: "",
    description: "",
    quantity: 1,
    // price: 100,
    dimensions: "",
    materials: "",
    subject: "",
    style: "",
    pricing: {
      rent: {
        price: 100,
        forbid: false,
        type: "rent",
      },
      buy: {
        price: 1000,
        forbid: false,
        type: "buy",
      },
    },
  }

  const validate = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    pricing: Yup.object().shape({
      rent: Yup.object().shape({
        price: Yup.string().when("forbid", {
          is: false,
          then: Yup.string().required("Price required"),
        }),
      }),
      buy: Yup.object().shape({
        price: Yup.string().when("forbid", {
          is: false,
          then: Yup.string().required("Price required"),
        }),
      }),
    }),
  })

  // const submit = useSubmit()
  const router = useRouter()

  const [createArt] = useCreateArt()

  const onSubmit = (values, { setErrors, setSubmitting }) => {
    console.log("images", images)
    if (images.length === 0) {
      setSubmitting(false)
      return setErrors({ images: "At least 1 image is required" })
    }
    let valuesSubmit = {
      ...values,
      pricing: [
        {
          price: parseInt(values?.pricing?.rent?.price * 100),
          type: "rent",
        },
        {
          price: parseInt(values?.pricing?.buy?.price * 100),
          type: "buy",
        },
      ],
      artist: artistId,
    }

    const formData = new FormData()

    Array.from(images).forEach((image) => {
      formData.append("files", image)
    })

    axios
      .post(`${API}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const images = res.data.map((image) => image?.id)
        createArt({
          variables: {
            ...valuesSubmit,
            images: images,
          },
        }).then(() => router.push("/artist/dashboard"))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onImageChange = (event) => {
    if (images.length < 5) {
      setImages((images) => [...images, event.target.files[0]])
      setPreviewImages((previewImages) => [...previewImages, URL.createObjectURL(event.target.files[0])])
    } else {
      window.alert("Sorry no can do, there is a maximum of 5 images allowed!")
    }
  }

  const onSubmitFiles = (e) => {
    e.preventDefault()

    const formData = new FormData()

    Array.from(images).forEach((image) => {
      formData.append("files", image)
    })

    axios
      .post(`${API}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const mainImage = previewImages[0]
  const subImages = previewImages?.slice(1)
  const empties = 4 - subImages.length
  const emptySpaces = empties > 0 ? Array(4 - subImages.length).fill(<div></div>) : []

  return (
    <Page>
      <Section>
        <h1 className="text-center font-bold text-3xl mb-12">Create a peice to put on the market</h1>
        {/* TODO: Move into Formik */}
        <Formik initialValues={initialValues} validationSchema={validate} onSubmit={onSubmit} enableReinitialize>
          {({ values, errors }) => {
            return (
              <Form className="flex flex-col space-y-8">
                <div className="flex space-x-20">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between space-x-4">
                      <h2 className="text-xl font-bold">Art Images</h2>
                      {errors?.images && <span className="text-red-500 text-xs">{errors?.images}</span>}
                    </div>
                    <form onSubmit={onSubmitFiles} className="space-y-4 relative">
                      <div className="border border-grey relative h-[520px] flex items-center justify-center">
                        <label
                          htmlFor="files"
                          className="absolute w-full h-full cursor-pointer flex items-center justify-center"
                        >
                          {mainImage ? (
                            <>
                              <div
                                className="absolute top-1 right-1 bg-white rounded-md px-1 text-xs text-red-500 z-50"
                                onClick={(evt) => {
                                  evt.preventDefault()
                                  const newImages = images.filter((image, imageIndex) => 0 !== imageIndex)
                                  const newPreviewImages = previewImages.filter((imageUrl) => imageUrl !== mainImage)
                                  setImages(newImages)
                                  // orderBy(newPreviewImages, "name", "desc").map((image) => image.url)
                                  setPreviewImages(newPreviewImages)
                                }}
                              >
                                X
                              </div>
                              <img src={mainImage} className="object-cover w-full h-full" />
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center gap-5">
                              <PaintingEmptyIcon />
                              <h3 className="text-2xl font-bold max-w-sm text-center">
                                Add up to 5 images here <span className="text-pink underline">browse</span> your files
                              </h3>
                            </div>
                          )}
                        </label>
                      </div>
                      <div className="grid grid-cols-[repeat(auto-fit,100px)] gap-4 h-24 justify-center">
                        {(subImages || [])?.map((url, index) => (
                          <label key={index} className="border border-grey relative" htmlFor="files">
                            <div
                              className="cursor-pointer absolute top-1 right-1 bg-white rounded-md px-1 text-xs text-red-500 z-50"
                              onClick={(evt) => {
                                evt.preventDefault()
                                const newImages = images.filter((image, imageIndex) => index + 1 !== imageIndex)
                                const newPreviewImages = previewImages.filter((imageUrl) => imageUrl !== url)
                                setImages(newImages)
                                setPreviewImages(newPreviewImages)
                              }}
                            >
                              X
                            </div>
                            <img src={url} className="object-cover h-full w-full" />
                          </label>
                        ))}
                        {emptySpaces?.map((space, index) => (
                          <label
                            key={index}
                            className="border border-grey border-dashed cursor-pointer flex justify-center items-center"
                            htmlFor="files"
                          >
                            {index === emptySpaces.length - 1 && <PlusIcon />}
                          </label>
                        ))}
                      </div>
                      <input
                        type="file"
                        id="files"
                        name="files"
                        onChange={onImageChange}
                        alt="image"
                        accept="image/*"
                        className="hidden"
                      />
                    </form>
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-xl font-bold">Art Details</h2>
                    <div className="flex flex-col space-y-16 self-stretch">
                      <div className="space-y-8 flex flex-col">
                        <Field name="title" placeholder="Add Title" label="Artwork Title*" />
                        <Field
                          name="description"
                          as="textarea"
                          label="Artwork Description*"
                          placeholder="Tell us a bit about your art."
                          rows="8"
                          cols="50"
                        />
                        <div className="space-y-2">
                          <h2 className="text-xl font-bold">Price</h2>
                          <div className="flex items-start space-y-3 flex-col">
                            <div className="text-grey-600 text-sm">
                              We add 15% to the final price to keep us in business
                            </div>
                            <div className="space-y-8">
                              <div className="space-y-3">
                                <h3 className="font-medium">Rental Price</h3>
                                <div className={cns("flex space-x-4", values?.pricing?.rent?.forbid && "opacity-25")}>
                                  <div className="space-y-3">
                                    <Field
                                      name="netPrice"
                                      label="Your Monthly Net"
                                      placeholder="Price"
                                      value={`$ ${(values?.pricing.rent.price * 0.85).toFixed(2)}`}
                                      disabled
                                      fast={false}
                                    />
                                  </div>
                                  <div className="space-y-3">
                                    <Field
                                      name="pricing.rent.price"
                                      label="Monthly Price*"
                                      placeholder="Price"
                                      type="number"
                                      min="0"
                                      step="1.00"
                                    />
                                  </div>
                                </div>
                                <label className="space-x-3 font-semibold text-sm flex items-center cursor-pointer select-none">
                                  <FormikField
                                    type="checkbox"
                                    name="pricing.rent.forbid"
                                    className="flex-shrink-0 !mt-0"
                                  />
                                  <span>I don't want to rent this peice</span>
                                </label>
                              </div>
                              <div className="space-y-3">
                                <h3 className="font-medium">Purchase Price</h3>
                                <div className={cns("flex space-x-4", values?.pricing?.buy?.forbid && "opacity-25")}>
                                  <div className="space-y-3">
                                    <Field
                                      name="netPrice"
                                      label="Your Net"
                                      placeholder="Price"
                                      value={`$ ${(values?.pricing.buy.price * 0.85).toFixed(2)}`}
                                      disabled
                                      fast={false}
                                    />
                                  </div>
                                  <div className="space-y-3">
                                    <Field
                                      name="pricing.buy.price"
                                      label="Purchase Price*"
                                      placeholder="Price"
                                      type="number"
                                      min="0"
                                      step="1.00"
                                    />
                                  </div>
                                </div>
                                <label className="space-x-3 font-semibold text-sm flex items-center cursor-pointer select-none">
                                  <FormikField
                                    type="checkbox"
                                    name="pricing.buy.forbid"
                                    className="flex-shrink-0 !mt-0"
                                  />
                                  <span>I don't want to sell this peice</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <SubmitButton
                    label="Publish and place on the Market"
                    labelSubmitting="Placing on the Market"
                    className="min-w-[280px]"
                  />
                  {/* <Button type="submit" className="min-w-[280px]">
                    Publish and put on the Market
                  </Button> */}
                </div>
              </Form>
            )
          }}
        </Formik>
      </Section>
    </Page>
  )
}

export default Create
