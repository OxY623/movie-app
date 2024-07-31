import React, { createContext, useContext, useState, useEffect } from 'react'
import { Alert } from 'antd'

import APIService from '../service/APIService'

// Создание контекста для аутентификации
const AuthContext = createContext()

// Компонент-поставщик контекста
export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => !!sessionStorage.getItem('session_id'))
  const [errorMessage, setErrorMessage] = useState('')
  const [guestSessionId, setGuestSessionId] = useState(sessionStorage.getItem('session_id'))
  const serviceAPI = new APIService()

  useEffect(() => {
    // Обработчик события оффлайна
    const handleOffline = () => {
      if (!isAuth) {
        console.log('You are offline')
        setErrorMessage('Connection lost')
      }
    }

    // Функция для получения гест-сессии
    const fetchGuestSession = async () => {
      try {
        const data = await serviceAPI.authenticateUser()
        sessionStorage.setItem('session_id', data.guest_session_id)
        setIsAuth(true)
        setGuestSessionId(data.guest_session_id)
      } catch (error) {
        setErrorMessage(error.message || 'Something went wrong')
      }
    }

    // Если пользователь не аутентифицирован, запрашиваем новый гест-сессию
    if (!isAuth) {
      fetchGuestSession()
    }

    // Добавляем и удаляем слушателя события оффлайна
    window.addEventListener('offline', handleOffline)
    return () => window.removeEventListener('offline', handleOffline)
  }, [isAuth, serviceAPI])

  return (
    <AuthContext.Provider value={{ isAuth, guestSessionId }}>
      {isAuth ? (
        children
      ) : (
        <div>{errorMessage && <Alert message="Error" description={errorMessage} type="error" showIcon banner />}</div>
      )}
    </AuthContext.Provider>
  )
}

// Хук для использования контекста аутентификации
export const useAuth = () => useContext(AuthContext)
