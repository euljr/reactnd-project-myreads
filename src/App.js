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

  // Troca a estante de um livro
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

  // Adiciona um livro ao estado do App
  // Esse livro pode ter ou não uma estante dependendo da
  // origem de onde ele é carregado (ex.: livros da busca também passam por aqui e
  // não estão em nenhuma estante)
  addBookToState = (book) => {
    this.setState((prevState) => {
      // Para caso o livro venha de alguma busca, verifica se ele está em alguma estante
      // assim armazenando o mesmo com a estante correta. Poderíamos também pular esse passo
      // para esse livro caso ele já estiver no state.
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

  // Atualiza o state com novos livros,
  // caso a origem seja a API de busca, adiciona
  // os IDs como resultados.
  updateBooks = (books, search = false) => {
    books.forEach(({id, imageLinks, shelf, title, authors}) => {
      // Filtra somente as informações necessárias de cada livro para adiciona-lo na
      // estante, também tratamos para casos onde não recebemos imagens de capa e autores
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
    // Carrega os livros e os livros e filtra os livros resultantes de uma busca
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
