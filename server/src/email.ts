import sgMail from "@sendgrid/mail";
import { createTicket } from "./qrtest";
import { nanoid } from "nanoid";
const fs = require("fs");
const path = require("path");

export const sendEmail = async (
  address: string,
  quantity: number,
  names: Array<string>
) => {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) throw new Error(`Missing AIRTABLE_BASEID environment variable`);
  sgMail.setApiKey(apiKey);
  const ticketInfo: Array<any> = [{ id: nanoid(), name: "becky" }];

  // for (let i = 0; i < quantity; i++) {
  //   const data = { id: nanoid(), name: "becky" };
  //   createTicket(data);
  //   ticketInfo.push({ id: data.id, name: "becky" });
  // }

  const directoryPath = __dirname;
  const filesToAttach = ticketInfo.map((id) => {
    const fileName = `ticket${id.name}.pdf`;

    const filePath = path.join(directoryPath, "tickets", fileName);

    return {
      content: filePath,
      filename: fileName,
      type: "application/pdf",
      disposition: "attachment",
    };
  });

  const msg = {
    to: address, // Change to your recipient
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
