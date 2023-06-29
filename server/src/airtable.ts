import Airtable from "airtable";

type Member = {
  code: string;
  price: number;
  remaining: number;
  purchased: number;
  payment_intent: string;
};

export const queryMemberBy = async (key: string, value: string) => {
  const baseId = process.env.AIRTABLE_BASEID;
  if (!baseId) throw new Error(`Missing AIRTABLE_BASEID environment variable`);
  const base = new Airtable({ apiKey: process.env.AIRTABLE_SECRET_TOKEN }).base(
    baseId
  );
  const tableName = process.env.AIRTABLE_NAME;
  if (!tableName) throw new Error(`Missing AIRTABLE_NAME environment variable`);
  const table = base<Member>(tableName);
  const member = await table
    .select({
      filterByFormula: `{${key}} = '${value}'`,
    })
    .all()
    .then((x) => x?.[0]);

  return { member, table };
};
