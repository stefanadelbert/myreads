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
        this.setState({query: query.trim()})
		if (query) {
			BooksAPI.search(query, 1).then((books) => {
				const modifiedBooks = books.map((book) => ({
					id: book.id,
					title: book.title,
					authors: book.authors? book.authors : [],
					thumbnail: book.imageLinks.thumbnail
				}))
				console.log(modifiedBooks)
				this.setState({books: modifiedBooks})
			})
		}
    }

    render() {
		console.log(this.state)
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
                          <Book title={book.title} authors={book.authors} thumbnail={book.thumbnail} shelf={"none"}/>
                      </li>
                  ))}
                </ol>
            </div>
          </div>
        )
    }
}

export default Search
