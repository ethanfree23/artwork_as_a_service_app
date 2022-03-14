"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      // console.log("DATAAA", data);
      // console.log("STRIPE TIME", role === 3);

      if (data.role === 3) {
        const account = await stripe.accounts.create({
          type: "express",
          email: data.email,
          settings: {
            payouts: {
              schedule: {
                delay_days: 7,
                interval: "daily",
              },
            },
          },
        });

        data.stripeId = account.id;
      }

      if (data.role === 4) {
        const customer = await stripe.customers.create({
          email: data.email,
          name: data.fullName,
        });

        data.stripeId = customer.id;
      }

      // console.log("data.agreedToTerms", data.agreedToTerms);
      // if (data.agreedToTerms) {
      //   data.agreedToTerms = data.agreedToTerms;
      // }
    },
  },
};
