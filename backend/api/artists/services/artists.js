"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

const { sanitizeEntity } = require("strapi-utils");

// module.exports = {
//   async create(ctx) {
//     console.log("ctx", ctx);
//     // console.log("ctx.state.user", ctx.state.user);
//     // console.log("rest", rest);

//     let entity;
//     entity = await strapi.services.artists.create(ctx.request.body);
//     entity = sanitizeEntity(entity, { model: strapi.models.artists });

//     return entity;
//   },
// };
