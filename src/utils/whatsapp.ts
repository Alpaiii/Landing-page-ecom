import { siteConfig } from '../config/site';

/**
 * Encode WhatsApp message text
 */
export function encodeWhatsAppText(text: string): string {
  return encodeURIComponent(text);
}

/**
 * Generate WhatsApp URL
 */
export function generateWhatsAppUrl(message: string, phoneNumber: string = siteConfig.contact.whatsapp): string {
  return `https://wa.me/${phoneNumber}?text=${encodeWhatsAppText(message)}`;
}

/**
 * Generate product inquiry message
 */
export function generateProductInquiryMessage(product: {
  name: string;
  price: number;
  color?: string;
  size?: string;
  quantity?: number;
}): string {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  let message = `Hi, I am interested in:\n\nProduct: ${product.name}\n`;

  if (product.color) {
    message += `Color: ${product.color}\n`;
  }
  
  if (product.size) {
    message += `Size: ${product.size}\n`;
  }
  
  if (product.quantity) {
    message += `Quantity: ${product.quantity}\n`;
  }
  
  message += `Price: ${formatPrice(product.price)}\n\n`;
  message += `Is this product available?`;

  return message;
}

/**
 * Generate cart order message
 */
export function generateCartOrderMessage(items: Array<{
  name: string;
  color?: string;
  size?: string;
  quantity: number;
  price: number;
}>, total: number): string {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  let message = `Hi, I would like to order:\n\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    if (item.color || item.size) {
      message += `   ${item.color || ''}${item.color && item.size ? ' / ' : ''}${item.size || ''}\n`;
    }
    message += `   Qty: ${item.quantity}\n`;
    message += `   Price: ${formatPrice(item.price)}\n\n`;
  });

  message += `Total: ${formatPrice(total)}\n\n`;
  message += `Please confirm my order. Thank you!`;

  return message;
}

/**
 * Generate customer support message
 */
export function generateSupportMessage(topic?: string): string {
  let message = `Hi, I have a question`;
  
  if (topic) {
    message += ` about ${topic}`;
  }
  
  message += `. Can you help me?`;
  
  return message;
}

/**
 * Generate order tracking message
 */
export function generateTrackingMessage(orderId: string): string {
  return `Hi, I would like to check the status of my order: ${orderId}. Can you provide an update?`;
}

/**
 * Open WhatsApp with message
 */
export function openWhatsApp(message: string, phoneNumber: string = siteConfig.contact.whatsapp): void {
  const url = generateWhatsAppUrl(message, phoneNumber);
  window.open(url, '_blank');
}
