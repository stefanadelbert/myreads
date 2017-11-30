import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

class BookShelf extends React.Component{
    static propTypes = {
        books: PropTypes.array.isRequired
    }
    render() {
        return (
			<ol className="books-grid">
			{this.props.books.map((book) => {
				return (
					<li key={book.id}>
						<Book title={book.title} authors={book.authors} thumbnail={book.imageLinks.thumbnail} shelf={book.shelf}/>
					</li>
				)
			})}
			</ol>
        )
    }
}

export default BookShelf
