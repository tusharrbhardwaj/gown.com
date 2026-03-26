<template>
  <div class="product-card card" data-testid="product-card">
    <div class="product-image-container">
      <img :src="product.image" :alt="product.name" class="product-image" />
      <div class="product-overlay">
        <router-link :to="`/product/${product._id}`" class="btn btn-primary" data-testid="view-details-btn">
          View Details
        </router-link>
      </div>
    </div>
    <div class="product-info">
      <span class="product-category">{{ product.category || 'Gown' }}</span>
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="product-footer">
        <span class="product-price">${{ formatPrice(product.price) }}</span>
        <button 
          class="add-to-cart-btn" 
          @click="$emit('add-to-cart', product)"
          data-testid="add-to-cart-btn"
        >
          <i class="fas fa-shopping-bag"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  emits: ['add-to-cart'],
  methods: {
    formatPrice(price) {
      return price.toLocaleString('en-US')
    }
  }
}
</script>

<style scoped>
.product-card {
  position: relative;
  background-color: white;
}

.product-image-container {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.product-info {
  padding: 1.25rem;
}

.product-category {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--primary-color);
  font-weight: 500;
}

.product-name {
  font-size: 1.1rem;
  margin: 0.5rem 0;
  font-weight: 500;
  color: var(--text-dark);
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.75rem;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
}

.add-to-cart-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  color: var(--text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: var(--primary-color);
  color: var(--text-dark);
  transform: scale(1.1);
}
</style>