"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      console.log("DATAAA", data);
      // const a = await strapi.services.users.findOne(data.artist);
      const artist = await strapi
        .query("user", "users-permissions")
        .findOne({ id: data.artist });

      // TODO: NOT SAFE - Pass in stripe ID, not safe
      const buyer = await strapi
        .query("user", "users-permissions")
        .findOne({ id: data.buyer });

      console.log("buyer", buyer);

      const art = await strapi.query("art").findOne({ id: data.art });

      const price = art?.pricing?.find((price) => price.type === data.type);

      if (data.type === "buy") {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);

        const subscription = await stripe.subscriptions.create({
          customer: buyer.stripeId,
          items: [{ price: price?.priceId }],
          transfer_data: {
            destination: artist.stripeId,
          },
          cancel_at: date,
          proration_behavior: "none",
          application_fee_percent: 15,
        });

        data.stripeData = subscription;
      } else {
        const date = new Date();
        date.setMonth(date.getMonth() + data.months);

        const subscription = await stripe.subscriptions.create({
          customer: buyer.stripeId,
          items: [{ price: price?.priceId }],
          transfer_data: {
            destination: artist.stripeId,
          },
          cancel_at: date,
          application_fee_percent: 15,
        });

        data.stripeData = subscription;
      }
    },
    afterCreate: async (data) => {
      // await strapi.plugins["email"].services.email.send({
      //   to: data.buyer.email,
      //   from: "Freeman Art Company <mailgun@sandbox00419944efc843a585c50d4d5822cc9c.mailgun.org>",
      //   subject: `Thank you for your order!`,
      //   template: "new-order",
      //   "h:X-Mailgun-Variables": JSON.stringify({
      //     id: data.id,
      //     fullName: data.buyer.fullName,
      //   }),
      // });
      // await strapi.plugins["email"].services.email.send({
      //   to: data.artist.email,
      //   from: "Freeman Art Company <mailgun@sandbox00419944efc843a585c50d4d5822cc9c.mailgun.org>",
      //   subject: `New Order! Someone has just ordered one of your pieces`,
      //   template: "new-order-artist",
      //   "h:X-Mailgun-Variables": JSON.stringify({
      //     id: data.id,
      //     fullName: data.artist.fullName,
      //   }),
      // });
    },
  },
};
