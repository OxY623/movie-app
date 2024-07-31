import { headers } from './http'

export default class APIService {
  constructor() {
    this.baseURL = 'https://api.themoviedb.org'
    // eslint-disable-next-line no-undef
    this.apiKey = process.env.REACT_APP_API_KEY
    this.headers = headers
  }

  // Отправка рейтинга фильма по ID
  async rateMovie(movieId, rating, guestSessionId) {
    const rateMovieUrl = `${this.baseURL}/3/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`
    const options = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ value: rating }),
    }
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await fetch(rateMovieUrl, options)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`)
      }
      const data = await res.json()
      return data
    } catch (error) {
      // console.error('❌ Error rating movie:', error)
      throw error
    }
  }

  // Получение списка рейтинговых фильмов
  async getRatedMovies(guestSessionId, page = 1) {
    const ratedMoviesUrl = `${this.baseURL}/3/guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}&page=${page}`
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await fetch(ratedMoviesUrl)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`)
      }
      return await res.json()
    } catch (error) {
      // console.error('❌ Error fetching rated movies:', error)
      throw error
    }
  }

  // Получение списка фильмов по запросу из поиска
  async getResults(query = 'search', page = 1) {
    const searchUrl = `${this.baseURL}/3/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${page}`
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(searchUrl, {
        method: 'GET',
        headers: this.headers,
      })
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      // console.error('❌ Error fetching data:', error)
      throw error
    }
  }
}
