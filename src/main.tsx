import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import ThreeProvider from './providers/ThreeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThreeProvider>
      <App />
    </ThreeProvider>
  </StrictMode>
)
