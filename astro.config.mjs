import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://roquace-fashion.up.railway.app',
  trailingSlash: 'never',
  output: 'server',
  adapter: node({ mode: 'middleware' }),
  integrations: [tailwind()],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
    formats: ['webp', 'avif'],
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      target: 'esnext'
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 4321
  }
});
