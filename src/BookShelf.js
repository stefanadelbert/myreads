import React from 'react';
import PropTypes from 'prop-types';

import BookGrid from './BookGrid';

class BookShelf extends React.Component{
    static propTypes = {
		titls: PropTypes.string,
        books: PropTypes.array.isRequired,
		onChangeShelf: PropTypes.func.isRequired
    };
    render() {
        return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.title}</h2>
              <div className="bookshelf-books">
				<BookGrid books={this.props.books} onChangeShelf={this.props.onChangeShelf}/>
              </div>
            </div>
        );
    }
}

export default BookShelf;
