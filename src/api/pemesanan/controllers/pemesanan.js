'use strict';

/**
 * pemesanan controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pemesanan.pemesanan', ({ strapi }) => ({

    // Method 2: Wrapping a core action (leaves core logic in place)
    async create(ctx) {

        
        //additional logic
        // ctx.request.body.published_at = new Date()

        // Calling the default core action
        const response = await super.create(ctx);

        return response;
    },
}));
