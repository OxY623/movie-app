import React from 'react'
import { Row, Col } from 'antd'

import MovieCard from '../MovieCard'
import ErrorBoundary from '../ErrorBoundary'
import './MovieCards.css'

const MovieCards = ({ cards, rateMovie }) => {
  if (!cards || !Array.isArray(cards)) {
    return <div>❌ No movies available</div>
  }

  return (
    <Row gutter={[35, 35]}>
      {cards.map((card, index) => (
        <Col xs={24} sm={24} md={12} lg={12} key={`${card.title}-${index}`}>
          <ErrorBoundary key={card.id}>
            <MovieCard rateMovie={rateMovie} card={card} />
          </ErrorBoundary>
          {/*<MovieCard rateMovie={rateMovie} card={card} />*/}
        </Col>
      ))}
    </Row>
  )
}

export default MovieCards
