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

    /**
     * Handle item removal.
     * @param {obj} e - the event
     */
    handleRemove: function(e) {
        e.preventDefault();

        // Call a super method.
        this.props.onBookRemove();

        return;
    },

    /**
     * Initiate edit of a field.
     * @param {string} el - current value
     * @param {string} prop - property that is being changed
     * @param {obj} e - the event
     */
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

    /**
     * Change the state of the model.
     * @param {string} el - current value
     * @param {string} prop - property that is being changed
     * @param {obj} e - the event
     */
    handleInput: function(el, prop, e) {
        var val = e.target.value;

        this.props.data.set(prop, val);
    },

    /**
     * Remove input form on ENTER keypress
     * @param {string} el - current value
     * @param {string} prop - property that is being changed
     * @param {obj} e - the event
     */
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

    /**
     * Spawn fields for pieces on the model.
     * @param {string} el - current value
     * @param {string} prop - property that is being changed
     */
    buildField: function(el, prop) {
    /* jshint ignore:start */

        // Bind handles for this field. This allows us to have more abstracted
        // handlers, and avoids duplicating code.
        var boundClick = this.handleEdit.bind(null, el, prop);
        var boundChange = this.handleInput.bind(null, el, prop);
        var boundKeyUp = this.handleSubmit.bind(null, el, prop);

        // Dynamically create references for this field. Makes targeting the
        // element easier.
        var editRef = 'edit-' + prop;
        var displayRef = 'display-' + prop;

        // Dynamically create a targetable class
        var classes = 'book-field book-field--' + prop;

        return (
          <div className={classes}>
            <span onClick={boundClick} ref={displayRef} className="book-field-display">{el}</span>
            <input type='text' defaultValue={el} className="book-field-edit hide" ref={editRef} onChange={boundChange} onKeyUp={boundKeyUp} />
          </div>
        );

    /* jshint ignore:end */
    },

    render: function () {
    /* jshint ignore:start */

        // The fields to render, from the model.
        var titleAndAuthor = {title: this.state.title, author: this.state.author}

        // Build an individual field for each field, which allows us to have
        // more targetted eventing.
        var fields = _.map(titleAndAuthor, this.buildField)

        return(
            <li className="list-item">
              <div className="book">

                <div className="book-info">

                  {fields[0]} <div className="book-field book-field--separator">: By </div> {fields[1]}

                </div>

                <div className="book-remove">

                  <button onClick={this.handleRemove}>Remove</button>

                </div>

              </div>
            </li>
        );

    /* jshint ignore:end */
    }
});
