import React, { Component } from 'react'
import { Layout } from 'antd'

import MyHeader from '../MyHeader'
// import MovieCards from '../MovieCards'
import MyContent from '../MyContent'
import MyFooter from '../MyFooter'
import SearchService from '../../SearchService'

import 'antd/dist/reset.css'
import './App.css'

// const { Content } = Layout
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
      data: null,
      error: null,
    }
  }

  getGenres = (genreIds) => {
    return genreIds.map((id) => this.genreMapping[id] || 'Unknown')
  }

  handleClickBtn = () => {
    window.location.reload()
  }

  componentDidMount() {
    this.searchService
      .getResults('return')
      .then((data) => {
        this.setState({ data: data.results })
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        this.setState({ error: 'Ошибка при загрузке данных' })
      })
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh', width: '100%' }}>
        <MyHeader />
        <Layout>
          <MyContent
            handleClickBtn={this.handleClickBtn}
            getGenres={this.getGenres}
            state={this.state}
            genreMapping={this.genreMapping}
          />
          {/*<Content>*/}
          {/*  /!*<h1 style={{ textAlign: 'center', margin: '20px 0' }}>Movie App</h1>*!/*/}
          {/*  <div className="inner-content">*/}
          {/*    <Input placeholder="Type to search..." style={{ width: '100%', marginBottom: 34 }} />*/}
          {/*    {this.state.error ? (*/}
          {/*      // <div style={{ color: 'red', textAlign: 'center' }}>{this.state.error}</div>*/}
          {/*      <>*/}
          {/*        <Result*/}
          {/*          status="404"*/}
          {/*          title="404"*/}
          {/*          subTitle={`Sorry, ${this.state.error}`}*/}
          {/*          extra={*/}
          {/*            <Button type="primary" onClick={this.handleClickBtn}>*/}
          {/*              Update page now*/}
          {/*            </Button>*/}
          {/*          }*/}
          {/*        />*/}
          {/*        <Alert message="Error" description={this.state.error} type="error" showIcon />*/}
          {/*      </>*/}
          {/*    ) : this.state.data ? (*/}
          {/*      <MovieCards getGenres={this.getGenres} cards={this.state.data} />*/}
          {/*    ) : (*/}
          {/*      // <div style={{ textAlign: 'center' }}>Loading...</div>*/}
          {/*      <div className="spinner-wrapper">*/}
          {/*        <Spin size="large" />*/}
          {/*      </div>*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*</Content>*/}
        </Layout>
        {/*<Footer style={{ backgroundColor: '#F0EFEF' }}>*/}
        {/*  <Pagination align="center" defaultCurrent={1} total={50} />*/}
        {/*</Footer>*/}
        <MyFooter />
      </Layout>
    )
  }
}
