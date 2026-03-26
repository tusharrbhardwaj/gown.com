<template>
  <nav class="navbar" data-testid="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo" data-testid="logo">
        <span class="logo-text">Gown</span>
        <span class="logo-dot">.com</span>
      </router-link>
      
      <div class="nav-links" :class="{ active: mobileMenuOpen }">
        <router-link to="/" class="nav-link" data-testid="nav-home" @click="closeMobileMenu">Home</router-link>
        <router-link to="/products" class="nav-link" data-testid="nav-products" @click="closeMobileMenu">Collection</router-link>
        <router-link to="/admin" class="nav-link" data-testid="nav-admin" @click="closeMobileMenu">Add Product</router-link>
      </div>
      
      <div class="nav-actions">
        <router-link to="/cart" class="cart-link" data-testid="nav-cart">
          <i class="fas fa-shopping-bag"></i>
          <span v-if="cartCount > 0" class="cart-badge" data-testid="cart-badge">{{ cartCount }}</span>
        </router-link>
        
        <button class="mobile-menu-btn" @click="toggleMobileMenu" data-testid="mobile-menu-btn">
          <i :class="mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    cartCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(250, 248, 245, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 600;
}

.logo-text {
  color: var(--text-dark);
}

.logo-dot {
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.nav-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-dark);
  letter-spacing: 0.5px;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.cart-link {
  position: relative;
  font-size: 1.25rem;
  color: var(--text-dark);
  transition: color 0.3s ease;
}

.cart-link:hover {
  color: var(--primary-color);
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 18px;
  height: 18px;
  background-color: var(--primary-color);
  color: var(--text-dark);
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu-btn {
  display: none;
  background: none;
  font-size: 1.25rem;
  color: var(--text-dark);
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }
  
  .nav-links {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: rgba(250, 248, 245, 0.98);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .nav-links.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .mobile-menu-btn {
    display: block;
  }
}
</style>