import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/variables.css'; 
import './styles/global.css';
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { TicketsProvider } from './context/TicketsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
    <AuthProvider>
      <TicketsProvider>
      <App />
      </TicketsProvider>
    </AuthProvider>
  </BrowserRouter>
  </StrictMode>,
)
