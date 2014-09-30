// Base modules
// ----------------------------------------------------------------------------
var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var Firebase = require('client-firebase'); // via http://bit.ly/1ncfCj1
var React = require('React');
var bbState = require('../../backbone-react');

Backbone.$ = $; // attach jQuery to Backbone

// Export
// ----------------------------------------------------------------------------
module.exports = React.createClass({

    mixins: [bbState],

    getBackboneState: function (props) {
        return props.data.toJSON();
    },

    handleClick: function(e) {
        e.preventDefault();

        // Call a super method.
        this.props.onBookRemove();

        return;
    },

    render: function () {
    /* jshint ignore:start */

        return(
            <li className="book">
                <div className="book-info">{this.state.title}: By {this.state.author}</div>
                <button onClick={this.handleClick}>Remove</button>
            </li>
        );

    /* jshint ignore:end */
    }
});
