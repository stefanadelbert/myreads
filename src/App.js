import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./BookShelf";
import Search from "./Search";
import SearchResults from "./SearchResults";
import NoMatch from "./NoMatch";

class BooksApp extends React.Component {
	defaultBook = {
		id: "",
		title: "Unknown Title",
		authors: [],
		imageLinks: {thumbnail: "http://via.placeholder.com/128x193?text=No%20Cover"},
		shelf: "none"
	};

	state = {
		currentlyReading: [],
		wantToRead: [],
		read: [],
		none: [], // Provide a none shelf to easily support moving a book to the 'none' shelf.
		searchResults: []
	};

	getAll = () => {
		BooksAPI.getAll().then((books) => {
			// Use defaultBook as a template.
			books = books.map(book => Object.assign({}, this.defaultBook, book));
			this.setState({
				currentlyReading: books.filter((book) => (book.shelf === "currentlyReading")),
				wantToRead: books.filter((book) => (book.shelf === "wantToRead")),
				read: books.filter((book) => (book.shelf === "read"))
			})
		});
	}

	search = (query) => {
		// Remove any trailing spaces from the end of the query.
		query = query.trim()
		if (query) {
			BooksAPI.search(query, 10).then((books) => {
				if (books.hasOwnProperty("error")) {
					this.setState({searchResults: []});
				} else {
					const modifiedBooks = books.map((book) => {
						let shelf  = "none";
						const bookId = book.id;
						// Check if the book is already on a shelf and if it is, set its shelf accordingly.
						if (this.state.currentlyReading.map((b) => b.id).includes(bookId)) {
							shelf = "currentlyReading";
						} else if (this.state.wantToRead.map((b) => b.id).includes(bookId)) {
							shelf = "wantToRead";
						} else if (this.state.read.map((b) => b.id).includes(bookId)) {
							shelf = "read";
						}
						return (Object.assign(
							{},
							this.defaultBook,
							book,
							{
								id: bookId,
								shelf: shelf
							}
						));
					})
					this.setState({searchResults: modifiedBooks});
				}
			})
		} else {
			// If query is falsey, then reset the search results.
			this.setState({searchResults: []});
		}
	}

	changeShelf = (book, shelf) => {
		// It would be smart to check the response for an error here.
		BooksAPI.update(book, shelf);

		const prevShelf = book.shelf;
		book.shelf = shelf;
		this.setState((prevState, props) => {
			// Remove the book from its existing shelf and put it on the new shelf (which could be 'none').
			// Update the shelf of the book in the search results too.
			const newState = {
				[prevShelf]: prevState[prevShelf]? prevState[prevShelf].filter(b => b.id !== book.id) : [],
				[shelf]: [...prevState[shelf], book],
				searchResults: [...prevState.searchResults.map(b => {
					if(b.id === book.id) {
						return Object.assign({}, b, {shelf: shelf});
					}
					return b;
				})]
			};
			return newState;
		});
	}

	componentDidMount() {
		this.getAll();
	}

	render() {
		return (
			<div className="app">
				<Switch>
					<Route exact path="/" render={() => (
						<div>
							<div className="list-books">
								<div className="list-books-title">
									<h1>MyReads</h1>
									<div className="open-search">
										<Link to="/search">Add a book</Link>
									</div>
								</div>
							</div>
							<div className="list-books-content">
								<BookShelf title="Currently Reading" books={this.state.currentlyReading} onChangeShelf={this.changeShelf}/>
								<BookShelf title="Want To Read" books={this.state.wantToRead} onChangeShelf={this.changeShelf}/>
								<BookShelf title="Read" books={this.state.read} onChangeShelf={this.changeShelf}/>
							</div>
						</div>
					)}/>
					<Route path="/search" render={() => (
						<div>
							<Search searchCallback={this.search}/>
							<SearchResults books={this.state.searchResults} onChangeShelf={this.changeShelf}/>
						</div>
					)}/>
					<Route component={NoMatch}/>
				</Switch>
			</div>
		);
	}
}

export default BooksApp;
