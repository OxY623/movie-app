import React from 'react'
import ReactDOM from 'react-dom/client'

import { AuthProvider } from './AuthContext'
import { GenreProvider } from './GenreContext'
import AppWithAuth from './components/AppWithAuth'

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
}
