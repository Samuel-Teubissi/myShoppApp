import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AboutPage from './pages/AboutPage'
import UserPage from './pages/UserPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRouteAuth from './context/ProtectedRouteAuth'
import HomePage from './pages/HomePage'
import DefaultRouterComp from './components/DefaultRouterComp'
import ConnectedRouteAuth from './context/ConnectedRouteAuth'
import StockPage from './pages/StockPage'
import { ModalProvider } from './context/useModal'
import { CartProvider } from './context/useCart'
import AdminPage from './pages/AdminPage'
import LandingPage from './pages/LandingPage'
import Unauthorized from './pages/Unauthorized'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultRouterComp />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: 'home',
        element: <HomePage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'login',
        element: <ConnectedRouteAuth><LoginPage /></ConnectedRouteAuth>
      },
      {
        path: 'register',
        element: <ConnectedRouteAuth><RegisterPage /></ConnectedRouteAuth>
      },
      {
        path: 'admin',
        element: <ProtectedRouteAuth allowedRoles='admin'><AdminPage /></ProtectedRouteAuth>
      },
      {
        path: 'user',
        element: <ProtectedRouteAuth allowedRoles='user'><UserPage /></ProtectedRouteAuth>
      },
      {
        path: 'user/stock',
        element: <ProtectedRouteAuth allowedRoles='user'><StockPage /></ProtectedRouteAuth>
      },
      {
        path: 'unauthorized',
        element: <Unauthorized />
      }
    ]
  }
])

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default App
