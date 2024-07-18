import React, { Component } from 'react'
import './App.css'
import 'antd/dist/reset.css'
import { Layout, Card, Row, Col, Tag } from 'antd'

const { Content } = Layout
const { Meta } = Card
// Пример функции для преобразования genre_ids в названия жанров
const genreMapping = {
  878: 'Science Fiction',
  28: 'Action',
  14: 'Fantasy',
  12: 'Adventure',
}

const getGenres = (genreIds) => {
  return genreIds.map((id) => genreMapping[id] || 'Unknown')
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.dataPlug = {
      adult: false,
      backdrop_path: '/kZbTOcTrEGyroQMWQSGIRlNSkwP.jpg',
      genre_ids: [878, 28, 14, 12],
      id: 626412,
      original_language: 'ko',
      original_title: '외계+인 2부',
      overview:
        'Ean has a critical mission to return to the future to save everyone. However, she becomes trapped in the distant past while trying to prevent the escape of alien prisoners who are locked up in the bodies of humans. Meanwhile, Muruk, who helps Ean escape various predicaments, is unnerved when he begins sensing the presence of a strange being in his body. Traveling through the centuries, they are trying to prevent the explosion of the haava.',
      popularity: 370.82,
      poster_path: '/4RClncz0GTKPZzSAcAalHCw0h3g.jpg',
      release_date: '2024-01-10',
      title: 'Alienoid: Return to the Future',
      video: false,
      vote_average: 6.793,
      vote_count: 432,
    }
    this.genres = getGenres(this.dataPlug.genre_ids)
    this.state = {
      data: null,
    }
  }
  componentDidMount() {
    this.props
      .getResource()
      .then((data) => {
        this.setState({ data })
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  render() {
    return (
      <>
        <Layout style={{ minWidth: '100vh', maxWidth: 'auto' }}>
          <h1>Movie App</h1>
          <Content>
            <div className="inner-content">
              {this.state.data ? (
                <Row gutter={[32, 32]} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Col span={8}>
                    <div>Column 1</div>
                    <Card
                      hoverable
                      style={{ width: 300 }}
                      cover={
                        <img
                          alt={this.dataPlug.title}
                          src={`https://image.tmdb.org/t/p/w500${this.dataPlug.poster_path}`}
                        />
                      }
                    >
                      <Meta title={this.dataPlug.title} description={this.dataPlug.overview} />
                      <div style={{ marginTop: '10px' }}>
                        {this.genres.map((genre) => (
                          <Tag key={genre}>{genre}</Tag>
                        ))}
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <div>Column 2</div>
                    <Card
                      hoverable
                      style={{ width: 300 }}
                      cover={
                        <img
                          alt={this.dataPlug.title}
                          src={`https://image.tmdb.org/t/p/w500${this.dataPlug.poster_path}`}
                        />
                      }
                    >
                      <Meta title={this.dataPlug.title} description={this.dataPlug.overview} />
                      <div style={{ marginTop: '10px' }}>
                        {this.genres.map((genre) => (
                          <Tag key={genre}>{genre}</Tag>
                        ))}
                      </div>
                    </Card>
                  </Col>
                </Row>
              ) : (
                'Loading...'
              )}
            </div>
            {/*<>*/}
            {/*  {this.state.data ? (*/}
            {/*    <pre>{JSON.stringify(this.state.data, null, 2)}</pre> */}
            {/*  ) : (*/}
            {/*    'Loading...'*/}
            {/*  )}*/}
            {/*</>*/}
          </Content>
        </Layout>
      </>
    )
  }
}
