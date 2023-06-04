const sendgrid = require ('@sendgrid/mail');
const ejs = require ('ejs');
const path = require ('path');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
const sendEmail = async ({ to, from, subject, text, html, data }) => {
  let emailTemplate = await ejs.renderFile(path.join(__dirname, `../views/${html}.ejs`), data);
    const msg = { to, from, subject, text, html: emailTemplate };
    return sendgrid.send(msg);
};

module.exports = sendEmail;