import './http'

export default class SearchService {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL
    this.apiKey = apiKey
  }
  //
  //Получение списка фильмов по запросу из поиска
  async getResults(query = 'search', page = 1) {
    const response = await fetch(
      // `${this.baseURL}/3/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}`
      `${this.baseURL}/3/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query || '  ')}&page=${page}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    )
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`)
    }
    return await response.json()
  }
}
