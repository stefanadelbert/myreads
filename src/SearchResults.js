import React from 'react'
import PropTypes from 'prop-types'

import BookGrid from './BookGrid'

class SearchResults extends React.Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
		onChangeShelf: PropTypes.func.isRequired
    }
    render() {
        return (
			<div className="search-books-results">
				<BookGrid books={this.props.books} onChangeShelf={this.props.onChangeShelf}/>
			</div>
        )
    }
}

export default SearchResults
