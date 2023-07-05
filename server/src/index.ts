import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") config();

import { app } from "./api";

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`API available on http://localhost:${port}`)
);
