import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      books: [],
      shelf: "",
      title: ""
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

    const shelves = {
      currentlyReading: ['Currently Reading', 'currentlyReading'],
      wantToRead: ['Want to Read', 'wantToRead'],
      read: ['Read', 'read']
    }

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
              <h1>Bookshelf</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListBooks 
                  books={this.state.books} 
                  shelf={shelves.currentlyReading[1]}
                  title={shelves.currentlyReading[0]}
                  changeShelf={this.moveBookToShelf}
                />
                <ListBooks 
                  books={this.state.books} 
                  shelf={shelves.wantToRead[1]}
                  title={shelves.wantToRead[0]}
                  changeShelf={this.moveBookToShelf}
                />
                <ListBooks 
                  books={this.state.books} 
                  shelf={shelves.read[1]}
                  title={shelves.read[0]}
                  changeShelf={this.moveBookToShelf}
                /> 
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
