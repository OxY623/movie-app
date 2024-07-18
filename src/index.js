import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

// Тестовые данные API Key и поисковой запрос
const APIKey = 'be07142a60bd7787c2f5699d101a5566'
let search = 'Bad day'
let encodedSearch = encodeURIComponent(search)
const url = `https://api.themoviedb.org/3/search/movie?query=${encodedSearch}&api_key=${APIKey}`
console.log(url) // Проверяем формирование URL

//Вызываем функцию get Resource и обрабатываем результаты и ошибки
const getResource = async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

root.render(<App getResource={() => getResource(url)} />)
