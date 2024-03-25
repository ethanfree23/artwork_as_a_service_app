"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      const product = await stripe.products.create({
        name: data.title,
      });

      const rentalIndex = data.pricing.findIndex(
        (price) => price.type === "rent"
      );

      if (rentalIndex !== -1) {
        const rentalPrice = await stripe.prices.create({
          unit_amount: data.pricing[rentalIndex].price,
          currency: "usd",
          product: product.id,
          recurring: { interval: "month" },
        });
        data.pricing[rentalIndex].priceId = rentalPrice.id;
      }

      const purchaseIndex = data.pricing.findIndex(
        (price) => price.type === "buy"
      );

      console.log("data.pricing[rentalIndex]", data.pricing[rentalIndex]);
      console.log("data.pricing[purchaseIndex]", data.pricing[purchaseIndex]);

      if (purchaseIndex !== -1) {
        const purchasePrice = await stripe.prices.create({
          unit_amount: data.pricing[purchaseIndex].price,
          currency: "usd",
          product: product.id,
          recurring: { interval: "month" },
        });
        data.pricing[purchaseIndex].priceId = purchasePrice.id;
      }

      // if (!data.pricing.buy.forbid) {
      //   const purchasePrice = await stripe.prices.create({
      //     unit_amount: data.pricing.rent.price,
      //     currency: "usd",
      //     product: product.id,
      //     // recurring: { interval: "month" },
      //   });
      //   data.pricing.buy.priceId = purchasePrice.id;
      // }

      // const price = await stripe.prices.create({
      //   unit_amount: data.price,
      //   currency: "usd",
      //   product: product.id,
      //   recurring: { interval: "month" },
      // });

      data.productId = product.id;
      // data.priceId = "123456";
    },
    beforeUpdate: async (data, ...rest) => {
      const art = await strapi.query("art").findOne({ id: data.id });
      const newArt = rest[0];

      console.log("newArt", newArt.pricing);
      const newRentIndex = newArt.pricing.findIndex(
        (price) => price.type === "rent"
      );

      const rentalIndex = art.pricing.findIndex(
        (price) => price.type === "rent"
      );

      if (
        newRentIndex !== -1 &&
        art.pricing[rentalIndex].price !== newArt.pricing[newRentIndex].price
      ) {
        const rentalPrice = await stripe.prices.create({
          unit_amount: newArt.pricing[rentalIndex].price,
          currency: "usd",
          product: art.productId,
          recurring: { interval: "month" },
        });

        newArt.pricing[newRentIndex].priceId = rentalPrice.id;
      }

      const newPurchaseIndex = newArt.pricing.findIndex(
        (price) => price.type === "buy"
      );

      const purchaseIndex = art.pricing.findIndex(
        (price) => price.type === "buy"
      );

      if (
        newPurchaseIndex !== -1 &&
        art?.pricing?.[purchaseIndex]?.price !==
          newArt.pricing[newPurchaseIndex].price
      ) {
        const purchasePrice = await stripe.prices.create({
          unit_amount: newArt.pricing[newPurchaseIndex].price,
          currency: "usd",
          product: art.productId,
          recurring: { interval: "month" },
        });

        newArt.pricing[newPurchaseIndex].priceId = purchasePrice.id;
      }
    },
  },
};
