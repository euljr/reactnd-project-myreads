import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import List from './pages/List'
import Search from './pages/Search'

class BooksApp extends React.Component {
  state = {
    books: {},
    searchIds: [],
  }

  onShelfChange = (book, shelf) => {
    const oldShelf = this.state.books[book.id] ? this.state.books[book.id].shelf : 'none';
    this.setState((prevState) => {
      return {
        books: {
          ...prevState.books,
          [book.id]: {
            ...book,
            shelf
          }
        }
      }
    })
    BooksAPI.update(book, shelf)
      .catch(() => {
        this.setState((prevState) => {
          return {
            books: {
              ...prevState.books,
              [book.id]: {
                ...book,
                oldShelf
              }
            }
          }
        })
      });
  }

  addBookToState = (book) => {
    this.setState((prevState) => {
      let oldBook = prevState.books[book.id]
      const shelf = book.shelf
        ? book.shelf
        : oldBook
          ? oldBook.shelf
          : 'none'
      return {
        books: {
          ...prevState.books,
          [book.id]: {
            ...oldBook,
            ...book,
            shelf,
          },
        },
      }
    })
  }

  updateBooks = (books, search = false) => {
    books.forEach(({id, imageLinks, shelf, title, authors}) => {
      this.addBookToState({
        id,
        cover: imageLinks ? imageLinks.thumbnail : '',
        shelf,
        title,
        authors: authors || [],
      });
    });
    this.setState({
      searchIds: search ? books.map(b => b.id) : []
    })
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => this.updateBooks(books))
  }

  render() {
    const { books } = this.state
    const searchBooks = this.state.searchIds.reduce((prev, id) => ({
      ...prev,
      [id]: {
        ...books[id]
      }
    }), {})
    return (
      <div className="app">
        <Route exact path='/' render={() => <List books={books} onShelfChange={this.onShelfChange} />} />
        <Route path='/search' render={() => (
          <Search
            books={searchBooks}
            onShelfChange={this.onShelfChange}
            updateBooks={this.updateBooks} />
        )} />
      </div>
    )
  }
}

export default BooksApp
