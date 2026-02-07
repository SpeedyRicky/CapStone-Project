/**
 * Shopping Cart Store
 * ============================================
 * Manages shopping cart state, item management, and order calculations
 * 
 * Key responsibilities:
 * - Store cart items with unique IDs
 * - Add/remove/update cart items
 * - Calculate subtotal, tax, shipping, and total
 * - Clear entire cart
 * 
 * Business Rules (configurable in src/config.js):
 * - Tax rate: 10% of subtotal
 * - Free shipping: On orders over $100
 * - Standard shipping: $10
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// No tax/shipping calculations for simplified checkout

export const useCartStore = defineStore('cart', () => {
  // ============================================
  // STATE
  // ============================================
  
  const items = ref([])

  // ============================================
  // METHODS: Cart Management
  // ============================================
  
  /**
   * Add a product to cart or increase quantity if already exists
   * @param {object} product - Product object with id, name, price, image
   * @param {number} quantity - Number of items to add (default: 1)
   */
  const addToCart = (product, quantity = 1) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        ...product,
        quantity,
        cartItemId: `${product.id}-${Date.now()}`
      })
    }
  }

  /**
   * Remove an item from cart by its cart item ID
   * @param {string} cartItemId - Unique identifier for the cart item
   */
  const removeFromCart = (cartItemId) => {
    items.value = items.value.filter(item => item.cartItemId !== cartItemId)
  }

  /**
   * Update quantity of a cart item (removes if quantity <= 0)
   * @param {string} cartItemId - Unique identifier for the cart item
   * @param {number} quantity - New quantity value
   */
  const updateQuantity = (cartItemId, quantity) => {
    const item = items.value.find(item => item.cartItemId === cartItemId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(cartItemId)
      } else {
        item.quantity = quantity
      }
    }
  }

  /**
   * Remove all items from the cart
   */
  const clearCart = () => {
    items.value = []
  }

  // ============================================
  // COMPUTED: Derived Values & Calculations
  // ============================================
  
  /**
   * Total count of all items in cart (sum of quantities)
   * @returns {number}
   */
  const cartCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  /**
   * Subtotal before tax and shipping
   * @returns {number}
   */
  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  /**
   * Final total price (subtotal only)
   * @returns {number}
   */
  const total = computed(() => {
    return parseFloat(subtotal.value.toFixed(2))
  })

  // ============================================
  // EXPORTS: Public API
  // ============================================
  
  return {
    // State
    items,
    
    // Methods
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    
    // Computed
    cartCount,
    subtotal,
    total
  }
})
