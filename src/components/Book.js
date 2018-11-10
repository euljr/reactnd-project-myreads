import React from 'react'
import PropTypes from 'prop-types'

const Book = ({ book, onShelfChange }) => {
  // Como os métodos de manipulação do state estão no componente App,
  // recebemos esses métodos via Props, portanto esse é um componente funcional sem estado
  // Aqui chamamos o método para atualizar a estante de um livros
  const { cover, shelf, title, authors } = book
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${cover}")` }}></div>
        <div className="book-shelf-changer">
          <select value={shelf} onChange={(event) => onShelfChange(book, event.target.value)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(', ')}</div>
    </div>
  )
}

Book.propTypes = {
  onShelfChange: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
}

export default Book
