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

type Qr = {
  name: string;
  id: string;
  scanned: string;
};
const base = new Airtable({ apiKey: env.AIRTABLE_SECRET_TOKEN }).base(
  env.AIRTABLE_BASEID
);

const table = base<Member>(env.AIRTABLE_NAME);
const qrTable = base<Qr>("QRcodes");

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
    });

    return total.reduce((prev, curr) => prev + curr, 0);
  } catch (error) {
    console.error("Error in getAllTicketsFromCode:", error);
    throw new Error("can't get tickets!");
  }
};

export const addQRcode = async (ID: string, name: string) => {
  try {
    const newQRCode = await qrTable.create({
      name: name,
      id: ID,
      scanned: "false",
    });
    console.log("Added QR code:", newQRCode);
    return newQRCode;
  } catch (error) {
    console.error("Error adding QR code:", error);
    throw error;
  }
};

export const checkQR = async (ID: string) => {
  try {
    const qr: any = await qrTable
      .select({ filterByFormula: `{ID} = "${ID}"` })
      .all()
      .then((records) => {
        return records?.[0];
      });

    if (!qr) {
      return "QR not found";
    }
    if (qr.fields.scanned === "true") {
      return "QR invalid";
    }
    await qrTable.update(qr.id, {
      scanned: "true",
    });
    return "QR code scanned successfully";
  } catch (error) {
    console.error("Couldn't find or update QR code:", error);
    throw error;
  }
};
