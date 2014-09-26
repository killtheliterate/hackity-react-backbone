/** @jsx React.DOM */

var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var Firebase = require('client-firebase'); // via http://bit.ly/1ncfCj1
var React = require('React');
// var bbState = require('backbone-react-component');
var bbState = require('./backbone-react');

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

    // Override getBackboneState to tell the mixin
    // HOW to transform Backbone props into JSON state
    getBackboneState: function (props) {
        return {
            books: props.list
        };
    },

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
    /* jshint ignore:start */

        return (<Book key={book.id} data={book}/>);

    /* jshint ignore:end */
    },

    handleCommentSubmit: function(book) {
    },

    render: function () {
    /* jshint ignore:start */

        return (
            <div className="book-list">
              <h1>Books!</h1>

              <div className="books">
                  {_.map(this.state.books.models, this.getBook)}
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

    mixins: [bbState],

    // Override getBackboneState to tell the mixin
    // HOW to transform Backbone props into JSON state
    getBackboneState: function (props) {
        return props.data.toJSON();
    },

    render: function () {
    /* jshint ignore:start */

        return(
            <li className="book">{this.state.title}: By {this.state.author}</li>
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

// React.renderComponent(
//   BookList({collection: list}),
//   document.getElementById('app-container')
// );
