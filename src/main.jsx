
import { createRoot } from 'react-dom/client'
import './index.css'
import './lib/axios'
import { initLogger } from './lib/logger'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'

initLogger();

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
