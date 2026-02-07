<template>
  <div class="confirmation-page">
    <div class="confirmation-container">
      <div class="success-badge">
        <div class="checkmark">✓</div>
      </div>

      <h1>Payment Confirmed</h1>

      <div class="order-details">
        <div class="detail-row">
          <span class="label">Order ID:</span>
          <span class="value">{{ order?.id }}</span>
        </div>
        <div class="detail-row">
          <span class="label">Order Date:</span>
          <span class="value">{{ formatDate(order?.createdAt) }}</span>
        </div>
        <div class="detail-row">
          <span class="label">Total Amount:</span>
          <span class="value">${{ order?.total.toFixed(2) }}</span>
        </div>
      </div>

      <div class="items-summary" v-if="order?.items">
        <h3>Items Ordered</h3>
        <div v-for="item in order.items" :key="item.cartItemId" class="summary-item">
          <span>{{ item.name }} × {{ item.quantity }}</span>
          <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
      </div>

      <div class="shipping-info" v-if="order?.customer">
        <h3>Customer</h3>
        <p>
          {{ order.customer.firstName }} {{ order.customer.lastName }}<br />
          <br />
          <strong>Email:</strong> {{ order.customer.email }}
        </p>
      </div>

      <div class="actions">
        <router-link to="/products" class="btn btn-primary">Continue Shopping</router-link>
        <router-link to="/" class="btn btn-secondary">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'

const route = useRoute()
const orderStore = useOrderStore()

const order = computed(() => {
  return orderStore.getOrderById(route.params.orderId)
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.confirmation-page {
  background: #f8f9fb;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 40px 20px;
}

.confirmation-container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 50px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid #e5e7eb;
}

.success-badge {
  width: 80px;
  height: 80px;
  margin: 0 auto 30px;
  background: #f0fdf4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkmark {
  font-size: 48px;
  color: #10b981;
  font-weight: 700;
}

.confirmation-container h1 {
  font-size: 2rem;
  color: #1f2937;
  margin: 0 0 10px 0;
  font-weight: 700;
}

.confirmation-message {
  font-size: 1.05rem;
  color: #6b7280;
  margin: 0 0 20px 0;
  line-height: 1.6;
}

.demo-notice {
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 40px;
  color: #92400e;
  font-size: 0.95rem;
  line-height: 1.5;
}

.order-details {
  background: #f8f9fb;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: left;
  border: 1px solid #e5e7eb;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e5e7eb;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row .label {
  font-weight: 600;
  color: #374151;
}

.detail-row .value {
  color: #4b5563;
  text-align: right;
}

.items-summary {
  margin-bottom: 30px;
  text-align: left;
}

.items-summary h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 15px 0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.95rem;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item span:last-child {
  font-weight: 600;
  color: #2563eb;
}

.shipping-info {
  background: #dbeafe;
  border-left: 4px solid #2563eb;
  padding: 20px;
  margin-bottom: 30px;
  text-align: left;
  border-radius: 4px;
}

.shipping-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 15px 0;
}

.shipping-info p {
  margin: 0;
  color: #374151;
  font-size: 0.95rem;
  line-height: 1.8;
}

.next-steps {
  background: #f8f9fb;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: left;
  border: 1px solid #e5e7eb;
}

.next-steps h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 15px 0;
}

.next-steps ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.next-steps li {
  padding: 8px 0;
  padding-left: 25px;
  color: #4b5563;
  font-size: 0.95rem;
  position: relative;
  line-height: 1.6;
}

.next-steps li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: 700;
}

.actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.btn {
  flex: 1;
  padding: 12px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
}

.btn-primary {
  background: #2563eb;
  color: white;
}

.btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #e5e7eb;
  color: #374151;
}

.btn-secondary:hover {
  background: #d1d5db;
  transform: translateY(-2px);
}

.help-text {
  font-size: 0.9rem;
  color: #9ca3af;
  margin: 0;
}

@media (max-width: 600px) {
  .confirmation-container {
    padding: 30px 20px;
  }

  .actions {
    flex-direction: column;
  }

  .confirmation-container h1 {
    font-size: 1.5rem;
  }
}
</style>
