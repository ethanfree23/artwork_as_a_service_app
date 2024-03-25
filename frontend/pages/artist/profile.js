import { useContext, useEffect, useState } from "react"
import { Page, Section } from "components/app"
import { AuthContext } from "pages/_app"
import { meArtistQuery, useUpdateArtist } from "resources/artist"

import { Form, Formik } from "formik"
import * as Yup from "yup"

import { Field, SubmitButton, useSubmit } from "components/form"
import { useRouter } from "next/router"
import { ImageIcon } from "assets/icons"
import { useQuery } from "@apollo/client"
import axios from "axios"
import { API } from "utils/api"

const Profile = () => {
  const { auth } = useContext(AuthContext)

  // TODO: Hook to get artist ID
  const { data: artistData } = useQuery(meArtistQuery, {
    variables: { userId: auth?.me?.id },
    fetchPolicy: "cache-and-network",
  })

  const artist = artistData?.user?.artist
  const artistId = artist?.id

  const [image, setImage] = useState()
  const [previewImage, setPreviewImage] = useState()

  const isEdit = artist?.fullName

  const initialValues = {
    fullName: artist?.fullName || auth?.me?.fullName,
    bio: artist?.bio,
    location: artist?.location || "Texas",
  }

  const validate = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
  })

  useEffect(() => {
    setPreviewImage(artist?.avatar?.url)
  }, [artist?.avatar])

  const submit = useSubmit()
  const router = useRouter()

  const [updateArtist] = useUpdateArtist()

  const onImageChange = (event) => {
    console.log(event.target.files)
    setImage(event.target.files[0])
    setPreviewImage(URL.createObjectURL(event.target.files[0]))
  }

  const onSubmit = (values, formikBag) => {
    let valuesSubmit = {
      data: {
        ...values,
      },
      where: {
        id: artistId,
      },
    }

    const onSuccess = () => {
      // refetch()
      // TODO: Put onSucess into onComplete and use the values there
      router.push("/artist/dashboard")
    }

    const formData = new FormData()
    formData.append("files", image)

    if (image) {
      axios
        .post(`${API}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log("res", res)
          const imageId = res.data[0]?.id

          const valuesToSubmitWithImage = {
            ...valuesSubmit,
            data: {
              ...valuesSubmit.data,
              avatar: imageId,
            },
          }

          console.log("valuesToSubmitWithImage", valuesToSubmitWithImage)
          submit({ submitFn: updateArtist, values: valuesToSubmitWithImage, formikBag, onSuccess })
        })
        .catch((err) => {
          console.log(err.data)
        })
    } else {
      submit({ submitFn: updateArtist, values: valuesSubmit, formikBag, onSuccess })
    }

    // submit({ submitFn: updateArtist, values: valuesSubmit, formikBag, onSuccess })
  }

  return (
    <Page>
      <Section contentSize="content-sm">
        <h1 className="text-center font-bold text-3xl mb-12">{isEdit ? "Edit" : "Create"} your profile</h1>
        <Formik initialValues={initialValues} validationSchema={validate} onSubmit={onSubmit} enableReinitialize>
          <Form className="flex flex-col space-y-8 self-stretch">
            <div className="space-y-12 flex flex-col">
              <div className="flex flex-col md:flex-row items-stretch md:items-start space-y-12 md:space-y-0 md:space-x-24">
                <div className="flex justify-center">
                  <div
                    className="relative overflow-hidden w-72 h-72 rounded-full flex flex-col justify-center items-center text-white text-center p-12 "
                    style={{ background: "linear-gradient(267.09deg, #5DA6FB -14.83%, #6377FF 100%)" }}
                  >
                    <ImageIcon />
                    <h3 className="text-xl font-semibold">+ Add Profile Photo</h3>
                    <label htmlFor="img" className="absolute w-full h-full cursor-pointer">
                      <div
                        className="underline absolute flex justify-center w-full"
                        style={{ margin: "0 auto", bottom: "48px" }}
                      >
                        browse
                      </div>
                    </label>
                    <input
                      type="file"
                      id="img"
                      name="img"
                      accept="image/*"
                      className="hidden"
                      onChange={onImageChange}
                    />

                    {previewImage && (
                      <img
                        className="absolute top-0 bottom-0 left-0 right-0 w-full h-full z-0 pointer-events-none object-cover"
                        src={previewImage}
                        alt="..."
                      />
                    )}
                  </div>
                </div>
                <div className="flex-1 flex-col space-y-8">
                  <Field name="fullName" placeholder="Full Name" label="Full Name" autoComplete="on" />
                  <Field
                    name="location"
                    placeholder="Where you will be selling your art from"
                    label="Your Location"
                    autoComplete="on"
                    disabled
                  />
                </div>
              </div>
              <Field
                name="bio"
                as="textarea"
                label="Artist Bio"
                placeholder="Tell us a bit about yourself and your art."
                rows="8"
                cols="50"
              />
            </div>
            {/* TODO: Add form status, submit button */}
            <div className="flex justify-center">
              <SubmitButton label="Save Profile" labelSubmitting="Saving" />
              {/* <Button type="submit" className="px-12">
                Save Profile
              </Button> */}
            </div>
          </Form>
        </Formik>
      </Section>
    </Page>
  )
}

export default Profile
