import Airtable from "airtable";

type Member = {
  name: string;
  code: string;
  price: number;
  remaining: number;
  purchased: number;
  payment_intent: string;
  email: string;
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
