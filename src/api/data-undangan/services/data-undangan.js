'use strict';

/**
 * data-undangan service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::data-undangan.data-undangan', ({ strapi }) => ({
    async find(params) {
        try {
            // fetching the data
            // we dont really need contentSections for this example.
            // its kept here, just for your reference
            const entries = await strapi.entityService.findMany('api::data-undangan.data-undangan', {
                fields: ['id', 'Slug','UndanganID'],
                populate: {
                    Pengantin_Wanita: {
                      fields: ['Nama_Panggilan']
                    },
                    Pengantin_Pria: {
                      populate: '*'
                    }
                  }
            });

            // reducing the data to a simple array
            let entriesReduced;
            if (entries && Array.isArray(entries)) {
                entriesReduced = entries.reduce((acc, item) => {
                    acc = acc || [];
                    console.log(acc);
                    acc.push({
                        id: item.id,
                        slug: item.Slug || '',
                        undanganID: item.UndanganID || '',
                        pengantin_wanita: {
                            nama_panggilan: item.Pengantin_Wanita?.Nama_Panggilan || '',
                        }
                    });
                    return acc;
                }, [])

                // returning the reduced data
                return entriesReduced;
            }
        } catch (err) {
            return err;
        }
    }
}));


// 'use strict';

// module.exports = {
//     getAllDataUndangan: async () => {
//         try {
//             // fetching the data
//             // we dont really need contentSections for this example.
//             // its kept here, just for your reference
//             const entries = await strapi.entityService.findMany('api::data-undangan.data-undangan', {
//                 fields: ['id', 'Slug'],
//             });

//             // reducing the data to a simple array
//             let entriesReduced;
//             if (entries && Array.isArray(entries)) {
//                 entriesReduced = entries.reduce((acc, item) => {
//                     acc = acc || [];
//                     console.log(acc);
//                     acc.push({
//                         id: item.id,
//                         slug: item.Slug || '',
//                     });
//                     return acc;
//                 }, [])

//                 // returning the reduced data
//                 return entriesReduced;
//             }
//         } catch (err) {
//             return err;
//         }
//     },
// }