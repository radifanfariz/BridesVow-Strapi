'use strict';

/**
 * data-undangan router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::data-undangan.data-undangan');


// module.exports = {
//     routes: [
//       {
//        method: 'GET',
//        path: '/data-undangans',
//        handler: 'data-undangan.findAll',
//        config: {
//          policies: [],
//          middlewares: [],
//        },
//       },
//     ],
//   };

// const { createCoreRouter } = require("@strapi/strapi").factories;
// const defaultRouter = createCoreRouter("api::data-undangan.data-undangan");

// const customRouter = (innerRouter, extraRoutes = []) => {
//   let routes;
//   return {
//     get prefix() {
//       return innerRouter.prefix;
//     },
//     get routes() {
//       if (!routes) routes = innerRouter.routes.concat(extraRoutes);
//       return routes;
//     },
//   };
// };

// const myExtraRoutes = [
//   {
//     method: "GET",
//     path: "/data-undangans",
//     handler: "data-undangan.find",
//   },
// ];

// module.exports = customRouter(defaultRouter, myExtraRoutes);