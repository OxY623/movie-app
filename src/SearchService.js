class SearchService {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL
    this.apiKey = apiKey
  }

  async getResults(query) {
    if (!query) {
      throw new Error('Query is required')
    }

    const response = await fetch(
      `${this.baseURL}/3/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}`
    )
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`)
    }
    return await response.json()
  }
}

export default SearchService
