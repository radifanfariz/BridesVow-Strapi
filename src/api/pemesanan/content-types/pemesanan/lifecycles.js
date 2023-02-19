const generator = require('generate-password');
const axios = require("axios");

module.exports = {
    async afterUpdate(event) {

        const password = generator.generate({
            length: 10,
            numbers: true
        });
        // const password = "password007";

        const { result } = event

        // console.log(password)

        if (result.IsPaid) {
            try {
                /* it still has problem */
                // const createdUser =  await strapi.entityService.create('plugin::users-permissions.user', {
                //     data: {
                //         username: result.OrderID,
                //         email: result.Email,
                //         password: password,
                //         role: 1,
                //         confirmed: true,
                //     },
                // });
                /*----------------------*/
                const data = {
                    username: result.OrderID,
                    email: result.Email,
                    password: password,
                }
                const response = await axios.post("http://localhost:1338/api/auth/local/register", data);

                console.log(response.data)

                await strapi.plugins.email.services.email.send({
                    to: result.Email,
                    toName: result.Nama,
                    subject: "BridesVow Account",
                    text: `This is your BridesVow Account`,
                    html: emailTemplateHtml(result.Nama, result.Email, result.OrderID, password),
                });

                // await strapi.plugins['email'].services.email.send({
                //     to: 'faizfariz1998@gmail.com',
                //     from: 'bridesvow@gmail.com',
                //     subject: 'BridesVow Auth Email',
                //     html: `<h1>Ini akun kamu untuk login</h1> <br/><p> Email: ${result.Email}, Password: ${password}</p>`
                // })

            } catch (error) {
                console.log(error)
            }
        }
    }
}

