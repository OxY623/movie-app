import React from 'react'

import { useAuth } from '../AuthContext'

import App from './App'

import 'antd/dist/reset.css'
import './App/App.css'

// Использование хука useAuth для получения данных о аутентификации
const AppWithAuth = () => {
  const { isAuth, guestSessionId } = useAuth()

  if (!isAuth) {
    return null // AuthProvider обрабатывает состояния неаутентифицированных пользователей
  }

  return <App guestSessionId={guestSessionId} />
}

export default AppWithAuth
