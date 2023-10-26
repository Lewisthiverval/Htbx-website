import { createTickets, confirmEmail } from "./email";

type namesAndEmail = {
  namesAndQuantity: Array<object>;
  email: string;
};

const data: Array<namesAndEmail> = [
  {
    namesAndQuantity: [{ name: "Farren", quantity: 1 }],
    email: "farrengardner@gmail.com",
  },
  {
    namesAndQuantity: [{ name: "Farren's + 1", quantity: 1 }],
    email: "farrengardner@gmail.com",
  },
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

sendTicketsManually(data);
