import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductListPage from '../views/ProductListPage.vue'
import ProductDetailPage from '../views/ProductDetailPage.vue'
import AdminPage from '../views/AdminPage.vue'
import CartPage from '../views/CartPage.vue'
import PaymentPage from '../views/PaymentPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductListPage
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetailPage
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  },
  {
    path: '/payment',
    name: 'Payment',
    component: PaymentPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
