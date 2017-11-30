import React from 'react'
import PropTypes from 'prop-types'

import BookGrid from './BookGrid'

class SearchResults extends React.Component{
    static propTypes = {
        books: PropTypes.array.isRequired
    }
    render() {
        return (
			<div className="search-books-results">
				<BookGrid books={this.props.books}/>
			</div>
        )
    }
}

export default SearchResults
