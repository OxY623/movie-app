import { Input, Spin, Layout } from 'antd'
import React from 'react'

import MovieCards from '../MovieCards'
import ErrorIndicator from '../ErrorIndicator'

const { Content } = Layout

const MyContent = ({ handleClickBtn, getGenres, state, genreMapping }) => {
  // const { handleClickBtn, getGenres, state, genreMapping } = props

  return (
    <Content>
      <div className="inner-content">
        <Input placeholder="Type to search..." style={{ width: '100%', marginBottom: 34 }} />
        {state.error ? (
          <ErrorIndicator state={state} handleClickBtn={handleClickBtn} />
        ) : state.data ? (
          <MovieCards genreMapping={genreMapping} getGenres={getGenres} cards={state.data} />
        ) : (
          <div className="spinner-wrapper">
            <Spin size="large" />
          </div>
        )}
      </div>
    </Content>
  )
}

export default MyContent
