/** @jsx React.DOM */

var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var Firebase = require('client-firebase'); // via http://bit.ly/1ncfCj1
var React = require('React');
var bbState = require('backbone-react-component');

// Base URL
// https://amber-fire-1843.firebaseio.com
var BackboneFirebase = require('./backbone-firebase');


Backbone.$ = $;

// Model & Collection
// ----------------------------------------------------------------------------

var BookModel = Backbone.Model.extend({
    defaults: function() {
        return {
          title: 'No book title given',
          author: 'No author given'
        };
    },

    initialize: function() {
        if (!this.get('title')) {
            this.set({'title': this.defaults().title});
        }

        if (!this.get('author')) {
            this.set({'author': this.defaults().title});
        }
    },

    firebase: 'https://amber-fire-1843.firebaseio.com/book'
});

var BookListCollection = BackboneFirebase.Collection.extend({
    model: BookModel,

    firebase: 'https://amber-fire-1843.firebaseio.com',
});

list = new BookListCollection();

list.on('sync', function() {
    // Stub some stuff.
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

window.list = list;

// Listen to Firebase HAPPENING! IT'S HAPPENING!
list.on('all', function(e, m) {
    // console.log(e);
    // console.log(m);
});

// BookList
// ----------------------------------------------------------------------------
var BookList = React.createClass({
    mixins: [bbState],

    /**
     * Make the book.
     *
     * @param {object} book - the book
     */
    makeBook: function (book) {
    /* jshint ignore:start */

    /* jshint ignore:end */
    },

    getBook: function(book) {

console.log('An book: ', book);

    },

    handleCommentSubmit: function(book) {
      // var books = this.state.data; // this needs to be bbState books
      // var updatedBooks = books.concat([comment]);
      // this.setState({data: updatedBooks});
    },

    render: function () {
    /* jshint ignore:start */

console.log('BookList props: ', this.props);
console.log('BookList suppoded to have props: ', this.props.list);
console.log('BookList suppoded to have props: ', this.props.list.models);
console.log('BookList state: ', this.state);

        return (
            // @TODO
            // * Add inputs to create new books. This is an event that goes up
            // * Figure out why React is being a POS with browserify
            <div className="book-list">
              <h1>Books!</h1>

              <div className="">
                {_.map(this.props.list.models, this.getBook, this)}
              </div>

              <h2>Add a new book to the shelf</h2>
              <BookForm onCommentSubmit={this.handleBookSubmit} />
            </div>
        );

    /* jshint ignore:end */
    }
});

// BookForm
// ----------------------------------------------------------------------------
var BookForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var title = this.refs.title.getDOMNode().value.trim();
        var author = this.refs.author.getDOMNode().value.trim();

        // Bail.
        if (!text || !author) {
          return;
        }

        // Call a super method.
        this.props.onCommentSubmit({author: author, text: text});

        // Clear out fields.
        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';

        return;
    },

    render: function () {
    /* jshint ignore:start */

        return (
          <form className="book-form" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Book title" ref="title" />
            <input type="text" placeholder="Book author" ref="author" />
            <input type="submit" value="Post" />
          </form>
        );

    /* jshint ignore:end */
    }

});

// Book
// ----------------------------------------------------------------------------
var Book = React.createClass({
    render: function () {
    /* jshint ignore:start */

        console.log(this);

        return(
          <div className="book">
            {this.props}
          </div>
        );

    /* jshint ignore:end */
    }
});

// Render top-most component
// ----------------------------------------------------------------------------

// This shouldn't need to be in a listener... Isn't that the fucking point of
// React? Collection models aren't populated initially, and when they are, it
// doesn't trigger a reflow.
//
// @TODO
// * add a listener in the React component itself, thought that feels wrong.
list.on('sync', function() {
    React.renderComponent(
      BookList({list: list}),
      document.getElementById('app-container')
    );
});
