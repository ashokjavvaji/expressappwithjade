var BooksApi = require('../data/BooksApi');
var express = require('express');
var router = express.Router();

var genresList=[];
var formatsList=[];
var book = {};

router.get('/', function(req, res) {
    BooksApi.getAllBooks(function(err, items) {
        res.render('books/index', {title: 'ABC Book Store', books: items})
    });
    genresList = BooksApi.getGenres();
    formatsList = BooksApi.getFormats();
});

router.get('/create', function(req, res) {
	res.render('books/create' , {genres: genresList, formats: formatsList});
});

router.post('/create', function(req, res) {
  var book = {};
  book.title = req.body.title;
  book.author = req.body.author;
  book.isbn = req.body.isbn;
  book.publisher = req.body.publisher;
  book.publicationDate = req.body.publicationDate;
  book.price = req.body.price;
  book.genre = req.body.genre;
  book.format = req.body.format;
  console.log('from router save books');
  BooksApi.saveBook(book, function(err, books) {
	  res.redirect('/books/');
  });
});

router.get('/edit/:id', function(req, res) {
  BooksApi.getBookById(req.params.id, function(err, book) {
    res.render('books/edit', {book: book, genres: genresList, formats: formatsList});
  });
});

router.post('/edit/:id', function(req, res) {
    var book = {};
    book.title = req.body.title;
    book.author = req.body.author;
    book.isbn = req.body.isbn;
    book.publisher = req.body.publisher;
    book.publicationDate = req.body.publicationDate;
    book.price = req.body.price;
    book.genre = req.body.genre;
    book.format = req.body.format;
    BooksApi.updateBookById(req.params.id, book, function(err) {
    res.redirect('/books');
  });
});

router.get('/delete/:id', function(req, res) {
  BooksApi.deleteBookById(req.params.id, function(err) {
    res.redirect('/books');
  });
});

router.get('/view/:id', function(req, res) {
  console.log('showing details for book with id: '+req.params.id);
  BooksApi.getBookById(req.params.id, function(err, book) {
    res.render('books/view', {book: book});
  });
});

module.exports = router;
