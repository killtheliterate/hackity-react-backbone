// Base modules
// ----------------------------------------------------------------------------
var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var Firebase = require('client-firebase'); // via http://bit.ly/1ncfCj1
var React = require('React');
var bbState = require('../../util/backbone-react');

Backbone.$ = $; // attach jQuery to Backbone

// Export
// ----------------------------------------------------------------------------
module.exports = React.createClass({

    mixins: [bbState],

    getBackboneState: function (props) {
        return props.data.toJSON();
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

    handleEdit: function(el, prop, e) {
        e.preventDefault();

        var editRef = this.refs['edit-' + prop];
        var displayRef = this.refs['display-' + prop];

        var $input = $(editRef.getDOMNode());
        var $display = $(displayRef.getDOMNode());

        $input.show();
        $display.hide();


        return;
    },

    handleInput: function(el, prop, e) {
        var val = e.target.value;

        this.props.data.set(prop, val);
    },

    handleSubmit: function(el, prop, e) {
        var ENTER = 13;
        var editRef = this.refs['edit-' + prop];
        var displayRef = this.refs['display-' + prop];

        var $input = $(editRef.getDOMNode());
        var $display = $(displayRef.getDOMNode());

        if (e.which === ENTER) {
          $input.hide();
          $display.show();
        }
    },

    buildField: function(el, prop) {
    /* jshint ignore:start */

        var boundClick = this.handleEdit.bind(null, el, prop);
        var boundChange = this.handleInput.bind(null, el, prop);
        var boundKeyUp = this.handleSubmit.bind(null, el, prop);
        var editRef = 'edit-' + prop;
        var displayRef = 'display-' + prop;

        return (
          <div className='book-field'>
            <span onClick={boundClick} ref={displayRef}>{el}</span>
            <input type='text' defaultValue={el} className="hide" ref={editRef} onChange={boundChange} onKeyUp={boundKeyUp} />
          </div>
        );

    /* jshint ignore:end */
    },

    render: function () {
    /* jshint ignore:start */

        var titleAndAuthor = {title: this.state.title, author: this.state.author}

        var fields = _.map(titleAndAuthor, this.buildField)

        return(
            <li className="book">
                <div className="book-info">

                  {fields[0]} <span>: By </span> {fields[1]}

                </div>

                <button onClick={this.handleRemove}>Remove</button>
            </li>
        );

    /* jshint ignore:end */
    }
});
