import sgMail from "@sendgrid/mail";
import { createTicket } from "./qrtest";
import { nanoid } from "nanoid";
// const fs = require("fs");
const path = require("path");

export const sendEmail = (
  adress: string,
  quantity: number,
  names: Array<string>
) => {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) throw new Error(`Missing AIRTABLE_BASEID environment variable`);
  sgMail.setApiKey(apiKey);
  const ticketIds = [];

  for (let i = 0; i < quantity; i++) {
    const data = { id: nanoid(), name: names[i] };
    createTicket(data);
    ticketIds.push(data.id);
  }

  const currentDirectory = process.cwd();
  const filesToAttach = ticketIds.map((id) => {
    const fileName = `ticket${id}.png`;

    const filePath = path.join(currentDirectory, "/src/tickets", fileName);
    return {
      content: filePath,
      filename: fileName,
      type: "application/pdf",
      disposition: "attachment",
    };
    // if (fs.existsSync(`filePath/${fileName}`)) {
    //   return {
    //     content: filePath,
    //     filename: fileName,
    //     type: "application/pdf",
    //     disposition: "attachment",
    //   };
    // } else {
    //   console.log(`File ${fileName} does not exist.`);
    //   return "doesnt exist";
    // }
  });

  const msg = {
    to: adress, // Change to your recipient
    from: "lewismurray78@gmail.com", // Change to your verified sender
    subject: "HTBX",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    attachments: filesToAttach,
  };

  return sgMail
    .send(msg)
    .then(() => {
      return "Sent";
    })
    .catch((error) => {
      console.error(error);
    });
};
