import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import List from './pages/List'
import Search from './pages/Search'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' component={List} />
        <Route path='/search' component={Search} />
      </div>
    )
  }
}

export default BooksApp
