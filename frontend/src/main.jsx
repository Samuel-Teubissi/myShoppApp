import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './assets/css/index.css'
import './assets/css/conn.css'
import App from './App.jsx'
import "tailwindcss/tailwind.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
