<template>
  <div id="app">
    <NavBar :cartCount="cart.length" />
    <router-view 
      :cart="cart" 
      @add-to-cart="addToCart" 
      @remove-from-cart="removeFromCart"
      @clear-cart="clearCart"
    />
    <FooterComponent />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    FooterComponent
  },
  data() {
    return {
      cart: []
    }
  },
  methods: {
    addToCart(product) {
      const existingItem = this.cart.find(item => item._id === product._id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(productId) {
      const index = this.cart.findIndex(item => item._id === productId)
      if (index > -1) {
        this.cart.splice(index, 1)
      }
    },
    clearCart() {
      this.cart = []
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
