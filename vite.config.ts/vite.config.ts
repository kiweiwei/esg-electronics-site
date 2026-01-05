import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/esg-electronics-site/" // ⚠️ 一定要和 repo 名稱一樣
});
