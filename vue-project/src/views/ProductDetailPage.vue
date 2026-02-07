<template>
  <div class="product-detail-page" v-if="product">
    <router-link to="/products" class="back-link">← Back to Products</router-link>
    
    <div class="product-detail">
      <div class="product-image-section">
        <img :src="product.image" :alt="product.name" class="main-image" />
      </div>

      <div class="product-info-section">
        <h1>{{ product.name }}</h1>
        
        <div class="product-rating">
          <span class="stars">★★★★★</span>
          <span class="rating-value">{{ product.rating }}</span>
          <span class="reviews">({{ product.reviews }} customer reviews)</span>
        </div>

        <div class="price-section">
          <span class="price">${{ product.price.toFixed(2) }}</span>
        </div>

        <p class="description">{{ product.description }}</p>

        <div class="purchase-section">
          <div class="quantity-selector">
            <label>Quantity:</label>
            <div class="quantity-controls">
              <button @click="quantity > 1 && quantity--">−</button>
              <input v-model.number="quantity" type="number" min="1" />
              <button @click="quantity++">+</button>
            </div>
          </div>

          <button class="add-to-cart-btn" @click="addToCart">
            Add {{ quantity }} to Cart
          </button>
        </div>

        <div class="product-details">
          <h3>Product Details</h3>
          <ul>
            <li><strong>Category:</strong> {{ product.category }}</li>
            <li><strong>In Stock:</strong> <span class="in-stock">Yes</span></li>
            <li><strong>SKU:</strong> SKU-{{ product.id }}</li>
            <li><strong>Shipping:</strong> Free on orders over $100</li>
          </ul>
        </div>

        <div class="trust-badges">
          <div class="badge">
            <span class="icon">✓</span> 30-Day Money Back Guarantee
          </div>
          <div class="badge">
            <span class="icon">✓</span> Secure Checkout with Stripe
          </div>
          <div class="badge">
            <span class="icon">✓</span> Fast & Reliable Shipping
          </div>
        </div>
      </div>
    </div>

    <div class="related-products" v-if="relatedProducts.length > 0">
      <h2>Related Products</h2>
      <div class="related-grid">
        <div 
          v-for="related in relatedProducts.slice(0, 4)" 
          :key="related.id"
          class="related-card"
          @click="goToProduct(related.id)"
        >
          <img :src="related.image" :alt="related.name" />
          <h4>{{ related.name }}</h4>
          <p class="related-price">${{ related.price.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading">
    <p>Product not found</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const quantity = ref(1)

const product = computed(() => {
  return productStore.getProductById(route.params.id)
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productStore.getProductsByCategory(product.value.category)
    .filter(p => p.id !== product.value.id)
})

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value)
    quantity.value = 1
    
    const notification = document.createElement('div')
    notification.className = 'add-to-cart-notification'
    notification.textContent = `${product.value.name} added to cart!`
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 3000)
  }
}

const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}
</script>

<style scoped>
.product-detail-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-bottom: 60px;
}

.product-image-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.product-info-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.product-info-section h1 {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #1f2937;
  font-weight: 700;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.stars {
  color: #fbbf24;
  font-size: 1.2rem;
  letter-spacing: 3px;
}

.rating-value {
  font-weight: 600;
  color: #1f2937;
}

.reviews {
  color: #6b7280;
}

.price-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.price {
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
}

.description {
  color: #4b5563;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 30px;
}

.purchase-section {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.quantity-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quantity-selector label {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
}

.quantity-controls {
  display: flex;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  overflow: hidden;
  width: fit-content;
}

.quantity-controls button {
  width: 40px;
  height: 40px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2563eb;
  transition: all 0.2s ease;
}

.quantity-controls button:hover {
  background: #f3f4f6;
}

.quantity-controls input {
  width: 60px;
  border: none;
  border-left: 1px solid #d1d5db;
  border-right: 1px solid #d1d5db;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
}

.quantity-controls input:focus {
  outline: none;
}

.add-to-cart-btn {
  flex: 1;
  padding: 15px 30px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-to-cart-btn:hover {
  background: #059669;
  transform: translateY(-2px);
}

.add-to-cart-btn:active {
  transform: translateY(0);
}

.product-details {
  margin-bottom: 40px;
  padding: 20px;
  background: #f8f9fb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.product-details h3 {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #1f2937;
  font-weight: 600;
}

.product-details ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-details li {
  color: #4b5563;
  padding: 8px 0;
}

.in-stock {
  color: #10b981;
  font-weight: 600;
}

.trust-badges {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.badge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f0fdf4;
  border-radius: 8px;
  color: #059669;
  font-weight: 500;
  border: 1px solid #dcfce7;
}

.badge .icon {
  font-size: 1.3rem;
  font-weight: 700;
}

.related-products {
  margin-top: 80px;
}

.related-products h2 {
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #1f2937;
  font-weight: 700;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.related-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;
}

.related-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #2563eb;
}

.related-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.related-card h4 {
  padding: 12px;
  font-size: 0.95rem;
  color: #1f2937;
  margin: 0;
  min-height: 2.5em;
  display: flex;
  align-items: center;
  font-weight: 600;
}

.related-price {
  padding: 0 12px 12px;
  color: #2563eb;
  font-weight: 700;
  font-size: 1.1rem;
  margin: 0;
}

.loading {
  text-align: center;
  padding: 60px 20px;
  font-size: 1.2rem;
  color: #6b7280;
}

@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .product-info-section h1 {
    font-size: 1.5rem;
  }

  .price {
    font-size: 1.5rem;
  }

  .purchase-section {
    flex-direction: column;
  }

  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
