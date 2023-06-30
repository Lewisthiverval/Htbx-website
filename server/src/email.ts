import sgMail from "@sendgrid/mail";

export const sendEmail = () => {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) throw new Error(`Missing AIRTABLE_BASEID environment variable`);
  sgMail.setApiKey(apiKey);
  const msg = {
    to: "lewishtbxtest@gmail.com", // Change to your recipient
    from: "lewismurray78@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
