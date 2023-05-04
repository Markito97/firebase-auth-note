import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  base: "firebase-auth-note",
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3005,
  },
});
