import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      workbox: {
        maximumFileSizeToCacheInBytes: 50000000,
      },
      injectRegister: "auto",
      injectManifest: {
        swDest: "dist/sw.js",
      },
    }),
  ],
});
