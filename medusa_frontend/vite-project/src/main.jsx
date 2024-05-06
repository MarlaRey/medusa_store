import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CartProvider, MedusaProvider } from 'medusa-react'
import { QueryClient } from '@tanstack/react-query'
import { StoreContextProvider } from './components/context/StoreContext.jsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl="http://localhost:9000">
      <CartProvider>
        <StoreContextProvider>
        <App />
        </StoreContextProvider>
      </CartProvider>
    </MedusaProvider>
  </React.StrictMode>,
)
