```bash
gowndotcom/
│
├── frontend/                   ← FRONTEND FOLDER (Vue.js)
│   ├── public/                ← Static files
│   ├── src/
│   │   ├── assets/
│   │   │   └── main.css       ← Global styles
│   │   ├── components/
│   │   │   ├── NavBar.vue     ← Navigation bar
│   │   │   ├── FooterComponent.vue
│   │   │   └── ProductCard.vue
│   │   ├── views/
│   │   │   ├── HomePage.vue   ← Landing page
│   │   │   ├── ProductListPage.vue  ← All products
│   │   │   ├── ProductDetailPage.vue ← Single product
│   │   │   ├── AdminPage.vue  ← Add product form
│   │   │   ├── CartPage.vue   ← Shopping cart
│   │   │   └── PaymentPage.vue ← Checkout
│   │   ├── router/
│   │   │   └── index.js       ← Vue Router config
│   │   ├── App.vue            ← Main Vue component
│   │   └── main.js            ← Vue entry point
│   ├── index.html             ← HTML template
│   ├── vite.config.js         ← Vite config
│   ├── package.json           ← Frontend dependencies
│   └── .env                   ← Frontend environment variables
│
└── README.md                   ← Setup instructions
```