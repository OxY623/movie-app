import React from 'react'

import MovieCard from '../MovieCard'
import './MovieCards.css' // Обновите стили, если необходимо

const MovieCards = ({ cards, getGenres }) => {
  // Проверка наличия и корректности данных перед использованием метода map
  if (!cards || !Array.isArray(cards)) {
    return <div>No movies available</div> // Сообщение, если карты не переданы или не массив
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
        <MovieCard key={`${card.title}-${index}`} card={card} getGenres={getGenres} />
      ))}
    </ul>
  )
}

export default MovieCards
