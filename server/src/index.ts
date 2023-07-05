import { config } from "dotenv";

import { app } from "./api";

if (process.env.NODE_ENV !== "production") config();

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`API available on http://localhost:${port}`)
);
