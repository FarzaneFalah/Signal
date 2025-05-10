import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx'
import ThemeProvider from 'react-bootstrap/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <ThemeProvider
            breakpoints={['sm', 'md', 'lg', 'xl', 'xxl']}
            minBreakpoint="sm"
            >
      <App />
        </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
