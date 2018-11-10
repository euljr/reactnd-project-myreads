import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Bookshelf from '../components/Bookshelf'

class List extends Component {
  render() {
    // Filtra os livros para adicionar em cada uma das três estantes
    const { books, onShelfChange } = this.props
    const booksArray = Object.keys(books).map(bookId => books[bookId]);
    const currentlyReading = booksArray.filter(book => book.shelf === 'currentlyReading')
    const wantToRead = booksArray.filter(book => book.shelf === 'wantToRead')
    const read = booksArray.filter(book => book.shelf === 'read')
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {!!currentlyReading.length &&
              <Bookshelf title={'Currently Reading'} onShelfChange={onShelfChange} books={currentlyReading} />}
            {!!wantToRead.length &&
              <Bookshelf title={'Want to Read'} onShelfChange={onShelfChange} books={wantToRead} />}
            {!!read.length &&
              <Bookshelf title={'Read'} onShelfChange={onShelfChange} books={read} />}
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
  books: PropTypes.object.isRequired
}

export default List
