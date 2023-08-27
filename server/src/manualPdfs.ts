import { createTickets, confirmEmail } from "./email";

type namesAndEmail = {
  namesAndQuantity: Array<object>;
  email: string;
};

const data: Array<namesAndEmail> = [
  {
    namesAndQuantity: [{ name: "lewis", quantity: 1 }],
    email: "lewismurray78@gmail.com",
  },
  {
    namesAndQuantity: [{ name: "guest", quantity: 1 }],
    email: "becky@htbx.london",
  },
  // {
  //   namesAndQuantity: [{ name: "kelly", quantity: 3 }],
  //   email: "kxllyxcx@hotmail.com",
  // },
  // {
  //   namesAndQuantity: [{ name: "kelly's Guest", quantity: 1 }],
  //   email: "kxllyxcx@hotmail.com",
  // },
  // {
  //   namesAndQuantity: [{ name: "Kelly's other guest", quantity: 1 }],
  //   email: "kxllyxcx@hotmail.com",
  // },
  // {
  //   namesAndQuantity: [{ name: "luke", quantity: 1 }],
  //   email: "lukehnichols@gmail.com",
  // },
  // {
  //   namesAndQuantity: [{ name: "Pedro", quantity: 1 }],
  //   email: "phrabelo@hotmail.com",
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
