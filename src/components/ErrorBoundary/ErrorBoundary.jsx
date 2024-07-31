import React, { Component } from 'react'
import { Spin, Flex } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Uncaught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Flex align="center" gap="middle">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          <h1>Что-то пошло не так</h1>
        </Flex>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
