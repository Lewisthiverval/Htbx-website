const pdfkit = require("pdfkit");
const fs = require("fs");
const path = require("path");
const Qrcode = require("qrcode");

export const createTicket = async (data: any) => {
  const doc = new pdfkit();

  // Generate QR code
  // const qrCodeData = "Your ticket data"; // Replace with your ticket data
  // const qrCodePath = path.join(__dirname, "tickets/qrcodes", "qrcode.png");
  // await Qrcode.toFile(qrCodePath, qrCodeData);

  // Set up PDF document
  const pdfPath = path.join(__dirname, "tickets", `ticket${data.name}.pdf`);
  doc.pipe(fs.createWriteStream(pdfPath));

  // Write content to PDF
  doc.fontSize(20).text(`${data.name}`, { align: "center" });
  doc.moveDown();
  //   doc.image(qrCodePath, { width: 200, align: "center" });
  doc.end();
};
