import React from 'react'
import { Pagination, Layout } from 'antd'

const { Footer } = Layout
import './MyFooter.css'
const MyFooter = ({ totalPages, handlePageChange }) => {
  return (
    <Footer style={{ backgroundColor: '#F0EFEF' }}>
      <Pagination onChange={handlePageChange} align="center" defaultCurrent={1} total={totalPages * 10} />
    </Footer>
  )
}

export default MyFooter
