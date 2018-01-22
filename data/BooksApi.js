"use strict";

var books = [];
var genres = ['Action', 'Sci-Fi','Adventure', 'Education'];
var formats = ['Paper Back', 'Kindle Edition', 'PDF Edition'];
var _ = require('lodash');

var currentID = 0;
var _clone = function(item) {
	return JSON.parse(JSON.stringify(item));
};

var BooksApi = {
    getAllBooks: function(callback) {
        callback(null, _clone(books));
    },
    getBooks: function() {
        return books;
    },
    getGenres: function() {
        return genres;
    },
    getFormats: function() {
        return formats;
    },
    getBookById: function(id, callback) {
        var book = _.find(books, {id: parseInt(id)});
        callback (null, _clone(book));
    },
    updateBookById: function(id, book, callback) {
        var existingBookIndex = _.indexOf(books, _.find(books, {id: parseInt(id)}));
        book.id = parseInt(id);
        books.splice(existingBookIndex, 1, book);
        callback (null);
    },
	saveBook: function(book, callback) {
        console.log('Saving book: '+book.title)
		currentID = currentID + 1;
        book.id = currentID;
        books.push(book);
		callback(null, _clone(books));
	},
	deleteBookById: function(id, callback) {
		_.remove(books, { id: parseInt(id)});
        callback(null);
	}
};

module.exports = BooksApi;
