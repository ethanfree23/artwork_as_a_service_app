"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  async account(ctx) {
    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
      try {
        const account = await stripe.accounts.retrieve(ctx.state.user.stripeId);
        return account;
      } catch (err) {
        return handleErrors(ctx, err, "unauthorized");
      }
    }
  },

  async onboardingLink(ctx) {
    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
      try {
        const accountLink = await stripe.accountLinks.create({
          account: ctx.state.user.stripeId,
          refresh_url: process.env.STRIPE_REDIRECT_URL,
          return_url: process.env.STRIPE_REDIRECT_URL,
          type: "account_onboarding",
        });

        return accountLink;
      } catch (err) {
        return handleErrors(ctx, err);
      }
    }
  },

  async createAttachPaymentMethod(ctx, ...rest) {
    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
      const paymentMethod = ctx.request.body.paymentMethod;

      await stripe.paymentMethods.attach(paymentMethod.id, {
        customer: ctx.state.user.stripeId,
      });

      return await stripe.customers.update(ctx.state.user.stripeId, {
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
      });
    }
  },
};
