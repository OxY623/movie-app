import React from 'react'
import { Pagination, Layout } from 'antd'

const { Footer } = Layout
const MyFooter = () => {
  return (
    <Footer style={{ backgroundColor: '#F0EFEF' }}>
      <Pagination align="center" defaultCurrent={1} total={50} />
    </Footer>
  )
}

export default MyFooter
