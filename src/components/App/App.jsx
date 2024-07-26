import React, { Component } from 'react'
import { Layout, Tabs } from 'antd'
import { debounce } from 'lodash'

import MyContent from '../MyContent'
import MyFooter from '../MyFooter'
import SearchService from '../../SearchService'
import 'antd/dist/reset.css'
import './App.css'

const baseUrl = 'https://api.themoviedb.org'

class App extends Component {
  constructor(props) {
    super(props)
    this.searchService = new SearchService(baseUrl, process.env.REACT_APP_API_KEY)
    this.state = {
      query: 'return',
      data: null,
      ratedData: [],
      loading: false,
      error: null,
      page: 1,
      totalPages: null,
      activeTab: '1',
    }

    this.handleSearch = debounce(this.handleSearch.bind(this), 2000)
  }

  handleClickBtn = () => {
    window.location.reload()
  }

  handleSearch(text) {
    if (text.length > 0) {
      this.setState({ query: text, page: 1 }, this.fetchData)
    } else {
      this.setState({ query: '', data: null, error: null })
    }
  }

  handlePageChange = (page) => {
    this.setState({ page }, this.fetchData)
  }

  handleTabChange = (activeTab) => {
    this.setState({ activeTab })
  }

  fetchData = async () => {
    const { query, page } = this.state
    if (!query) return

    this.setState({ loading: true })
    try {
      const data = await this.searchService.getResults(query, page)
      console.log(data)
      this.setState({ data: data.results, totalPages: data.total_pages, loading: false })
    } catch (error) {
      console.error('❌ Error fetching data:', error)
      this.setState({ error: '❌ Ошибка при загрузке данных', loading: false })
    }
  }

  rateMovie = (movieId, rating) => {
    const { guestSessionId } = this.props
    // eslint-disable-next-line no-undef
    const rateUrl = `${baseUrl}/3/movie/${movieId}/rating?api_key=${process.env.REACT_APP_API_KEY}&guest_session_id=${guestSessionId}`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        value: rating,
      }),
    }

    fetch(rateUrl, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`)
        }
        return res.json()
      })
      .then((data) => {
        if (data.status_code === 1 || data.status_code === 12 || data.status_code === 13) {
          console.log(`Movie ${movieId} rated successfully!`)
          this.setState((state) => {
            const ratedMovieIndex = state.ratedData.findIndex((movie) => movie.id === movieId)
            let updatedRatedData
            if (ratedMovieIndex > -1) {
              // Обновление рейтинга для существующего фильма
              updatedRatedData = [...state.ratedData]
              updatedRatedData[ratedMovieIndex].rating = rating
            } else {
              // Добавление нового фильма с рейтингом
              const ratedMovie = state.data.find((movie) => movie.id === movieId)
              if (ratedMovie) {
                ratedMovie.rating = rating
                updatedRatedData = [...state.ratedData, ratedMovie]
              } else {
                console.error('Movie not found in search results.')
                return
              }
            }
            return { ratedData: updatedRatedData }
          })
        } else {
          console.error('Failed to rate movie:', data)
        }
      })
      .catch((error) => {
        console.error('❌ Error rating movie:', error)
      })
  }

  // Удаляем функцию addRatedMovieToList, так как ее логика теперь встроена в rateMovie

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state
    if (query !== prevState.query || page !== prevState.page) {
      this.fetchData()
    }
  }

  render() {
    const { activeTab, data, ratedData, loading, totalPages } = this.state

    const tabsItems = [
      {
        key: '1',
        label: 'Search',
        children: (
          <MyContent
            rateMovie={this.rateMovie}
            handleSearch={this.handleSearch}
            handleClickBtn={this.handleClickBtn}
            state={{ data, loading, error: this.state.error }}
            ratedData={ratedData}
          />
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: (
          <MyContent
            rateMovie={this.rateMovie}
            handleClickBtn={this.handleClickBtn}
            state={{ data: ratedData, loading, error: this.state.error }}
            ratedData={ratedData}
          />
        ),
      },
    ]

    return (
      <Layout style={{ minHeight: '100vh', width: '100%' }}>
        <Layout>
          <Tabs activeKey={activeTab} onChange={this.handleTabChange} items={tabsItems} />
        </Layout>
        {activeTab === '1' && <MyFooter totalPages={totalPages} handlePageChange={this.handlePageChange} />}
      </Layout>
    )
  }
}

export default App
