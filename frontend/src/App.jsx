import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
// import ListArticles from './components/ListArticlesComp'
// import "tailwindcss/tailwind.css"
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
// import HeaderComp from './components/DefaultRouterComp'
import PaginateComponent from './components/PaginateComp'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AboutPage from './pages/AboutPage'
import UserPage from './pages/UserPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRouteAuth from './context/ProtectedRouteAuth'
import { UserLogout } from './pages/UserLogout'
import HomePage from './pages/HomePage'
import DefaultRouterComp from './components/DefaultRouterComp'
import ConnectedRouteAuth from './context/ConnectedRouteAuth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultRouterComp />,
    children: [
      {
        index: true,
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
        path: 'user',
        element: <ProtectedRouteAuth><UserPage /></ProtectedRouteAuth>
      },
      {
        path: 'logout',
        element: <UserLogout />
      }
    ]
  }
])

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
