import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Search extends React.Component {
	static propTypes = {
		searchCallback: PropTypes.func.isRequired
	}
    state = {
        query: ''
    }

    onChange = (event, searchCallback) => {
        const query = event.target.value
        this.setState({query: query.trim()})
		if (query.length > 0) {
			searchCallback(query)
		}
    }
	componentWillUnmount() {
		console.log('Search.componentWillUnmount')
		this.props.searchCallback("")
	}

    render() {
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close search</Link>
              <div className="search-books-input-wrapper">
                <input
					type="text"
					autoFocus
					placeholder="Search by title or author"
					value={this.state.query}
					onChange={(event) => {this.onChange(event, this.props.searchCallback)}}
				/>
              </div>
            </div>
          </div>
        )
    }
}

export default Search
