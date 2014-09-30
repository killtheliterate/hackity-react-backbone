// Base modules
// ----------------------------------------------------------------------------
var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var Firebase = require('client-firebase'); // via http://bit.ly/1ncfCj1
var React = require('React');
var bbState = require('./backbone-react');

Backbone.$ = $; // attach jQuery to Backbone

// Firebase
// Base URL: https://amber-fire-1843.firebaseio.com
// ----------------------------------------------------------------------------
var BackboneFirebase = require('./backbone-firebase');

// React components
// ----------------------------------------------------------------------------
var BookList = require('./component/BookList/viewBookList.jsx');

// Initialize App
// ----------------------------------------------------------------------------
var collection = require('./component/BookList/collectionBookList');
var list = new collection();

list.on('sync', function() {

    // Stub some Firebase data if none exists.
    var book1, book2;
    if (list.length < 1) {

        book1 = new BookModel({
            title: 'Moby Dick',
            author: 'Herman Melville'
        });

        book2 = new BookModel({
            title: 'Don Quixote',
            author: 'Cervantes'
        });

        // Add new books to the book shelf.
        list.add([book1, book2]);
    }

}, this);

// Log Firebase sync.
list.on('all', function(e, m) {
    console.log(e);
    console.log(m);
});

list.on('sync', function() {
    React.renderComponent(
      BookList({list: list}),
      document.getElementById('app-container')
    );
});
