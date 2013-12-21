/*global define*/

define([
    'jquery',
    'backbone',
    'underscore'
], function ($, Backbone, _) {
    'use strict';

    // Add initialization method here
    var Service = Backbone.Service = function () {
        // Add state here, although be careful
    };

    // Utilize same extend mechanism
    Service.extend = Backbone.Model.extend;

    // Add methods here
    _.extend(Service.prototype, {
    });

    return Service;
});
