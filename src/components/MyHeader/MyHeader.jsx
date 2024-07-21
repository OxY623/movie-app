import React from 'react'
import { Menu, Layout } from 'antd'
import './MyHeader.css'

const { Header } = Layout

const MyHeader = () => {
  return (
    <Header className="header">
      <div className="header-content">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['search']}
          className="header-menu"
          items={[
            {
              key: 'search',
              label: (
                <a className={'checked'} href="#search">
                  Search
                </a>
              ),
            },
            {
              key: 'rated',
              label: <a href="#rated">Rated</a>,
            },
          ]}
        />
      </div>
    </Header>
  )
}

export default MyHeader
