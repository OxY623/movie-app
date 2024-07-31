// GenreContext.js
import React, { createContext, useState, useEffect } from 'react'

const GenreContext = createContext()

const GenreProvider = ({ children }) => {
  // eslint-disable-next-line no-undef
  const apiKey = process.env.REACT_APP_API_KEY
  const [genres, setGenres] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const baseUrl = 'https://api.themoviedb.org'
  // eslint-disable-next-line no-undef
  const genreUrl = `${baseUrl}/3/genre/movie/list?api_key=${apiKey}&language=en-US`

  useEffect(() => {
    fetch(genreUrl)
      .then((res) => res.json())
      .then((data) => {
        const genreMap = data.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name
          return acc
        }, {})
        setGenres(genreMap)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [])

  return <GenreContext.Provider value={{ genres, loading, error }}>{children}</GenreContext.Provider>
}

export { GenreProvider, GenreContext }
