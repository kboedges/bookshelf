/* NOTES: The search from BooksAPI is limited to a particular set of search terms.
You can find these search terms here:
https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
you don't find a specific author or title. Every search is limited by search terms.
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

    state = {
      searchResults: []
    }

    handleSearchQuery(event){
      // console.log(event.target.value);
      BooksAPI.search(event.target.value).then((results) => {
        this.setState({searchResults: results})
      })
    }

  render(){
    const { onSearch } = this.props;
    const { searchResults } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/* API stuff goes here I think */}
            <input 
              type="text" 
              placeholder="Search by title or author"
              onChange={(event) => this.handleSearchQuery(event)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          
          {searchResults.length > 0 && searchResults.map((book) => (
          <li key={book.id}><div className="book-title">{book.title}</div></li>
          ))}
            



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