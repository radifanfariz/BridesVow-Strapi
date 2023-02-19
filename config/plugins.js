module.exports = ({ env }) => ({
    // ...
    // email: {
    //   config: {
    //     provider: 'sendgrid',
    //     providerOptions: {
    //       apiKey: env('SENDGRID_API_KEY'),
    //     },
    //     settings: {
    //       defaultFrom: "bridesvowcorp@gmail.com",
    //       defaultReplyTo: "bridesvowcorp@gmail.com",
    //     },
    //   },
    // },
      // ...
      // email: {
      //   provider: env('EMAIL_PROVIDER'),
      //   providerOptions: {
      //     host: env('EMAIL_SMTP_HOST', 'smtp-relay.sendinblue.com'),
      //     port: env('EMAIL_SMTP_PORT', 587),
      //     auth: {
      //       user: env('EMAIL_SMTP_USER'),
      //       pass: env('EMAIL_SMTP_PASS'),
      //     },
      //   },
      //   settings: {
      //     defaultFrom: env('EMAIL_ADDRESS_FROM'),
      //     defaultReplyTo: env('EMAIL_ADDRESS_REPLY'),
      //   },
      // },
      // ...
    // ...
    email: {
      config: {
        provider: "strapi-provider-email-mailjet",
          providerOptions: {
            publicApiKey: env("MAILJET_PUBLIC_KEY"),
            secretApiKey: env("MAILJET_SECRET_KEY"),
          },
          settings: {
            defaultFrom: "bridesvowcorp@gmail.com",
            defaultFromName: "BridesVow Corp",
            defaultTo: "faizfariz1998@gmail.com",
            defaultToName: "Faiz Fariz",
          },
        },
        // ...
      },
         // ...
         upload: {
            config: {
              provider: 'cloudinary',
              providerOptions: {
                cloud_name: env('CLOUDINARY_NAME'),
                api_key: env('CLOUDINARY_KEY'),
                api_secret: env('CLOUDINARY_SECRET'),
              },
              actionOptions: {
                upload: {},
                delete: {},
              },
            },
          },
          // ...
  });
