import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

var redirect = sessionStorage.getItem('redirect');
if (redirect && redirect !== '/' && redirect !== '/villa-adora-website/') {
  sessionStorage.removeItem('redirect');
  history.replaceState(null, '', redirect);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)