import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import PropTypes from 'prop-types'

class SearchBooks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchResults: []
    }
    this.addBook = this.addBook.bind(this)
  }

  static PropTypes = {
    addBookFromSearch: PropTypes.func.isRequired,
  }

  handleSearchQuery(event){
    if (event.target.value) {
      BooksAPI.search(event.target.value).then((results) => {
        BooksAPI.getAll().then((shelvedBooks) => {
          results.forEach((result) => {
            let matchingBook = shelvedBooks.filter(book => book.id === result.id)
            if (matchingBook[0]){
              result.shelf = matchingBook[0].shelf
            }
          })
          this.setState({searchResults: results})
        })   
      })
    } else {
      this.setState({searchResults: []})
    }
  } 

  addBook(event, book){
    this.props.addBookFromSearch(event, book)
  }

  render(){
    const { searchResults } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              onChange={(event) => this.handleSearchQuery(event)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.length > 0 && 
              (
                <ListBooks 
                  books={searchResults} 
                  bookShelf=""
                  changeShelf={this.addBook}
                />
            )
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks