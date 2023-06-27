import Airtable from "airtable";

type Member = {
  code: string;
  price: number;
  remaining: number;
  purchased: number;
  payment_intent: string;
};

export const queryMemberBy = async (key: string, value: string) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_SECRET_TOKEN }).base(
    process.env.AIRTABLE_BASEID
  );
  const table = base<Member>(process.env.AIRTABLE_NAME);
  const member = await table
    .select({
      filterByFormula: `{${key}} = '${value}'`,
    })
    .all()
    .then((x) => x?.[0]);

  return { member, table };
};
