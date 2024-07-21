export default class SearchService {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL
    this.apiKey = apiKey
  }

  async getResults(query = 'search', page = 1) {
    // if (!query) {
    //   throw new Error('Query is required')
    // }
    // if (query.length === 0) {
    //   return
    // }

    const response = await fetch(
      // `${this.baseURL}/3/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}`
      `${this.baseURL}/3/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query || '  ')}&page=${page}`
    )
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`)
    }
    return await response.json()
  }
}
