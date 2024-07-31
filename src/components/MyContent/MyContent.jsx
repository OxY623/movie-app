import React from 'react'
import { Spin, Layout, Result } from 'antd'

import MovieCards from '../MovieCards'
import ErrorIndicator from '../ErrorIndicator'
import SearchComponent from '../SearchComponent'
import './MyContent.css'

const { Content } = Layout

const MyContent = ({ handleClickBtn, getGenres, state, genreMapping, handleSearch, rateMovie }) => {
  return (
    <Content>
      <div className="inner-content">
        {handleSearch && <SearchComponent handleSearch={handleSearch} />}
        {state.error ? (
          <ErrorIndicator state={state} handleClickBtn={handleClickBtn} />
        ) : state.data ? (
          state.data.length === 0 ? (
            <Result title="Ничего не найдено." subTitle="Измените поисковый запрос." />
          ) : (
            <MovieCards rateMovie={rateMovie} genreMapping={genreMapping} getGenres={getGenres} cards={state.data} />
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
