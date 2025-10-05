import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import solidJs from '@astrojs/solid-js';



import netlify from '@astrojs/netlify';



// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://bobk.name/', // canonical URL for your site
  integrations: [solidJs()],
  output: 'server',
  adapter: netlify(),
});