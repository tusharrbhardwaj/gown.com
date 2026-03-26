<template>
  <div class="cart-page" data-testid="cart-page">
    <div class="page-header">
      <div class="container">
        <span class="page-label">Shopping</span>
        <h1 class="page-title">Your Cart</h1>
      </div>
    </div>

    <div class="container cart-container">
      <!-- Empty Cart -->
      <div v-if="!cart.length" class="empty-cart" data-testid="empty-cart">
        <i class="fas fa-shopping-bag"></i>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any gowns yet</p>
        <router-link to="/products" class="btn btn-primary">
          Browse Collection
        </router-link>
      </div>

      <!-- Cart Content -->
      <div v-else class="cart-content">
        <div class="cart-items" data-testid="cart-items">
          <div 
            v-for="item in cart" 
            :key="item._id" 
            class="cart-item"
            data-testid="cart-item"
          >
            <img :src="item.image" :alt="item.name" class="item-image" />
            <div class="item-details">
              <h3 class="item-name">{{ item.name }}</h3>
              <p class="item-category">{{ item.category || 'Gown' }}</p>
              <p class="item-price">${{ formatPrice(item.price) }}</p>
            </div>
            <div class="item-quantity">
              <span>Qty: {{ item.quantity }}</span>
            </div>
            <button 
              class="remove-btn" 
              @click="$emit('remove-from-cart', item._id)"
              data-testid="remove-item-btn"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="cart-summary">
          <h3>Order Summary</h3>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${{ formatPrice(subtotal) }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping</span>
            <span>{{ subtotal >= 500 ? 'Free' : '$50' }}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span data-testid="cart-total">${{ formatPrice(total) }}</span>
          </div>
          <router-link 
            to="/payment" 
            class="btn btn-primary btn-checkout"
            data-testid="proceed-to-payment-btn"
          >
            Proceed to Payment
          </router-link>
          <router-link to="/products" class="continue-shopping">
            <i class="fas fa-arrow-left"></i> Continue Shopping
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartPage',
  props: {
    cart: {
      type: Array,
      required: true
    }
  },
  emits: ['remove-from-cart'],
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
    }
  }
}
</script>

<style scoped>
.cart-page {
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

.cart-container {
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

.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background-color: white;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.item-image {
  width: 120px;
  height: 160px;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.item-category {
  font-size: 0.85rem;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.item-price {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

.item-quantity {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.remove-btn {
  background: none;
  color: var(--text-muted);
  font-size: 1rem;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.remove-btn:hover {
  color: var(--error-color);
}

.cart-summary {
  background-color: white;
  padding: 2rem;
  height: fit-content;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.cart-summary h3 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.summary-row.total {
  font-size: 1.2rem;
  font-weight: 600;
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.btn-checkout {
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem;
  text-align: center;
}

.continue-shopping {
  display: block;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.continue-shopping:hover {
  color: var(--primary-color);
}

@media (max-width: 900px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-summary {
    order: -1;
  }
}

@media (max-width: 600px) {
  .cart-item {
    flex-wrap: wrap;
  }
  
  .item-image {
    width: 80px;
    height: 100px;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>