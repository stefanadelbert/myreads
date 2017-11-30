import React from 'react'
import { Route, Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf' 
import Search from './Search'

class BooksApp extends React.Component {
	state = {
		books: []
	}
	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({books})
		})
	}

	render() {
		const currentlyReading = this.state.books.filter((book) => (book.shelf === "currentlyReading"))
		const wantToRead = this.state.books.filter((book) => (book.shelf === "wantToRead"))
		const read = this.state.books.filter((book) => (book.shelf === "read"))
		return (
		  <div className="app">
			<Route path="/search" component={Search}/>
			<Route path="/" render={() => (
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
