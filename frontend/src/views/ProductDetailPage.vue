<template>
  <div class="product-detail-page" data-testid="product-detail-page">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container container">
      <i class="fas fa-exclamation-circle"></i>
      <p>{{ error }}</p>
      <router-link to="/products" class="btn btn-primary">Back to Collection</router-link>
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="product-detail container">
      <div class="product-gallery">
        <img :src="product.image" :alt="product.name" class="product-main-image" data-testid="product-image" />
      </div>
      
      <div class="product-info">
        <span class="product-category">{{ product.category || 'Gown' }}</span>
        <h1 class="product-name" data-testid="product-name">{{ product.name }}</h1>
        <p class="product-price" data-testid="product-price">${{ formatPrice(product.price) }}</p>
        
        <div class="product-description">
          <h3>Description</h3>
          <p data-testid="product-description">{{ product.description }}</p>
        </div>
        
        <div class="product-meta">
          <div class="meta-item">
            <i class="fas fa-check-circle"></i>
            <span>{{ product.inStock ? 'In Stock' : 'Out of Stock' }}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-truck"></i>
            <span>Free Shipping</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-shield-alt"></i>
            <span>Quality Guaranteed</span>
          </div>
        </div>
        
        <div class="product-actions">
          <button 
            class="btn btn-primary btn-large" 
            @click="handleAddToCart"
            :disabled="!product.inStock"
            data-testid="add-to-cart-detail-btn"
          >
            <i class="fas fa-shopping-bag"></i>
            Add to Cart
          </button>
          <router-link to="/products" class="btn btn-outline">
            <i class="fas fa-arrow-left"></i>
            Back to Collection
          </router-link>
        </div>
        
        <div v-if="addedToCart" class="success-message" data-testid="cart-success-message">
          <i class="fas fa-check"></i> Added to cart successfully!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default {
  name: 'ProductDetailPage',
  emits: ['add-to-cart'],
  data() {
    return {
      product: null,
      loading: true,
      error: null,
      addedToCart: false
    }
  },
  async mounted() {
    await this.fetchProduct()
  },
  methods: {
    async fetchProduct() {
      const productId = this.$route.params.id
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch(`${API_URL}/api/products/${productId}`)
        if (!response.ok) throw new Error('Product not found')
        this.product = await response.json()
      } catch (error) {
        this.error = 'Product not found or unavailable.'
        console.error('Error:', error)
      } finally {
        this.loading = false
      }
    },
    formatPrice(price) {
      return price.toLocaleString('en-US')
    },
    handleAddToCart() {
      this.$emit('add-to-cart', this.product)
      this.addedToCart = true
      setTimeout(() => {
        this.addedToCart = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
.product-detail-page {
  padding-top: 100px;
  min-height: 100vh;
  background-color: var(--bg-light);
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.error-container i {
  font-size: 3rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 2rem;
  padding-bottom: 4rem;
}

.product-gallery {
  position: sticky;
  top: 100px;
}

.product-main-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  background-color: white;
}

.product-info {
  padding: 1rem 0;
}

.product-category {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--primary-color);
  font-weight: 500;
}

.product-name {
  font-size: 2.5rem;
  margin: 0.75rem 0;
  color: var(--text-dark);
}

.product-price {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 2rem;
}

.product-description {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.product-description h3 {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.product-description p {
  color: var(--text-muted);
  line-height: 1.8;
}

.product-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.meta-item i {
  color: var(--success-color);
}

.product-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-large {
  padding: 1rem 2.5rem;
  font-size: 1rem;
}

.success-message {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #d1fae5;
  color: #065f46;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 900px) {
  .product-detail {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .product-gallery {
    position: static;
  }
  
  .product-name {
    font-size: 2rem;
  }
}
</style>