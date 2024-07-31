import React, { createContext, useContext, useState, useEffect } from 'react'
import { Alert } from 'antd'

import { headers } from '../service/http'

// Создание контекста для аутентификации
const AuthContext = createContext()

// Компонент-поставщик контекста
export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => !!sessionStorage.getItem('session_id'))
  const [errorMessage, setErrorMessage] = useState('')
  const [guestSessionId, setGuestSessionId] = useState(sessionStorage.getItem('session_id'))

  useEffect(() => {
    // Обработчик события оффлайна
    const handleOffline = () => {
      if (!isAuth) {
        console.log('You are offline')
        setErrorMessage('Connection lost')
      }
    }

    // Если пользователь не аутентифицирован, запрашиваем новый гест-сессии
    if (!isAuth) {
      console.log('Session ID does not exist')
      fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
        headers,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          sessionStorage.setItem('session_id', data.guest_session_id)
          setIsAuth(true)
          setGuestSessionId(data.guest_session_id)
        })
        .catch((error) => {
          setErrorMessage(error.message || 'Something went wrong')
        })
    }

    // Добавляем и удаляем слушателя события оффлайна
    window.addEventListener('offline', handleOffline)
    return () => window.removeEventListener('offline', handleOffline)
  }, [isAuth])

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
