/**
 * Vue Router Configuration
 * =====================================================
 * Defines all application routes and their corresponding components
 * 
 * Route Map:
 * - /                        Home page with featured products
 * - /products                Product listing with category filtering
 * - /product/:id             Individual product detail page
 * - /cart                    Shopping cart overview
 * - /checkout                Checkout form and payment
 * - /order-confirmation/:id  Order success confirmation
 */

import { createRouter, createWebHistory } from 'vue-router'

// =====================================================
// COMPONENT IMPORTS
// =====================================================

import HomePage from '@/views/HomePage.vue'
import ProductsPage from '@/views/ProductsPage.vue'
import ProductDetailPage from '@/views/ProductDetailPage.vue'
import CartPage from '@/views/CartPage.vue'
import CheckoutPage from '@/views/CheckoutPage.vue'
import OrderConfirmationPage from '@/views/OrderConfirmationPage.vue'

// =====================================================
// ROUTE DEFINITIONS
// =====================================================

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { title: 'Home - ShopHub' }
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsPage,
    meta: { title: 'Products - ShopHub' }
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetailPage,
    meta: { title: 'Product Details - ShopHub' }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
    meta: { title: 'Shopping Cart - ShopHub' }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutPage,
    meta: { title: 'Checkout - ShopHub' }
  },
  {
    path: '/order-confirmation/:orderId',
    name: 'order-confirmation',
    component: OrderConfirmationPage,
    meta: { title: 'Order Confirmed - ShopHub' }
  }
]

// =====================================================
// ROUTER INITIALIZATION
// =====================================================

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
