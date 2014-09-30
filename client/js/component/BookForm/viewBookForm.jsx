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
            <input type="text" placeholder="Book title" ref="title" />
            <input type="text" placeholder="Book author" ref="author" />
            <input type="submit" value="Post" />
          </form>
        );

    /* jshint ignore:end */
    }
});
