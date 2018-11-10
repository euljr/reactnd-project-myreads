import React from 'react'
import PropTypes from 'prop-types'
import Booksgrid from './Booksgrid'

// Componente funcional sem estado para renderizar o layout de uma estante
const Bookshelf = ({ title, books, onShelfChange }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <Booksgrid onShelfChange={onShelfChange} books={books} />
    </div>
  </div>
)

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onShelfChange: PropTypes.func.isRequired,
}

export default Bookshelf
