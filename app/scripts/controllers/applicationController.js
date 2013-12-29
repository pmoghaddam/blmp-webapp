/*global define*/

define([
    'jquery',
    'backbone',
    'underscore',
    'routers/router'
], function ($, Backbone, _, Router) {
    'use strict';

    var ApplicationController = Backbone.Controller.extend({
        start: function () {
            // Setup routers
            new Router();

            // Start history once everything is ready
            Backbone.history.start();
        }
    });

    return ApplicationController;
});
