"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

//  const axios = require("axios");

const sendEmail = async ({ to, subject, vars }) => {
  return await strapi.plugins["email"].services.email.send({
    to: to,
    from: "Freeman Art Company <mail@freemanartcompany.com>",
    subject: subject,
    template: "order-update",
    "h:X-Mailgun-Variables": JSON.stringify({
      ...vars,
    }),
  });
};

module.exports = {
  async find(ctx) {
    const orders = await strapi.query("order").find();
    const user = ctx.state.user;

    return orders.filter(
      (order) => order.artist.id === user.id || order.buyer.id === user.id
    );
  },

  async updateStatus(ctx) {
    const order = await strapi.query("order").findOne({ id: ctx.params.id });
    const user = ctx.state.user;

    // RENTAL
    // ARTIST
    if (user.role.id === 3 && order.artist.id === user?.id) {
      if (order.status === "pending") {
        return await strapi.services.order.update(
          { id: ctx.params.id },
          {
            status: "accepted",
            awaitingArtist: "delivery",
            awaitingBuyer: "receival",
          }
        );
      } else if (order.status === "accepted") {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + order.months);

        const outStatus = order.type === "buy" ? "sold" : "rented";

        const update = await strapi.services.order.update(
          { id: ctx.params.id },
          {
            status: order.awaitingBuyer === null ? outStatus : order.status,
            awaitingArtist: null,
            startDate:
              order.awaitingBuyer === null ? startDate.getTime() : null,
            endDate: order.awaitingBuyer === null ? endDate.getTime() : null,
          }
        );

        if (update && order.awaitingBuyer !== null) {
          sendEmail({
            to: order.buyer.email,
            subject: "Mark your order as delivered",
            vars: {
              fullName: order.buyer.fullName,
              id: order.id,
              text: "The artist has marked your order as delivered, please make sure to mark it as received. If you do not mark it as recived within the next 2 days it will be done automatically. If the order has not been delivered/received please contact us.",
              buttonLabel: "Mark as Received",
            },
          });
        }
        return update;
      } else if (order.status === "returnDue") {
        return await strapi.services.order.update(
          { id: ctx.params.id },
          {
            status: order.awaitingBuyer === null ? "completed" : order.status,
            awaitingArtist: null,
          }
        );
      } else {
        return order;
      }
    }
    // BUYER
    else if (user.role.id === 4 && order.buyer.id === user?.id) {
      if (order.status === "accepted") {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + order.months);
        const outStatus = order.type === "buy" ? "sold" : "rented";

        return await strapi.services.order.update(
          { id: ctx.params.id },
          {
            status: order.awaitingArtist === null ? outStatus : order.status,
            awaitingBuyer: null,
            startDate:
              order.awaitingArtist === null ? startDate.getTime() : null,
            endDate: order.awaitingArtist === null ? endDate.getTime() : null,
          }
        );
      } else if (order.status === "returnDue") {
        return await strapi.services.order.update(
          { id: ctx.params.id },
          {
            status: order.awaitingArtist === null ? "completed" : order.status,
            awaitingBuyer: null,
          }
        );
      } else {
        return order;
      }
    }
    // FORBIDDEN
    else {
      return ctx.forbidden("You are not allowed to update this entry");
    }
  },
  async reject(ctx) {
    const order = await strapi.query("order").findOne({ id: ctx.params.id });
    const user = ctx.state.user;

    // TODO: Add refund

    // ARTIST
    if (user.role.id === 3 && order.artist.id === user?.id) {
      return await strapi.services.order.update(
        { id: ctx.params.id },
        {
          status: "rejected",
          awaitingArtist: null,
          awaitingBuyer: null,
        }
      );
    } else {
      return ctx.forbidden("You are not allowed to update this entry");
    }
  },
  async cancel(ctx) {
    const order = await strapi.query("order").findOne({ id: ctx.params.id });
    const user = ctx.state.user;

    // TODO: Add refund

    // BUYER
    if (user.role.id === 4 && order.buyer.id === user?.id) {
      return await strapi.services.order.update(
        { id: ctx.params.id },
        {
          status: "cancelled",
          awaitingArtist: null,
          awaitingBuyer: null,
        }
      );
    } else {
      return ctx.forbidden("You are not allowed to update this entry");
    }
  },
};
