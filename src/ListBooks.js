import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book';

class ListBooks extends Component {
  
  static PropTypes = {
    books: PropTypes.array.isRequired,
    bookShelf: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }

  render(){
    const { books, bookShelf, changeShelf, shelf, title } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {(shelf === "" ? books : books.filter((book) => book.shelf === shelf)).map((book) => (
                <li key={book.id}>
                  <Book 
                    book={book} 
                    changeShelf={changeShelf}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
    )
  }
}

export default ListBooks