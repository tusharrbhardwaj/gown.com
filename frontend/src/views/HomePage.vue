<template>
  <div class="home-page" data-testid="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <img 
          src="https://images.unsplash.com/photo-1614750880774-6e5cb149607b?w=1920" 
          alt="Elegant bride" 
          class="hero-image"
        />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title fade-in" data-testid="hero-title">
          Gown<span class="gold">.com</span>
        </h1>
        <p class="hero-subtitle fade-in">You love once.</p>
        <p class="hero-tagline fade-in">You just try to repeat it later.</p>
        <router-link to="/products" class="btn btn-primary hero-btn fade-in" data-testid="explore-btn">
          Explore Gowns
        </router-link>
      </div>
    </section>

    <!-- Collection Preview -->
    <section class="collection-preview">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Our Collection</span>
          <h2 class="section-title">Timeless Elegance</h2>
          <p class="section-description">
            Each gown in our collection is crafted with meticulous attention to detail, 
            designed to make your special day truly unforgettable.
          </p>
        </div>
        
        <div class="preview-grid" v-if="featuredProducts.length">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product._id" 
            :product="product"
            @add-to-cart="$emit('add-to-cart', $event)"
          />
        </div>
        <div v-else class="loading-container">
          <div class="spinner"></div>
        </div>
        
        <div class="section-cta">
          <router-link to="/products" class="btn btn-outline" data-testid="view-collection-btn">
            View Full Collection
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <div class="features-grid">
          <div class="feature-card">
            <i class="fas fa-gem feature-icon"></i>
            <h3>Premium Quality</h3>
            <p>Crafted with the finest materials and attention to detail</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-truck feature-icon"></i>
            <h3>Free Shipping</h3>
            <p>Complimentary delivery on all orders over $500</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-redo feature-icon"></i>
            <h3>Easy Returns</h3>
            <p>30-day hassle-free return policy</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default {
  name: 'HomePage',
  components: {
    ProductCard
  },
  emits: ['add-to-cart'],
  data() {
    return {
      featuredProducts: []
    }
  },
  async mounted() {
    await this.fetchFeaturedProducts()
  },
  methods: {
    async fetchFeaturedProducts() {
      try {
        const response = await fetch(`${API_URL}/api/products`)
        const products = await response.json()
        this.featuredProducts = products.slice(0, 3)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
  }
}
</script>

<style scoped>
.home-page {
  padding-top: 0;
}

/* Hero Section */
.hero {
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
}

.hero-content {
  position: relative;
  text-align: center;
  color: var(--text-light);
  padding: 2rem;
}

.hero-title {
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 2px;
}

.hero-title .gold {
  color: var(--primary-color);
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  font-style: italic;
}

.hero-tagline {
  font-size: 1.1rem;
  font-weight: 300;
  margin-bottom: 2.5rem;
  opacity: 0.8;
}

.hero-btn {
  animation-delay: 0.6s;
}

/* Collection Preview */
.collection-preview {
  padding: 6rem 0;
  background-color: var(--bg-light);
}

.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 4rem;
}

.section-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--primary-color);
  font-weight: 500;
}

.section-title {
  font-size: 3rem;
  margin: 1rem 0;
  color: var(--text-dark);
}

.section-description {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.8;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.loading-container {
  display: flex;
  justify-content: center;
  padding: 4rem;
}

.section-cta {
  text-align: center;
}

/* Features Section */
.features {
  padding: 5rem 0;
  background-color: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--text-dark);
}

.feature-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

@media (max-width: 1024px) {
  .preview-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .preview-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .collection-preview,
  .features {
    padding: 4rem 0;
  }
}
</style>