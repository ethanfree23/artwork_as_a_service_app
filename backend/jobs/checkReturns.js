"use strict";

const Strapi = require("strapi");
const moment = require("moment");

let instance;

const setupStrapi = async () => {
  if (!instance) {
    await Strapi().load();
    instance = strapi;
    instance.app
      .use(instance.router.routes())
      .use(instance.router.allowedMethods());
  }
  return instance;
};

const checkReturns = async () => {
  const app = await setupStrapi();
  const orders = await app.query("order").find({ status: "rented" });

  return orders.forEach(async (order) => {
    const endDate = moment(order.endDate).startOf("day");

    if (endDate.diff(moment(), "days") <= 0) {
      return await app.query("order").update(
        { id: order.id },
        {
          status: "returnDue",
          awaitingArtist: "pickUp",
          awaitingBuyer: "return",
        }
      );
    }
  });
};

checkReturns();
