const pdfkit = require("pdfkit");
const fs = require("fs");
const path = require("path");
const Qrcode = require("qrcode");
// const nanoid = require("nanoid");

export const createTicket = async (data: any) => {
  const doc = new pdfkit();
  const qrCodeData = "Your ticket data"; // Replace with your ticket data
  const qrCodePath = path.join(__dirname, "tickets", `${data.name}qrcode.png`);
  await Qrcode.toFile(qrCodePath, qrCodeData);
  const pdfPath = path.join(__dirname, "tickets", `ticket_${data.name}.pdf`);
  console.log(pdfPath);
  doc.pipe(fs.createWriteStream(pdfPath));
  doc.fontSize(20).text(`${data.name}`, { align: "center" });
  doc.moveDown();
  doc.image(qrCodePath, { width: 200, align: "center" });
  doc.end();
};

export const createTickets = async (names: Array<any>) => {
  const fileCreationPromises = [];
  for (let i = 0; i < names.length; i++) {
    const data = { name: names[i].name };
    const promise = await createTicket(data);
    fileCreationPromises.push(promise);
  }

  await Promise.all(fileCreationPromises);
};

createTicket({ name: "becky" });
