import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import './assets/css/index.css'
import './assets/css/conn.css'
import App from './App.jsx'
// import "tailwindcss/tailwind.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: false,
      retry: 1,
      onError: (error) => { console.log('Erreur de requête : ', error.message) }
    },
    mutations: {
      onError: (error) => { console.log('Erreur de mutation : ', error.message) }
    }
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
