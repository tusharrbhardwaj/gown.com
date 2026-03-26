<template>
  <footer class="footer" data-testid="footer">
    <div class="footer-container">
      <div class="footer-brand">
        <h3 class="footer-logo">
          <span>Gown</span><span class="gold">.com</span>
        </h3>
        <p class="footer-tagline">Elegance for your special moments</p>
      </div>
      
      <div class="footer-links">
        <div class="footer-column">
          <h4>Navigation</h4>
          <router-link to="/">Home</router-link>
          <router-link to="/products">Collection</router-link>
          <router-link to="/admin">Add Product</router-link>
        </div>
        
        <div class="footer-column">
          <h4>Contact</h4>
          <p><i class="fas fa-envelope"></i> info@gown.com</p>
          <p><i class="fas fa-phone"></i> +1 (555) 123-4567</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Gowndotcom. All rights reserved.</p>
        <p class="footer-note">Made with Vue.js + Express + MongoDB</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: var(--secondary-color);
  color: var(--text-light);
  padding: 4rem 2rem 2rem;
  margin-top: auto;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-brand {
  margin-bottom: 3rem;
}

.footer-logo {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.footer-logo .gold {
  color: var(--primary-color);
}

.footer-tagline {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  max-width: 400px;
}

.footer-column h4 {
  font-family: var(--font-display);
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.footer-column a,
.footer-column p {
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.footer-column a:hover {
  color: var(--primary-color);
}

.footer-column i {
  margin-right: 0.5rem;
  color: var(--primary-color);
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
}

.footer-note {
  margin-top: 0.5rem;
  font-size: 0.8rem !important;
}

@media (max-width: 768px) {
  .footer {
    padding: 3rem 1rem 1.5rem;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
  }
}
</style>