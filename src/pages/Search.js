import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Booksgrid from '../components/Booksgrid'
import PropTypes from 'prop-types'

class Search extends Component {

  state = {
    searchQuery: '',
    searchResults: [],
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
    if(this.state.searchQuery) {
      BooksAPI.search(this.state.searchQuery)
        .then(searchResults => {
          console.log(searchResults)
          this.setState(() => ({
            searchResults: searchResults.map(({id, imageLinks, title, authors}) => {
              const { shelf } = this.props.books.find(book => book.id === id) || { shelf: 'none' }
              return {
                id,
                cover: imageLinks ? imageLinks.thumbnail : '',
                shelf: shelf,
                title,
                authors: authors || [],
              }
            })
          }))
        })
    } else {
      this.setState(() => ({
        searchResults: []
      }))
    }
  }

  render() {
    const { searchQuery, searchResults } = this.state
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
          <Booksgrid onShelfChange={() => {}} books={searchResults} />
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Search
