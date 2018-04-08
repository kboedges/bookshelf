import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';

class BooksApp extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      books: [],
      bookShelf: "",
    }
    this.moveBookToShelf = this.moveBookToShelf.bind(this)
    this.updateBooks = this.updateBooks.bind(this)
  }

  updateBooks(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  componentDidMount(){
    this.updateBooks()
  }

  moveBookToShelf(event, book){ 
    BooksAPI.update(book, event.target.value).then((response) => {
      this.updateBooks()
    })
  }

  render() {
    return (
      <div className="app">

        {/* This brings you to the search page */}
        <Route path="/search" render={() => (
          <SearchBooks
            addBookFromSearch={this.moveBookToShelf}
          />
        )}/>

        {/* This brings you to the list of books on the main page*/}
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
