import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {

    constructor(props){
        super(props);
        this.state = {value: this.bookShelf};
        this.changeShelf = this.changeShelf.bind(this);
    }

    static PropTypes = {
        books: PropTypes.array.isRequired,
        bookShelf: PropTypes.string.isRequired,
    }

    changeShelf(event) {
        
        this.book.id.setState({value: event.target.value});
        BooksAPI.update(this.book.id, this.bookShelf)
    }

    // updateShelf = (query) => {
    //     this.setState({ })
    // }

    render(){
        const { books, bookShelf } = this.props;
        // const { query } = this.state;

        let showingBooks = books.filter((book) => book.shelf === bookShelf);

        return (
            <ol className="books-grid">
                {showingBooks.map((book) => (
                    <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={this.state.value} onChange={this.changeShelf} /* Will this work? */>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors[0]}</div>
                        </div>
                      </li>
                ))}
            </ol>
        )

    }

}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    bookShelf: PropTypes.string.isRequired
}

export default ListBooks