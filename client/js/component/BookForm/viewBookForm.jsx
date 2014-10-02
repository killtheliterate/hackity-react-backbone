// Base modules
// ----------------------------------------------------------------------------
var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var React = require('React');
var bbState = require('../../util/backbone-react');

Backbone.$ = $; // attach jQuery to Backbone

// Export
// ----------------------------------------------------------------------------
module.exports = React.createClass({
    /**
     * Add book to books collection.
     * @param {obj} e - the event
     */
    handleSubmit: function(e) {
        e.preventDefault();
        var title = this.refs.title.getDOMNode().value.trim();
        var author = this.refs.author.getDOMNode().value.trim();

        // Bail.
        if (!title || !author) {
          return;
        }

        // Call a super method.
        this.props.onBookSubmit({title: title, author: author});

        // Clear out fields.
        this.refs.title.getDOMNode().value = '';
        this.refs.author.getDOMNode().value = '';

        return;
    },

    render: function () {
    /* jshint ignore:start */

        return (
          <form className="book-form" onSubmit={this.handleSubmit}>
            <input className="book-form-title" type="text" placeholder="Book title" ref="title" />
            <input className="book-form-author" type="text" placeholder="Book author" ref="author" />
            <input className="book-form-submit" type="submit" value="Post" />
          </form>
        );

    /* jshint ignore:end */
    }
});
