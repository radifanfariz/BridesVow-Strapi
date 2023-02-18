const axios = require('axios');

module.exports = () => {
  return async (ctx, next) => {
    const recaptchaResponse = ctx.request.body.recaptchaResponse;
    const recaptchaSecretKey = '6Le05zkkAAAAAGAPgIJkYxUDkpmSQQkShGS5R5hU';

    if (!recaptchaResponse) {
      ctx.badRequest('reCAPTCHA response is missing.');
    }

    const verificationResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaResponse}`
    );

    if (!verificationResponse.data.success) {
      ctx.badRequest('reCAPTCHA verification failed.');
    }

    // reCAPTCHA validation successful, continue with the request
    await next();
  }
}