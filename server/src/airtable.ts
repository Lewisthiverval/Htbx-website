import Airtable from "airtable";

export const setUserPaymentComplete = async (payment_intent) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_SECRET_TOKEN }).base(
    "appe8kR3xJxcj1Jsr"
  );
  const table = base("members");
  const member = await table
    .select({ filterByFormula: `{payment_intent} = '${payment_intent}'` })
    .all();

  console.log({ member, payment_intent });
  const id = member[0].id;
  return await table.update(id, { Status: "purchased" });
};

export const getMemberByCode = async (code) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_SECRET_TOKEN }).base(
    "appe8kR3xJxcj1Jsr"
  );
  const table = base("members");
  const member = await table
    .select({
      filterByFormula: `{code} = '${code}'`,
    })
    .all()
    .then((x) => x?.[0]);
  if (!member) return Promise.reject(`Missing member with code ${code}`);
  return member;
};

export const setUserPaymentIntentId = async (code, payment_intent) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_SECRET_TOKEN }).base(
    "appe8kR3xJxcj1Jsr"
  );
  const table = base("members");
  const member = await table
    .select({
      filterByFormula: `{code} = '${code}'`,
    })
    .all();

  const id = member?.[0]?.id;
  if (!id) return Promise.reject(new Error(`Missing person with code ${code}`));
  return await table.update(id, { payment_intent });
};
