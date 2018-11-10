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

  // Quando terminamos de digitar algo na busca, inicialmente
  // chamamos o método de atualizar os livros do estado passando
  // um vetor vazio, isso fará com que o estado de resultados de busca seja
  // zerado.
  //
  // Caso a busca retorne algum resultado, executamos novamente o método para atualizar
  // o estado com novos livros e renderizar os resultados da busca.
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
