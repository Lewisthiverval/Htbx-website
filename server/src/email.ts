import sgMail from "@sendgrid/mail";
import pdfkit from "pdfkit";
import Qrcode from "qrcode";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import * as env from "./env";
import { addQRcode } from "./airtable";

const ticketsDir = path.join(__dirname, "tickets");
const SavedticketDir = path.join(__dirname, "tickets");

export const createPdf = (
  pdfPath: string,
  qrCodePath: string,
  name: string
) => {
  const doc = new pdfkit();
  doc.pipe(fs.createWriteStream(pdfPath));
  doc.image(qrCodePath, { width: 200, align: "center" });
  doc.moveDown();
  doc.fontSize(16).text(`${name}`);
  doc.moveDown();
  doc
    .fontSize(8)
    .text(
      "You cannot sell or give your ticket to anyone else, doing so will result in that person being denied entry."
    );
  doc.moveDown();
  doc
    .fontSize(8)
    .text(
      "If you can no longer attend, please e-mail htbxlondon@gmail.com to be issued a full refund, applicable until 48 hours before the party."
    );
  doc.moveDown();
  doc.moveDown();
  doc.fontSize(12).text("NO photography is allowed");
  doc.fontSize(12).text("18+ / bring ID");
  doc.moveDown();
  doc.fontSize(12).text("29/10/23  13:00 to 00:00");
  doc.moveDown();
  doc.fontSize(12).text("Address:");
  doc.fontSize(12).text("SET Woolwich");
  doc.fontSize(12).text("SE18 6LS");
  doc.fontSize(12).text("Entrance via Bunton Street");
  doc.end();
};

export const createTicket = async (data: any) => {
  try {
    const doc = new pdfkit();
    const qrCodeObj = { name: data.name, id: uuidv4() };
    const qrCodeData = JSON.stringify({
      name: qrCodeObj.name,
      id: qrCodeObj.id,
    });

    if (!fs.existsSync(ticketsDir))
      fs.mkdirSync(ticketsDir, { recursive: true });
    const qrCodePath = path.join(ticketsDir, `${data.name}qrcode.png`);
    const qrCodePath2 = path.join(SavedticketDir, `${data.name}qrcode.png`);
    await Qrcode.toFile(qrCodePath, qrCodeData);
    await Qrcode.toFile(qrCodePath2, qrCodeData);
    await addQRcode(qrCodeObj.id, qrCodeObj.name, data.email);
    const pdfPath = path.join(ticketsDir, `ticket_${data.name}.pdf`);
    const pdfPath2 = path.join(SavedticketDir, `ticket_${data.name}.pdf`);
    createPdf(pdfPath2, qrCodePath2, data.name);
    createPdf(pdfPath, qrCodePath, data.name);
  } catch (error) {
    console.error("error creating ticket");
    console.log(error);
  }
};

export const createTickets = async (names: Array<any>, email: string) => {
  const fileCreationPromises = [];
  for (let i = 0; i < names.length; i++) {
    const data = { name: names[i].name, email: email };
    const promise = await createTicket(data);
    fileCreationPromises.push(promise);
  }

  await Promise.all(fileCreationPromises);
};

export const confirmEmail = async (names: Array<any>, address: string) => {
  sgMail.setApiKey(
    "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"
  );

  let tickets: Array<any> = [];

  names.forEach((name) => {
    for (let i = 0; i < name.quantity; i++) {
      names.forEach((x) => {
        const fileName = `ticket_${x.name}.pdf`;
        const filePath = path.join(ticketsDir, fileName);
        const fileContent = fs.readFileSync(filePath, { encoding: "base64" });
        tickets.push({
          content: fileContent,
          filename: fileName,
          type: "application/pdf",
          disposition: "attachment",
        });
      });
    }
  });

  const msg = {
    from: "hi@htbx.london",
    to: address,
    subject: "HTBX 27.08.23",
    text: "HTBX ticket",
    attachments: tickets,
  };
  await sgMail.send(msg);
};
