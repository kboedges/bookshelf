import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks';

class SearchBooks extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      searchResults: []
    }

    this.addBook = this.addBook.bind(this);
  }

    handleSearchQuery(event){
      console.log(event.target.value);
      if (event.target.value) {
        BooksAPI.search(event.target.value).then((results) => {
          console.log(results);
          this.setState({searchResults: results})
        })
      } else {
        this.setState({searchResults: []})
      }
    } 

    addBook(event, book){
      console.log(event.target.value, book.title)
      BooksAPI.update(book, event.target.value).then((response) => {
        BooksAPI.getAll().then((books) => {
          this.setState({ books })
          console.log(books);
        })
      })
    }

  render(){
    const { searchResults } = this.state;

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
          
          {/* {searchResults.length > 0 && searchResults.map((book) => (
            <li key={book.id}> 
              <div className="book-title">{book.title}</div>
            </li>
          ))} */}

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

// SearchBooks.propTypes = {
//   onSearch: PropTypes.func.isRequired
// }

export default SearchBooks