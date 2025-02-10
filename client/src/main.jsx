import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './store/auth.jsx'
import { ToastContainer } from "react-toastify"

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <App />
      <ToastContainer
        autoClose={3000}
        theme="colored"
        position="top-right"
      />
    </React.StrictMode>
  </AuthProvider>
)

