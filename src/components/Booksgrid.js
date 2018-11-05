import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Booksgrid = ({ books, onShelfChange }) => (
  <ol className="books-grid">
    {books.map(book => (
      <li key={book.title}>
        <Book onShelfChange={onShelfChange} {...book} />
      </li>
    ))}
  </ol>
)

Booksgrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onShelfChange: PropTypes.func.isRequired,
}

export default Booksgrid
