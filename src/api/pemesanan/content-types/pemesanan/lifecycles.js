const generator = require('generate-password');
const axios = require("axios");

module.exports = {
    async afterUpdate(event) {

        // const password = generator.generate({
        //     length: 10,
        //     numbers: true
        // });
        const password = "password007";

        const { result } = event

        console.log(password)

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