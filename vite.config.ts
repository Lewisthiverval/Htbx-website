import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { Rollup } from "vite";
import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  build: { outDir: "build" },
  define: {
    "process.env.REACT_APP_API_URL": `'${
      process.env.REACT_APP_API_URL || "https://htbx.fly.dev"
    }'`,
  },
});
