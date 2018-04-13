import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import PropTypes from 'prop-types'

class SearchBooks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      query: ""
    }
    this.addBook = this.addBook.bind(this)
  }

  static PropTypes = {
    addBookFromSearch: PropTypes.func.isRequired,
    shelvedBooks: PropTypes.array.isRequired
  }

  handleSearchQuery(event){
    this.setState({query: event.target.value})
    
    if (this.state.query) {
      BooksAPI.search(this.state.query).then((results) => {
          results.forEach((result) => {
            let matchingBook = this.props.shelvedBooks.filter(book => book.id === result.id)
            
            if (matchingBook[0]){
              result.shelf = matchingBook[0].shelf
            }
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
              value={this.state.query}
              onChange={this.handleSearchQuery.bind(this)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.length > 0 ?
              (
                <ListBooks 
                  books={searchResults} 
                  bookShelf=""
                  changeShelf={this.addBook}
                />
              ) : (
                "Search results not found."
              )
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks