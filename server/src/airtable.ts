import Airtable from "airtable";
import { nanoid } from "nanoid";

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

export const queryMemberBy = async (
  keys: Array<string>,
  values: Array<string>
) => {
  const baseId = process.env.AIRTABLE_BASEID;
  if (!baseId) throw new Error(`Missing AIRTABLE_BASEID environment variable`);
  const base = new Airtable({ apiKey: process.env.AIRTABLE_SECRET_TOKEN }).base(
    baseId
  );
  const tableName = process.env.AIRTABLE_NAME;
  if (!tableName) throw new Error(`Missing AIRTABLE_NAME environment variable`);
  const table = base<Member>(tableName);
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
    const baseId = process.env.AIRTABLE_BASEID;
    if (!baseId)
      throw new Error(`Missing AIRTABLE_BASEID environment variable`);
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_SECRET_TOKEN,
    }).base(baseId);
    const tableName = process.env.AIRTABLE_NAME;
    if (!tableName)
      throw new Error(`Missing AIRTABLE_NAME environment variable`);
    const table = base<Member>(tableName);

    const members = await table
      .select({
        filterByFormula: `AND({code} = '${code}', {remaining} > 0)`,
      })
      .all();

    const recordsWithId = members.map((member) => {
      if (member.fields.ID) {
        return { ...member.fields, quantity: 1 };
      }
      const id = nanoid();
      const record = {
        ...member.fields,
        ID: id,
        quantity: 1,
      };

      table.update([{ id: member.id, fields: { ID: id } }]);
      return record;
    });

    return recordsWithId;
  } catch (error) {
    console.error("Error in getAllTicketsFromCode:", error);
    throw error;
  }
};
