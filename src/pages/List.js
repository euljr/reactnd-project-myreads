import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Bookshelf from '../components/Bookshelf'

class List extends Component {
  render() {
    const { books } = this.props
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
    const wantToRead = books.filter(book => book.shelf === 'wantToRead')
    const read = books.filter(book => book.shelf === 'read')
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {!!currentlyReading.length &&
              <Bookshelf title={'Currently Reading'} onShelfChange={() => {}} books={currentlyReading} />}
            {!!wantToRead.length &&
              <Bookshelf title={'Want to Read'} onShelfChange={() => {}} books={wantToRead} />}
            {!!read.length &&
              <Bookshelf title={'Read'} onShelfChange={() => {}} books={read} />}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

List.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default List
