import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  
  static PropTypes = {
    books: PropTypes.array.isRequired,
    bookShelf: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render(){
    const { books, bookShelf, changeShelf } = this.props;
    let showingBooks = [];

    return (
      <ol className="books-grid">
        {(bookShelf === "" ? books : books.filter((book) => book.shelf === bookShelf)).map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" 
                  style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                </div>
                <div className="book-shelf-changer">
                  <select defaultValue={book.shelf} onChange={(event) => changeShelf(event, book)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors[0]}</div>
              
             
              
              
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default ListBooks