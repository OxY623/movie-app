import React, { Component } from 'react'
import { Layout } from 'antd'
import { debounce } from 'lodash'

import MyHeader from '../MyHeader'
import MyContent from '../MyContent'
import MyFooter from '../MyFooter'
import SearchService from '../../SearchService'

import 'antd/dist/reset.css'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.searchService = new SearchService('https://api.themoviedb.org', 'be07142a60bd7787c2f5699d101a5566')
    this.genreMapping = {
      878: 'Science Fiction',
      28: 'Action',
      14: 'Fantasy',
      12: 'Adventure',
    }
    this.state = {
      query: 'search',
      data: null,
      loading: false,
      error: null,
      page: 1,
      totalPages: null,
    }

    // Bind methods
    this.handleSearch = debounce(this.handleSearch.bind(this), 2000)
  }

  getGenres = (genreIds) => {
    return genreIds.map((id) => this.genreMapping[id] || 'Unknown')
  }

  handleClickBtn = () => {
    window.location.reload()
  }

  handleSearch(text) {
    this.setState({ query: text, page: 1 }, this.fetchData) // Reset page to 1 on new search
  }

  handlePageChange = (page) => {
    this.setState({ page }, this.fetchData) // Fetch new data on page change
  }

  fetchData = () => {
    const { query, page } = this.state

    // if (!query) {
    //   console.log('Поисковый запрос пуст')
    //   return
    // }

    this.setState({ loading: true })
    this.searchService
      .getResults(query, page)
      .then((data) => {
        this.setState({ data: data.results, totalPages: data.total_pages, loading: false })
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        this.setState({ error: 'Ошибка при загрузке данных', loading: false })
      })
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      if (this.state.query) {
        this.fetchData()
      } else {
        // console.log('Запрос пустой')
        this.setState({ data: null, error: null, loading: false })
      }
    }
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh', width: '100%' }}>
        <MyHeader />
        <Layout>
          <MyContent
            handleSearch={this.handleSearch}
            handleClickBtn={this.handleClickBtn}
            getGenres={this.getGenres}
            state={this.state}
            genreMapping={this.genreMapping}
          />
        </Layout>
        <MyFooter totalPages={this.state.totalPages} handlePageChange={this.handlePageChange} />
      </Layout>
    )
  }
}
