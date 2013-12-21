/*global define*/

define([
    'jquery',
    'backbone',
    'underscore'
], function ($, Backbone, _) {
    'use strict';

    // Add initialization method here
    var Controller = Backbone.Controller = function () {
        // Add state here, although be careful
    };

    // Utilize same extend mechanism
    Controller.extend = Backbone.Model.extend;

    // Add methods here
    _.extend(Controller.prototype, {
        start: function() {

        }
    });

    return Controller;
});
