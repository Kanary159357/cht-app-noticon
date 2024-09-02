import { Toaster } from '@/components/ui/sonner.tsx'
import { injectDevMock } from '@/utils/wam.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient()
if (import.meta.env.MODE === 'development') {
  injectDevMock()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
)
