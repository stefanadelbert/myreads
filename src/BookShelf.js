import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

class BookShelf extends React.Component{
    static propTypes = {
        books: PropTypes.array.isRequired
    }
    render() {
        return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.map((book) => (
                      <li key={book.id}>
                          <Book title={book.title} authors={book.authors} thumbnail={book.imageLinks.thumbnail} shelf={book.shelf}/>
                      </li>
                  ))}
                </ol>
              </div>
            </div>
        )
    }
}

export default BookShelf
