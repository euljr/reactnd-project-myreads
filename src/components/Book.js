import React from 'react'
import PropTypes from 'prop-types'

const Book = ({ cover, shelf, onShelfChange, title, authors }) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${cover}")` }}></div>
      <div className="book-shelf-changer">
        <select value={shelf} onChange={onShelfChange}>
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

Book.propTypes = {
  cover: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  onShelfChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Book
