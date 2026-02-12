import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/global.css'
import './shared/api/auth.interceptor.ts'
import { AppProviders } from './app/providers.tsx'
import { Toaster } from './components/ui/Toast/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
      <Toaster />
    </AppProviders>
  </StrictMode>,
)
