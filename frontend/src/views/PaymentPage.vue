<template>
  <div class="payment-page" data-testid="payment-page">
    <div class="page-header">
      <div class="container">
        <span class="page-label">Checkout</span>
        <h1 class="page-title">Payment</h1>
        <p class="page-description">Complete your purchase securely</p>
      </div>
    </div>

    <div class="container payment-container">
      <!-- No Items -->
      <div v-if="!cart.length && !orderComplete" class="empty-cart">
        <i class="fas fa-shopping-bag"></i>
        <h2>No items to checkout</h2>
        <p>Add some gowns to your cart first</p>
        <router-link to="/products" class="btn btn-primary">
          Browse Collection
        </router-link>
      </div>

      <!-- Order Complete -->
      <div v-else-if="orderComplete" class="order-success" data-testid="order-success">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h2>Payment Successful!</h2>
        <p class="order-id">Order ID: {{ orderId }}</p>
        <p class="success-note">Thank you for your purchase. You will receive a confirmation email shortly.</p>
        <p class="simulation-note">
          <i class="fas fa-info-circle"></i>
          Note: This is a simulated payment - no actual charge was made.
        </p>
        <router-link to="/products" class="btn btn-primary">
          Continue Shopping
        </router-link>
      </div>

      <!-- Payment Form -->
      <div v-else class="payment-content">
        <div class="order-review">
          <h3>Order Review</h3>
          <div class="order-items">
            <div v-for="item in cart" :key="item._id" class="order-item">
              <img :src="item.image" :alt="item.name" />
              <div class="order-item-info">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-qty">Qty: {{ item.quantity }}</span>
              </div>
              <span class="item-price">${{ formatPrice(item.price * item.quantity) }}</span>
            </div>
          </div>
          <div class="order-total">
            <span>Total</span>
            <span>${{ formatPrice(total) }}</span>
          </div>
        </div>

        <form @submit.prevent="processPayment" class="payment-form" data-testid="payment-form">
          <h3>Payment Details</h3>
          <p class="form-note">
            <i class="fas fa-lock"></i>
            Simulated secure payment
          </p>

          <div class="form-group">
            <label class="form-label" for="cardholderName">Cardholder Name *</label>
            <input 
              type="text" 
              id="cardholderName" 
              v-model="form.cardholderName" 
              class="form-input" 
              placeholder="John Doe"
              required
              data-testid="cardholder-name-input"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="cardNumber">Card Number *</label>
            <input 
              type="text" 
              id="cardNumber" 
              v-model="form.cardNumber" 
              class="form-input" 
              placeholder="1234 5678 9012 3456"
              maxlength="19"
              @input="formatCardNumber"
              required
              data-testid="card-number-input"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="expiryDate">Expiry Date *</label>
              <input 
                type="text" 
                id="expiryDate" 
                v-model="form.expiryDate" 
                class="form-input" 
                placeholder="MM/YY"
                maxlength="5"
                @input="formatExpiryDate"
                required
                data-testid="expiry-date-input"
              />
            </div>
            <div class="form-group">
              <label class="form-label" for="cvv">CVV *</label>
              <input 
                type="text" 
                id="cvv" 
                v-model="form.cvv" 
                class="form-input" 
                placeholder="123"
                maxlength="4"
                required
                data-testid="cvv-input"
              />
            </div>
          </div>

          <div v-if="error" class="alert alert-error" data-testid="payment-error">
            {{ error }}
          </div>

          <button 
            type="submit" 
            class="btn btn-primary btn-pay"
            :disabled="processing"
            data-testid="pay-now-btn"
          >
            <span v-if="processing">
              <i class="fas fa-spinner fa-spin"></i> Processing...
            </span>
            <span v-else>
              <i class="fas fa-lock"></i> Pay ${{ formatPrice(total) }}
            </span>
          </button>

          <router-link to="/cart" class="back-link">
            <i class="fas fa-arrow-left"></i> Back to Cart
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default {
  name: 'PaymentPage',
  props: {
    cart: {
      type: Array,
      required: true
    }
  },
  emits: ['clear-cart'],
  data() {
    return {
      form: {
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      },
      processing: false,
      error: '',
      orderComplete: false,
      orderId: ''
    }
  },
  computed: {
    subtotal() {
      return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    total() {
      const shipping = this.subtotal >= 500 ? 0 : 50
      return this.subtotal + shipping
    }
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString('en-US')
    },
    formatCardNumber(e) {
      let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '')
      value = value.match(/.{1,4}/g)?.join(' ') || value
      this.form.cardNumber = value
    },
    formatExpiryDate(e) {
      let value = e.target.value.replace(/\D/g, '')
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2)
      }
      this.form.expiryDate = value
    },
    async processPayment() {
      this.processing = true
      this.error = ''

      try {
        const response = await fetch(`${API_URL}/api/payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cardholderName: this.form.cardholderName,
            cardNumber: this.form.cardNumber,
            expiryDate: this.form.expiryDate,
            cvv: this.form.cvv,
            amount: this.total,
            items: this.cart.map(item => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity
            }))
          })
        })

        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Payment failed')
        }

        this.orderId = result.orderId
        this.orderComplete = true
        this.$emit('clear-cart')

      } catch (error) {
        this.error = error.message || 'Payment processing failed. Please try again.'
      } finally {
        this.processing = false
      }
    }
  }
}
</script>

<style scoped>
.payment-page {
  padding-top: 80px;
  min-height: 100vh;
  background-color: var(--bg-light);
}

.page-header {
  background-color: var(--secondary-color);
  padding: 4rem 0;
  text-align: center;
  color: var(--text-light);
}

.page-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--primary-color);
  font-weight: 500;
}

.page-title {
  font-size: 3rem;
  margin: 1rem 0;
}

.page-description {
  color: rgba(255, 255, 255, 0.7);
}

.payment-container {
  padding: 4rem 0;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-cart i {
  font-size: 4rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.empty-cart h2 {
  margin-bottom: 0.5rem;
}

.empty-cart p {
  color: var(--text-muted);
  margin-bottom: 2rem;
}

/* Order Success */
.order-success {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.success-icon {
  font-size: 5rem;
  color: var(--success-color);
  margin-bottom: 1.5rem;
}

.order-success h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.order-id {
  font-family: monospace;
  font-size: 1rem;
  color: var(--text-muted);
  background-color: white;
  padding: 0.5rem 1rem;
  display: inline-block;
  margin-bottom: 1rem;
}

.success-note {
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.simulation-note {
  font-size: 0.85rem;
  color: var(--primary-color);
  background-color: #fef3c7;
  padding: 0.75rem 1rem;
  margin-bottom: 2rem;
  border-radius: 4px;
}

/* Payment Content */
.payment-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

.order-review {
  background-color: white;
  padding: 2rem;
  height: fit-content;
}

.order-review h3 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.order-item img {
  width: 60px;
  height: 80px;
  object-fit: cover;
}

.order-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-name {
  font-weight: 500;
  font-size: 0.95rem;
}

.item-qty {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.item-price {
  font-weight: 600;
}

.order-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 600;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

/* Payment Form */
.payment-form {
  background-color: white;
  padding: 2rem;
}

.payment-form h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.form-note {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.form-note i {
  color: var(--success-color);
  margin-right: 0.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.btn-pay {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  margin-top: 1rem;
}

.back-link {
  display: block;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.back-link:hover {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .payment-content {
    grid-template-columns: 1fr;
  }
  
  .order-review {
    order: -1;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>