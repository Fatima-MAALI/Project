import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "@fontsource/poppins"
import { Toaster } from "react-hot-toast"
import ThemeDropDown from './components/shared/theme-dropdown.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster position='bottom-right' />
    <div style={{ fontFamily: "poppins" }}>
      <App />
    </div>
  </React.StrictMode>,
)

