const sgMail = require("@sendgrid/mail");
const fs = require("fs");
const path = require("path");

// export const sendEmail = async (address: string, names: Array<any>) => {
//   const apiKey = process.env.SENDGRID_API_KEY;

//   if (!apiKey) throw new Error(`Missing AIRTABLE_BASEID environment variable`);

//   sgMail.setApiKey(apiKey);
// const quantity = names
//   .map((x: any) => x.quantity)
//   .reduce((prev: number, curr: number) => {
//     return prev + curr;
//   }, 0);

// const directoryPath = __dirname;
// const filesToAttach = names.map((name) => {
//   for (let i = 1; i < name.quantity; i++) {
//     const fileName = `ticket${name}.pdf`;
//     const filePath = path.join(directoryPath, "tickets", fileName);
//     const fileContent = fs.readFileSync(filePath, { encoding: "base64" });

//     return {
//       content: fileContent,
//       filename: fileName,
//       type: "application/pdf",
//       disposition: "attachment",
//     };
//   }
// });

//   const msg = {
//     to: "sandbox@example.com", // Use a registered sandbox recipient address
//     from: "sandbox@example.com", // Change to your verified sender
//     subject: "HTBX",
//     text: "and easy to do anywhere, even with Node.js",
//     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
//     // attachments: filesToAttach,
//   };

//   return sgMail
//     .send(msg)
//     .then(() => {
//       return "Sent";
//     })
//     .catch((error: Error) => {
//       console.error(error);
//     });
// };

const key = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(key);

// export async function sendEmail() {

//   const msg = {
//     to: "lewismurray78@gmail.com",
//     from: "lewismurray78@gmail.com", // Set the email address from which you want to send the email
//     subject: "whatever",
//     text: "hiiiii",
//   };

//   try {
//     await sgMail.send(msg);
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// }
