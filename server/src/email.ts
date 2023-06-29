const nodemailer = require("nodemailer");

const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      user: "lewismurray78@gmail.com",
      pass: "Scot13141314!",
    },
  });

  const info = await transporter.sendMail({
    from: "lewismurray78@gmail.com",
    to: "lewishtbxtest@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.messageId);
  //
};
