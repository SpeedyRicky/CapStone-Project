/**
 * Application Configuration
 * =====================================================
 * Centralized location for all application constants and settings
 * 
 * Benefits:
 * - Single place to change business rules
 * - Easy to spot all configurable values
 * - Better for managing environment-specific settings
 * 
 * Usage:
 * import { CONFIG } from '@/config'
 * console.log(CONFIG.CART.TAX_RATE)
 */

export const CONFIG = {
  // =====================================================
  // SHOPPING CART & PRICING
  // =====================================================
  CART: {
    // Item management
    MAX_ITEMS_PER_PRODUCT: 100        // Maximum quantity per product
  },

  // =====================================================
  // ORDERS
  // =====================================================
  ORDERS: {
    // Order ID generation
    ORDER_ID_PREFIX: 'ORD-',
    
    // Order status values
    STATUS: {
      PENDING: 'pending',             // Order received, awaiting processing
      COMPLETED: 'completed',         // Payment processed, order confirmed
      SHIPPED: 'shipped',             // Order sent to customer
      DELIVERED: 'delivered',         // Order received by customer
      CANCELLED: 'cancelled',         // Order cancelled by customer/admin
    },
  },

  // =====================================================
  // PRODUCTS
  // =====================================================
  PRODUCTS: {
    // Product categories (must match products in productStore.js)
    CATEGORIES: [
      'electronics',
      'accessories',
    ],
    
    // Pagination
    ITEMS_PER_PAGE: 12,
    
    // Product ratings
    MIN_RATING: 0,
    MAX_RATING: 5,
  },

  // =====================================================
  // UI & STYLING
  // =====================================================
  UI: {
    // Color palette (professional blue theme)
    COLORS: {
      PRIMARY_BLUE: '#2563eb',        // Primary actions, links
      DARK_GRAY: '#1f2937',           // Headings, primary text
      MEDIUM_GRAY: '#6b7280',         // Secondary text
      LIGHT_GRAY: '#e5e7eb',          // Borders, backgrounds
      SUCCESS_GREEN: '#10b981',       // Success states, confirmations
      ERROR_RED: '#ef4444',           // Error states, destructive actions
      WARNING_YELLOW: '#f59e0b',      // Warnings
      INFO_CYAN: '#06b6d4',           // Information
    },

    // Font sizes (rem units)
    FONT_SIZES: {
      XS: '0.75rem',
      SM: '0.875rem',
      BASE: '1rem',
      LG: '1.125rem',
      XL: '1.25rem',
      '2XL': '1.5rem',
      '3XL': '1.875rem',
    },

    // Spacing (px units)
    SPACING: {
      XS: '4px',
      SM: '8px',
      MD: '16px',
      LG: '24px',
      XL: '32px',
      '2XL': '48px',
    },

    // Border radius
    BORDER_RADIUS: {
      SM: '4px',
      MD: '8px',
      LG: '12px',
      FULL: '9999px',
    },

    // Shadows
    SHADOWS: {
      NONE: 'none',
      SM: '0 1px 2px rgba(0, 0, 0, 0.05)',
      MD: '0 1px 3px rgba(0, 0, 0, 0.1)',
      LG: '0 4px 12px rgba(0, 0, 0, 0.15)',
      XL: '0 10px 24px rgba(0, 0, 0, 0.15)',
    },

    // Transitions/animations
    TRANSITION_DURATION: '0.2s',
    TRANSITION_EASING: 'ease',
  },

  // =====================================================
  // STRIPE PAYMENT
  // =====================================================
  STRIPE: {
    // Stripe publishable key (test key - replace with production)
    PUBLISHABLE_KEY: 'pk_test_51234567890',
    
    // Test card numbers
    TEST_CARDS: {
      VISA: '4242 4242 4242 4242',
      VISA_DECLINE: '4000 0000 0000 0002',
      AMEX: '3782 822463 10005',
    },

    // Test date (always use future date)
    TEST_DATE: '12/25',
    TEST_CVC: '123',
  },

  // =====================================================
  // API & ENDPOINTS (For future backend)
  // =====================================================
  API: {
    // Base URL for API calls (will be set when backend is ready)
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    
    ENDPOINTS: {
      PRODUCTS: '/products',
      ORDERS: '/orders',
      PAYMENTS: '/payments',
      USERS: '/users',
    },

    // Timeouts
    REQUEST_TIMEOUT: 10000,           // 10 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,                // 1 second
  },

  // =====================================================
  // VALIDATION RULES
  // =====================================================
  VALIDATION: {
    // Email validation
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    // Password requirements
    PASSWORD_MIN_LENGTH: 8,
    
    // Phone number validation removed for demo
    // Zip code validation removed for demo
  },

  // =====================================================
  // FEATURES (For feature flags)
  // =====================================================
  FEATURES: {
    ENABLE_WISHLIST: false,           // Add to wishlist feature
    ENABLE_REVIEWS: false,            // Product reviews
    ENABLE_COUPONS: false,            // Discount codes
    ENABLE_USER_ACCOUNTS: false,      // User registration & login
  },
}

export default CONFIG
