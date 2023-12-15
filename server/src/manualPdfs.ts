import { x } from "pdfkit";
import { createTickets, confirmEmail } from "./email";

type namesAndEmail = {
  namesAndQuantity: Array<object>;
  email: string;
};

const data: Array<namesAndEmail> = [
  // {
  //   namesAndQuantity: [{ name: "Lorcan", quantity: 1 }],
  //   email: "lorcanabrannigan@gmail.com",
  // },
  // {
  //   namesAndQuantity: [{ name: "Robin", quantity: 1 }],
  //   email: "robin.mooneye@gmail.com",
  // },
  // {
  //   namesAndQuantity: [{ name: "Robin", quantity: 1 }],
  //   email: "lewismurray78@gmail.com",
  // },
];

export const sendTicketsManually = async (
  namesAndEmail: Array<namesAndEmail>
) => {
  namesAndEmail.forEach(async (x) => {
    await createTickets(x.namesAndQuantity, x.email);
    await new Promise((resolve) => setTimeout(() => resolve(null), 1000));
    await confirmEmail(x.namesAndQuantity, x.email);
  });

  return "files created";
};

// sendTicketsManually(data);
