var Backbone = require('backbone');
var _ = require('lodash');

module.exports = {
  getInitialState: function () {
    return this.getBackboneState(this.props);
  },

  componentDidMount: function () {
    if (!_.isFunction(this.getBackboneState)) {
      throw new Error('You must provide getBackboneState(props).');
    }

    this._bindBackboneEvents(this.props);
  },

  componentWillReceiveProps: function (newProps) {
    this._unbindBackboneEvents();
    this._bindBackboneEvents(newProps);
  },

  componentWillUnmount: function () {
    this._unbindBackboneEvents();
  },

  _updateBackboneState: function () {
    var state = this.getBackboneState(this.props);
    this.setState(state);
  },

  _bindBackboneEvents: function (props) {
    if (!_.isFunction(this.watchBackboneProps)) {
      return;
    }

    if (this._backboneListener) {
      throw new Error('Listener already exists.');
    }

    if (!props) {
      throw new Error('Passed props are empty');
    }

    var listener = _.extend({}, Backbone.Events),
        listenTo = _.partial(listener.listenTo.bind(listener), _, _, this._updateBackboneState);

    this.watchBackboneProps(props, listenTo);
    this._backboneListener = listener;
  },

  _unbindBackboneEvents: function () {
    if (!_.isFunction(this.watchBackboneProps)) {
      return;
    }

    if (!this._backboneListener) {
      throw new Error('Listener does not exist.');
    }

    this._backboneListener.stopListening();
    delete this._backboneListener;
  }
};
