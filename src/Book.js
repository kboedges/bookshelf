import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noimage from './noimage.png'

class Book extends Component {
    static PropTypes = {
        book: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired
      } 

      render(){
        const { book, changeShelf } = this.props
    
        return (
          <div className="book">
              <div className="book-top">
                <div className="book-cover" 
                  style={{ 
                    width: 128, 
                    height: 193, 
                    backgroundImage: `url(${(book.imageLinks) ? book.imageLinks.thumbnail : noimage })` 
                  }}>
                </div>
                <div className="book-shelf-changer">
                  <select defaultValue={(book.shelf) ? book.shelf : "none"} onChange={(event) => changeShelf(event, book)}>
                    <option disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{(book.authors) ? book.authors[0] : "none"}</div>
            </div>
        )
      }
    }
    
    export default Book
