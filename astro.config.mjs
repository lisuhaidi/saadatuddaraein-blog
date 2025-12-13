// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));



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
    },
    server: {
      allowedHosts: ['www.julisuhaidi.my.id'],
    },
  }
});

