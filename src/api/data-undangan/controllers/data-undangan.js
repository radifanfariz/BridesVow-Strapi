'use strict';

/**
 * data-undangan controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::data-undangan.data-undangan',({strapi}) => ({
    async find(ctx) {
        try {
          const data = await strapi.service('api::data-undangan.data-undangan').find(ctx);
          ctx.body = data;
        } catch (err) {
          ctx.badRequest('Data undangan controller error', { moreDetails: err })
        }
      },
}));


// 'use strict';

// module.exports = {
//   async findAll(ctx, next) {
//     try {
//       const data = await strapi.service('api::data-undangan.data-undangan').getAllDataUndangan();
//       ctx.body = data;
//     } catch (err) {
//       ctx.badRequest('Data undangan controller error', { moreDetails: err })
//     }
//   },
// };