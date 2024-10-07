import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react({
  parserConfig(id) {
    if (id.endsWith(".res")) return { syntax: "ecmascript", jsx: true };
    if (id.endsWith(".ts")) return { syntax: "typescript", tsx: false };
  },
})],
});
