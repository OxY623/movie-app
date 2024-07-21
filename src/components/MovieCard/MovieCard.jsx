import React from 'react'
import { Card, Rate, Tag } from 'antd'
import { StarOutlined, StarFilled } from '@ant-design/icons'
import { format } from 'date-fns'

import './MovieCard.css'

import noImage from './no-image.jpg'

const MovieCard = ({ card, getGenres }) => {
  const parseReleaseDate = (releaseDate) => {
    const date = new Date(releaseDate)
    return isNaN(date.getTime()) ? 'Unknown release date' : format(date, 'MMMM d, yyyy')
  }

  return (
    <li className="card-item">
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
              <div className="card-item__rating">{card.vote_average ? card.vote_average.toFixed(1) : '?'}</div>
            </div>
            <p className="card-item__release-date">{parseReleaseDate(card.release_date)}</p>
            <div className="card-item__genres">
              {card.genre_ids && card.genre_ids.length > 0 ? (
                getGenres(card.genre_ids).map((genre, index) => <Tag key={index}>{genre}</Tag>)
              ) : (
                <Tag>No genres available</Tag>
              )}
            </div>
            <p className="card-item__overview">{card.overview}</p>
            <Rate
              disabled
              value={card.vote_average || 0}
              character={({ index }) => {
                return index < Math.floor(card.vote_average) ? <StarFilled /> : <StarOutlined />
              }}
              count={10}
            />
          </div>
        </div>
      </Card>
    </li>
  )
}

export default MovieCard
