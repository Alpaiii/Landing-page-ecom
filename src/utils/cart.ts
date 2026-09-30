import type { Product } from '../data/products';

/**
 * Cart item interface
 */
export interface CartItem {
  productId: string;
  product: Product;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

/**
 * Cart state interface
 */
export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const CART_STORAGE_KEY = 'roquace_cart';

/**
 * Get cart from localStorage
 */
export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const cartJson = localStorage.getItem(CART_STORAGE_KEY);
    return cartJson ? JSON.parse(cartJson) : [];
  } catch {
    return [];
  }
}

/**
 * Save cart to localStorage
 */
export function saveCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
}

/**
 * Add item to cart
 */
export function addToCart(item: Omit<CartItem, 'productId'> & { productId: string }): CartItem[] {
  const cart = getCart();
  
  // Check if item already exists with same product, color, and size
  const existingIndex = cart.findIndex(
    (i) => i.productId === item.productId && i.color === item.color && i.size === item.size
  );
  
  if (existingIndex > -1) {
    // Update quantity
    cart[existingIndex].quantity += item.quantity;
  } else {
    // Add new item
    cart.push(item as CartItem);
  }
  
  saveCart(cart);
  return cart;
}

/**
 * Remove item from cart
 */
export function removeFromCart(productId: string, color: string, size: string): CartItem[] {
  const cart = getCart();
  const updatedCart = cart.filter(
    (item) => !(item.productId === productId && item.color === color && item.size === size)
  );
  saveCart(updatedCart);
  return updatedCart;
}

/**
 * Update item quantity
 */
export function updateQuantity(productId: string, color: string, size: string, quantity: number): CartItem[] {
  const cart = getCart();
  const itemIndex = cart.findIndex(
    (item) => item.productId === productId && item.color === color && item.size === size
  );
  
  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
  }
  
  saveCart(cart);
  return cart;
}

/**
 * Clear cart
 */
export function clearCart(): void {
  saveCart([]);
}

/**
 * Calculate cart total
 */
export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Calculate cart item count
 */
export function calculateCartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Get cart state
 */
export function getCartState(): CartState {
  const items = getCart();
  return {
    items,
    total: calculateCartTotal(items),
    itemCount: calculateCartItemCount(items),
  };
}

/**
 * Check if product is in cart
 */
export function isInCart(productId: string): boolean {
  const cart = getCart();
  return cart.some((item) => item.productId === productId);
}

/**
 * Get cart item count for a specific product
 */
export function getProductCountInCart(productId: string): number {
  const cart = getCart();
  return cart
    .filter((item) => item.productId === productId)
    .reduce((count, item) => count + item.quantity, 0);
}
