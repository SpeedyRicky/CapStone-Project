<template>
  <div class="cart-page">
    <h1>Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <div class="empty-icon" aria-hidden="true"></div>
      <h2>Your cart is empty</h2>
      <p>Continue shopping to add items to your cart</p>
      <router-link to="/products" class="continue-shopping-btn">Continue Shopping</router-link>
    </div>

    <div v-else class="cart-container">
      <div class="cart-items-section">
        <table class="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartStore.items" :key="item.cartItemId" class="cart-item">
              <td class="product-cell">
                <div class="product-info">
                  <img :src="item.image" :alt="item.name" class="product-img" />
                  <div class="product-details">
                    <h4>{{ item.name }}</h4>
                    <p class="sku">SKU: SKU-{{ item.id }}</p>
                  </div>
                </div>
              </td>
              <td class="price-cell">${{ item.price.toFixed(2) }}</td>
              <td class="quantity-cell">
                <div class="quantity-controls">
                  <button @click="cartStore.updateQuantity(item.cartItemId, item.quantity - 1)">−</button>
                  <input v-model.number="item.quantity" type="number" min="1" @change="cartStore.updateQuantity(item.cartItemId, item.quantity)" />
                  <button @click="cartStore.updateQuantity(item.cartItemId, item.quantity + 1)">+</button>
                </div>
              </td>
              <td class="total-cell">${{ (item.price * item.quantity).toFixed(2) }}</td>
              <td class="action-cell">
                <button 
                  class="remove-btn"
                  @click="cartStore.removeFromCart(item.cartItemId)"
                  title="Remove from cart"
                >
                  ✕
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="cart-summary-section">
        <div class="summary-card">
          <h2>Order Summary</h2>
          
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>${{ cartStore.subtotal.toFixed(2) }}</span>
          </div>
          
          <div class="summary-row total">
            <span>Total:</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>

          <!-- shipping removed -->

          <router-link to="/checkout" class="checkout-btn">Proceed to Checkout</router-link>

          <router-link to="/products" class="continue-shopping-link">Continue Shopping</router-link>
        </div>

        <div class="promo-section">
          <h3>Have a promo code?</h3>
          <div class="promo-input">
            <input type="text" placeholder="Enter promo code" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
</script>

<style scoped>
.cart-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

.cart-page h1 {
  font-size: 2rem;
  margin-bottom: 40px;
  color: #1f2937;
  font-weight: 700;
}

.empty-cart {
  text-align: center;
  padding: 80px 20px;
  background: #f8f9fb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  color: #d1d5db;
}

.empty-cart h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #1f2937;
  font-weight: 600;
}

.empty-cart p {
  color: #6b7280;
  margin-bottom: 30px;
  font-size: 1rem;
}

.continue-shopping-btn {
  display: inline-block;
  padding: 12px 28px;
  background: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  font-size: 0.95rem;
}

.continue-shopping-btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.cart-container {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 30px;
}

.cart-items-section {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
}

.cart-table thead {
  background: #f8f9fb;
  border-bottom: 1px solid #e5e7eb;
}

.cart-table th {
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cart-item {
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.cart-item:hover {
  background: #f8f9fb;
}

.product-cell {
  padding: 16px;
}

.product-info {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.product-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.product-details h4 {
  margin: 0 0 4px 0;
  font-size: 0.9rem;
  color: #1f2937;
  font-weight: 600;
}

.sku {
  margin: 0;
  font-size: 0.75rem;
  color: #9ca3af;
}

.price-cell,
.quantity-cell,
.total-cell,
.action-cell {
  padding: 16px;
  text-align: center;
  font-weight: 500;
  color: #4b5563;
}

.price-cell {
  color: #2563eb;
  font-weight: 600;
}

.total-cell {
  color: #1f2937;
  font-weight: 600;
}

.quantity-controls {
  display: flex;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  width: fit-content;
  margin: 0 auto;
  background: white;
}

.quantity-controls button {
  width: 36px;
  height: 36px;
  border: none;
  background: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  font-size: 1.1rem;
  color: #2563eb;
}

.quantity-controls button:hover {
  background: #f3f4f6;
}

.quantity-controls input {
  width: 50px;
  border: none;
  border-left: 1px solid #d1d5db;
  border-right: 1px solid #d1d5db;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  background: white;
}

.quantity-controls input:focus {
  outline: none;
}

.remove-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #ef4444;
  background: white;
  color: #ef4444;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  font-size: 1.1rem;
}

.remove-btn:hover {
  background: #fee2e2;
}

.cart-summary-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.summary-card h2 {
  font-size: 1.1rem;
  margin: 0 0 20px 0;
  color: #1f2937;
  font-weight: 600;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
  color: #4b5563;
  font-weight: 500;
}

.summary-row.total {
  border: none;
  border-top: 2px solid #e5e7eb;
  padding-top: 16px;
  padding-bottom: 0;
  font-weight: 600;
  font-size: 1rem;
  color: #1f2937;
}

.summary-row.total span:last-child {
  color: #2563eb;
  font-size: 1.25rem;
  font-weight: 700;
}

.free {
  color: #10b981;
  font-weight: 600;
}

.free-shipping-note {
  background: #f0fdf4;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  margin: 15px 0;
  border: 1px solid #dcfce7;
}

.free-shipping-note p {
  margin: 0;
  font-size: 0.85rem;
  color: #059669;
  font-weight: 600;
}

.progress-bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  margin: 8px 0;
}

.progress {
  height: 100%;
  background: #10b981;
  transition: width 0.3s ease;
}

.checkout-btn {
  display: block;
  width: 100%;
  padding: 14px;
  background: #10b981;
  color: white;
  text-decoration: none;
  text-align: center;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.checkout-btn:hover {
  background: #059669;
  transform: translateY(-2px);
}

.continue-shopping-link {
  display: block;
  text-align: center;
  color: #2563eb;
  text-decoration: none;
  padding: 10px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.continue-shopping-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.promo-section {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.promo-section h3 {
  font-size: 0.9rem;
  margin: 0 0 12px 0;
  color: #1f2937;
  font-weight: 600;
}

.promo-input {
  display: flex;
  gap: 8px;
}

.promo-input input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.promo-input input:focus {
  outline: none;
  border-color: #2563eb;
}

.promo-input button {
  padding: 10px 16px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.promo-input button:hover {
  background: #1d4ed8;
}

@media (max-width: 768px) {
  .cart-container {
    grid-template-columns: 1fr;
  }

  .cart-table {
    font-size: 0.85rem;
  }

  .cart-page h1 {
    font-size: 1.5rem;
  }
}
</style>
