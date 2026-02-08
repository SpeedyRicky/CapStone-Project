<template>
  <!-- 
    Navigation Bar Component
    =====================================================
    Top navigation bar with:
    - Logo/brand link
    - Menu navigation links
    - Search bar
    - Cart link with item count badge
  -->
  <header class="navbar">
    <div class="navbar-container">
      <!-- Logo / Brand Link -->
      <router-link to="/" class="navbar-logo">
        ShopHub
      </router-link>

      <!-- Main Navigation Menu -->
      <nav class="navbar-menu">
        <router-link 
          to="/products" 
          class="nav-link"
          :class="{ active: $route.path === '/products' }"
        >
          Products
        </router-link>
        <a href="#" class="nav-link">About</a>
        <a href="#" class="nav-link">Contact</a>
      </nav>

      <!-- Search and Cart Actions -->
      <div class="navbar-actions">
        <!-- Search Bar -->
        <div class="search-bar">
          <input type="text" placeholder="Search products..." />
          <button class="search-btn">Search</button>
        </div>
        
        <!-- Cart Link with Badge -->
        <router-link to="/cart" class="cart-link" :class="{ 'has-items': cartStore.cartCount > 0 }">
          <span class="cart-text">Cart</span>
          <span v-if="cartStore.cartCount > 0" class="cart-badge">{{ cartStore.cartCount }}</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
/**
 * NavBar Component
 * =====================================================
 * Displays the main navigation bar with:
 * - Brand/logo linking to home
 * - Navigation menu links
 * - Search functionality
 * - Shopping cart with item count
 */

import { useCartStore } from "@/stores/cartStore.js";


// =====================================================
// STATE & STORES
// =====================================================

const cartStore = useCartStore()
</script>

<style scoped>
.navbar {
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.navbar-logo {
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 700;
  color: #0f172a;
  transition: color 0.3s ease;
  letter-spacing: -0.5px;
}

.navbar-logo:hover {
  color: #1e40af;
}

.navbar-menu {
  display: flex;
  gap: 40px;
  flex: 1;
  justify-content: center;
}

.nav-link {
  color: #475569;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  padding: 8px 4px;
  position: relative;
}

.nav-link:hover {
  color: #1e40af;
}

.nav-link.active {
  color: #1e40af;
  font-weight: 600;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background: #1e40af;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #f1f5f9;
  border-radius: 8px;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  transition: all 0.3s ease;
}

.search-bar:focus-within {
  background: white;
  border-color: #1e40af;
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.08);
}

.search-bar input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.9rem;
  width: 150px;
  color: #1e293b;
}

.search-bar input::placeholder {
  color: #94a3b8;
}

.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 4px 8px;
  transition: color 0.3s ease;
}

.search-btn:hover {
  color: #1e40af;
}

.cart-link {
  position: relative;
  text-decoration: none;
  color: #475569;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 6px;
}

.cart-link:hover {
  color: #1e40af;
  background: #f0f4ff;
}

.cart-text {
  font-size: 0.95rem;
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background: #dc2626;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .navbar-container {
    flex-wrap: wrap;
    gap: 10px;
    height: auto;
    padding: 10px 15px;
  }

  .navbar-menu {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    gap: 15px;
  }

  .search-bar {
    order: 2;
    flex: 1;
    min-width: 200px;
  }

  .search-bar input {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .navbar-container {
    height: auto;
    padding: 10px 15px;
    flex-wrap: wrap;
    gap: 15px;
  }

  .navbar-menu {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    gap: 20px;
    padding: 10px 0;
    border-top: 1px solid #e0e0e0;
  }

  .search-bar {
    order: 2;
  }

  .search-bar input {
    width: 100px;
  }

  .navbar-actions {
    gap: 15px;
  }
}
</style>