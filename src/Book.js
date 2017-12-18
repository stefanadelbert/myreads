import React from 'react';
import PropTypes from 'prop-types';

class ShelfChanger extends React.Component {
	static propTypes = {
		onChangeShelf: PropTypes.func.isRequired,
		shelf: PropTypes.string.isRequired
	};
	render() {
		return (
			<div className="book-shelf-changer">
				<select value={this.props.shelf} onChange={(event) => {this.props.onChangeShelf(event.target.value)}}>
					<option value="none" disabled>Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
				</select>
			</div>
		);
	}
}

class Book extends React.Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		authors: PropTypes.array.isRequired,
		thumbnail: PropTypes.string,
		shelf: PropTypes.string.isRequired,
		onChangeShelf: PropTypes.func.isRequired,
	};
	render() {
		return (
			<div className="book">
			  <div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.thumbnail})` }}></div>
				<ShelfChanger shelf={this.props.shelf} onChangeShelf={this.props.onChangeShelf}/>
			  </div>
				  <div className="book-title">{this.props.title}</div>
				  <div className="book-authors">{this.props.authors.join(", ")}</div>
			</div>

		)
	};
}

export default Book;
