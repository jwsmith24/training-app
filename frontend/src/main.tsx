import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const media = window.matchMedia("(prefers-color-scheme: dark)");

// if browser prefers dark, set it
function apply() {
    document.documentElement.classList.toggle("dark", media.matches);
}

apply();
media.addEventListener("change", apply); // update theme on preference change
// todo: theme provider for the app to support a toggle eventually

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
