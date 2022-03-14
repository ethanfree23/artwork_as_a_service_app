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
  email: {
    provider: "mailgun",
    providerOptions: {
      apiKey: env("MAILGUN_API_KEY"),
      domain: env("MAILGUN_DOMAIN"), //Required if you have an account with multiple domains
      host: env("MAILGUN_HOST", "api.mailgun.net"), //Optional. If domain region is Europe use 'api.eu.mailgun.net'
    },
    settings: {
      defaultFrom: "myemail@protonmail.com",
      defaultReplyTo: "myemail@protonmail.com",
    },
  },
});
