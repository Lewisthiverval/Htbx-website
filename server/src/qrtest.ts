const Qrcode = require("qrcode");
const path = require("path");

export const createTicket = (data: any) => {
  const str = JSON.stringify(data);

  const filename = `ticket${data?.id}.png`;
  const filePath = path.join(__dirname, "tickets", filename);
  Qrcode.toFile(filePath, str, function (err: Error, url: any) {
    if (err) console.log("error", `✘ ${err}`);
  });
};
