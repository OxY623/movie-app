import { Alert, Button, Result } from 'antd'
import React from 'react'

const ErrorIndicator = ({ state, handleClickBtn }) => {
  return (
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
  )
}

export default ErrorIndicator
