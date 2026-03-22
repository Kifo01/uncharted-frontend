import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'

import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CompareProvider } from './context/CompareContext.jsx'
import { RecentlyViewedProvider } from './context/RecentlyViewedContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <WishlistProvider>
        <CompareProvider>
          <RecentlyViewedProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </RecentlyViewedProvider>
        </CompareProvider>
      </WishlistProvider>
    </ThemeProvider>
  </StrictMode>,
)