<script setup>
/**
 * App.vue - Root Application Component
 * ============================================
 * Main application shell that renders:
 * - Navigation bar at top
 * - Page routing via router-view
 */
import CheckoutPage from './views/CheckoutPage.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <router-view />
  <NavBar />
  <CheckoutPage />
  </template>

<style scoped>
</style>
