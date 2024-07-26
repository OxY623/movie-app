export default class SearchService {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL
    this.apiKey = apiKey
  }

  async getResults(query = 'search', page = 1) {
    // if (!query) {
    //   throw new Error('❌ Query is required')
    // }
    // if (query.length === 0) {
    //   throw new Error('❌ Пустой поисковый запрос')
    // }
    // if (page <= 0) {
    //   throw new Error('❌ Номер страницы должен быть положительным числом')
    // }
    // if (query.length === 0 && page > 1) {
    //   throw new Error('❌ Такого не может быть')
    // }

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
