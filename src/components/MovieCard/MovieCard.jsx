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
      {cards.map((card) => (
        <li key={card.id} className="card-item">
          <Card className="card-item__card" style={{ display: 'flex' }}>
            <div className="card-item__content" style={{ display: 'flex', flexDirection: 'row' }}>
              <img
                className="card-item__image"
                alt={card.title}
                src={card.poster_path ? `https://image.tmdb.org/t/p/w500${card.poster_path}` : noImage}
                style={{ objectFit: 'cover' }}
              />
              <div className="card-item__details" style={{ marginLeft: 20, flex: 1 }}>
                <div className="card-item__header" style={{ textAlign: 'left', display: 'flex', flexDirection: 'row' }}>
                  <h3 className="card-item__title">{card.title}</h3>
                  <div
                    className="card-item__rating"
                    style={{
                      border: 'border: 2px solid rgb(233, 209, 0)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'rgb(0, 0, 0)',
                      borderRadius: '50%',
                      width: 30,
                      height: 30,
                    }}
                  >
                    {card.vote_average.toFixed(1)}
                  </div>
                </div>
                <p className="card-item__release-date">{format(new Date(card.release_date), 'MMMM d, yyyy')}</p>
                <div className="card-item__genres">
                  {getGenres(card.genre_ids).map((genre) => (
                    <Tag key={genre}>{genre}</Tag>
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
