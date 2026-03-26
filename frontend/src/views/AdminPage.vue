<template>
  <div class="admin-page" data-testid="admin-page">
    <div class="page-header">
      <div class="container">
        <span class="page-label">Admin Panel</span>
        <h1 class="page-title">Add New Product</h1>
        <p class="page-description">
          Add a new gown to your collection
        </p>
      </div>
    </div>

    <div class="container admin-container">
      <div class="admin-content">
        <form @submit.prevent="submitProduct" class="product-form" data-testid="add-product-form">
          <div class="form-group">
            <label class="form-label" for="name">Product Name *</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              class="form-input" 
              placeholder="e.g., Elegant White Wedding Gown"
              required
              data-testid="product-name-input"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="price">Price ($) *</label>
              <input 
                type="number" 
                id="price" 
                v-model="form.price" 
                class="form-input" 
                placeholder="e.g., 1499"
                min="0"
                required
                data-testid="product-price-input"
              />
            </div>
            <div class="form-group">
              <label class="form-label" for="category">Category</label>
              <select id="category" v-model="form.category" class="form-input" data-testid="product-category-select">
                <option value="Wedding">Wedding</option>
                <option value="Evening">Evening</option>
                <option value="Prom">Prom</option>
                <option value="Formal">Formal</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="image">Image URL *</label>
            <input 
              type="url" 
              id="image" 
              v-model="form.image" 
              class="form-input" 
              placeholder="https://example.com/image.jpg"
              required
              data-testid="product-image-input"
            />
            <small class="form-hint">Use Unsplash or any image URL</small>
          </div>

          <div class="form-group">
            <label class="form-label" for="description">Description *</label>
            <textarea 
              id="description" 
              v-model="form.description" 
              class="form-textarea" 
              placeholder="Describe the gown's features, materials, and style..."
              rows="4"
              required
              data-testid="product-description-input"
            ></textarea>
          </div>

          <!-- Image Preview -->
          <div v-if="form.image" class="image-preview">
            <h4>Image Preview</h4>
            <img :src="form.image" alt="Preview" @error="imageError = true" @load="imageError = false" />
            <p v-if="imageError" class="preview-error">Unable to load image. Please check the URL.</p>
          </div>

          <div v-if="message" :class="['alert', success ? 'alert-success' : 'alert-error']" data-testid="form-message">
            {{ message }}
          </div>

          <button 
            type="submit" 
            class="btn btn-primary btn-submit" 
            :disabled="submitting"
            data-testid="submit-product-btn"
          >
            <span v-if="submitting">
              <i class="fas fa-spinner fa-spin"></i> Adding...
            </span>
            <span v-else>
              <i class="fas fa-plus"></i> Add Product
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default {
  name: 'AdminPage',
  data() {
    return {
      form: {
        name: '',
        price: '',
        description: '',
        image: '',
        category: 'Wedding'
      },
      submitting: false,
      message: '',
      success: false,
      imageError: false
    }
  },
  methods: {
    async submitProduct() {
      this.submitting = true
      this.message = ''
      
      try {
        const response = await fetch(`${API_URL}/api/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...this.form,
            price: Number(this.form.price)
          })
        })
        
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Failed to add product')
        }
        
        this.success = true
        this.message = 'Product added successfully!'
        this.resetForm()
        
        setTimeout(() => {
          this.message = ''
        }, 5000)
        
      } catch (error) {
        this.success = false
        this.message = error.message || 'Error adding product. Please try again.'
      } finally {
        this.submitting = false
      }
    },
    resetForm() {
      this.form = {
        name: '',
        price: '',
        description: '',
        image: '',
        category: 'Wedding'
      }
      this.imageError = false
    }
  }
}
</script>

<style scoped>
.admin-page {
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

.admin-container {
  padding: 4rem 0;
}

.admin-content {
  max-width: 700px;
  margin: 0 auto;
}

.product-form {
  background-color: white;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-hint {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.image-preview {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: var(--bg-light);
  border: 1px solid var(--border-color);
}

.image-preview h4 {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: var(--text-muted);
}

.image-preview img {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.preview-error {
  color: var(--error-color);
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.btn-submit {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .product-form {
    padding: 2rem 1.5rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>