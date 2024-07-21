import { Input } from 'antd'
import React from 'react'
const SearchComponent = ({ handleSearch }) => {
  return (
    <Input
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Type to search..."
      style={{ width: '100%', marginBottom: 34 }}
    />
  )
}

export default SearchComponent
