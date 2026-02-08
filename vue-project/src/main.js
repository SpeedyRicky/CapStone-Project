/**
 * Application Entry Point
 * =====================================================
 * Initializes the Vue 3 application with:
 * - Global CSS styles
 * - State management (Pinia)
 * - Client-side routing (Vue Router)
 */

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// =====================================================
// APPLICATION SETUP
// =====================================================

const app = createApp(App)

// Install plugins
app.use(createPinia())  // State management store
app.use(router)         // Client-side routing

// Mount to DOM
app.mount('#app')

/**
 * Plugin Initialization Order:
 * 1. Pinia (createPinia) - State management must be available first
 * 2. Vue Router (router) - Routing depends on app setup
 * 3. app.mount('#app') - Mount to target DOM element
 */
