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
			<Route exact path="/" render={() => (
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
