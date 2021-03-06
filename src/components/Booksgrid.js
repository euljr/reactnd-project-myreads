import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

// Componente funcional sem estado para renderizar os livros recebidos via props
const Booksgrid = ({ books, onShelfChange }) => (
  <ol className="books-grid">
    {books.map(book => (
      <li key={book.id}>
        <Book onShelfChange={onShelfChange} book={book} />
      </li>
    ))}
  </ol>
)

Booksgrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onShelfChange: PropTypes.func.isRequired,
}

export default Booksgrid
