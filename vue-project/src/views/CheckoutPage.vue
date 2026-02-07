<template>
  <div class="checkout-page">
    <div class="checkout-container">
      <div class="checkout-form-section">
        <div class="form-step">
          <h2 class="step-title">
            <span class="step-number">1</span>
            Billing Information
          </h2>
          <form class="billing-form">
            <div class="form-row">
              <div class="form-group">
                <label>First Name *</label>
                <input v-model="form.firstName" type="text" placeholder="John" required />
              </div>
              <div class="form-group">
                <label>Last Name *</label>
                <input v-model="form.lastName" type="text" placeholder="Doe" required />
              </div>
            </div>

            <div class="form-group">
              <label>Email Address *</label>
              <input v-model="form.email" type="email" placeholder="john@example.com" required />
            </div>
            <!-- Address fields removed for simplified checkout -->
          </form>
        </div>

        <div class="form-step">
          <h2 class="step-title">
            <span class="step-number">2</span>
            Payment Information
          </h2>
          <div class="payment-info">
            <p class="payment-description">
              This is a demo checkout. Enter any test card details (no real payment will be processed).
            </p>
            <div class="mock-card-form">
              <div class="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="4242 4242 4242 4242" maxlength="19" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Expiration Date</label>
                  <input type="text" placeholder="MM/YY" maxlength="5" />
                </div>
                <div class="form-group">
                  <label>CVC</label>
                  <input type="text" placeholder="123" maxlength="4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-step">
          <label class="checkbox-group">
            <input v-model="agreeToTerms" type="checkbox" />
            <span>I agree to the <a href="#" @click.prevent>Terms of Service</a> and <a href="#" @click.prevent>Privacy Policy</a></span>
          </label>
        </div>

        <button 
          @click="processPayment" 
          :disabled="loading || !agreeToTerms"
          class="submit-btn"
        >
          <span v-if="!loading">Complete Purchase</span>
          <span v-else class="loading-spinner">Processing...</span>
        </button>

        <p class="security-note">
          Your payment information is 100% secure and encrypted
        </p>
      </div>

      <div class="order-summary-section">
        <div class="summary-card">
          <h3>Order Summary</h3>

          <div class="order-items">
            <div v-for="item in cartStore.items" :key="item.cartItemId" class="order-item">
              <div class="item-info">
                <h4>{{ item.name }}</h4>
                <p class="item-qty">Qty: {{ item.quantity }}</p>
              </div>
              <span class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-detail">
            <span>Subtotal</span>
            <span>${{ cartStore.subtotal.toFixed(2) }}</span>
          </div>

          <div class="summary-total">
            <span>Total</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>

          <router-link to="/cart" class="back-to-cart">← Back to Cart</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useOrderStore } from '@/stores/orderStore'
const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const form = ref({
  firstName: '',
  lastName: '',
  email: ''
})

const agreeToTerms = ref(false)
const loading = ref(false)
// Mock payment flow — no Stripe integration in demo mode

const processPayment = async () => {
  if (!form.value.firstName || !form.value.lastName || !form.value.email) {
    alert('Please fill in all required fields')
    return
  }

  loading.value = true

  try {
    // Mock payment processing (fake delay)
    await new Promise((res) => setTimeout(res, 1000))
    const paymentMethod = { paymentMethod: { id: 'pm_mock_' + Date.now() } }

    // Create order
    const order = orderStore.createOrder({
      items: cartStore.items,
      subtotal: cartStore.subtotal,
      total: cartStore.total,
      customer: {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email
      },
      paymentMethodId: paymentMethod.paymentMethod.id
    })

    // Clear cart and redirect
    cartStore.clearCart()
    router.push(`/order-confirmation/${order.id}`)
  } catch (error) {
    console.error('Payment error:', error)
    alert('An error occurred during payment. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.checkout-page {
  background: #f8f9fb;
  padding: 40px 20px;
  min-height: 100vh;
}

.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
}

.checkout-form-section {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.form-step {
  margin-bottom: 40px;
}

.form-step:last-of-type {
  margin-bottom: 30px;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #2563eb;
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.9rem;
}

.billing-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.form-group input,
.form-group select {
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.payment-info {
  background: #f8f9fb;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.payment-description {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 15px;
  line-height: 1.5;
}

.mock-card-form {
  background: white;
  padding: 15px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.mock-card-form .form-group {
  margin-bottom: 15px;
}

.mock-card-form .form-group:last-child {
  margin-bottom: 0;
}

.mock-card-form label {
  display: block;
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
  margin-bottom: 6px;
}

.mock-card-form input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: 'Courier New', monospace;
}

.mock-card-form input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.mock-card-form .form-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #4b5563;
}

.checkbox-group input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-group a {
  color: #2563eb;
  text-decoration: none;
}

.checkbox-group a:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 15px;
  transition: all 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  display: inline-block;
}

.security-note {
  text-align: center;
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0;
}

.order-summary-section {
  height: fit-content;
  position: sticky;
  top: 20px;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.summary-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 20px 0;
}

.order-items {
  margin-bottom: 20px;
  max-height: 300px;
  overflow-y: auto;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
}

.order-item:last-child {
  border-bottom: none;
}

.item-info h4 {
  margin: 0 0 4px 0;
  font-size: 0.9rem;
  color: #1f2937;
  font-weight: 500;
}

.item-qty {
  margin: 0;
  font-size: 0.8rem;
  color: #9ca3af;
}

.item-price {
  font-weight: 600;
  color: #2563eb;
}

.summary-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 15px 0;
}

.summary-detail {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 0.9rem;
  color: #4b5563;
}

.summary-detail .free {
  color: #10b981;
  font-weight: 600;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  padding: 15px 0 10px 0;
  border-top: 2px solid #e5e7eb;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
}

.summary-total span:last-child {
  color: #2563eb;
  font-size: 1.25rem;
}

.back-to-cart {
  display: inline-block;
  margin-top: 15px;
  color: #2563eb;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}

.back-to-cart:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .checkout-container {
    grid-template-columns: 1fr;
  }

  .order-summary-section {
    position: static;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .checkout-form-section {
    padding: 25px;
  }
}
</style>
