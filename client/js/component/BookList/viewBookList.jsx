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

    componentDidMount: function () {
console.log(this.state);
    },

    // Override getBackboneState to tell the mixin
    // HOW to transform Backbone props into JSON state
    getBackboneState: function (props) {
        return {
            books: props.list
        };
    },

    watchBackboneProps: function (props, listenTo) {
        listenTo(props.list, 'all');
    },

    getBook: function(book) {
    /* jshint ignore:start */

        // Look at todoMVC example of deleting a todo
        return (<Book key={book.id} data={book} onBookRemove={this.handleBookRemove.bind(this, book)} />);

    /* jshint ignore:end */
    },

    handleBookRemove: function(book) {
        var books = this.state.books;
        books.remove([book]);

        // Update the DOM by setting a new state.
        // This would ideally be handled by watchBackboneProps()
        // this.setState({books: books});
    },

    handleBookSubmit: function(book) {
        var books = this.state.books;
        books.add([book]);

        this.setState({books: books});
    },

    render: function () {
    /* jshint ignore:start */

        // There has to be a better way to check existence of nested props.
        var books = existy(this.state.books) ? this.state.books.models : [];

        return (
            <div className="book-list">
                <h1>Books!</h1>

                <div className="books">
                    {/* Should only create a list of books if models exist */}
                    {_.map(books, this.getBook)}
                </div>

                <h2>Add a new book to the shelf</h2>

                <BookForm onBookSubmit={this.handleBookSubmit} />
            </div>
        );

    /* jshint ignore:end */
    }
});
