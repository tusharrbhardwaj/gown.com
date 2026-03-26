<template>
  <div class="products-page" data-testid="products-page">
    <div class="page-header">
      <div class="container">
        <span class="page-label">Our Collection</span>
        <h1 class="page-title">Elegant Gowns</h1>
        <p class="page-description">
          Discover our curated collection of exquisite gowns for every special occasion
        </p>
      </div>
    </div>

    <div class="container products-container">
      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading collection...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <i class="fas fa-exclamation-circle"></i>
        <p>{{ error }}</p>
        <button class="btn btn-primary" @click="fetchProducts">Try Again</button>
      </div>

      <!-- Products Grid -->
      <div v-else-if="products.length" class="products-grid" data-testid="products-grid">
        <ProductCard 
          v-for="product in products" 
          :key="product._id" 
          :product="product"
          @add-to-cart="$emit('add-to-cart', $event)"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="empty-container">
        <i class="fas fa-box-open"></i>
        <p>No products available yet</p>
        <router-link to="/admin" class="btn btn-primary">Add First Product</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default {
  name: 'ProductListPage',
  components: {
    ProductCard
  },
  emits: ['add-to-cart'],
  data() {
    return {
      products: [],
      loading: true,
      error: null
    }
  },
  async mounted() {
    await this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(`${API_URL}/api/products`)
        if (!response.ok) throw new Error('Failed to fetch products')
        this.products = await response.json()
      } catch (error) {
        this.error = 'Unable to load products. Please try again.'
        console.error('Error:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.products-page {
  padding-top: 80px;
  min-height: 100vh;
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
  max-width: 500px;
  margin: 0 auto;
}

.products-container {
  padding: 4rem 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.loading-container,
.error-container,
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  text-align: center;
}

.loading-container p,
.error-container p,
.empty-container p {
  margin: 1rem 0;
  color: var(--text-muted);
}

.error-container i,
.empty-container i {
  font-size: 3rem;
  color: var(--text-muted);
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>