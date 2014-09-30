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
var BackboneFirebase = require('../../util/backbone-firebase');

// Backbone
// ----------------------------------------------------------------------------
var Book = require('../Book/modelBook');

// Export
// ----------------------------------------------------------------------------
module.exports = BackboneFirebase.Collection.extend({
    model: Book,

    firebase: 'https://amber-fire-1843.firebaseio.com',
});
