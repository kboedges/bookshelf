/* Check on npm warnings and figure out why the back link doesn't work anymore. Put all of the books html into ListBooks
use filter to filter by the book shelf for each section and then only use ListBooks once.

Instead of using this state variable to keep track of which page we're on, 
use the URL in the browser's address bar. This will ensure that
users can use the browser's back and forward buttons to navigate between
pages, as well as provide a good URL they can bookmark and share.
*/

import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      bookShelf: "",
      showSearchPage: false
    };

    this.moveBookToShelf = this.moveBookToShelf.bind(this);
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  moveBookToShelf(event, book){ 
    BooksAPI.update(book, event.target.value).then((response) => {
      console.log(response);
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
      /* response returns arrays of book ids, find a better way to do this */
    })
    // console.log(book, event.target.value);
    // console.log(this.state.books);
}

render() {
  return (
    <div className="app">
      {this.state.showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" placeholder="Search by title or author"/>

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                <ListBooks 
                  books={this.state.books} 
                  bookShelf="currentlyReading"
                  changeShelf={this.moveBookToShelf}
                />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                <ListBooks 
                  books={this.state.books} 
                  bookShelf="wantToRead"
                  changeShelf={this.moveBookToShelf}
                />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                <ListBooks 
                  books={this.state.books} 
                  bookShelf="read"
                  changeShelf={this.moveBookToShelf}
                />
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  )
}
}

export default BooksApp
