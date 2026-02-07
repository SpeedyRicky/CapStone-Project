/**
 * Product Store
 * ============================================
 * Manages product data, filtering, and retrieval across the application
 * 
 * Key responsibilities:
 * - Maintains catalog of products
 * - Provides product filtering by category
 * - Retrieves individual products by ID
 * - Manages available product categories
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('products', () => {
  // ============================================
  // STATE: Product Data
  // ============================================
  
  const products = ref([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 199.99,
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      rating: 4.8,
      reviews: 245
    },
    {
      id: 2,
      name: 'Ultra-Slim Laptop',
      price: 1299.99,
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      description: 'Lightweight laptop perfect for professionals with stunning display and powerful processor.',
      rating: 4.9,
      reviews: 189
    },
    {
      id: 3,
      name: 'Smart Watch Pro',
      price: 349.99,
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      description: 'Advanced smartwatch with health tracking and seamless smartphone integration.',
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: 'Premium Camera',
      price: 899.99,
      category: 'accessories',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREu4zWGDbxZjANc1pnoAjASEyRxEggie0ddg&s',
      description: 'Professional-grade digital camera with 4K video and exceptional low-light performance.',
      rating: 4.9,
      reviews: 234
    },
    {
      id: 5,
      name: 'Portable Speaker',
      price: 129.99,
      category: 'accessories',
      image: 'https://www.canex.ca/media/catalog/product/i/q/iq-wave-party-portable-bluetooth-speaker-black-ea1-059497279277_b-nznip.jpg?width=560&height=560&quality=80&bg-color=255,255,255&fit=bounds',
      description: 'Waterproof portable speaker with rich bass and 12-hour battery.',
      rating: 4.6,
      reviews: 312
    },
    {
      id: 6,
      name: 'USB-C Hub Pro',
      price: 79.99,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
      description: 'Multi-port USB-C hub with Ethernet and 4K HDMI support.',
      rating: 4.5,
      reviews: 89
    }
  ])

  // ============================================
  // METHODS: Product Retrieval
  // ============================================
  
  /**
   * Get a single product by ID
   * @param {number|string} id - The product ID to search for
   * @returns {object|undefined} The product object or undefined if not found
   */
  const getProductById = (id) => {
    return products.value.find(p => p.id === parseInt(id))
  }

  /**
   * Get all products filtered by category
   * @param {string} category - The category to filter by (exact match)
   * @returns {array} Array of products in the specified category
   */
  const getProductsByCategory = (category) => {
    return products.value.filter(p => p.category === category)
  }

  // ============================================
  // COMPUTED: Derived Properties
  // ============================================
  
  /**
   * Get all unique product categories available
   * @returns {array} Array of unique category strings
   */
  const getAllCategories = computed(() => {
    return [...new Set(products.value.map(p => p.category))]
  })

  // ============================================
  // EXPORTS: Public API
  // ============================================
  
  return {
    products,
    getProductById,
    getProductsByCategory,
    getAllCategories
  }
})
