import Airtable from "airtable";
import { v4 as uuid } from "uuid";
import * as env from "./env";

type Member = {
  name: string;
  code: string;
  price: number;
  remaining: number;
  purchased: number;
  payment_intent: string;
  email: string;
  ID: string;
  currQuant: number;
};
const base = new Airtable({ apiKey: env.AIRTABLE_SECRET_TOKEN }).base(
  env.AIRTABLE_BASEID
);
const table = base<Member>(env.AIRTABLE_NAME);

export const queryMemberBy = async (
  keys: Array<string>,
  values: Array<string>
) => {
  let filterByFormula = `{${keys[0]}} = '${values[0]}'`;
  if (keys.length > 1) {
    filterByFormula = `AND({${keys[0]}} = '${values[0]}', {${keys[1]}} = '${values[1]}')`;
  }
  const member = await table
    .select({
      filterByFormula,
    })
    .all()
    .then((x) => x?.[0]);
  return { member, table };
};

export const getAllTicketsFromCode = async (code: string) => {
  try {
    console.log("get all tickets", code);
    const members = await table
      .select({ filterByFormula: `AND({code} = '${code}', {remaining} > 0)` })
      .all();

    const recordsWithId = members.map((member) => {
      if (member.fields.ID) {
        return { ...member.fields, quantity: 1 };
      }
      const id = uuid();
      const record = {
        ...member.fields,
        ID: id,
        quantity: 1,
      };

      table.update([{ id: member.id, fields: { ID: id } }]);
      return record;
    });

    console.log(recordsWithId);

    return recordsWithId;
  } catch (error) {
    console.error("Error in getAllTicketsFromCode:", error);
    throw error;
  }
};

export const getPurchasedAndTotal = async () => {
  try {
    const members = await table
      .select({ filterByFormula: `{purchased} > 0` })
      .all();

    const total = members.map((x) => {
      return x.fields.purchased;
      // return {
      //   code: x.fields.code,
      //   sold: x.fields.purchased,
      //   name: x.fields.name,
      //   price: x.fields.price,
      // };
    });

    return total.reduce((prev, curr) => prev + curr, 0);
  } catch (error) {
    console.error("Error in getAllTicketsFromCode:", error);
    throw new Error("can't get tickets!");
  }
};
