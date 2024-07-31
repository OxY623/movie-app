import React from 'react'
import ReactDOM from 'react-dom/client'

import { AuthProvider } from './context/AuthContext'
import { GenreProvider } from './context/GenreContext'
import AppWithAuth from './context/AppWithAuth'

import './index.css'

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <React.StrictMode>
      <AuthProvider>
        <GenreProvider>
          <AppWithAuth />
        </GenreProvider>
      </AuthProvider>
    </React.StrictMode>
  )
} else {
  throw new Error('No root element found')
}
