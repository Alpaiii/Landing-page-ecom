import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://roquace.com',
  trailingSlash: 'never',
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
  }
});
