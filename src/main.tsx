import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.tsx'
import './styles/global.css'
import './shared/api/auth.interceptor.ts'
import { AppProviders } from './app/providers.tsx'
import { Toaster } from './components/ui/Toast/index.ts'
import { ErrorBoundary } from './components/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProviders>
        <App />
        <Toaster />
      </AppProviders>
    </ErrorBoundary>
  </StrictMode>,
)
