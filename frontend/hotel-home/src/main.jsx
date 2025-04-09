import React from 'react'
import ReactDOM from 'react-dom/client.js'
import App from './App.jsx'
import './index.css' // ✅ make sure this is here and not App.css

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
