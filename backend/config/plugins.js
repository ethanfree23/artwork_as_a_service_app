module.exports = ({ env }) => ({
  upload: {
    provider: "imagekit",
    providerOptions: {
      publicKey: env("IMAGE_KIT_PUBLIC_KEY"),
      privateKey: env("IMAGE_KIT_PRIVATE_KEY"),
      urlEndpoint: env("IMAGE_KIT_URL_ENDPOINT"),
      params: {
        folder: "/freeman-art",
      },
    },
  },
});
