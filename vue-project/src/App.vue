<script setup>
/**
 * App.vue - Root Application Component
 * ============================================
 * Main application shell that renders:
 * - Navigation bar at top
 * - Page routing via router-view
 */

import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <router-view />
</template>

<style scoped>
</style>
