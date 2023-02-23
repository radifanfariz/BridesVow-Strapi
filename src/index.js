'use strict';

const axios = require('axios');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension');

    extensionService.use(({ nexus }) => {
      const createPemesananByRecaptcha = nexus.extendType({
        type: 'Mutation',
        definition(t) {
          // "createPemesananByRecaptcha" query definition
          t.field('createPemesananByRecaptcha', {
            // Response type
            type: nexus.nullable('PemesananEntityResponse'),

            // Args definition
            args: { data: nexus.nonNull('PemesananInput'), captchaValue: nexus.nonNull('String') },

            // Resolver definition
            async resolve(parent, args, context) {
              const { data, captchaValue } = args;
              const {toEntityResponse} = strapi.plugin('graphql').service('format').returnTypes;

              // validate Recaptcha
              const recaptchaResponse = captchaValue;
              const recaptchaSecretKey = '6Le05zkkAAAAAGAPgIJkYxUDkpmSQQkShGS5R5hU';
          
              if (!recaptchaResponse) {
                throw new Error('reCAPTCHA response is missing.');
              }
          
              const verificationResponse = await axios.post(
                `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaResponse}`
              );
          
              if (!verificationResponse.data.success) {
                throw new Error('reCAPTCHA verification failed.');
              }

              try{
                const response = await strapi.entityService.create('api::pemesanan.pemesanan',{
                  data: data
                })
                return toEntityResponse(response);
              }catch(errors){
                throw new Error(errors)
              }
            }
          });
        }
      });

      return { types: [createPemesananByRecaptcha] };
    });
    extensionService.use(({ nexus }) => {
      const updatePemesananByOrderId = nexus.extendType({
        type: 'Mutation',
        definition(t) {
          // "createPemesananByRecaptcha" query definition
          t.field('updatePemesananByOrderId', {
            // Response type
            type: nexus.nullable('PemesananEntityResponse'),

            // Args definition
            args: { orderId: nexus.nonNull('String'), data: nexus.nonNull('PemesananInput') },

            // Resolver definition
            async resolve(parent, args, context) {
              const { data, orderId } = args;
              const {toEntityResponse} = strapi.plugin('graphql').service('format').returnTypes;

              try{
                const pemesananResponse = await strapi.db.query('api::pemesanan.pemesanan').update({
                  where: { OrderID: orderId },
                  data: data,
                  populate: true,
                })
                const timeStamp = new Date(Date.now())
                const dataUndanganResponse = await strapi.entityService.create('api::data-undangan.data-undangan', {
                  data: {
                    OrderID: orderId,
                    template_undangan:pemesananResponse.template_undangan.id,
                    pemesanan:pemesananResponse.id,
                    publishedAt: timeStamp
                  },
                });
                // console.log(pemesananResponse.Email)
                console.log(dataUndanganResponse)
                return toEntityResponse(pemesananResponse);
              }catch(errors){
                throw new Error(errors)
              }
            }
          });
        }
      });

      return { types: [updatePemesananByOrderId] };
    });
    extensionService.use(({ nexus }) => {
      const checkPemesanan = nexus.extendType({
        type: 'Query',
        definition(t) {
          // "createPemesananByRecaptcha" query definition
          t.field('checkPemesanan', {
            // Response type
            type: nexus.nullable('PemesananEntityResponse'),

            // Args definition
            args: { identifier: nexus.nonNull('String') },

            // Resolver definition
            async resolve(parent, args, context) {
              const { identifier } = args;
              const {toEntityResponse} = strapi.plugin('graphql').service('format').returnTypes;

              try{
                const checkpemesananResponse = await strapi.db.query('api::pemesanan.pemesanan').findOne({
                  where: {
                    $or: [
                      {
                        OrderID: identifier,
                      },
                      {
                        Email: identifier
                      }
                    ]
                  },
                })
                console.log(checkpemesananResponse)
                return toEntityResponse(checkpemesananResponse);
              }catch(errors){
                throw new Error(errors)
              }
            }
          });
        }
      });

      return { types: [checkPemesanan] };
    });

    // extensionService.use({
    //   resolversConfig: {
    //     'Query.categories': {
    //       middlewares: [
    //         /**
    //          * Basic middleware example #1
    //          * Log resolving time in console
    //          */
    //         async (next, parent, args, context, info) => {
    //           console.time('Resolving categories');
              
    //           // call the next resolver
    //           const res = await next(parent, args, context, info);
              
    //           console.timeEnd('Resolving categories');

    //           return res;
    //         },
    //         /**
    //          * Basic middleware example #2
    //          * Enable server-side shared caching
    //          */
    //         async (next, parent, args, context, info) => {
    //           info.cacheControl.setCacheHint({ maxAge: 60, scope: "PUBLIC" });
    //           return next(parent, args, context, info);
    //         },
    //         /**
    //          * Basic middleware example #3
    //          * change the 'name' attribute of parent with id 1 to 'foobar'
    //          */
    //         (resolve, parent, ...rest) => {
    //           if (parent.id === 1) {
    //             return resolve({...parent, name: 'foobar' }, ...rest);
    //           }

    //           return resolve(parent, ...rest);
    //         }
    //       ],
    //       auth: false,
    //     },
    //   }
    // })

  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
