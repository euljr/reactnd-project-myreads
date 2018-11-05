import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import List from './pages/List'
import Search from './pages/Search'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState(() => ({
          books: books.map(({id, imageLinks, shelf, title, authors}) => ({
            id,
            cover: imageLinks ? imageLinks.thumbnail : '',
            shelf: shelf || 'none',
            title,
            authors: authors || [],
          }))
        }))
      })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => <List books={books} />} />
        <Route path='/search' render={() => <Search books={books} />} />
      </div>
    )
  }
}

export default BooksApp
