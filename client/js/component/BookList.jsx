/** @jsx React.DOM */

var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var bbState = require('backbone-react-component');
var React = require('react');

module.exports = React.createClass({
    mixins: [bbState],

    /**
     * Make the book.
     *
     * @param {object} book - the book
     *
     * This can probably refactored to be an independent React component
     */
    makeBook: function (book) {
    /* jshint ignore:start */

    /* jshint ignore:end */
    },

    render: function () {
    /* jshint ignore:start */

        return (
            <div class="content">

              <h1>This is a list of books!</h1>

              <h2>Sup sup sup</h2>

            </div>
        );

    /* jshint ignore:end */
    }
});
