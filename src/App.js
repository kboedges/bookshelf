import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';

class BooksApp extends React.Component {

  constructor(props) {
    super(props);  
    this.state = {
      books: [],
      bookShelf: "",
    }
    this.moveBookToShelf = this.moveBookToShelf.bind(this);
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  moveBookToShelf(event, book){ 
    BooksAPI.update(book, event.target.value).then((response) => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    })
    // console.log(book, event.target.value, this.state.books);
  }

render() {
  return (
    <div className="app">

      {/* This brings you to the search page */}
      <Route path="/search" render={() => (
        <SearchBooks/>
      )}/>

      {/* This brings you to the list of books */}
      <Route exact path="/" render={() => (
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
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      )}/>
    </div>
  )}
}

export default BooksApp
