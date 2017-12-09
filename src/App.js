import React from 'react'
import { Route, Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf' 
import Search from './Search'
import SearchResults from './SearchResults'

class BooksApp extends React.Component {
	state = {
		currentlyReading: [],
		wantToRead: [],
		read: [],
		searchResults: []
	}
	getAll() {
		BooksAPI.getAll().then((books) => {
			this.setState({
				currentlyReading: books.filter((book) => (book.shelf === "currentlyReading")),
				wantToRead: books.filter((book) => (book.shelf === "wantToRead")),
				read: books.filter((book) => (book.shelf === "read"))
			})
		})
	}
	componentDidMount() {
		this.getAll()
	}
	search = (query) => {
		if (query) {
			BooksAPI.search(query, 10).then((books) => {
				if (books.hasOwnProperty("error")) {
					this.setState({searchResults: []})
				} else {
					const modifiedBooks = books.map((book) => {
						var shelf  = "none"
						const bookId = book.id
						// Check if the book is already on a shelf and if it it, set its shelf accordingly.
						if (this.state.currentlyReading.map((b) => b.id).includes(bookId)) {
							shelf = "currentlyReading"
						} else if (this.state.wantToRead.map((b) => b.id).includes(bookId)) {
							shelf = "wantToRead"
						} else if (this.state.read.map((b) => b.id).includes(bookId)) {
							shelf = "read"
						}
						return ({
							id: bookId,
							title: book.title? book.title : "Unknown Title",
							authors: book.authors? book.authors : [],
							imageLinks: book.imageLinks? book.imageLinks : {imageLinks: {thumbnail: ''}},
							shelf: shelf
						})
					})
					this.setState({searchResults: modifiedBooks})
				}
			})
		} else {
			// If query is falsey, then reset the search results.
			this.setState({searchResults: []})
		}
	}
	changeShelf = (book, shelf) => {
		BooksAPI.update(book, shelf).then(() => this.getAll())
	}

	render() {
		return (
		  <div className="app">
			<Route path="/search" render={() => (
				<div>
					<Search searchCallback={this.search}/>
					<SearchResults books={this.state.searchResults} onChangeShelf={this.changeShelf}/>
				</div>
			)}/>
			<Route path="/" render={() => (
			  <div className="list-books">
				<div className="list-books-title">
				  <h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<BookShelf title="Currently Reading" books={this.state.currentlyReading} onChangeShelf={this.changeShelf}/>
					<BookShelf title="Want To Read" books={this.state.wantToRead} onChangeShelf={this.changeShelf}/>
					<BookShelf title="Read" books={this.state.read} onChangeShelf={this.changeShelf}/>
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
