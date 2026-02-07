<template>
  <div class="products-page">
    <div class="products-header">
      <h1>Our Products</h1>
      <div class="filter-section">
        <button 
          v-for="category in ['all', ...productStore.getAllCategories]"
          :key="category"
          @click="selectedCategory = category === 'all' ? null : category"
          :class="['filter-btn', { active: (selectedCategory === category && category !== 'all') || (!selectedCategory && category === 'all') }]"
        >
          {{ category.charAt(0).toUpperCase() + category.slice(1) }}
        </button>
      </div>
    </div>

    <div class="products-grid">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id" 
        class="product-card"
        @click="goToProduct(product.id)"
      >
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
          <div class="product-overlay">
            <button class="quick-view-btn">Quick View</button>
          </div>
        </div>
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <div class="product-rating">
            <span class="stars">★★★★★</span>
            <span class="rating-value">{{ product.rating }}</span>
            <span class="reviews">({{ product.reviews }} reviews)</span>
          </div>
          <p class="product-description">{{ product.description.substring(0, 60) }}...</p>
          <div class="product-footer">
            <span class="price">${{ product.price.toFixed(2) }}</span>
            <button 
              class="add-to-cart-btn"
              @click.stop="addToCart(product)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'

const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
const selectedCategory = ref(null)

const filteredProducts = computed(() => {
  if (!selectedCategory.value) {
    return productStore.products
  }
  return productStore.getProductsByCategory(selectedCategory.value)
})

const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}

const addToCart = (product) => {
  cartStore.addToCart(product, 1)
  // Show a quick notification
  const notification = document.createElement('div')
  notification.className = 'add-to-cart-notification'
  notification.textContent = `${product.name} added to cart!`
  document.body.appendChild(notification)
  setTimeout(() => notification.remove(), 3000)
}
</script>

<style scoped>
.products-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

.products-header {
  margin-bottom: 40px;
}

.products-header h1 {
  font-size: 2rem;
  margin-bottom: 24px;
  color: #1f2937;
  font-weight: 700;
}

.filter-section {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.filter-btn:hover {
  border-color: #2563eb;
  color: #2563eb;
}

.filter-btn.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid #e5e7eb;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #2563eb;
}

.product-image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  background: #f3f4f6;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.quick-view-btn {
  padding: 10px 20px;
  background: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.quick-view-btn:hover {
  background: #f3f4f6;
}

.product-info {
  padding: 16px;
}

.product-info h3 {
  font-size: 0.95rem;
  margin-bottom: 8px;
  color: #1f2937;
  line-height: 1.3;
  min-height: 2.6em;
  font-weight: 600;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 0.85rem;
}

.stars {
  color: #fbbf24;
  letter-spacing: 2px;
}

.rating-value {
  font-weight: 600;
  color: #1f2937;
}

.reviews {
  color: #6b7280;
  font-size: 0.8rem;
}

.product-description {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 12px;
  line-height: 1.4;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2563eb;
}

.add-to-cart-btn {
  flex: 1;
  padding: 8px 12px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.add-to-cart-btn:hover {
  background: #059669;
  transform: translateY(-2px);
}

.add-to-cart-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}
</style>
