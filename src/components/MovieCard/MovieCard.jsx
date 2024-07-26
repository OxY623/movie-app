import React from 'react'
import { Card, Rate, Tag, Spin } from 'antd'
import { StarOutlined, StarFilled } from '@ant-design/icons'
import { format } from 'date-fns'

import './MovieCard.css'
import useGenres from '../../useGenres'

import noImage from './no-image.jpg'

const MovieCard = ({ card, rateMovie }) => {
  const { genres, loading, error } = useGenres()
  // const userRating = card.rating

  // if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading genres</div>
  if (loading)
    return (
      <div>
        <Spin size="small" />
      </div>
    )
  if (error) return <div>Error loading genres</div>

  // Функция для получения названий жанров по их ID
  const getGenres = (genreIds) => {
    return genreIds.map((id) => genres[id] || 'Unknown')
  }

  // Function to format release date
  const parseReleaseDate = (releaseDate) => {
    const date = new Date(releaseDate)
    return isNaN(date.getTime()) ? 'Unknown release date' : format(date, 'MMMM d, yyyy')
  }
  // console.log(userRating)

  // Function to get rating color based on the rating value
  const getRatingBorderColor = (rating) => {
    if (rating >= 0 && rating <= 3) return '#E90000' // Red
    if (rating > 3 && rating <= 5) return '#E97E00' // Orange
    if (rating > 5 && rating <= 7) return '#E9D100' // Yellow
    if (rating > 7) return '#66E900' // Green
    return '#E0E0E0' // Default color
  }

  return (
    <li className="card-item">
      <Card className="card-item__card" style={{ display: 'flex', position: 'relative' }}>
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
              <div className="card-item__rating" style={{ borderColor: getRatingBorderColor(card.vote_average) }}>
                {card.vote_average ? card.vote_average.toFixed(1) : '?'}
              </div>
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
              value={card.rating || 0} // Use user's rating if available
              character={({ index }) => (index < Math.floor(card.rating) ? <StarFilled /> : <StarOutlined />)}
              count={10}
              onChange={(value) => rateMovie(card.id, value)}
              disabled={false} // Make sure rating can be updated
            />
          </div>
        </div>
      </Card>
    </li>
  )
}

export default MovieCard
