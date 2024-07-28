// import React from 'react'
// import { Row, Col } from 'antd'
//
// import MovieCard from '../MovieCard'
// import './MovieCards.css'
//
// const MovieCards = ({ cards, rateMovie }) => {
//   if (!cards || !Array.isArray(cards)) {
//     return <div>❌ No movies available</div> // Сообщение, если карты не переданы или не массив
//   }
//
//   return (
//     <Row gutter={[35, 35]}>
//       {cards.map((card, index) => (
//         <Col xs={24} sm={12} md={12} lg={12} key={`${card.title}-${index}`}>
//           <MovieCard rateMovie={rateMovie} card={card} />
//         </Col>
//       ))}

//     </Row>
//   )
// }

// export default MovieCards

import React from 'react'
import { Row, Col } from 'antd'

import MovieCard from '../MovieCard'
import './MovieCards.css'

const MovieCards = ({ cards, rateMovie }) => {
  if (!cards || !Array.isArray(cards)) {
    return <div>❌ No movies available</div> // Сообщение, если карты не переданы или не массив
  }

  return (
    <Row gutter={[35, 35]}>
      {cards.map((card, index) => (
        <Col xs={24} sm={12} md={12} lg={12} key={`${card.title}-${index}`}>
          <MovieCard rateMovie={rateMovie} card={card} />
        </Col>
      ))}
    </Row>
  )
}

export default MovieCards
