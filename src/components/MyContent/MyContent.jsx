import { Spin, Layout, Result } from 'antd'
import React from 'react'

import MovieCards from '../MovieCards'
import ErrorIndicator from '../ErrorIndicator'
import SearchComponent from '../SearchComponent'

const { Content } = Layout

const MyContent = ({ handleClickBtn, getGenres, state, genreMapping, handleSearch }) => {
  return (
    <Content>
      <div className="inner-content">
        <SearchComponent handleSearch={handleSearch} />
        {state.error ? (
          <ErrorIndicator state={state} handleClickBtn={handleClickBtn} />
        ) : state.data ? (
          state.data.length === 0 || state.query === 0 ? (
            <Result title="No movies found" subTitle="Please try again." />
          ) : (
            <MovieCards genreMapping={genreMapping} getGenres={getGenres} cards={state.data} />
          )
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
