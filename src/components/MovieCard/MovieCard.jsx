import React from 'react'
import { Card, Rate, Tag } from 'antd'
import { StarOutlined, StarFilled } from '@ant-design/icons'
import { format } from 'date-fns'

import noImage from './no_image.jpg'
import './MovieCard.css'

const MovieCards = ({ cards, getGenres }) => {
  return (
    <ul
      style={{
        listStyleType: 'none',
        padding: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 36,
      }}
    >
      {cards.map((card, index) => (
        <li key={`${card.title}-${index}`} className="card-item">
          <Card className="card-item__card" style={{ display: 'flex' }}>
            <div className="card-item__content">
              <img
                className="card-item__image"
                alt={card.title}
                src={card.poster_path ? `https://image.tmdb.org/t/p/w500${card.poster_path}` : noImage}
                style={{ objectFit: 'cover' }}
              />
              <div className="card-item__details">
                <div className="card-item__header">
                  <h3 className="card-item__title">{card.title}</h3>
                  <div className="card-item__rating">{card.vote_average.toFixed(1)}</div>
                </div>
                <p className="card-item__release-date">{format(new Date(card.release_date), 'MMMM d, yyyy')}</p>
                <div className="card-item__genres">
                  {getGenres(card.genre_ids).map((genre, index) => (
                    <Tag key={index}>{genre}</Tag>
                  ))}
                </div>
                <p className="card-item__overview">{card.overview}</p>
                <Rate
                  disabled
                  value={card.vote_average}
                  character={({ index }) => {
                    return index < Math.floor(card.vote_average) ? <StarFilled /> : <StarOutlined />
                  }}
                  count={10}
                />
              </div>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default MovieCards
