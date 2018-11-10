import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Booksgrid from '../components/Booksgrid'
import PropTypes from 'prop-types'

class Search extends Component {

  state = {
    searchQuery: '',
  }

  searchtimeout
  handleSearch = searchQuery => {
    this.setState(() => ({
      searchQuery
    }))
    if(this.searchtimeout) {
      clearTimeout(this.searchtimeout)
    }
    this.searchtimeout = setTimeout(() => {
      this.search()
    }, 400)
  }

  search = () => {
    this.props.updateBooks([], true)
    if(this.state.searchQuery) {
      BooksAPI.search(this.state.searchQuery)
        .then(books => {
          if(Array.isArray(books)) {
            this.props.updateBooks(books, true)
          }
        })
    }
  }

  render() {
    const { searchQuery } = this.state
    const { onShelfChange, books } = this.props
    const booksArray = Object.keys(books).map(bookId => books[bookId]);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={searchQuery}
              onChange={event => this.handleSearch(event.target.value)}
              placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <Booksgrid onShelfChange={onShelfChange} books={booksArray} />
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  books: PropTypes.object.isRequired
}

export default Search