const emailTemplateHtml = (nama, email, orderId, password) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="date=no" />
    <meta name="format-detection" content="address=no" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css?family=Muli:400,400i,700,700i"
      rel="stylesheet"
    />
    <!--<![endif]-->
    <title>Email Template</title>
    <!--[if gte mso 9]>
      <style type="text/css" media="all">
        sup {
          font-size: 100% !important;
        }
      </style>
    <![endif]-->

    <style type="text/css" media="screen">
      /* Linked Styles */
      body {
        padding: 0 !important;
        margin: 0 !important;
        display: block !important;
        min-width: 100% !important;
        width: 100% !important;
        background: #001736;
        -webkit-text-size-adjust: none;
      }
      a {
        color: #66c7ff;
        text-decoration: none;
      }
      p {
        padding: 0 !important;
        margin: 0 !important;
      }
      img {
        -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */
      }
      .mcnPreviewText {
        display: none !important;
      }
      .fit-picture {
        width: 250px;
      }

      /* Mobile styles */
      @media only screen and (max-device-width: 480px),
        only screen and (max-width: 480px) {
        .mobile-shell {
          width: 100% !important;
          min-width: 100% !important;
        }

        .text-header,
        .m-center {
          text-align: center !important;
        }

        .center {
          margin: 0 auto !important;
        }
        .container {
          padding: 20px 10px !important;
        }

        .td {
          width: 100% !important;
          min-width: 100% !important;
        }

        .m-br-15 {
          height: 15px !important;
        }
        .p30-15 {
          padding: 30px 15px !important;
        }

        .m-td,
        .m-hide {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          font-size: 0 !important;
          line-height: 0 !important;
          min-height: 0 !important;
        }

        .m-block {
          display: block !important;
        }

        .fluid-img img {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
        }

        .column,
        .column-top,
        .column-empty,
        .column-empty2,
        .column-dir-top {
          float: left !important;
          width: 100% !important;
          display: block !important;
        }

        .column-empty {
          padding-bottom: 10px !important;
        }
        .column-empty2 {
          padding-bottom: 30px !important;
        }

        .content-spacing {
          width: 15px !important;
        }
      }
    </style>
  </head>
  <body
    class="body"
    style="
      padding: 0 !important;
      margin: 0 !important;
      display: block !important;
      min-width: 100% !important;
      width: 100% !important;
      background: #001736;
      -webkit-text-size-adjust: none;
    "
  >
    <table
      width="100%"
      border="0"
      cellspacing="0"
      cellpadding="0"
      bgcolor="#001736"
    >
      <tr>
        <td align="center" valign="top">
          <table
            width="650"
            border="0"
            cellspacing="0"
            cellpadding="0"
            class="mobile-shell"
          >
            <tr>
              <td
                class="td container"
                style="
                  width: 650px;
                  min-width: 650px;
                  font-size: 0pt;
                  line-height: 0pt;
                  margin: 0;
                  font-weight: normal;
                  padding: 55px 0px;
                "
              >
                <img
                class="fit-picture"
                src="https://res.cloudinary.com/dzsodhuun/image/upload/v1676807621/bridesvow_logo_1e8195debf.png?updated_at=2023-02-19T11:53:44.380Z"
                alt="BridesVow Logo"
                style="padding-bottom: 2rem; padding-left: 2rem;"
                />
                <!-- Header -->
                <!-- END Header -->

                <repeater>
                  <!-- Intro -->
                  <layout label="Intro">
                    <table
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tr>
                        <td style="padding-bottom: 10px;">
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tr>
                              <td
                                class="tbrr p30-15"
                                style="
                                  padding: 60px 30px;
                                  border-radius: 26px 26px 0px 0px;
                                "
                                bgcolor="#EBF7FF"
                              >
                                <table
                                  width="100%"
                                  border="0"
                                  cellspacing="0"
                                  cellpadding="0"
                                >
                                  <tr>
                                    <td
                                      class="h1 pb25"
                                      style="
                                        color: #000000;
                                        font-family: 'Muli', Arial, sans-serif;
                                        font-size: 20px;
                                        line-height: 46px;
                                        text-align: left;
                                        padding-bottom: 25px;
                                      "
                                    >
                                      <multiline><strong>Dear ${nama}, </strong></multiline>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      class="text-center pb25"
                                      style="
                                        color: #000000;
                                        font-family: 'Muli', Arial, sans-serif;
                                        font-size: 16px;
                                        line-height: 30px;
                                        text-align: center;
                                        padding-bottom: 25px;
                                      "
                                    >
                                      <multiline>
                                        Halo 🖐, ini akun BridesVow kamu ! <br />Silahkan
                                        login menggunakan akun tersebut.
                                        <br />
                                        <br />
                                        <strong>OrderID: ${orderId}</strong> /
                                        <strong>Email: ${email}</strong>
                                        <br />
                                        <strong>Password: ${password}</strong>
                                        <br />
                                        <br />
                                        Terima kasih sudah memilih BridesVow.com
                                        🤝.
                                      </multiline>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="center">
                                      <table
                                        class="center"
                                        border="0"
                                        cellspacing="0"
                                        cellpadding="0"
                                        style="text-align: center;"
                                      >
                                        <tr>
                                          <td
                                            class="pink-button text-button"
                                            style="
                                              background: #023658;
                                              color: #c1cddc;
                                              font-family: 'Muli', Arial,
                                                sans-serif;
                                              font-size: 14px;
                                              line-height: 18px;
                                              padding: 12px 30px;
                                              text-align: center;
                                              border-radius: 0px 22px 22px 22px;
                                              font-weight: bold;
                                            "
                                          >
                                            <multiline
                                              ><a
                                                href="https://bridesvow.com/auth/login"
                                                target="_blank"
                                                class="link-white"
                                                style="
                                                  color: #ffffff;
                                                  text-decoration: none;
                                                "
                                                ><span
                                                  class="link-white"
                                                  style="
                                                    color: #ffffff;
                                                    text-decoration: none;
                                                  "
                                                  >Buat Undangan</span
                                                ></a
                                              ></multiline
                                            >
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <!-- END Button -->
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </layout>
                </repeater>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td
                      class="p30-15 bbrr"
                      style="
                        padding: 50px 30px;
                        border-radius: 0px 0px 26px 26px;
                      "
                      bgcolor="#EBF7FF"
                    >
                      <table
                        width="100%"
                        border="0"
                        cellspacing="0"
                        cellpadding="0"
                      >
                        <tr>
                          <td
                            class="text-footer1 pb10"
                            style="
                              color: #000000;
                              font-family: 'Muli', Arial, sans-serif;
                              font-size: 16px;
                              line-height: 20px;
                              text-align: center;
                              padding-bottom: 10px;
                            "
                          >
                            <multiline
                              >BridesVow - Undangan Digital Online
                              Premium</multiline
                            >
                          </td>
                        </tr>
                        <tr>
                          <td
                            class="text-footer2"
                            style="
                              color: #023658;
                              font-family: 'Muli', Arial, sans-serif;
                              font-size: 12px;
                              line-height: 26px;
                              text-align: center;
                            "
                          >
                            <multiline
                              >Kepuasan anda adalah kebahagian kami,
                              rekomendasikan kami ke lebih banyak orang.
                              <br />https://bridesvow.com/referral (Coming
                              Soon)</multiline
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <!-- END Footer -->
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`