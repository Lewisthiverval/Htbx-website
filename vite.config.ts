import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  build: { outDir: "build" },
  define: {
    "process.env.REACT_APP_API_URL": `'${
      process.env.REACT_APP_API_URL ||
      "http://localhost:3001" ||
      "https://htbx.fly.dev"
    }'`,
  },
});
