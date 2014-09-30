// Base modules
// ----------------------------------------------------------------------------
var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var Firebase = require('client-firebase'); // via http://bit.ly/1ncfCj1

Backbone.$ = $; // attach jQuery to Backbone

// Firebase
// Base URL: https://amber-fire-1843.firebaseio.com
// ----------------------------------------------------------------------------
var BackboneFirebase = require('../../backbone-firebase');

// Export
// ----------------------------------------------------------------------------
module.exports = Backbone.Model.extend({
    defaults: function() {
        return {
          title: 'No book title given',
          author: 'No author given'
        };
    },

    initialize: function() {
        if (!this.get('title')) {
            this.set({'title': this.defaults().title});
        }

        if (!this.get('author')) {
            this.set({'author': this.defaults().title});
        }
    },

    firebase: 'https://amber-fire-1843.firebaseio.com/book'
});
