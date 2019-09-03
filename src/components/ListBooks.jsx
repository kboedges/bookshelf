import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class ListBooks extends Component {
  render() {
    const { books, changeShelf, shelf, title, searchList } = this.props;

    return (
      <div className='bookshelf'>
        {!searchList && <h2 className='bookshelf-title'>{title}</h2>}
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {(searchList ? books : books.filter(book => book.shelf === shelf)).map(book => (
              <li key={book.id}>
                <Book book={book} changeShelf={changeShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
  shelf: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  searchList: PropTypes.bool.isRequired
};

export default ListBooks;
