import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SharedAuthProvider, ThemeProvider, ToastProvider } from '@cloistr/ui/components'
import '@cloistr/ui/styles'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <SharedAuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SharedAuthProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
)
