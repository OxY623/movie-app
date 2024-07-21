import { Alert, Button, Input, Result, Spin, Layout } from 'antd'
import React from 'react'

import MovieCards from '../MovieCards'

const { Content } = Layout

const MyContent = ({ handleClickBtn, getGenres, state, genreMapping }) => {
  // const { handleClickBtn, getGenres, state, genreMapping } = props

  return (
    <Content>
      <div className="inner-content">
        <Input placeholder="Type to search..." style={{ width: '100%', marginBottom: 34 }} />
        {state.error ? (
          <>
            <Result
              status="404"
              title="404"
              subTitle={`Sorry, ${state.error}`}
              extra={
                <Button type="primary" onClick={handleClickBtn}>
                  Update page now
                </Button>
              }
            />
            <Alert message="Error" description={state.error} type="error" showIcon />
          </>
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
