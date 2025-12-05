// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
   output: 'server',
  alias: {
    '@': './src',
  },
  vite: {
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: { additionalData: `@import "./src/styles/global.css";` }
    }
  }
});