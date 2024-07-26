import React from 'react'

import MovieCard from '../MovieCard'

import './MovieCards.css'

const MovieCards = ({ cards, rateMovie }) => {
  // Проверка наличия и корректности данных перед использованием метода map
  if (!cards || !Array.isArray(cards)) {
    return <div>❌ No movies available</div> // Сообщение, если карты не переданы или не массив
  }

  return (
    <ul
      style={{
        listStyleType: 'none',
        padding: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(451px, 1fr))',
        gap: 36,
      }}
    >
      {cards.map((card, index) => (
        <MovieCard rateMovie={rateMovie} key={`${card.title}-${index}`} card={card} />
      ))}
    </ul>
  )
}

export default MovieCards
