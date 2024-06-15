import { defineConfig } from "astro/config";
import db from "@astrojs/db";
import react from "@astrojs/react";
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [db(), react(), icon(), tailwind({ applyBaseStyles: false })],
  output: "server",
  adapter: netlify(),
});
