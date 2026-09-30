import { siteConfig } from '../config/site';

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency: string = siteConfig.currency): string {
  return new Intl.NumberFormat(siteConfig.currencyLocale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format price without currency symbol
 */
export function formatPriceNumber(price: number): string {
  return new Intl.NumberFormat(siteConfig.currencyLocale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: string = siteConfig.currency): string {
  const formatter = new Intl.NumberFormat(siteConfig.currencyLocale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  const parts = formatter.formatToParts(0);
  const currencyPart = parts.find((part) => part.type === 'currency');
  
  return currencyPart?.value || siteConfig.currencySymbol;
}

/**
 * Parse price from string (remove currency formatting)
 */
export function parsePrice(priceString: string): number {
  return parseInt(priceString.replace(/[^\d]/g, ''), 10) || 0;
}

/**
 * Calculate discount percentage
 */
export function calculateDiscountPercentage(originalPrice: number, salePrice: number): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Calculate total price
 */
export function calculateTotal(prices: number[]): number {
  return prices.reduce((sum, price) => sum + price, 0);
}
