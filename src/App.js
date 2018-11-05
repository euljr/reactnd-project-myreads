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
            cover: imageLinks.thumbnail,
            shelf,
            title,
            authors,
          }))
        }))
      })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => <List books={books} />} />
        <Route path='/search' component={Search} />
      </div>
    )
  }
}

export default BooksApp
