import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

class BookGrid extends React.Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
		onChangeShelf: PropTypes.func.isRequired
    };
    render() {
        return (
			<ol className="books-grid">
			{this.props.books.map((book) => {
				return (
					<li key={book.id}>
						<Book title={book.title} authors={book.authors} thumbnail={book.imageLinks.thumbnail} shelf={book.shelf} onChangeShelf={(newShelf) => {this.props.onChangeShelf(book, newShelf)}}/>
					</li>
				);
			})}
			</ol>
        );
    }
}

export default BookGrid;
