/**
 * Order Store
 * ============================================
 * Manages order creation, tracking, and status updates
 * 
 * Key responsibilities:
 * - Create and store orders
 * - Retrieve orders by ID
 * - Track order status throughout lifecycle
 * - Update order status
 * 
 * Order Status Flow:
 * - pending: Order received but not yet processed
 * - completed: Payment processed and order confirmed
 * - shipped: Order sent to customer (future enhancement)
 * - delivered: Order received by customer (future enhancement)
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'

// ============================================
// CONSTANTS
// ============================================
const ORDER_ID_PREFIX = 'ORD-'
const INITIAL_ORDER_STATUS = 'pending'
const COMPLETED_ORDER_STATUS = 'completed'

export const useOrderStore = defineStore('orders', () => {
  // ============================================
  // STATE
  // ============================================
  
  const orders = ref([])

  // ============================================
  // METHODS: Order Management
  // ============================================
  
  /**
   * Create a new order from order data
   * @param {object} orderData - Order details (customer, items, total, etc)
   * @returns {object} Created order with ID, timestamp, and status
   */
  const createOrder = (orderData) => {
    const order = {
      id: `${ORDER_ID_PREFIX}${Date.now()}`,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: INITIAL_ORDER_STATUS
    }
    orders.value.push(order)
    return order
  }

  /**
   * Retrieve an order by its ID
   * @param {string} orderId - The order ID to search for
   * @returns {object|undefined} The order object or undefined if not found
   */
  const getOrderById = (orderId) => {
    return orders.value.find(o => o.id === orderId)
  }

  /**
   * Update the status of an order
   * @param {string} orderId - The order ID to update
   * @param {string} status - New status value (pending, completed, shipped, delivered)
   */
  const updateOrderStatus = (orderId, status) => {
    const order = getOrderById(orderId)
    if (order) {
      order.status = status
    }
  }

  /**
   * Mark an order as completed (convenience method)
   * @param {string} orderId - The order ID to complete
   */
  const completeOrder = (orderId) => {
    updateOrderStatus(orderId, COMPLETED_ORDER_STATUS)
  }

  // ============================================
  // EXPORTS: Public API
  // ============================================
  
  return {
    // State
    orders,
    
    // Methods
    createOrder,
    getOrderById,
    updateOrderStatus,
    completeOrder
  }
})
