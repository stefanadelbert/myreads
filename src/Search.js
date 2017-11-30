import React from 'react'
import { Link } from 'react-router-dom'

import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends React.Component {
    state = {
        query: '',
        books: []
    }

    onChange = (event) => {
        const query = event.target.value
        this.setState({query}).then(() => {
            BooksAPI.search(this.state.query, 10).then((books) => {
                console.log(books)
            })
        })
    }

    render() {
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close search</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.onChange}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  {this.state.books.map((book) => (
                      <li key={book.id}>
                          <Book title={book.title} authors={book.authors} thumbnail={book.imageLinks.thumbnail}/>
                      </li>
                  ))}
                </ol>
            </div>
          </div>
        )
    }
}

export default Search
