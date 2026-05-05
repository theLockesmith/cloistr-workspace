import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SharedAuthProvider, ToastProvider } from '@cloistr/ui/components'
import '@cloistr/ui/styles'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <SharedAuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SharedAuthProvider>
    </ToastProvider>
  </StrictMode>,
)
