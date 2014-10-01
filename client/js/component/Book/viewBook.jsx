// Base modules
// ----------------------------------------------------------------------------
var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var Firebase = require('client-firebase'); // @see http://bit.ly/1ncfCj1
var React = require('React');
var bbState = require('../../util/backbone-react');

Backbone.$ = $; // attach jQuery to Backbone

// React
// ----------------------------------------------------------------------------
var BookItem = React.createClass({
    mixins: [bbState],

    getBackboneState: function (props) {
        return props.data.toJSON();
    },

    watchBackboneProps: function (props, listenTo) {
        listenTo(props.data, 'all');
    },

    buildField: function(el, prop) {
    /* jshint ignore:start */

        // var boundClick = _.partialRight(this.props.onEdit, el, prop);
        var boundClick = this.props.onEdit.bind(null, el, prop); // @see http://bit.ly/1vykn7F

        return (<span onClick={boundClick}>{el}</span>);

    /* jshint ignore:end */
    },

    render: function() {
    /* jshint ignore:start */

        var titleAndAuthor = {title: this.state.title, author: this.state.author};

        var fields = _.map(titleAndAuthor, this.buildField);

        return(
            <div className="book-info">

              {fields[0]} <span>: By </span> {fields[1]}

          </div>
        );

    /* jshint ignore:end */
    }
});


// Export
// ----------------------------------------------------------------------------
module.exports = React.createClass({

    mixins: [bbState],

    getBackboneState: function (props) {

      return {
          book: props.data
      };
    },

    watchBackboneProps: function (props, listenTo) {
        listenTo(props.data, 'all');
    },

    handleRemove: function(e) {
        e.preventDefault();

        // Call a super method.
        this.props.onBookRemove();

        return;
    },

    handleEdit: function(el, prop) {
        var book = this.state.book;

console.log(arguments);

        // @TODO
        // * Address best practices around this method for setting state.
        // * this.props is supposed to be immutable, but in this case, it is
        // a Backbone model. One possibly solution is to pass this on to yet
        // another React component that sets things via an event up the chain,
        // that way we are still respecting the intended immutability of
        // this.props. At this point, I'm not really worried about it.
        //
        // So, yea, this would be fairly trivial to do more "happy path" by just
        // changing what this.buildField does, spawing a new React component
        // that delegates back to this class. See this.buildField().
        book.set(prop, 'Revision');

        // Replace React element with an input field that sets state by using
        // something like this.props.data.set(prop, 'Revision');
        //
        // * Can possibly do a show hide on a hidden form element, though it'd
        // be way cooler to do a repalce
        // * Can possibly pluck the correct field with _.pluck(fields)

        return;
    },

    buildInput: function() {
    },

    render: function () {
    /* jshint ignore:start */

        return(
            <li className="book">
                <BookItem key={this.state.book.id} data={this.state.book} onEdit={this.handleEdit} />

                <button onClick={this.handleRemove}>Remove</button>
            </li>
        );

    /* jshint ignore:end */
    }
});
