import React from 'react'
import { Route, Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf' 
import Search from './Search'
import SearchResults from './SearchResults'

class BooksApp extends React.Component {
	state = {
		books: [],
		searchResults: []
	}
	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({books})
		})
	}
	search = (query) => {
		if (query) {
			BooksAPI.search(query, 1).then((books) => {
				if (books.hasOwnProperty("error")) {
					this.setState({searchResults: []})
				} else {
					const modifiedBooks = books.map((book) => ({
						id: book.id,
						title: book.title,
						authors: book.authors? book.authors : [],
						imageLinks: book.imageLinks? book.imageLinks : {imageLinks: {thumbnail: ''}},
						shelf: "none"
					}))
					this.setState({searchResults: modifiedBooks})
				}
			})
		}
	}
	update = (book, shelf) => {
		BooksAPI.update(book, shelf).then((response) => {console.log(response)})
	}

	render() {
		const currentlyReading = this.state.books.filter((book) => (book.shelf === "currentlyReading"))
		const wantToRead = this.state.books.filter((book) => (book.shelf === "wantToRead"))
		const read = this.state.books.filter((book) => (book.shelf === "read"))
		return (
		  <div className="app">
			<Route path="/search" render={() => (
				<div>
					<Search searchCallback={this.search}/>
					<SearchResults books={this.state.searchResults}/>
				</div>
			)}/>
			<Route exact path="/" render={() => (
			  <div className="list-books">
				<div className="list-books-title">
				  <h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<BookShelf title="Currently Reading" books={currentlyReading}/>
					<BookShelf title="Want To Read" books={wantToRead}/>
					<BookShelf title="Read" books={read}/>
				</div>
				<div className="open-search">
				  <Link to="/search">Add a book</Link>
				</div>
			  </div>
			)}/>
		  </div>
		)
	}
}

export default BooksApp
