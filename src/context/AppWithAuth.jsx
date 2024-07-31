import React from 'react'

import App from '../components/App'

import { useAuth } from './AuthContext'

import 'antd/dist/reset.css'
import '../components/App/App.css'

// Использование хука useAuth для получения данных о аутентификации
const AppWithAuth = () => {
  const { isAuth, guestSessionId } = useAuth()

  if (!isAuth) {
    return null // AuthProvider обрабатывает состояния неаутентифицированных пользователей
  }

  return <App guestSessionId={guestSessionId} />
}

export default AppWithAuth
