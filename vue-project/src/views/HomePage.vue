<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Shop Premium Products</h1>
        <p class="hero-subtitle">Discover quality items at the best prices</p>
        <router-link to="/products" class="cta-button">
          Browse Products
        </router-link>
      </div>
    </section>

    <section class="features">
      <div class="feature-card">
        <div class="feature-icon" aria-hidden="true"></div>
        <h3>Fast Shipping</h3>
        <p>Get your orders delivered quickly and reliably</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon" aria-hidden="true"></div>
        <h3>Secure Checkout</h3>
        <p>Your payment information is always protected</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon" aria-hidden="true"></div>
        <h3>Quality Products</h3>
        <p>Only the best products from trusted brands</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon" aria-hidden="true"></div>
        <h3>Best Prices</h3>
        <p>Competitive pricing on all our products</p>
      </div>
    </section>

    <section class="featured-products">
      <div class="section-header">
        <h2>Featured Products</h2>
      </div>
      <div class="products-grid">
        <div 
          v-for="product in featuredProducts" 
          :key="product.id" 
          class="product-card"
          @click="goToProduct(product.id)"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
          </div>
          <h4>{{ product.name }}</h4>
          <p class="product-price">${{ product.price.toFixed(2) }}</p>
          <button class="product-btn">View Details</button>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="stat-box">
        <span class="stat-number">10,000+</span>
        <p>Happy Customers</p>
      </div>
      <div class="stat-box">
        <span class="stat-number">500+</span>
        <p>Products Available</p>
      </div>
      <div class="stat-box">
        <span class="stat-number">99.9%</span>
        <p>Satisfaction Rate</p>
      </div>
      <div class="stat-box">
        <span class="stat-number">24/7</span>
        <p>Customer Support</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const productStore = useProductStore()

const featuredProducts = computed(() => {
  return productStore.products.slice(0, 4)
})

const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}
</script>

<style scoped>
.home-page {
  flex: 1;
}

.hero {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: white;
  padding: 80px 20px;
  text-align: center;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #d1d5db;
  margin-bottom: 32px;
  font-weight: 400;
}

.cta-button {
  display: inline-block;
  padding: 12px 32px;
  background: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.cta-button:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  padding: 60px 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.feature-card {
  padding: 32px;
  background: white;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.feature-card:hover {
  border-color: #2563eb;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1f2937;
}

.feature-card p {
  color: #6b7280;
  font-size: 0.95rem;
}

.featured-products {
  padding: 60px 20px;
  background: white;
}

.section-header {
  max-width: 1400px;
  margin: 0 auto 40px;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.product-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-card:hover {
  border-color: #1e40af;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-6px);
}

.product-image {
  width: 100%;
  height: 200px;
  background: #f1f5f9;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.08);
}

.product-card h4 {
  padding: 16px 16px 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #0f172a;
}

.product-price {
  padding: 0 16px;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e40af;
}

.product-btn {
  width: calc(100% - 32px);
  margin: 12px 16px 16px;
  padding: 10px 16px;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #1e40af;
}

.product-card:hover .product-btn {
  background: #1e40af;
  color: white;
  border-color: #1e40af;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  padding: 60px 20px;
  max-width: 1400px;
  margin: 0 auto;
  background: white;
}

.stat-box {
  text-align: center;
  padding: 32px 24px;
  background: #f8f9fb;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.stat-box:hover {
  border-color: #1e40af;
  box-shadow: 0 8px 16px rgba(30, 64, 175, 0.1);
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 12px;
}

.stat-box p {
  color: #64748b;
  font-weight: 500;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }
}


.hero {
  background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
  color: white;
  padding: 100px 20px;
  text-align: center;
}

.hero-content {
  max-width: 700px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #dbeafe;
  margin-bottom: 40px;
  font-weight: 400;
  line-height: 1.6;
}

.cta-button {
  display: inline-block;
  padding: 14px 40px;
  background: #f59e0b;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 1rem;
  border: none;
  cursor: pointer;
}

.cta-button:hover {
  background: #d97706;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(245, 158, 11, 0.3);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  padding: 60px 20px;
  max-width: 1400px;
  margin: 0 auto;
  background: white;
}

.feature-card {
  padding: 32px 24px;
  background: white;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: #1e40af;
  box-shadow: 0 8px 16px rgba(30, 64, 175, 0.12);
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
  display: block;
}

.feature-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #0f172a;
}

.feature-card p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
}

.featured-products {
  padding: 60px 20px;
  background: white;
}

.section-header {
  max-width: 1400px;
  margin: 0 auto 40px;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.product-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-card:hover {
  border-color: #1e40af;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-6px);
}

.product-image {
  width: 100%;
  height: 200px;
  background: #f1f5f9;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.08);
}

.product-card h4 {
  padding: 16px 16px 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #0f172a;
}

.product-price {
  padding: 0 16px;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e40af;
}

.product-btn {
  width: calc(100% - 32px);
  margin: 12px 16px 16px;
  padding: 10px 16px;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #1e40af;
}

.product-card:hover .product-btn {
  background: #1e40af;
  color: white;
  border-color: #1e40af;
}

.fun-facts {
  background: white;
  padding: 60px 20px;
  border-radius: 12px;
  margin-bottom: 60px;
  border: 1px solid #e2e8f0;
}

.fun-facts h2 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 40px;
  color: #0f172a;
  font-weight: 700;
}

.facts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.fact-box {
  background: #f8f9fb;
  padding: 32px 24px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.fact-box:hover {
  border-color: #1e40af;
  box-shadow: 0 8px 16px rgba(30, 64, 175, 0.1);
  transform: translateY(-4px);
}

.fact-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e40af;
  display: block;
  margin-bottom: 12px;
}

.fact-box p {
  font-weight: 500;
  color: #64748b;
  font-size: 0.95rem;
}

.newsletter {
  background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
  padding: 60px 20px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 60px;
}

.newsletter h2 {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
}

.newsletter p {
  font-size: 1rem;
  font-weight: 400;
  color: #dbeafe;
  margin-bottom: 32px;
  line-height: 1.6;
}

.newsletter-form {
  display: flex;
  gap: 12px;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-form input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
  background: white;
}

.newsletter-form input::placeholder {
  color: #94a3b8;
}

.newsletter-form button {
  padding: 12px 24px;
  background: #f59e0b;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.newsletter-form button:hover {
  background: #d97706;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(245, 158, 11, 0.3);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .cta-button {
    padding: 12px 28px;
    font-size: 0.95rem;
  }

  .section-header h2,
  .fun-facts h2,
  .newsletter h2 {
    font-size: 1.5rem;
  }

  .newsletter-form {
    flex-direction: column;
  }
}
</style>