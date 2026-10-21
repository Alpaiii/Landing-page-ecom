import type { APIRoute } from 'astro';
import { fetchProducts } from '../utils/productApi';

export const prerender = false;

export const GET: APIRoute = async ({ site }) => {
  const products = await fetchProducts();
  const base = (site?.href ?? 'https://roquace.com').replace(/\/$/, '');

  const staticRoutes = [
    ['/', '1.0'],
    ['/shop', '0.9'],
    ['/collections', '0.7'],
    ['/lookbook', '0.7'],
    ['/about', '0.5'],
    ['/contact', '0.5'],
    ['/faq', '0.5'],
    ['/size-guide', '0.5'],
    ['/shipping-returns', '0.4'],
    ['/privacy', '0.3'],
    ['/terms', '0.3'],
    ['/track-order', '0.4'],
  ];

  const entries = [
    ...staticRoutes.map(([path, priority]) => ({ loc: `${base}${path}`, priority })),
    ...products.map((product) => ({
      loc: `${base}/products/${product.slug}`,
      priority: '0.8',
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map((entry) => `  <url><loc>${entry.loc}</loc><priority>${entry.priority}</priority></url>`)
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};