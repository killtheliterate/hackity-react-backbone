// Base modules
// ----------------------------------------------------------------------------
var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var Firebase = require('client-firebase'); // via http://bit.ly/1ncfCj1
var React = require('React');
var bbState = require('../../util/backbone-react');
var existy = require('../../util/truth').existy;
var truthy = require('../../util/truth').truthy;

Backbone.$ = $; // attach jQuery to Backbone

// React
// ----------------------------------------------------------------------------
var Book = require('../Book/viewBook.jsx');
var BookForm = require('../BookForm/viewBookForm.jsx');

// Export
// ----------------------------------------------------------------------------
module.exports = React.createClass({
    mixins: [bbState],

    getBackboneState: function (props) {
        return {
            books: props.list
        };
    },

    watchBackboneProps: function (props, listenTo) {
        listenTo(props.list, 'all');
    },

    /**
     * Create a book component for each book in the collection.
     * @param {obj} book - the book model
     */
    getBook: function(book) {
    /* jshint ignore:start */

        return (<Book key={book.id} data={book} onBookRemove={this.handleBookRemove.bind(this, book)} />);

    /* jshint ignore:end */
    },

    /**
     * Remove book from collection.
     * @param {obj} book - the book model
     */
    handleBookRemove: function(book) {
        var books = this.state.books;
        books.remove([book]);
    },

    /**
     * Add book to collection.
     * @param {obj} book - the book model
     */
    handleBookSubmit: function(book) {
        var books = this.state.books;
        books.add([book]);
    },

    render: function () {
    /* jshint ignore:start */

        // There has to be a better way to check existence of nested props.
        var books = existy(this.state.books) ? this.state.books.models : [];

        return (
            <div className="books">
                <div className="item-list">
                  <ul className="list">
                      {_.map(books, this.getBook)}
                  </ul>
                </div>

                <BookForm onBookSubmit={this.handleBookSubmit} />
            </div>
        );

    /* jshint ignore:end */
    }
});
