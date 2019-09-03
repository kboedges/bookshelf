import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import ListBooks from './ListBooks';
import PropTypes from 'prop-types';

class SearchBooks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      query: "",
      errorMessage: false,
      searchList: true
    }
    this.addBook = this.addBook.bind(this)
  }

  handleSearchQuery(event) {
    this.setState({ query: event.target.value }, function() {

      if (this.state.query) {
        BooksAPI.search(this.state.query).then((results) => {

          if (results.error) {
            this.setState({ searchResults: [] })
            this.setState({ errorMessage: true })
          } else {
            results.forEach((result) => {
              let matchingBook = this.props.shelvedBooks.filter(book => book.id === result.id)
              if (matchingBook[0]) {
                result.shelf = matchingBook[0].shelf
              }
            })
            this.setState({ searchResults: results })
            this.setState({ errorMessage: false })
          }
        })
      } else {
        this.setState({ searchResults: [] })
        this.setState({ errorMessage: false })
      }
    })
  }

  addBook(event, book) {
    this.props.addBookFromSearch(event, book)
  }

  render() {
    const { searchResults, searchList } = this.state

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
            {this.state.errorMessage === true ?
              (
                "Search results not found."
              ) : (
                <ListBooks
                  books={searchResults}
                  searchList={searchList}
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

SearchBooks.propTypes = {
  addBookFromSearch: PropTypes.func.isRequired,
  shelvedBooks: PropTypes.array.isRequired
};

export default SearchBooks