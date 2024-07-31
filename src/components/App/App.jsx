import React, { Component } from 'react'
import { Layout, Tabs } from 'antd'
import { debounce } from 'lodash'

import MyContent from '../MyContent'
import MyFooter from '../MyFooter'
import APIService from '../../service/APIService'
import 'antd/dist/reset.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.serviceAPI = new APIService()
    this.state = {
      query: 'return',
      data: null,
      ratedData: null,
      loading: false,
      error: null,
      page: 1,
      ratedPage: 1,
      totalPages: null,
      ratedTotalPages: null,
      activeTab: '1',
    }

    this.handleSearch = debounce(this.handleSearch.bind(this), 2000)
  }

  handleClickBtn = () => {
    window.location.reload()
  }

  handleSearch = (text) => {
    if (text.length > 0) {
      this.setState({ query: text, page: 1 }, this.fetchData)
    } else {
      this.setState({ query: '', data: null, error: null })
    }
  }

  handlePageChange = (page) => {
    this.setState({ page }, this.fetchData)
  }

  handleRatedPageChange = (ratedPage) => {
    this.setState({ ratedPage }, this.fetchRatedMovies)
  }

  handleTabChange = (activeTab) => {
    this.setState({ activeTab }, () => {
      if (activeTab === '2') {
        this.fetchRatedMovies()
      }
    })
  }

  fetchData = async () => {
    const { query, page } = this.state
    if (!query) return

    this.setState({ loading: true, error: null })
    try {
      const data = await this.serviceAPI.getResults(query, page)
      this.setState({
        data: data.results.map((movie) => ({
          ...movie,
          rating: this.getRatingFromLocalStorage(movie.id) || 0,
        })),
        totalPages: data.total_pages,
        loading: false,
      })
    } catch (error) {
      this.setState({ error: '❌ Ошибка при загрузке данных', loading: false })
    }
  }

  rateMovie = async (movieId, rating) => {
    this.setState({ loading: true })
    const { guestSessionId } = this.props
    try {
      const data = await this.serviceAPI.rateMovie(movieId, rating, guestSessionId)
      if ([1, 12, 13].includes(data.status_code)) {
        this.updateRatedData(movieId, rating)
        this.setState((state) => ({
          data: state.data.map((movie) => (movie.id === movieId ? { ...movie, rating } : movie)),
          loading: false,
        }))
      } else {
        this.setState({ error: `Failed to rate movie: ${data}`, loading: false })
      }
    } catch (error) {
      this.setState({ error: `❌ Error rating movie: ${error}`, loading: false })
    }
  }

  fetchRatedMovies = async () => {
    const { guestSessionId } = this.props
    const { ratedPage } = this.state
    this.setState({ loading: true, error: null })
    try {
      const ratedMovies = await this.serviceAPI.getRatedMovies(guestSessionId, ratedPage)
      this.setState({
        ratedData: ratedMovies.results,
        ratedTotalPages: ratedMovies.total_pages,
        loading: false,
      })
      this.saveRatedMoviesToLocalStorage(ratedMovies.results)
    } catch (error) {
      this.setState({ error: '❌ Ошибка при загрузке данных', loading: false })
    }
  }

  updateRatedData = (movieId, rating) => {
    this.setState((state) => {
      const updatedRatedData = state.ratedData
        ? state.ratedData.map((movie) => (movie.id === movieId ? { ...movie, rating } : movie))
        : []

      this.saveRatedMoviesToLocalStorage(updatedRatedData)

      return { ratedData: updatedRatedData }
    })
  }

  saveRatedMoviesToLocalStorage = (ratedMovies) => {
    const { guestSessionId } = this.props
    console.log(ratedMovies)
    const ratedMoviesWithGuestId = ratedMovies.map((movie) => ({
      id: movie.id,
      rating: movie.rating,
      guestSessionId,
    }))
    localStorage.setItem('ratedMovies', JSON.stringify(ratedMoviesWithGuestId))
  }

  getRatingFromLocalStorage = (movieId) => {
    const { guestSessionId } = this.props
    const ratedMovies = JSON.parse(localStorage.getItem('ratedMovies')) || []
    const movie = ratedMovies.find((movie) => movie.id === movieId && movie.guestSessionId === guestSessionId)
    return movie ? movie.rating : 0
  }

  componentDidMount() {
    this.fetchData()
    // this.fetchRatedMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page, activeTab } = this.state
    if (query !== prevState.query || page !== prevState.page) {
      this.fetchData()
    }
    if (activeTab === '2' && activeTab !== prevState.activeTab) {
      this.fetchRatedMovies()
    }
  }

  componentDidUnmount() {
    localStorage.removeItem('ratedMovies')
  }

  render() {
    const { activeTab, data, ratedData, loading, totalPages, ratedTotalPages, error } = this.state

    const tabsItems = [
      {
        key: '1',
        label: 'Search',
        children: (
          <MyContent
            rateMovie={this.rateMovie}
            handleSearch={this.handleSearch}
            handleClickBtn={this.handleClickBtn}
            state={{ data, loading, error }}
            ratedData={ratedData}
          />
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: (
          <div>
            <MyContent
              rateMovie={this.rateMovie}
              handleClickBtn={this.handleClickBtn}
              state={{ data: ratedData, loading, error }}
              ratedData={ratedData}
            />
            <MyFooter totalPages={ratedTotalPages} handlePageChange={this.handleRatedPageChange} />
          </div>
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
