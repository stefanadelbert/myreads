# MyReads Project

MyReads is a single paged web app which will help to manage your reading list. It has a search capability and allows books to be categorised as either "Want to Read", "Currently Reading" and "Read".

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* git
* npm (bundled with `node`)

On Ubuntu:
```
sudo apt-get install git
sudo apt-get install nodejs
```

### Installing

Clone the git repository and install all project dependencies with `npm install`.

```
git clone https://github.com/stefanadelbert/myreads
npm install
```

## Use

Change to the `myreads` directory and start the development server with `npm start`.

```
cd myreads
npm start
```

Navigate to the page served by the development server at <http://localhost:3000>.

### Organising Books

The app will fetch your reading list from a remote store and present it as books on three shelves, _Currently Reading_, _Want to Read_ and _Read_.

To move a book from one shelf to another, click the down arrow button on the bottom right of each book and select the shelf that the book should be moved to. To remove a book from the shelves, select the _None_ shelf.

### Add Books

To add new books to the shelves, initiate a search by clicking the _+_ button at the bottom right or navigate to <http://localhost:3000/search>. Enter a search term into the input field and up to 20 books matching the search query will be displayed. Each book in the search result will be on the _None_ shelf, unless it is already on one of the other shelves. Move books to the required shelves as described above.

Note that the available search terms are limited to those listed below:
* Android
* Art
* Artificial Intelligence
* Astronomy
* Austen
* Baseball
* Basketball
* Bhagat
* Biography
* Brief
* Business
* Camus
* Cervantes
* Christie
* Classics
* Comics
* Cook
* Cricket
* Cycling
* Desai
* Design
* Development
* Digital Marketing
* Drama
* Drawing
* Dumas
* Education
* Everything
* Fantasy
* Film
* Finance
* First
* Fitness
* Football
* Future
* Games
* Gandhi
* Homer
* Horror
* Hugo
* Ibsen
* Journey
* Kafka
* King
* Lahiri
* Larsson
* Learn
* Literary Fiction
* Make
* Manage
* Marquez
* Money
* Mystery
* Negotiate
* Painting
* Philosophy
* Photography
* Poetry
* Production
* Programming
* React
* Redux
* River
* Robotics
* Rowling
* Satire
* Science Fiction
* Shakespeare
* Singh
* Swimming
* Tale
* Thrun
* Time
* Tolstoy
* Travel
* Ultimate
* Virtual Reality
* Web Development
* iOS

## Running the tests

To run the tests,

```
npm test
```

## Built With

* [React](http://www.dropwizard.io/1.0.2/docs/) - The web framework used

## Authors

* **Stefan Adelbert** - [GitHub](https://github.com/stefanadelbert)
